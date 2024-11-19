'use client';

import { Card, CardBody, Chip } from "@nextui-org/react";
import { TeacherStats as TeacherStatsType } from "@/lib/types/academics";

interface TeacherStatsProps {
  stats: TeacherStatsType;
}

export default function TeacherStats({ stats }: TeacherStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Teachers Card */}
      <Card>
        <CardBody className="space-y-2">
          <p className="text-small text-default-500">Total Teachers</p>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">{stats.total}</p>
            <div className="flex gap-2">
              <Chip size="sm" color="success">{stats.active} Active</Chip>
              <Chip size="sm" color="warning">{stats.inactive} Inactive</Chip>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Teacher Roles Card */}
      <Card>
        <CardBody className="space-y-2">
          <p className="text-small text-default-500">Teacher Roles</p>
          <div className="space-y-2">
            {stats.byRole.map(({ role, count }) => (
              <div key={role} className="flex items-center gap-2">
                <Chip
                  size="sm"
                  color={role === "class_teacher" ? "primary" : "secondary"}
                  className="min-w-[120px]"
                >
                  {role === "class_teacher" ? "Class Teacher" : "Subject Teacher"}
                </Chip>
                <span className="text-default-500">{count}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Subject Distribution Card */}
      <Card className="lg:col-span-2">
        <CardBody className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-small text-default-500">Subject Distribution</p>
            <p className="text-small text-default-500">
              {stats.averageSubjectsPerTeacher} subjects per teacher
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.bySubject.map(({ subject, count }) => (
              <Chip
                key={subject}
                size="sm"
                variant="flat"
                className="capitalize"
              >
                {subject} ({count})
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
