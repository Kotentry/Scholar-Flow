import { Metadata } from 'next';
import { ReportsContent } from '@/components/interfaces/system-admin/analytics/reports';

export const metadata: Metadata = {
  title: 'Reports | Scholar Flow',
  description: 'View and export detailed reports across different aspects of your platform',
};

export default function ReportsPage() {
  return <ReportsContent />;
}