import { db } from "../lib/db";
import { License, Device } from "../types/index";

class LicenseService {
  async getAllLicenses(): Promise<License[]> {
    return db.licenses.toArray();
  }

  async getLicense(id: string): Promise<License | undefined> {
    return db.licenses.get(id);
  }

  async createLicense(license: Omit<License, "id">): Promise<string> {
    const id = `L-${Math.floor(Math.random() * 90000) + 10000}`;
    await db.licenses.add({ ...license, id });
    return id;
  }

  async validateLicense(licenseKey: string): Promise<{ isValid: boolean; error?: string }> {
    const license = await db.licenses.where("licenseKey").equals(licenseKey).first();
    if (!license) return { isValid: false, error: "Invalid license key" };
    
    if (license.status === 'blocked') return { isValid: false, error: "License blocked by Super Admin" };
    
    const now = new Date();
    if (new Date(license.expiryDate) < now) {
      await db.licenses.update(license.id, { status: 'expired' });
      return { isValid: false, error: "License has expired" };
    }

    // Update last validated
    await db.licenses.update(license.id, { lastValidatedAt: now.toISOString() });
    
    return { isValid: true };
  }

  async getDevices(): Promise<Device[]> {
    return db.devices.toArray();
  }

  async blockDevice(id: string): Promise<void> {
    await db.devices.update(id, { isBlocked: true });
  }

  async unblockDevice(id: string): Promise<void> {
    await db.devices.update(id, { isBlocked: false });
  }

  calculateOfflineStatus(license: License): { canWork: boolean; daysRemaining: number } {
    if (!license.offlineAllowed) return { canWork: false, daysRemaining: 0 };
    
    const lastValidated = new Date(license.lastValidatedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastValidated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const remaining = license.offlineGracePeriod - diffDays;
    
    return {
      canWork: remaining > 0,
      daysRemaining: Math.max(0, remaining)
    };
  }

  generateFingerprint(): string {
    return btoa(navigator.userAgent + navigator.language + screen.width + screen.height).slice(0, 16);
  }
}

export const licenseService = new LicenseService();
