'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
} from '@nextui-org/react';
import {
  HiOutlineTicket,
  HiOutlineChat,
  HiOutlineCheck,
  HiOutlineRefresh,
} from 'react-icons/hi';
import type { Ticket } from '@/lib/data/ticketsData';
import { formatDistanceToNow } from 'date-fns';

interface TicketTimelineProps {
  ticket: Ticket;
}

interface TimelineEvent {
  id: string;
  type: 'creation' | 'response' | 'status' | 'resolution';
  title: string;
  description: string;
  time: string;
  icon: JSX.Element;
  color: string;
}

export function TicketTimeline({ ticket }: TicketTimelineProps) {
  // Generate timeline events
  const events: TimelineEvent[] = [
    {
      id: 'creation',
      type: 'creation',
      title: 'Ticket Created',
      description: `Ticket created by ${ticket.user.name}`,
      time: ticket.createdAt,
      icon: <HiOutlineTicket className="w-5 h-5" />,
      color: 'primary',
    },
    ...ticket.messages.slice(1).map((message, index) => ({
      id: message.id,
      type: 'response',
      title: message.sender.role === 'staff' ? 'Support Response' : 'User Response',
      description: message.content.length > 50 ? message.content.slice(0, 50) + '...' : message.content,
      time: message.createdAt,
      icon: <HiOutlineChat className="w-5 h-5" />,
      color: message.sender.role === 'staff' ? 'success' : 'warning',
    })),
  ];

  if (ticket.status === 'resolved') {
    events.push({
      id: 'resolution',
      type: 'resolution',
      title: 'Ticket Resolved',
      description: 'Issue has been resolved',
      time: ticket.updatedAt,
      icon: <HiOutlineCheck className="w-5 h-5" />,
      color: 'success',
    });
  }

  // Sort events by time
  events.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <Card>
      <CardHeader>
        <h4 className="text-medium font-medium">Ticket Timeline</h4>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-lg bg-${event.color}-50`}>
                  {event.icon}
                </div>
                {index < events.length - 1 && (
                  <div className="w-px h-full bg-default-100 my-2" />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-small text-default-500">
                      {event.description}
                    </span>
                  </div>
                  <span className="text-small text-default-400">
                    {formatDistanceToNow(new Date(event.time), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
