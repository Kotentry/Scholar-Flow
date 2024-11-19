import { Card, CardBody, Chip } from "@nextui-org/react";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { AcademicStudentStats } from '@/lib/types/academics';

interface StudentStatsProps {
  stats: AcademicStudentStats;
}

export default function StudentStats({ stats }: StudentStatsProps) {
  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students Card */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Total Students</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <PiStudent className="text-2xl" />
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="flex gap-2">
                <Chip size="sm" color="success">{stats.active} Active</Chip>
                <Chip size="sm" color="warning">{stats.inactive} Inactive</Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Active Students */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Active Students</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-success">{stats.active}</p>
              <Chip size="sm" color="success">
                {((stats.active / stats.total) * 100).toFixed(1)}%
              </Chip>
            </div>
          </CardBody>
        </Card>

        {/* Inactive Students */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Inactive Students</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-warning">{stats.inactive}</p>
              <Chip size="sm" color="warning">
                {((stats.inactive / stats.total) * 100).toFixed(1)}%
              </Chip>
            </div>
          </CardBody>
        </Card>

        {/* Graduated Students */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Graduated Students</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-primary">{stats.graduated}</p>
              <Chip size="sm" color="primary">
                {((stats.graduated / stats.total) * 100).toFixed(1)}%
              </Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Gender and Class Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gender Distribution Card */}
        <Card>
          <CardBody className="space-y-2">
            <p className="text-small text-default-500">Gender Distribution</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BsGenderMale className="text-blue-500 text-xl" />
                <div className="flex-1 flex items-center justify-between">
                  <span>Male</span>
                  <Chip size="sm" variant="flat" color="primary">
                    {stats.byGender.find(g => g.gender === 'male')?.count || 0}
                  </Chip>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BsGenderFemale className="text-pink-500 text-xl" />
                <div className="flex-1 flex items-center justify-between">
                  <span>Female</span>
                  <Chip size="sm" variant="flat" color="secondary">
                    {stats.byGender.find(g => g.gender === 'female')?.count || 0}
                  </Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Class Distribution Card */}
        <Card className="md:col-span-2">
          <CardBody className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-small text-default-500">Class Distribution</p>
              <div className="flex items-center gap-2">
                <HiOutlineAcademicCap className="text-xl" />
                <span className="text-small text-default-500">
                  {stats.byClass.length} Classes
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stats.byClass.map(({ class: className, count }) => (
                <div 
                  key={className}
                  className="flex items-center justify-between p-2 rounded-lg bg-default-100"
                >
                  <span className="font-medium">Class {className}</span>
                  <Chip size="sm" variant="flat">
                    {count}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
