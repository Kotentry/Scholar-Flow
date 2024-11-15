'use client';

import { Card, CardBody, Avatar, Chip } from '@nextui-org/react';
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCash,
  HiOutlineChatAlt,
  HiOutlineUsers,
} from 'react-icons/hi';

const activityIcons: Record<string, React.ElementType> = {
  academic: HiOutlineAcademicCap,
  attendance: HiOutlineUserGroup,
  financial: HiOutlineCash,
  communication: HiOutlineChatAlt,
  hr: HiOutlineUsers,
};

const activityColors: Record<string, "primary" | "success" | "warning" | "secondary" | "default"> = {
  academic: 'primary',
  attendance: 'success',
  financial: 'warning',
  communication: 'secondary',
  hr: 'default',
};

interface Activity {
  id: number;
  type: string;
  action: string;
  description: string;
  timestamp: string;
  user: string;
}

interface ActivitySectionProps {
  activities: Activity[];
}

function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}d ago`;
  }
}

export default function ActivitySection({ activities }: ActivitySectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <p className="text-default-500">
          Latest actions and updates across modules
        </p>
      </div>

      <Card>
        <CardBody className="gap-6">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type] || HiOutlineAcademicCap;
            const color = activityColors[activity.type] || 'default';

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-6 border-b border-divider last:pb-0 last:border-none"
              >
                <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h4 className="font-medium truncate">
                        {activity.action}
                      </h4>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={color}
                      >
                        {activity.type}
                      </Chip>
                    </div>
                    <span className="text-small text-default-500 whitespace-nowrap">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>

                  <p className="text-small text-default-500 mt-1">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Avatar
                      name={activity.user}
                      size="sm"
                      className="w-6 h-6"
                    />
                    <span className="text-small">
                      {activity.user}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </section>
  );
}
