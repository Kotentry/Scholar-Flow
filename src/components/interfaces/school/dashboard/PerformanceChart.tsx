'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PerformanceData } from "@/lib/types/dashboard";

interface PerformanceChartProps {
  data: PerformanceData[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full h-[400px]"
    >
      <Card className="w-full h-full">
        <CardHeader className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Academic Performance</h4>
          <p className="text-sm text-default-500">Subject-wise performance analysis</p>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="score"
                name="Current Score"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="average"
                name="Class Average"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </motion.div>
  );
}
