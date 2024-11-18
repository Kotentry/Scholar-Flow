'use client';

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { 
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock as HiOutlineClockAlt,
  HiOutlineCalendar,
} from "react-icons/hi";
import { ApplicationStats as ApplicationStatsType } from "@/lib/types/admissions";

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
              <p className="text-xl font-semibold">{value || 0} </p>
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

interface ApplicationStatsProps {
  stats: ApplicationStatsType;
}

export default function ApplicationStats({ stats }: ApplicationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Applications"
        value={stats.total}
        icon={HiOutlineDocumentText}
        delay={0.1}
      />
      <StatsCard
        title="Pending Review"
        value={stats.pending}
        icon={HiOutlineClock}
        delay={0.2}
      />
      <StatsCard
        title="Under Review"
        value={stats.underReview}
        icon={HiOutlineClipboardCheck}
        delay={0.3}
      />
      <StatsCard
        title="Interview Scheduled"
        value={stats.interviewScheduled}
        icon={HiOutlineUserGroup}
        delay={0.4}
      />
      <StatsCard
        title="Accepted"
        value={stats.accepted}
        icon={HiOutlineCheckCircle}
        delay={0.5}
      />
      <StatsCard
        title="Rejected"
        value={stats.rejected}
        icon={HiOutlineXCircle}
        delay={0.6}
      />
      <StatsCard
        title="Today's Applications"
        value={stats.todayApplications}
        icon={HiOutlineClockAlt}
        delay={0.7}
      />
      <StatsCard
        title="This Week"
        value={stats.thisWeekApplications}
        icon={HiOutlineCalendar}
        delay={0.8}
      />
    </div>
  );
}
