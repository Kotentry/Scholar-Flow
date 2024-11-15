'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import {
  HiOutlineAcademicCap,
  HiOutlineCog,
  HiOutlineExclamation,
  HiOutlineUserGroup,
} from "react-icons/hi";

interface Activity {
  id: number;
  type: string;
  school: string;
  action: string;
  status: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    default:
      return "default";
  }
};

const getActivityIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "registration":
      return HiOutlineAcademicCap;
    case "system":
      return HiOutlineCog;
    case "user":
      return HiOutlineUserGroup;
    case "alert":
      return HiOutlineExclamation;
    default:
      return HiOutlineCog;
  }
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm">
      <CardHeader className="flex flex-col items-start px-6 py-5">
        <h4 className="text-lg font-semibold">Recent Activity</h4>
        <p className="text-small text-default-500">Latest system activities</p>
      </CardHeader>
      <CardBody className="gap-4 px-6">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 rounded-full bg-default-100">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <Chip
                    size="sm"
                    color={getStatusColor(activity.status) as any}
                    variant="flat"
                  >
                    {activity.status}
                  </Chip>
                </div>
                <p className="text-xs text-default-500">{activity.school}</p>
                <p className="text-xs text-default-400">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
}
