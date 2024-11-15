'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
} from '@nextui-org/react';
import { quickInsights } from '@/lib/data/analyticsData';

const statusColorMap = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  primary: 'primary',
};

export default function QuickInsights() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Quick Insights</h3>
        <p className="text-small text-default-500">
          Recent activities and notifications
        </p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {quickInsights.map((insight) => {
            const Icon = insight.icon;

            return (
              <div
                key={insight.id}
                className="flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`p-2 rounded-lg bg-${insight.status}/10`}>
                  <Icon className={`w-5 h-5 text-${insight.status}`} />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Chip
                      size="sm"
                      color={statusColorMap[insight.status]}
                      variant="flat"
                    >
                      {insight.value}
                    </Chip>
                  </div>
                  <p className="text-small text-default-500">
                    {insight.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
