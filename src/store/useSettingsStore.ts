import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  featureFlags: {
    aiAssistant: boolean;
    marketplace: boolean;
    advancedAnalytics: boolean;
    offlineMode: boolean;
  };
  whiteLabel: {
    companyName: string;
    logoColor: string;
    primaryColor: string;
    faviconUrl?: string;
  };
  toggleFeature: (feature: keyof SettingsState['featureFlags']) => void;
  updateWhiteLabel: (config: Partial<SettingsState['whiteLabel']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      featureFlags: {
        aiAssistant: true,
        marketplace: true,
        advancedAnalytics: true,
        offlineMode: true,
      },
      whiteLabel: {
        companyName: 'EUROSIA App Ecosystem',
        logoColor: '#CC1A2F',
        primaryColor: '#CC1A2F',
      },
      toggleFeature: (feature) => 
        set((state) => ({
          featureFlags: {
            ...state.featureFlags,
            [feature]: !state.featureFlags[feature]
          }
        })),
      updateWhiteLabel: (config) =>
        set((state) => ({
          whiteLabel: {
            ...state.whiteLabel,
            ...config
          }
        })),
    }),
    {
      name: 'eurosia-settings',
    }
  )
);
