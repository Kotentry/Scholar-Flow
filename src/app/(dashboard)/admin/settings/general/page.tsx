import { Metadata } from 'next';
import { GeneralSettingsContent } from '@/components/interfaces/system-admin/settings/general';

export const metadata: Metadata = {
  title: 'General Settings | Scholar Flow',
  description: 'Configure general platform settings and preferences',
};

export default function GeneralSettingsPage() {
  return <GeneralSettingsContent />;
}
