import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Permission } from '../types/permissions';

interface PermissionGuardProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PermissionGuard({ permission, children, fallback = null }: PermissionGuardProps) {
  const hasPermission = useAuthStore(state => state.hasPermission(permission));

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
