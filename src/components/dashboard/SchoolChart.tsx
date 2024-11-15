'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface ChartData {
  labels: string[];
  data: number[];
}

interface SchoolChartProps {
  title: string;
  subtitle: string;
  data: ChartData;
  type?: "area" | "bar";
  color?: string;
}

export default function SchoolChart({
  title,
  subtitle,
  data,
  type = "area",
  color = "#006FEE",
}: SchoolChartProps) {
  // Transform data for Recharts
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.data[index],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-start px-6 py-5">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-small text-default-500">{subtitle}</p>
        </CardHeader>
        <CardBody className="overflow-hidden px-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {type === "area" ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
