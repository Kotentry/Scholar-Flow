'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { ActivityLog } from "@/lib/types/dashboard";
import { format } from "date-fns";

interface ActivityListProps {
  activities: ActivityLog[];
}

const priorityColors = {
  low: "success",
  medium: "warning",
  high: "danger",
} as const;

const typeColors = {
  academic: "primary",
  administrative: "secondary",
  financial: "warning",
  general: "default",
} as const;

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Recent Activities</h4>
          <p className="text-sm text-default-500">Latest updates and activities</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col gap-2 p-4 rounded-lg bg-default-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h6 className="text-sm font-semibold">{activity.title}</h6>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={typeColors[activity.type]}
                      >
                        {activity.type}
                      </Chip>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={priorityColors[activity.priority]}
                      >
                        {activity.priority}
                      </Chip>
                    </div>
                    <p className="text-sm text-default-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-default-400">
                    {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
