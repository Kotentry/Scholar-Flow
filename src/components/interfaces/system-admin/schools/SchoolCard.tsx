'use client';

import { motion } from "framer-motion";
import { Card, CardBody, Chip, Button } from "@nextui-org/react";
import {
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlineUser,
  HiOutlineBan,
  HiOutlineCheck,
} from "react-icons/hi";
import { School } from "@/lib/data/schoolsData";

interface SchoolCardProps {
  school: School;
  onView: (id: string) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "primary":
      return "primary";
    case "secondary":
      return "secondary";
    case "tertiary":
      return "warning";
    default:
      return "default";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "inactive":
      return "danger";
    case "suspended":
      return "danger";
    default:
      return "default";
  }
};

export default function SchoolCard({ school, onView }: SchoolCardProps) {
  const metrics = [
    {
      label: "Students",
      value: school.metrics.totalStudents,
      icon: HiOutlineUsers,
    },
    {
      label: "Teachers",
      value: school.metrics.totalTeachers,
      icon: HiOutlineAcademicCap,
    },
    {
      label: "Classrooms",
      value: school.metrics.classrooms,
      icon: HiOutlineOfficeBuilding,
    },
    {
      label: "Performance",
      value: school.metrics.performanceIndex + "%",
      icon: HiOutlineChartBar,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm hover:shadow-lg transition-shadow"
        shadow="sm"
      >
        <CardBody className="gap-4">
          <div className="flex flex-col gap-3">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                <div className="flex items-center gap-2 text-small text-default-500">
                  <HiOutlineOfficeBuilding className="w-4 h-4" />
                  <span>
                    {school.location.city}, {school.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-small text-default-500 mt-1">
                  <HiOutlineUser className="w-4 h-4" />
                  <span>Admin: {school.contact.adminName}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                  <Chip
                    size="sm"
                    color={getTypeColor(school.type)}
                    variant="flat"
                    classNames={{
                      base: "border-1 border-default-200",
                      content: "font-medium",
                    }}
                  >
                    {school.type}
                  </Chip>
                  <Chip
                    size="sm"
                    color={getStatusColor(school.status)}
                    variant="flat"
                    classNames={{
                      base: "border-1 border-default-200",
                      content: "font-medium",
                    }}
                  >
                    {school.status}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-default-100 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-default-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-small text-default-500">
                        {metric.label}
                      </p>
                      <p className="text-sm font-semibold">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-2 border-t border-default-100">
              <div className="text-small text-default-500">
                Last Active: {new Date(school.lastActive).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                  <Button
                    color={school.status === 'active' ? 'danger' : 'success'}
                    variant="flat"
                    startContent={
                      school.status === 'active' 
                        ? <HiOutlineBan className="w-4 h-4" />
                        : <HiOutlineCheck className="w-4 h-4" />
                    }
                  >
                    {school.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                <Button
                  color="primary"
                  variant="flat"
                  endContent={<HiOutlineArrowRight size={20} color="white" />}
                  onPress={() => onView(school.id)}
                  className="font-medium bg-black text-white hover:bg-black/80 transition-colors"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
