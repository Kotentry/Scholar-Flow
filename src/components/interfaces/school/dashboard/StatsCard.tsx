'use client';

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { 
  HiOutlineUserGroup, 
  HiOutlineAcademicCap, 
  HiOutlineOfficeBuilding, 
  HiOutlineCash, 
  HiOutlineClipboardCheck, 
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineClipboardList,
  HiOutlineAnnotation
} from "react-icons/hi";

const iconMap = {
  users: HiOutlineUserGroup,
  teachers: HiOutlineAcademicCap,
  classes: HiOutlineOfficeBuilding,
  revenue: HiOutlineCash,
  attendance: HiOutlineClipboardCheck,
  performance: HiOutlineChartBar,
  applications: HiOutlineDocumentText,
  notifications: HiOutlineBell,
  events: HiOutlineCalendar,
  alerts: HiOutlineExclamationCircle,
  tasks: HiOutlineClipboardList,
  announcements: HiOutlineAnnotation,
} as const;

type IconType = keyof typeof iconMap;

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: number;
  delay?: number;
}

export default function StatsCard({ title, value, icon, trend, delay = 0 }: StatsCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card
        className="border-none bg-gradient-to-br from-white to-default-100"
        shadow="sm"
      >
        <CardBody className="gap-4 h-[120px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-default-500">{title}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
            <div className="p-3 rounded-xl bg-default-100">
              <Icon className="w-6 h-6 text-default-500" />
            </div>
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-2">
              <span className={`text-sm ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-default-400">vs last month</span>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
