import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  permissions?: string[];
  tenant?: {
    id: string;
    name: string;
  };
}

import { DEFAULT_ROLES, Permission } from "../types/permissions";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        if (user.permissions?.includes(permission)) return true;
        const rolePermissions = DEFAULT_ROLES[user.role as keyof typeof DEFAULT_ROLES] || [];
        return rolePermissions.includes(permission);
      }
    }),
    {
      name: "eurosia-auth",
    }
  )
);
