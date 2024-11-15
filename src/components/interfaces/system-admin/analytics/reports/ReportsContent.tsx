'use client';

import {
  FinancialReports,
  SchoolReports,
  SystemReports,
} from '@/components/interfaces/system-admin/analytics/reports';
import {
  Tabs,
  Tab,
  Button,
} from '@nextui-org/react';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

export default function ReportsContent() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting all reports...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-default-500">
            View and export detailed reports across different aspects of your platform
          </p>
        </div>
        <Button
          color="primary"
          startContent={<HiOutlineDocumentDownload className="w-4 h-4" />}
          className="font-medium bg-black text-white"
          onPress={handleExport}
        >
          Export All Reports
        </Button>
      </div>

      {/* Content */}
      <Tabs
        aria-label="Reports sections"
        size="lg"
        variant="underlined"
        fullWidth
      >
        <Tab
          key="financial"
          title="Financial Reports"
          className="w-full"
        >
          <div className="mt-6">
            <FinancialReports />
          </div>
        </Tab>
        <Tab
          key="school"
          title="School Reports"
          className="w-full"
        >
          <div className="mt-6">
            <SchoolReports />
          </div>
        </Tab>
        <Tab
          key="system"
          title="System Reports"
          className="w-full"
        >
          <div className="mt-6">
            <SystemReports />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
