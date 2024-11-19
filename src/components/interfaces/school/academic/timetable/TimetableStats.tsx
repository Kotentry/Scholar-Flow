'use client';

import { Card } from "@nextui-org/react";
import { FaChalkboardTeacher, FaClock, FaUsers } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overview Stats */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FaUsers className="text-xl" />
          <h3 className="text-lg font-semibold">Classes & Sections</h3>
        </div>
        <div className="space-y-2">
          <p>Total Classes: {stats.totalClasses}</p>
          <p>Total Sections: {stats.totalSections}</p>
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FaClock className="text-xl" />
          <h3 className="text-lg font-semibold">Periods</h3>
        </div>
        <div className="space-y-2">
          <p>Total Periods: {stats.totalPeriods}</p>
          <p>Average Daily: {stats.averageDailyPeriods}</p>
        </div>
      </Card>

      {/* Distribution by Class */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FaChalkboardTeacher className="text-xl" />
          <h3 className="text-lg font-semibold">Class Distribution</h3>
        </div>
        <div className="space-y-1">
          {stats.byClass.map((item) => (
            <div key={item.class} className="flex justify-between">
              <span>Class {item.class}:</span>
              <span>{item.sections} sections</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Distribution by Subject */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <BsGrid className="text-xl" />
          <h3 className="text-lg font-semibold">Subject Distribution</h3>
        </div>
        <div className="space-y-1">
          {stats.bySubject.map((item) => (
            <div key={item.subject} className="flex justify-between">
              <span>{item.subject}:</span>
              <span>{item.periods} periods</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
