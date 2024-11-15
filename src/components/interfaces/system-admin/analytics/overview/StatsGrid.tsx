'use client';

import { Card, CardBody } from '@nextui-org/react';
import { HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';
import { kpiStats } from '@/lib/data/analyticsData';

export default function StatsGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {kpiStats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        const TrendIcon = isPositive ? HiOutlineArrowUp : HiOutlineArrowDown;

        return (
          <Card
            key={stat.id}
            className="group"
          >
            <CardBody>
              <div className="flex items-start justify-between">
                {/* Icon */}
                <div className="p-2 rounded-lg bg-default-100">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Trend */}
                <div className={`flex items-center gap-1 text-small ${
                  isPositive ? 'text-success' : 'text-danger'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}%</span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-3 space-y-1">
                <h3 className="text-xl font-semibold">{stat.value}</h3>
                <p className="text-small text-default-500">{stat.title}</p>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
