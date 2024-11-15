'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Progress,
} from '@nextui-org/react';
import { systemHealth } from '@/lib/data/analyticsData';

const statusColorMap = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export default function SystemHealth() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">System Health</h3>
        <p className="text-small text-default-500">
          Monitor system performance and health
        </p>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {systemHealth.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 text-${item.status}`} />
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <span className={`text-${item.status} font-medium`}>
                    {item.value}
                  </span>
                </div>

                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    indicator: `bg-${item.status}`,
                  }}
                  value={parseInt(item.value)}
                />

                <p className="text-small text-default-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
