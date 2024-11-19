'use client';

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { 
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineArchive,
  HiOutlineUsers,
  HiOutlineViewGrid,
  HiOutlineChartBar,
} from "react-icons/hi";
import { type ClassStats as ClassStatsType } from "@/lib/types/academics";

interface ClassStatsProps {
  stats: ClassStatsType;
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  delay?: number;
}

function StatsCard({ title, value, icon: Icon, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card className="border-none bg-gradient-to-br from-white to-default-100">
        <CardBody className="gap-4 h-[100px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-default-500">{title}</p>
              <p className="text-xl font-semibold">{value} </p>
            </div>
            <div className="p-2 bg-default-100 rounded-lg">
              <Icon className="w-6 h-6 text-default-500" />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default function ClassStats({ stats }: ClassStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Classes"
        value={stats.total}
        icon={HiOutlineAcademicCap}
        delay={0.1}
      />
      <StatsCard
        title="Active Classes"
        value={stats.active}
        icon={HiOutlineCheck}
        delay={0.2}
      />
      <StatsCard
        title="Inactive Classes"
        value={stats.inactive}
        icon={HiOutlineX}
        delay={0.3}
      />
      <StatsCard
        title="Archived Classes"
        value={stats.archived}
        icon={HiOutlineArchive}
        delay={0.4}
      />
      <StatsCard
        title="Total Students"
        value={stats.totalStudents}
        icon={HiOutlineUsers}
        delay={0.5}
      />
      <StatsCard
        title="Total Sections"
        value={stats.totalSections}
        icon={HiOutlineViewGrid}
        delay={0.6}
      />
      <StatsCard
        title="Average Class Size"
        value={stats.averageClassSize}
        icon={HiOutlineUserGroup}
        delay={0.7}
      />
      <StatsCard
        title="Academic Years"
        value={stats.academicYearDistribution.length}
        icon={HiOutlineChartBar}
        delay={0.8}
      />
    </div>
  );
}
