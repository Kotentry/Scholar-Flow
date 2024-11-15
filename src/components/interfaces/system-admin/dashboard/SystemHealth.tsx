'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import {
  HiOutlineClock,
  HiOutlineServer,
  HiOutlineChartBar,
  HiOutlineDatabase,
} from "react-icons/hi";

interface SystemHealthProps {
  uptime: string;
  responseTime: string;
  errorRate: string;
  lastBackup: string;
  storageUsed: string;
  cpuUsage: string;
  memoryUsage: string;
}

export default function SystemHealth({
  uptime,
  responseTime,
  errorRate,
  lastBackup,
  storageUsed,
  cpuUsage,
  memoryUsage,
}: SystemHealthProps) {
  const metrics = [
    {
      label: "Storage",
      value: parseInt(storageUsed),
      icon: HiOutlineDatabase,
      color: "primary",
    },
    {
      label: "CPU",
      value: parseInt(cpuUsage),
      icon: HiOutlineServer,
      color: "success",
    },
    {
      label: "Memory",
      value: parseInt(memoryUsage),
      icon: HiOutlineChartBar,
      color: "secondary",
    },
  ];

  const stats = [
    { label: "Uptime", value: uptime, icon: HiOutlineClock },
    { label: "Response Time", value: responseTime, icon: HiOutlineServer },
    { label: "Error Rate", value: errorRate, icon: HiOutlineChartBar },
    { label: "Last Backup", value: lastBackup, icon: HiOutlineDatabase },
  ];

  return (
    <Card className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm">
      <CardHeader className="flex flex-col items-start px-6 py-5">
        <h4 className="text-lg font-semibold">System Health</h4>
        <p className="text-small text-default-500">Current system metrics</p>
      </CardHeader>
      <CardBody className="px-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-full bg-default-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-default-500">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{metric.label}</span>
                  </div>
                  <span className="text-sm font-medium">{metric.value}%</span>
                </div>
                <Progress
                  value={metric.value}
                  color={metric.color as any}
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "max-w-full",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
