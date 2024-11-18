'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueData } from "@/lib/types/dashboard";

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full h-[400px]"
    >
      <Card className="w-full h-full">
        <CardHeader className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Revenue Overview</h4>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-default-500">Monthly revenue and expenses</p>
            <Chip size="sm" variant="flat" color="success">
              Sticky Chart
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#06b6d4"
                fill="#0891b2"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                fill="#dc2626"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </motion.div>
  );
}
