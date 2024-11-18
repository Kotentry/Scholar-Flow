import { Suspense } from "react";
import StatsCard from "@/components/school/dashboard/StatsCard";
import AttendanceChart from "@/components/school/dashboard/AttendanceChart";
import PerformanceChart from "@/components/school/dashboard/PerformanceChart";
import RevenueChart from "@/components/school/dashboard/RevenueChart";
import ActivityList from "@/components/school/dashboard/ActivityList";
import EventList from "@/components/school/dashboard/EventList";
import CalendarWidget from "@/components/school/dashboard/CalendarWidget";
import { schoolDashboardData } from "@/lib/data/school-dashboard";

export default function SchoolDashboard() {
  const { stats, attendanceData, performanceData, revenueData, recentActivities, upcomingEvents } = schoolDashboardData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">School Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon="users"
            delay={0.1}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Staff Attendance Today"
            value="85%"
            icon="attendance"
            trend={0.5}
            delay={0.2}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Student Attendance"
            value="92%"
            icon="attendance"
            trend={1.2}
            delay={0.3}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Upcoming Events"
            value="8"
            icon="events"
            delay={0.4}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Pending Applications"
            value="12"
            icon="applications"
            trend={2.5}
            delay={0.5}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Recent Fee Collections"
            value="$25.4K"
            icon="revenue"
            trend={3.8}
            delay={0.6}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="Due Tasks"
            value="5"
            icon="tasks"
            trend={-2}
            delay={0.7}
          />
        </Suspense>
        <Suspense fallback={<div className="h-24 bg-default-100 animate-pulse rounded-lg" />}>
          <StatsCard
            title="System Alerts"
            value="3"
            icon="alerts"
            delay={0.8}
          />
        </Suspense>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart */}
          <Suspense fallback={<div className="h-[400px] bg-default-100 animate-pulse rounded-lg" />}>
            <AttendanceChart data={attendanceData} />
          </Suspense>
          
          {/* Performance Chart */}
          <Suspense fallback={<div className="h-[400px] bg-default-100 animate-pulse rounded-lg" />}>
            <PerformanceChart data={performanceData} />
          </Suspense>
          
          {/* Revenue Chart */}
          <div className="lg:sticky lg:top-6">
            <Suspense fallback={<div className="h-[400px] bg-default-100 animate-pulse rounded-lg" />}>
              <RevenueChart data={revenueData} />
            </Suspense>
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <Suspense fallback={<div className="h-[400px] bg-default-100 animate-pulse rounded-lg" />}>
            <CalendarWidget />
          </Suspense>
          
          {/* Recent Activities */}
          <Suspense fallback={<div className="h-[500px] bg-default-100 animate-pulse rounded-lg" />}>
            <ActivityList activities={recentActivities} />
          </Suspense>
          
          {/* Upcoming Events */}
          <Suspense fallback={<div className="h-[500px] bg-default-100 animate-pulse rounded-lg" />}>
            <EventList events={upcomingEvents} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
