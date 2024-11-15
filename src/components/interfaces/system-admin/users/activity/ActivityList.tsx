'use client';

import {
  Card,
  CardBody,
  Avatar,
  Chip,
} from '@nextui-org/react';
import { activityLogs, activityTypes } from '@/lib/data/userManagementData';
import type { ActivityLog } from '@/lib/data/userManagementData';

const statusColorMap = {
  success: 'success',
  failed: 'danger',
  warning: 'warning',
};

export default function ActivityList() {
  const renderActivityIcon = (type: ActivityLog['type']) => {
    const Icon = activityTypes[type].icon;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {activityLogs.map((log) => (
        <Card
          key={log.id}
          className="group"
        >
          <CardBody>
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <Avatar
                src={log.userAvatar}
                name={log.userName}
                size="sm"
              />

              {/* Activity Details */}
              <div className="flex-grow space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{log.userName}</span>
                  <Chip
                    variant="flat"
                    size="sm"
                    startContent={renderActivityIcon(log.type)}
                    className="capitalize"
                  >
                    {log.type}
                  </Chip>
                  <Chip
                    color={statusColorMap[log.status]}
                    size="sm"
                    variant="flat"
                    className="capitalize"
                  >
                    {log.status}
                  </Chip>
                </div>
                <p className="text-default-500">
                  {log.action}
                </p>
                <p className="text-small text-default-400">
                  {log.details}
                </p>
              </div>

              {/* Timestamp & IP */}
              <div className="text-right text-small text-default-400">
                <p>{new Date(log.timestamp).toLocaleString()}</p>
                <p>IP: {log.ipAddress}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
