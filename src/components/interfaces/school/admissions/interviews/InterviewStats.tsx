'use client';

import { Card, CardBody } from "@nextui-org/react";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineExclamationCircle } from "react-icons/hi";

interface InterviewStatsProps {
  stats: {
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    no_show: number;
    todayInterviews: number;
    upcomingInterviews: number;
  };
}

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ElementType;
}

function StatCard({ title, value, Icon }: StatCardProps) {
  return (
    <Card className="border-none bg-gradient-to-br from-white to-default-100">
      <CardBody className="gap-4 h-[100px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-default-500">{title}</p>
            <p className="text-xl font-semibold">{value || 0}</p>
          </div>
          <div className="p-2 bg-default-100 rounded-lg">
            <Icon className="w-6 h-6 text-default-500" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function InterviewStats({ stats }: InterviewStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Today's Interviews"
        value={stats.todayInterviews}
        Icon={HiOutlineCalendar}
      />
      <StatCard
        title="Upcoming Interviews"
        value={stats.upcomingInterviews}
        Icon={HiOutlineClock}
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        Icon={HiOutlineCheckCircle}
      />
      <StatCard
        title="Cancelled/No Show"
        value={stats.cancelled + stats.no_show}
        Icon={HiOutlineXCircle}
      />
    </div>
  );
}
