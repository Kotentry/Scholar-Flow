'use client';

import { Card, CardBody, Chip } from "@nextui-org/react";
import { HiOutlineAcademicCap, HiOutlineBookOpen } from "react-icons/hi";
import { PiChalkboardTeacher } from "react-icons/pi";

interface SubjectStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    byClass: Array<{ class: string; count: number }>;
    byTeacher: Array<{ teacher: string; count: number }>;
    averageCreditHours: number;
  };
}

export default function SubjectStats({ stats }: SubjectStatsProps) {
  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Subjects */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Total Subjects</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <HiOutlineBookOpen className="text-2xl" />
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="flex gap-2">
                <Chip size="sm" color="success">{stats.active} Active</Chip>
                <Chip size="sm" color="warning">{stats.inactive} Inactive</Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Active Subjects */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Active Subjects</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-success">{stats.active}</p>
              <Chip size="sm" color="success">
                {((stats.active / stats.total) * 100).toFixed(1)}%
              </Chip>
            </div>
          </CardBody>
        </Card>

        {/* Inactive Subjects */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Inactive Subjects</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-warning">{stats.inactive}</p>
              <Chip size="sm" color="warning">
                {((stats.inactive / stats.total) * 100).toFixed(1)}%
              </Chip>
            </div>
          </CardBody>
        </Card>

        {/* Average Credit Hours */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Avg. Credit Hours</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-primary">{stats.averageCreditHours}</p>
              <Chip size="sm" color="primary">Hours</Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Distribution */}
        <Card className="md:col-span-1">
          <CardBody className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-small text-default-500">Class Distribution</p>
              <HiOutlineAcademicCap className="text-xl" />
            </div>
            <div className="space-y-2">
              {stats.byClass.map(({ class: className, count }) => (
                <div 
                  key={className}
                  className="flex items-center justify-between p-2 rounded-lg bg-default-100"
                >
                  <span className="font-medium">Class {className}</span>
                  <Chip size="sm" variant="flat">{count}</Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Teacher Distribution */}
        <Card className="md:col-span-2">
          <CardBody className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-small text-default-500">Teacher Distribution</p>
              <div className="flex items-center gap-2">
                <PiChalkboardTeacher className="text-xl" />
                <span className="text-small text-default-500">
                  {stats.byTeacher.length} Teachers
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stats.byTeacher.map(({ teacher, count }) => (
                <div 
                  key={teacher}
                  className="flex items-center justify-between p-2 rounded-lg bg-default-100"
                >
                  <span className="font-medium truncate">{teacher}</span>
                  <Chip size="sm" variant="flat">{count}</Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
