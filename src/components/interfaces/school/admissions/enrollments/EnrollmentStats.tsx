'use client';

import { Card, CardBody } from "@nextui-org/react";
import { HiOutlineUserGroup, HiOutlineCash, HiOutlineExclamationCircle, HiOutlineCheckCircle } from "react-icons/hi";

interface EnrollmentStatsProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    withdrawn: number;
    graduated: number;
    suspended: number;
    paymentPending: number;
    paymentOverdue: number;
    totalFees: number;
    totalPaid: number;
  };
}

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: React.ElementType;
  subtitle?: string;
}

function StatCard({ title, value, Icon, subtitle }: StatCardProps) {
  return (
    <Card className="border-none bg-gradient-to-br from-white to-default-100">
      <CardBody className="gap-4 h-[100px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-default-500">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
            {subtitle && <p className="text-xs text-default-400">{subtitle}</p>}
          </div>
          <div className="p-2 bg-default-100 rounded-lg">
            <Icon className="w-6 h-6 text-default-500" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function EnrollmentStats({ stats }: EnrollmentStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Students"
        value={stats.total}
        subtitle={`${stats.active} Active`}
        Icon={HiOutlineUserGroup}
      />
      <StatCard
        title="Total Fees"
        value={formatCurrency(stats.totalFees)}
        subtitle={`${formatCurrency(stats.totalPaid)} Collected`}
        Icon={HiOutlineCash}
      />
      <StatCard
        title="Pending Payments"
        value={stats.paymentPending}
        subtitle={`${stats.paymentOverdue} Overdue`}
        Icon={HiOutlineExclamationCircle}
      />
      <StatCard
        title="Enrollment Status"
        value={`${stats.pending} Pending`}
        subtitle={`${stats.graduated} Graduated`}
        Icon={HiOutlineCheckCircle}
      />
    </div>
  );
}
