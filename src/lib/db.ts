import Dexie, { Table } from 'dexie';

export interface LocalSyncItem {
  id?: number;
  entity: string;
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: string;
}

export interface SyncMetadata {
  key: string;
  value: string;
}

export class EurosiaDB extends Dexie {
  users!: Table<any>;
  roles!: Table<any>;
  permissions!: Table<any>;
  companies!: Table<any>;
  companySettings!: Table<any>;
  licenses!: Table<any>;
  devices!: Table<any>;
  appModules!: Table<any>;
  features!: Table<any>;
  companyAppAccess!: Table<any>;
  companyFeatureAccess!: Table<any>;
  packages!: Table<any>;
  packageFeatures!: Table<any>;
  subscriptions!: Table<any>;
  paymentMethods!: Table<any>;
  paymentProviderConfigs!: Table<any>;
  paymentTransactions!: Table<any>;
  invoices!: Table<any>;
  siteSettings!: Table<any>;
  themeSettings!: Table<any>;
  navigationMenus!: Table<any>;
  pages!: Table<any>;
  pageSections!: Table<any>;
  sectionBlocks!: Table<any>;
  productApps!: Table<any>;
  appCategories!: Table<any>;
  pricingPlans!: Table<any>;
  pricingFeatures!: Table<any>;
  mediaFiles!: Table<any>;
  footerColumns!: Table<any>;
  footerLinks!: Table<any>;
  seoSettings!: Table<any>;
  plugins!: Table<any>;
  integrations!: Table<any>;
  featureFlags!: Table<any>;
  auditLogs!: Table<any>;
  syncLogs!: Table<any>;
  backupRecords!: Table<any>;
  notifications!: Table<any>;
  syncQueue!: Table<LocalSyncItem>;
  metadata!: Table<SyncMetadata>;

  constructor() {
    super('EurosiaDB');
    this.version(4).stores({
      users: 'id, email, roleId, companyId, status, createdAt',
      roles: 'id, name, status',
      permissions: 'id, name, status',
      companies: 'id, name, domain, status',
      companySettings: 'id, companyId, key',
      licenses: 'id, licenseKey, companyId, status',
      devices: 'id, fingerprint, companyId, userId, status',
      appModules: 'id, name, slug, status',
      features: 'id, name, code, appModuleId, status',
      companyAppAccess: 'id, companyId, appModuleId',
      companyFeatureAccess: 'id, companyId, featureId',
      packages: 'id, name, status',
      packageFeatures: 'id, packageId, featureId',
      subscriptions: 'id, companyId, packageId, status',
      paymentMethods: 'id, provider, status',
      paymentProviderConfigs: 'id, provider',
      paymentTransactions: 'id, companyId, status',
      invoices: 'id, companyId, status',
      siteSettings: 'id, key',
      themeSettings: 'id, companyId',
      navigationMenus: 'id, parentId, status',
      pages: 'id, slug, status',
      pageSections: 'id, pageId, type, sortOrder',
      sectionBlocks: 'id, sectionId, type',
      productApps: 'id, status',
      appCategories: 'id, name',
      pricingPlans: 'id, packageId, status',
      pricingFeatures: 'id, pricingPlanId',
      mediaFiles: 'id, companyId, type',
      footerColumns: 'id, status',
      footerLinks: 'id, footerColumnId',
      seoSettings: 'id, pageId',
      plugins: 'id, name, status',
      integrations: 'id, name, type',
      featureFlags: 'id, key, status',
      auditLogs: 'id, userId, companyId, createdAt',
      syncQueue: '++id, entity, entityId, timestamp',
      syncLogs: 'id, companyId, status, createdAt',
      backupRecords: 'id, status, createdAt',
      notifications: 'id, userId, isRead, createdAt',
      metadata: 'key'
    });
  }
}

export const db = new EurosiaDB();
