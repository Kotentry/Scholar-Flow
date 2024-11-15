import { Metadata } from 'next';
import { TicketsContent } from '@/components/interfaces/system-admin/support/tickets';

export const metadata: Metadata = {
  title: 'Support Tickets | Scholar Flow',
  description: 'Manage and respond to support tickets',
};

export default function TicketsPage() {
  return <TicketsContent />;
}
