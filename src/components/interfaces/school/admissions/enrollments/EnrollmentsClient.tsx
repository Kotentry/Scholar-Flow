'use client';

import { useState } from "react";
import { Enrollment, EnrollmentFilters } from "@/lib/types/enrollments";
import EnrollmentStats from "./EnrollmentStats";
import EnrollmentList from "./EnrollmentList";
import EnrollmentFiltersComponent from "./EnrollmentFilters";

interface EnrollmentsClientProps {
  initialEnrollments: Enrollment[];
  stats: {
    total: number;
    active: number;
    pending: number;
    withdrawn: number;
    graduated: number;
    suspended: number;
    paymentPending: number;
    paymentOverdue: number;
    totalFees: number;
    totalPaid: number;
  };
}

export default function EnrollmentsClient({ initialEnrollments, stats }: EnrollmentsClientProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [filters, setFilters] = useState<EnrollmentFilters>({
    search: "",
    status: new Set(),
    paymentStatus: new Set(),
    gradeLevel: new Set(),
    academicYear: "2024-2025",
  });

  // Filter enrollments based on current filters
  const filteredEnrollments = enrollments.filter((enrollment) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchMatch = 
        enrollment.studentName.toLowerCase().includes(searchTerm) ||
        enrollment.studentId.toLowerCase().includes(searchTerm) ||
        enrollment.guardian.name.toLowerCase().includes(searchTerm) ||
        enrollment.guardian.email.toLowerCase().includes(searchTerm);
      if (!searchMatch) return false;
    }

    // Status filter
    if (filters.status.size > 0 && !filters.status.has(enrollment.status)) {
      return false;
    }

    // Payment status filter
    if (filters.paymentStatus.size > 0 && !filters.paymentStatus.has(enrollment.paymentStatus)) {
      return false;
    }

    // Grade level filter
    if (filters.gradeLevel.size > 0 && !filters.gradeLevel.has(enrollment.gradeLevel)) {
      return false;
    }

    // Academic year filter
    if (filters.academicYear && enrollment.academicYear !== filters.academicYear) {
      return false;
    }

    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Enrollments</h1>
      </div>

      {/* Stats Section */}
      <EnrollmentStats stats={stats} />

      {/* Filters Section */}
      <EnrollmentFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        gradeLevels={Array.from(new Set(enrollments.map(enr => enr.gradeLevel)))}
      />

      {/* Enrollment List */}
      <EnrollmentList enrollments={filteredEnrollments} />
    </div>
  );
}
