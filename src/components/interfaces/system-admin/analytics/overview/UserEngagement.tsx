'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { userEngagementData } from '@/lib/data/analyticsData';

const formatValue = (value: number) => {
  return value.toLocaleString();
};

const chartData = userEngagementData.labels.map((label, index) => ({
  name: label,
  users: userEngagementData.datasets[0].data[index],
}));

export default function UserEngagement() {
  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">User Engagement</h3>
          <Tabs
            size="sm"
            aria-label="User engagement chart options"
          >
            <Tab key="1w" title="1 Week" />
            <Tab key="1m" title="1 Month" />
            <Tab key="3m" title="3 Months" />
          </Tabs>
        </div>
        <p className="text-small text-default-500">
          Track daily active users across the platform
        </p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip
              formatter={(value: number) => formatValue(value)}
              labelStyle={{ color: 'black' }}
            />
            <Area
              type="monotone"
              dataKey="users"
              name="Active Users"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
