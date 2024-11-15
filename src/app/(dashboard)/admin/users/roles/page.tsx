'use client';

import { useState } from 'react';
import {
  RolesList,
  RoleFilters,
} from '@/components/interfaces/system-admin/users/roles';

export default function RolesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Roles & Permissions</h1>
        <p className="text-default-500">
          Manage system roles and their associated permissions
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <RoleFilters />
        <RolesList />
      </div>
    </div>
  );
}
