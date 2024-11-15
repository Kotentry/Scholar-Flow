'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Progress,
} from '@nextui-org/react';
import {
  HiOutlineTicket,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineExclamation,
} from 'react-icons/hi';
import type { Ticket } from '@/lib/data/ticketsData';

interface TicketStatsProps {
  tickets: Ticket[];
}

export function TicketStats({ tickets }: TicketStatsProps) {
  const activeTickets = tickets.filter(t => t.status !== 'closed').length;
  const urgentTickets = tickets.filter(t => t.priority === 'urgent').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  // Calculate resolution rate
  const resolutionRate = Math.round((resolvedTickets / tickets.length) * 100) || 0;

  // Calculate average response time (in hours)
  const avgResponseTime = tickets.reduce((acc, ticket) => {
    const firstResponse = ticket.messages[1]; // First response after ticket creation
    if (!firstResponse) return acc;

    const ticketCreation = new Date(ticket.createdAt);
    const responseTime = new Date(firstResponse.createdAt);
    const hours = Math.abs(responseTime.getTime() - ticketCreation.getTime()) / 36e5;
    return acc + hours;
  }, 0) / tickets.length || 0;

  const stats = [
    {
      label: 'Active Tickets',
      value: activeTickets,
      icon: <HiOutlineTicket className="w-5 h-5" />,
      color: 'primary',
    },
    {
      label: 'Urgent Tickets',
      value: urgentTickets,
      icon: <HiOutlineExclamation className="w-5 h-5" />,
      color: 'danger',
    },
    {
      label: 'Avg. Response Time',
      value: `${Math.round(avgResponseTime)}h`,
      icon: <HiOutlineClock className="w-5 h-5" />,
      color: 'warning',
    },
    {
      label: 'Resolution Rate',
      value: `${resolutionRate}%`,
      icon: <HiOutlineCheck className="w-5 h-5" />,
      color: 'success',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardBody className="gap-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-small text-default-500">{stat.label}</span>
                <span className="text-2xl font-semibold">{stat.value}</span>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                {stat.icon}
              </div>
            </div>
            <Progress
              size="sm"
              radius="sm"
              classNames={{
                indicator: `bg-${stat.color}`,
              }}
              value={resolutionRate}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
