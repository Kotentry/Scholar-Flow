'use client';

import {
  StatsGrid,
  RevenueChart,
  QuickInsights,
  SystemHealth,
  UserEngagement,
} from '@/components/interfaces/system-admin/analytics/overview';

export default function AnalyticsOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Analytics Overview</h1>
        <p className="text-default-500">
          Monitor key metrics and insights across your platform
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        {/* KPI Stats */}
        <StatsGrid />

        {/* Charts & Insights */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <RevenueChart />
          <UserEngagement />
        </div>

        {/* Quick Insights & System Health */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <QuickInsights />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
