'use client';

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { UpcomingEvent } from "@/lib/types/dashboard";
import { format } from "date-fns";

interface EventListProps {
  events: UpcomingEvent[];
}

const eventTypeColors = {
  exam: "danger",
  event: "primary",
  holiday: "success",
  meeting: "warning",
} as const;

const eventTypeIcons = {
  exam: "📝",
  event: "🎉",
  holiday: "🌴",
  meeting: "👥",
} as const;

export default function EventList({ events }: EventListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Upcoming Events</h4>
          <p className="text-sm text-default-500">Schedule for the next few weeks</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-default-50"
              >
                <div className="text-2xl">
                  {eventTypeIcons[event.type]}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h6 className="text-sm font-semibold">{event.title}</h6>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={eventTypeColors[event.type]}
                    >
                      {event.type}
                    </Chip>
                  </div>
                  <p className="text-sm text-default-500">{event.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-default-100 px-2 py-1 rounded-full">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </span>
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
