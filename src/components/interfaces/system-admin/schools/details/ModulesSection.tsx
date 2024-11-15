'use client';

import { useState } from 'react';
import { Card, CardBody, Progress, Button } from '@nextui-org/react';
import {
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineRefresh,
  HiOutlineCog,
} from 'react-icons/hi';
import { moduleConfig } from '@/lib/schemas/school-registration';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';
import ModuleManagementModal from './ModuleManagementModal';

interface ModuleCardProps {
  name: string;
  usagePercentage: number;
  activeUsers: number;
  lastSync: string;
  metrics: Record<string, number>;
}

function ModuleCard({ name, usagePercentage, activeUsers, lastSync, metrics }: ModuleCardProps) {
  const lastSyncDate = new Date(lastSync);
  const timeAgo = Math.round((Date.now() - lastSyncDate.getTime()) / 1000 / 60);

  return (
    <Card>
      <CardBody className="gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineCube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-small text-default-500">
                Last sync: {timeAgo} minutes ago
              </p>
            </div>
          </div>
          <Button
            isIconOnly
            variant="light"
            aria-label="Sync module"
          >
            <HiOutlineRefresh className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Progress
              value={usagePercentage}
              color={usagePercentage >= 90 ? 'success' : 'primary'}
              className="w-full h-2"
            />
            <span className="text-small font-medium whitespace-nowrap">
              {formatPercentage(usagePercentage)}
            </span>
          </div>

          <div className="flex items-center gap-6 text-small text-default-500">
            <div className="flex items-center gap-1">
              <HiOutlineUsers className="w-4 h-4" />
              <span>{formatNumber(activeUsers)} active users</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineClock className="w-4 h-4" />
              <span>Updated {timeAgo}m ago</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
          {Object.entries(metrics).map(([key, value]) => (
            <div
              key={key}
              className="p-2 rounded-lg bg-default-50"
            >
              <p className="text-xl font-semibold">{formatNumber(value)}</p>
              <p className="text-tiny text-default-500">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

interface ModulesSectionProps {
  selectedModules: string[];
  usageStats: Record<string, {
    name: string;
    usagePercentage: number;
    activeUsers: number;
    lastSync: string;
    metrics: Record<string, number>;
  }>;
}

export default function ModulesSection({
  selectedModules,
  usageStats,
}: ModulesSectionProps) {
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);
  const [localSelectedModules, setLocalSelectedModules] = useState(selectedModules);

  // Get active modules with their usage stats
  const activeModules = localSelectedModules
    .filter(moduleId => usageStats[moduleId])
    .map(moduleId => ({
      id: moduleId,
      ...usageStats[moduleId],
    }));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Active Modules</h2>
          <p className="text-default-500">
            Module usage statistics and performance
          </p>
        </div>
        <Button
          color="primary"
          variant="flat"
          className="font-medium bg-black text-white"
          startContent={<HiOutlineCog className="w-4 h-4" />}
          onPress={() => setIsManagementModalOpen(true)}
        >
          Manage Modules
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeModules.map((module) => (
          <ModuleCard
            key={module.id}
            name={module.name}
            usagePercentage={module.usagePercentage}
            activeUsers={module.activeUsers}
            lastSync={module.lastSync}
            metrics={module.metrics}
          />
        ))}
      </div>

      <ModuleManagementModal
        isOpen={isManagementModalOpen}
        onClose={() => setIsManagementModalOpen(false)}
        selectedModules={localSelectedModules}
        onModulesChange={setLocalSelectedModules}
      />
    </section>
  );
}
