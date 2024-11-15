'use client';

import { motion } from "framer-motion";
import { Divider } from "@nextui-org/react";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineClipboardCheck,
} from "react-icons/hi";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import SchoolChart from "@/components/dashboard/SchoolChart";
import QuickActions from "@/components/dashboard/QuickActions";
import {
  schoolStats,
  performanceMetrics,
  recentActivities,
  quickActions,
  enrollmentTrends,
  schoolDistribution,
} from "@/lib/data/dashboardData";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Schools",
      value: schoolStats.totalSchools,
      icon: HiOutlineOfficeBuilding,
      trend: {
        value: schoolStats.growthRate,
        isPositive: true,
      },
    },
    {
      title: "Active Schools",
      value: schoolStats.activeSchools,
      icon: HiOutlineUserGroup,
      trend: {
        value: 5.2,
        isPositive: true,
      },
    },
    {
      title: "Average Attendance",
      value: performanceMetrics.averageAttendance + "%",
      icon: HiOutlineClipboardCheck,
      trend: {
        value: 2.1,
        isPositive: true,
      },
    },
    {
      title: "Teacher Retention",
      value: performanceMetrics.teacherRetention + "%",
      icon: HiOutlineAcademicCap,
      trend: {
        value: 1.5,
        isPositive: true,
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-1"
    >
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Welcome Back, Admin
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-default-500"
        >
          Here's what's happening with your schools today.
        </motion.p>
      </div>

      <Divider className="my-4" />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SchoolChart
          title="Enrollment Trends"
          subtitle="Monthly student enrollment numbers"
          data={enrollmentTrends.monthly}
          type="area"
          color="#006FEE"
        />
        <SchoolChart
          title="School Distribution"
          subtitle="Schools by type"
          data={schoolDistribution.byType}
          type="bar"
          color="#17C964"
        />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 gap-6">
        <ActivityFeed activities={recentActivities} />
      </div>
    </motion.div>
  );
}
