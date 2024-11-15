'use client';

import { useState } from 'react';
import {
  ActivityList,
  ActivityFilters,
} from '@/components/interfaces/system-admin/users/activity';

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Activity Logs</h1>
        <p className="text-default-500">
          Monitor and track system activities and user actions
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <ActivityFilters />
        <ActivityList />
      </div>
    </div>
  );
}
