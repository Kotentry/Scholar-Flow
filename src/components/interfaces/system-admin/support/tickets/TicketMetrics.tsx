'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Progress,
} from '@nextui-org/react';
import type { Ticket } from '@/lib/data/ticketsData';

interface TicketMetricsProps {
  tickets: Ticket[];
}

export function TicketMetrics({ tickets }: TicketMetricsProps) {
  // Calculate metrics
  const totalTickets = tickets.length;

  // Tickets by category
  const categoryData = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryMetrics = Object.entries(categoryData).map(([category, count]) => ({
    category: category.replace('_', ' '),
    count,
    percentage: Math.round((count / totalTickets) * 100),
  }));

  // Tickets by role
  const roleData = tickets.reduce((acc, ticket) => {
    acc[ticket.user.role] = (acc[ticket.user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleMetrics = Object.entries(roleData).map(([role, count]) => ({
    role: role.replace('_', ' '),
    count,
    percentage: Math.round((count / totalTickets) * 100),
  }));

  // Average resolution time by category
  const resolutionTimeData = tickets.reduce((acc, ticket) => {
    if (ticket.status === 'resolved') {
      const creationTime = new Date(ticket.createdAt).getTime();
      const resolutionTime = new Date(ticket.updatedAt).getTime();
      const hours = (resolutionTime - creationTime) / 36e5;

      if (!acc[ticket.category]) {
        acc[ticket.category] = { total: 0, count: 0 };
      }
      acc[ticket.category].total += hours;
      acc[ticket.category].count += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const resolutionMetrics = Object.entries(resolutionTimeData).map(([category, data]) => ({
    category: category.replace('_', ' '),
    avgHours: Math.round(data.total / data.count),
  }));

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Tickets by Category */}
      <Card>
        <CardHeader>
          <h4 className="text-medium font-medium">Tickets by Category</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {categoryMetrics.map((metric) => (
              <div key={metric.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-small capitalize">{metric.category}</span>
                  <span className="text-small text-default-500">
                    {metric.count} ({metric.percentage}%)
                  </span>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  value={metric.percentage}
                  className="max-w-md"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Tickets by Role */}
      <Card>
        <CardHeader>
          <h4 className="text-medium font-medium">Tickets by Role</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {roleMetrics.map((metric) => (
              <div key={metric.role} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-small capitalize">{metric.role}</span>
                  <span className="text-small text-default-500">
                    {metric.count} ({metric.percentage}%)
                  </span>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  value={metric.percentage}
                  className="max-w-md"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Resolution Time by Category */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <h4 className="text-medium font-medium">Average Resolution Time by Category</h4>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {resolutionMetrics.map((metric) => (
              <Card key={metric.category}>
                <CardBody>
                  <div className="flex flex-col gap-1">
                    <span className="text-small text-default-500 capitalize">
                      {metric.category}
                    </span>
                    <span className="text-2xl font-semibold">
                      {metric.avgHours}h
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
