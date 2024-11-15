'use client';

import { Card, CardBody, Progress, Chip } from '@nextui-org/react';
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from 'react-icons/hi';
import { formatNumber, formatPercentage, formatCurrency } from '@/lib/utils/formatters';

interface PerformanceCardProps {
  title: string;
  icon: React.ElementType;
  metrics: Record<string, number>;
  trend?: {
    current: number;
    previous: number;
  };
}

function PerformanceCard({ title, icon: Icon, metrics, trend }: PerformanceCardProps) {
  const trendValue = trend ? ((trend.current - trend.previous) / trend.previous) * 100 : 0;
  const isPositive = trendValue >= 0;

  return (
    <Card>
      <CardBody className="gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {trend && (
            <Chip
              color={isPositive ? 'success' : 'danger'}
              variant="flat"
              startContent={isPositive ? (
                <HiOutlineArrowUp className="w-4 h-4" />
              ) : (
                <HiOutlineArrowDown className="w-4 h-4" />
              )}
            >
              {formatPercentage(Math.abs(trendValue))}
            </Chip>
          )}
        </div>

        <div className="grid gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-small">
                <span className="text-default-500">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-medium">{formatPercentage(value)}</span>
              </div>
              <Progress
                value={value}
                color={value >= 90 ? 'success' : value >= 70 ? 'primary' : 'warning'}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

interface PerformanceSectionProps {
  metrics: {
    academicPerformance: {
      currentScore: number;
      previousScore: number;
      details: Record<string, number>;
    };
    studentMetrics: {
      totalStudents: number;
      graduationRate: number;
      dropoutRate: number;
      genderDistribution: {
        male: number;
        female: number;
      };
    };
    staffMetrics: {
      totalStaff: number;
      teachingStaff: number;
      staffAttendance: number;
      qualifiedTeachers: number;
    };
    financialMetrics: {
      feeCollection: number;
      outstandingDues: number;
      monthlyRevenue: number;
      monthlyExpenses: number;
      yearlyBudget: number;
    };
  };
}

export default function PerformanceSection({ metrics }: PerformanceSectionProps) {
  // Calculate staff performance metrics
  const staffPerformanceMetrics = {
    staffAttendance: metrics.staffMetrics.staffAttendance,
    qualifiedTeachers: (metrics.staffMetrics.qualifiedTeachers / metrics.staffMetrics.teachingStaff) * 100,
  };

  // Calculate student performance metrics
  const studentPerformanceMetrics = {
    graduationRate: metrics.studentMetrics.graduationRate,
    retentionRate: 100 - metrics.studentMetrics.dropoutRate,
    genderBalance: (metrics.studentMetrics.genderDistribution.female / 
      (metrics.studentMetrics.genderDistribution.male + metrics.studentMetrics.genderDistribution.female)) * 100,
  };

  // Calculate financial performance metrics
  const financialPerformanceMetrics = {
    feeCollection: formatCurrency(metrics.financialMetrics.feeCollection),
    profitMargin: ((metrics.financialMetrics.monthlyRevenue - metrics.financialMetrics.monthlyExpenses) / 
      metrics.financialMetrics.monthlyRevenue) * 100,
    budgetUtilization: (metrics.financialMetrics.monthlyExpenses / 
      (metrics.financialMetrics.yearlyBudget / 12)) * 100,
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <p className="text-default-500">
          Detailed performance analysis across different areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PerformanceCard
          title="Academic Performance"
          icon={HiOutlineAcademicCap}
          metrics={metrics.academicPerformance.details}
          trend={{
            current: metrics.academicPerformance.currentScore,
            previous: metrics.academicPerformance.previousScore,
          }}
        />

        <PerformanceCard
          title="Staff Performance"
          icon={HiOutlineUsers}
          metrics={staffPerformanceMetrics}
        />

        <PerformanceCard
          title="Student Metrics"
          icon={HiOutlineUserGroup}
          metrics={studentPerformanceMetrics}
        />

        <PerformanceCard
          title="Financial Performance"
          icon={HiOutlineCash}
          metrics={financialPerformanceMetrics}
        />
      </div>
    </section>
  );
}
