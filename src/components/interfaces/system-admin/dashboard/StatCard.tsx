'use client';

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export default function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card
        className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm"
        shadow="sm"
      >
        <CardBody className="gap-3">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-small text-default-500">{title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold">{value}</p>
                {trend && (
                  <div
                    className={`flex items-center text-xs ${
                      trend.isPositive ? "text-success" : "text-danger"
                    }`}
                  >
                    {trend.isPositive ? "+" : "-"}{trend.value}%
                  </div>
                )}
              </div>
            </div>
            <Icon className="w-8 h-8 text-default-400" />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
