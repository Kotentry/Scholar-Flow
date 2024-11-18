'use client';

import { useState } from "react";
import ApplicationStats from "./ApplicationStats";
import ApplicationFilters from "./ApplicationFilters";
import ApplicationList from "./ApplicationList";
import { Application, ApplicationFilters as IApplicationFilters } from "@/lib/types/admissions";

interface ApplicationsClientProps {
  initialApplications: Application[];
  stats: any; // Replace with proper stats type
}

export default function ApplicationsClient({ initialApplications, stats }: ApplicationsClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const handleFilterChange = (filters: IApplicationFilters) => {
    // Filter the applications based on the filters
    let filtered = [...initialApplications];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(app => 
        app.firstName.toLowerCase().includes(searchLower) ||
        app.lastName.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower) ||
        app.phone.includes(filters.search)
      );
    }

    // Status filter
    if (filters.status.size > 0) {
      filtered = filtered.filter(app => filters.status.has(app.status));
    }

    // Grade filter
    if (filters.grades.size > 0) {
      filtered = filtered.filter(app => filters.grades.has(app.gradeLevel));
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(app => {
        const appDate = new Date(app.appliedAt);
        const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        if (start && end) {
          return appDate >= start && appDate <= end;
        } else if (start) {
          return appDate >= start;
        } else if (end) {
          return appDate <= end;
        }
        return true;
      });
    }

    setApplications(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admission Applications</h1>
      </div>

      {/* Stats Section */}
      <ApplicationStats stats={stats} />

      {/* Filters Section */}
      <ApplicationFilters onFilterChange={handleFilterChange} />

      {/* Applications List */}
      <ApplicationList applications={applications} />
    </div>
  );
}
