import { Divider } from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import {
  schoolDetails,
  performanceMetrics,
  moduleUsageStats,
  recentActivities,
} from '@/lib/data/schoolDetailsData';
import OverviewSection from '@/components/interfaces/system-admin/schools/details/OverviewSection';
import PerformanceSection from '@/components/interfaces/system-admin/schools/details/PerformanceSection';
import ModulesSection from '@/components/interfaces/system-admin/schools/details/ModulesSection';
import ActivitySection from '@/components/interfaces/system-admin/schools/details/ActivitySection';
import SchoolInfoSection from '@/components/interfaces/system-admin/schools/details/SchoolInfoSection';

export default function SchoolDetailsPage() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/admin/schools">
        <Button
          color="default"
          variant="light"
          startContent={<HiOutlineArrowLeft className="w-4 h-4" />}
          className="font-medium px-0 data-[hover=true]:bg-transparent"
        >
          Back to Schools
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{schoolDetails.basicInfo.name}</h1>
        <p className="text-default-500">
          Comprehensive overview and management dashboard
        </p>
      </div>

      <Divider />

      {/* Overview Section */}
      <OverviewSection
        studentMetrics={performanceMetrics.studentMetrics}
        staffMetrics={performanceMetrics.staffMetrics}
        financialMetrics={performanceMetrics.financialMetrics}
      />

      <Divider />

      {/* Performance Metrics */}
      <PerformanceSection metrics={performanceMetrics} />

      <Divider />

      {/* Active Modules & Usage */}
      <ModulesSection
        selectedModules={schoolDetails.modules.selectedModules}
        usageStats={moduleUsageStats}
      />

      <Divider />

      {/* Recent Activities */}
      <ActivitySection activities={recentActivities} />

      <Divider />

      {/* School Information */}
      <SchoolInfoSection details={schoolDetails} />
    </div>
  );
}
