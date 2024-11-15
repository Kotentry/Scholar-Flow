'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { revenueData } from '@/lib/data/analyticsData';

const formatValue = (value: number) => {
  return `GHS ${(value / 1000).toFixed(1)}K`;
};

const chartData = revenueData.labels.map((label, index) => ({
  name: label,
  revenue: revenueData.datasets[0].data[index],
  collections: revenueData.datasets[1].data[index],
}));

export default function RevenueChart() {
  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <Tabs
            size="sm"
            aria-label="Revenue chart options"
          >
            <Tab key="6m" title="6 Months" />
            <Tab key="1y" title="1 Year" />
            <Tab key="all" title="All Time" />
          </Tabs>
        </div>
        <p className="text-small text-default-500">
          Track revenue and collection trends
        </p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#000000"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="collections"
              name="Collections"
              stroke="#666666"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
