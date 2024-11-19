'use client';

import { Card } from "@nextui-org/react";
import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  icon: IconType;
  stats: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  distribution?: Array<{
    label: string;
    value: string | number;
    percentage?: number;
  }>;
}

export default function StatsCard({ title, icon: Icon, stats, distribution }: StatsCardProps) {
  return (
    <Card className="p-4 space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gray-100">
          <Icon className="text-xl text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-xl font-semibold ${stat.color || 'text-gray-900'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Distribution */}
      {distribution && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          {distribution.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              {item.percentage !== undefined && (
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
