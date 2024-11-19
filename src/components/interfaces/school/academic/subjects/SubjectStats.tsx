'use client';

import StatsCard from "@/components/shared/StatsCard";
import { FaBook, FaChalkboardTeacher, FaChartBar, FaUserGraduate } from "react-icons/fa";

interface SubjectStatsProps {
  stats: {
    totalSubjects: number;
    activeSubjects: number;
    inactiveSubjects: number;
    averageCreditHours: number;
    byClass: Array<{ class: string; count: number }>;
    byTeacher: Array<{ teacher: string; count: number }>;
  };
}

export default function SubjectStats({ stats }: SubjectStatsProps) {
  // Calculate percentages for distributions
  const totalByClass = stats.byClass.reduce((acc, curr) => acc + curr.count, 0);
  const totalByTeacher = stats.byTeacher.reduce((acc, curr) => acc + curr.count, 0);

  const classDist = stats.byClass.map(item => ({
    label: `Class ${item.class}`,
    value: item.count,
    percentage: (item.count / totalByClass) * 100
  }));

  const teacherDist = stats.byTeacher.map(item => ({
    label: item.teacher,
    value: item.count,
    percentage: (item.count / totalByTeacher) * 100
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Subject Overview"
        icon={FaBook}
        stats={[
          { label: "Total Subjects", value: stats.totalSubjects },
          { label: "Active", value: stats.activeSubjects, color: "text-green-600" },
          { label: "Inactive", value: stats.inactiveSubjects, color: "text-red-600" },
          { label: "Avg. Credit Hours", value: stats.averageCreditHours }
        ]}
      />

      <StatsCard
        title="Class Distribution"
        icon={FaUserGraduate}
        stats={[
          { label: "Total Classes", value: stats.byClass.length },
          { label: "Most Subjects", value: Math.max(...stats.byClass.map(c => c.count)) }
        ]}
        distribution={classDist}
      />

      <StatsCard
        title="Teacher Distribution"
        icon={FaChalkboardTeacher}
        stats={[
          { label: "Total Teachers", value: stats.byTeacher.length },
          { label: "Avg. Subjects", value: (totalByTeacher / stats.byTeacher.length).toFixed(1) }
        ]}
        distribution={teacherDist}
      />

      <StatsCard
        title="Subject Analysis"
        icon={FaChartBar}
        stats={[
          { 
            label: "Active Rate", 
            value: `${((stats.activeSubjects / stats.totalSubjects) * 100).toFixed(1)}%`,
            color: "text-green-600"
          },
          { 
            label: "Subjects per Class", 
            value: (totalByClass / stats.byClass.length).toFixed(1) 
          }
        ]}
      />
    </div>
  );
}
