export interface License {
  id: string;
  key: string;
  companyId: string;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'blocked';
  maxUsers: number;
  maxDevices: number;
  allowedModules: string[];
  allowedFeatures: string[];
  offlineAllowed: boolean;
  offlineGracePeriod: number; // in days
  lastValidatedAt: string;
}

export interface Device {
  id: string;
  fingerprint: string;
  name: string;
  platform: string;
  companyId: string;
  userId?: string;
  lastActiveAt: string;
  isBlocked: boolean;
  createdAt: string;
}
