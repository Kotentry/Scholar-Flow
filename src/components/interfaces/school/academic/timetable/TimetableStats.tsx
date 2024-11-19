'use client';

import StatsCard from "@/components/shared/StatsCard";
import { FaCalendarAlt, FaClock, FaChalkboardTeacher, FaChartBar } from "react-icons/fa";

interface TimetableStatsProps {
  stats: {
    totalClasses: number;
    totalSections: number;
    totalPeriods: number;
    averageDailyPeriods: number;
    byClass: Array<{ class: string; sections: number }>;
    bySubject: Array<{ subject: string; periods: number }>;
  };
}

export default function TimetableStats({ stats }: TimetableStatsProps) {
  // Calculate percentages for distributions
  const totalPeriodsBySubject = stats.bySubject.reduce((acc, curr) => acc + curr.periods, 0);
  const totalSectionsByClass = stats.byClass.reduce((acc, curr) => acc + curr.sections, 0);

  const subjectDist = stats.bySubject.map(item => ({
    label: item.subject,
    value: item.periods,
    percentage: (item.periods / totalPeriodsBySubject) * 100
  }));

  const classDist = stats.byClass.map(item => ({
    label: `Class ${item.class}`,
    value: `${item.sections} sections`,
    percentage: (item.sections / totalSectionsByClass) * 100
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Timetable Overview"
        icon={FaCalendarAlt}
        stats={[
          { label: "Total Classes", value: stats.totalClasses },
          { label: "Total Sections", value: stats.totalSections },
          { label: "Total Periods", value: stats.totalPeriods },
          { label: "Daily Periods", value: stats.averageDailyPeriods }
        ]}
      />

      <StatsCard
        title="Period Distribution"
        icon={FaClock}
        stats={[
          { label: "Weekly Load", value: `${stats.totalPeriods * 5} periods` },
          { label: "Daily Load", value: `${stats.averageDailyPeriods} periods` }
        ]}
        distribution={subjectDist.slice(0, 4)} // Show top 4 subjects
      />

      <StatsCard
        title="Class Distribution"
        icon={FaChalkboardTeacher}
        stats={[
          { label: "Classes", value: stats.totalClasses },
          { label: "Avg. Sections", value: (stats.totalSections / stats.totalClasses).toFixed(1) }
        ]}
        distribution={classDist}
      />

      <StatsCard
        title="Schedule Analysis"
        icon={FaChartBar}
        stats={[
          { 
            label: "Utilization", 
            value: `${((stats.totalPeriods / (stats.totalSections * stats.averageDailyPeriods)) * 100).toFixed(1)}%`,
            color: "text-blue-600"
          },
          { 
            label: "Section Load", 
            value: (stats.totalPeriods / stats.totalSections).toFixed(1) 
          }
        ]}
      />
    </div>
  );
}
