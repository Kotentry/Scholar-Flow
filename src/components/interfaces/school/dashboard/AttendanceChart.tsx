'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AttendanceData } from "@/lib/types/dashboard";

interface AttendanceChartProps {
  data: AttendanceData[];
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[400px]"
    >
      <Card className="w-full h-full">
        <CardHeader className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Attendance Overview</h4>
          <p className="text-sm text-default-500">Weekly attendance statistics</p>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="teachers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </motion.div>
  );
}
