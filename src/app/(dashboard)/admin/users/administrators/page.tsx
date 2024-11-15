'use client';

import { useState } from 'react';
import {
  AdministratorsList,
  AdminFilters,
} from '@/components/interfaces/system-admin/users/administrators';

export default function AdministratorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">System Administrators</h1>
        <p className="text-default-500">
          Manage system administrators and their access levels
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <AdminFilters />
        <AdministratorsList />
      </div>
    </div>
  );
}
