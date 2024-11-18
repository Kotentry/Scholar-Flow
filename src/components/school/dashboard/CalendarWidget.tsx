'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { format } from "date-fns";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  type: 'class' | 'meeting' | 'event' | 'deadline';
}

const scheduleData: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 AM',
    title: 'Mathematics Class - Grade 10',
    type: 'class'
  },
  {
    id: '2',
    time: '11:30 AM',
    title: 'Staff Meeting',
    type: 'meeting'
  },
  {
    id: '3',
    time: '02:00 PM',
    title: 'Science Lab Session',
    type: 'class'
  },
  {
    id: '4',
    time: '04:00 PM',
    title: 'Assignment Submission Deadline',
    type: 'deadline'
  }
];

const typeColors = {
  class: "primary",
  meeting: "warning",
  event: "secondary",
  deadline: "danger",
} as const;

export default function CalendarWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <h4 className="text-lg font-semibold">Today's Schedule</h4>
            <span className="text-sm text-default-500">
              {format(new Date(), 'EEEE, MMMM d')}
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4">
            {scheduleData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-default-50"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold text-default-600">
                    {item.time}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h6 className="text-sm font-semibold">{item.title}</h6>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={typeColors[item.type]}
                    >
                      {item.type}
                    </Chip>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
