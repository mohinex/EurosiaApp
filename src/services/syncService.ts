import { db, LocalSyncItem } from '../lib/db';
import { useAuthStore } from '../store/useAuthStore';
import { v4 as uuidv4 } from 'uuid';

class SyncService {
  private syncInterval: any = null;

  async isOnline() {
    return navigator.onLine;
  }

  async pull() {
    const token = useAuthStore.getState().token;
    if (!token) return;

    const lastSyncMeta = await db.metadata.get('lastPulledAt');
    const updatedAfter = lastSyncMeta?.value || new Date(0).toISOString();

    try {
      const res = await fetch(`/api/sync/pull?updatedAfter=${encodeURIComponent(updatedAfter)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Pull failed');
      
      const data = await res.json();
      
      // Update local tables
      await db.transaction('rw', [db.users, db.companies, db.appModules, db.pricingPlans, db.pages, db.metadata], async () => {
        if (data.users) await db.users.bulkPut(data.users);
        if (data.companies) await db.companies.bulkPut(data.companies);
        if (data.apps) await db.appModules.bulkPut(data.apps);
        if (data.plans) await db.pricingPlans.bulkPut(data.plans);
        if (data.pages) await db.pages.bulkPut(data.pages);
        
        await db.metadata.put({ key: 'lastPulledAt', value: data.timestamp });
      });

      console.log('Sync Pull Success:', data.timestamp);
    } catch (err) {
      console.error('Sync Pull Error:', err);
    }
  }

  async push() {
    const token = useAuthStore.getState().token;
    if (!token || !(await this.isOnline())) return;

    const queue = await db.syncQueue.toArray();
    if (queue.length === 0) return;

    try {
      const res = await fetch('/api/sync/push', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ changes: queue })
      });

      if (!res.ok) throw new Error('Push failed');
      
      const result = await res.json();
      
      // Clear successful items from queue
      const successfulIds = result.results
        .filter((r: any) => r.status === 'SUCCESS' || r.status === 'CONFLICT') // Conflicts are handled as "processed" usually or flagged
        .map((r: any, idx: number) => queue[idx].id);

      await db.syncQueue.bulkDelete(successfulIds);
      console.log('Sync Push Success:', result.results.length, 'items processed');
    } catch (err) {
      console.error('Sync Push Error:', err);
    }
  }

  async trackChange(entity: string, action: 'CREATE' | 'UPDATE' | 'DELETE', data: any) {
    const item: LocalSyncItem = {
      entity,
      entityId: data.id || uuidv4(),
      action,
      data: { ...data, updatedAt: new Date().toISOString() },
      timestamp: new Date().toISOString()
    };

    // Update local table immediately
    const table = (db as any)[entity.toLowerCase() + 's'] || (db as any)[entity.toLowerCase()];
    if (table) {
      if (action === 'DELETE') await table.delete(item.entityId);
      else await table.put(item.data);
    }

    // Queue for sync
    await db.syncQueue.add(item);
    
    // Attempt immediate push if online
    if (await this.isOnline()) {
      this.push();
    }
  }

  startAutoSync(intervalMs = 30000) {
    if (this.syncInterval) clearInterval(this.syncInterval);
    
    this.syncInterval = setInterval(() => {
      this.sync();
    }, intervalMs);

    window.addEventListener('online', () => this.sync());
    this.sync();
  }

  async sync() {
    if (await this.isOnline()) {
      await this.push();
      await this.pull();
    }
  }
}

export const syncService = new SyncService();
