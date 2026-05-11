import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

class DesktopService {
  private deviceId: string | null = null;

  async getDeviceFingerprint() {
    if (this.deviceId) return this.deviceId;
    
    // Simple fingerprint based on browser props (in a real Electron app, this would be disk/cpuid)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const txt = 'EUROSIA-DEVICE-FINGERPRINT';
    ctx!.textBaseline = "top";
    ctx!.font = "14px 'Arial'";
    ctx!.textBaseline = "alphabetic";
    ctx!.fillStyle = "#f60";
    ctx!.fillRect(125,1,62,20);
    ctx!.fillStyle = "#069";
    ctx!.fillText(txt, 2, 15);
    ctx!.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx!.fillText(txt, 4, 17);
    const result = canvas.toDataURL();
    
    // Hash-like behavior or just store unique ID in localStorage
    let storedId = localStorage.getItem('eurosia_device_id');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('eurosia_device_id', storedId);
    }
    this.deviceId = storedId;
    return this.deviceId;
  }

  async validateLicense(licenseKey: string) {
    // Simulate a license validation API call
    console.log('Validating license:', licenseKey);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (licenseKey.startsWith('EURO-')) {
      return { 
        valid: true, 
        plan: 'Enterprise', 
        expiresAt: '2027-01-01',
        devicesAllowed: 10
      };
    }
    return { valid: false, error: 'Invalid license key' };
  }

  async createLocalBackup() {
    console.log('Creating local backup...');
    const allTables = ['users', 'tenants', 'apps', 'pricing', 'pages', 'metadata'];
    const backup: any = {};

    for (const table of allTables) {
      backup[table] = await (db as any)[table].toArray();
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eurosia-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return true;
  }

  async restoreFromBackup(file: File) {
    console.log('Restoring from backup...');
    const text = await file.text();
    const backup = JSON.parse(text);
    
    // Clear and restore tables
    const allTables = ['users', 'tenants', 'apps', 'pricing', 'pages', 'metadata'];
    for (const table of allTables) {
      if (backup[table]) {
        await (db as any)[table].clear();
        await (db as any)[table].bulkAdd(backup[table]);
      }
    }
    
    console.log('Restore complete!');
    return true;
  }

  async checkForUpdates() {
    // Simulate update check
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      updateAvailable: false,
      currentVersion: '1.0.0',
      latestVersion: '1.0.0'
    };
  }
}

export const desktopService = new DesktopService();
