'use client';

import { Card, CardBody } from '@nextui-org/react';
import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineUsers,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from 'react-icons/hi';
import { formatNumber, formatPercentage, formatCurrency } from '@/lib/utils/formatters';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  formatter?: (value: number) => string;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  formatter = formatNumber,
}: MetricCardProps) {
  return (
    <Card>
      <CardBody className="gap-2">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-default-100">
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-small ${
              trend.isPositive ? 'text-success' : 'text-danger'
            }`}>
              {trend.isPositive ? (
                <HiOutlineArrowUp className="w-4 h-4" />
              ) : (
                <HiOutlineArrowDown className="w-4 h-4" />
              )}
              <span>{formatPercentage(trend.value)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-small text-default-500">{title}</span>
          <span className="text-xl font-semibold">
            {formatter(value)}
          </span>
          <span className="text-tiny text-default-400">{subtitle}</span>
        </div>
      </CardBody>
    </Card>
  );
}

interface OverviewSectionProps {
  studentMetrics: {
    totalStudents: number;
    newAdmissions: number;
    graduationRate: number;
  };
  staffMetrics: {
    totalStaff: number;
    teachingStaff: number;
    staffAttendance: number;
  };
  financialMetrics: {
    feeCollection: number;
    monthlyRevenue: number;
    monthlyExpenses: number;
  };
}

export default function OverviewSection({
  studentMetrics,
  staffMetrics,
  financialMetrics,
}: OverviewSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-default-500">
          Key metrics and performance indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={studentMetrics.totalStudents}
          subtitle={`${formatNumber(studentMetrics.newAdmissions)} new admissions`}
          icon={HiOutlineUserGroup}
          trend={{ value: 12, isPositive: true }}
          formatter={formatNumber}
        />

        <MetricCard
          title="Staff Members"
          value={staffMetrics.totalStaff}
          subtitle={`${formatNumber(staffMetrics.teachingStaff)} teaching staff`}
          icon={HiOutlineUsers}
          trend={{ value: staffMetrics.staffAttendance, isPositive: true }}
          formatter={formatNumber}
        />

        <MetricCard
          title="Monthly Revenue"
          value={financialMetrics.monthlyRevenue}
          subtitle="Ghana Cedis"
          icon={HiOutlineCash}
          trend={{ value: 8, isPositive: true }}
          formatter={formatCurrency}
        />

        <MetricCard
          title="Fee Collection"
          value={financialMetrics.feeCollection}
          subtitle="Collection rate"
          icon={HiOutlineAcademicCap}
          trend={{ value: 5, isPositive: true }}
          formatter={formatPercentage}
        />
      </div>
    </section>
  );
}
