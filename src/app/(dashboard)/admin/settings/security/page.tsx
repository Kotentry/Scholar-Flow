import { Metadata } from 'next';
import { SecuritySettingsContent } from '@/components/interfaces/system-admin/settings/security';

export const metadata: Metadata = {
  title: 'Security Settings | Scholar Flow',
  description: 'Configure security and authentication settings',
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsContent />;
}
