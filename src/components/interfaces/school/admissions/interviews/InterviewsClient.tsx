'use client';

import { useState } from "react";
import { Interview, InterviewFilters } from "@/lib/types/interviews";
import InterviewStats from "./InterviewStats";
import InterviewList from "./InterviewList";
import InterviewFiltersComponent from "./InterviewFilters";

interface InterviewsClientProps {
  initialInterviews: Interview[];
  stats: {
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    no_show: number;
    todayInterviews: number;
    upcomingInterviews: number;
  };
}

export default function InterviewsClient({ initialInterviews, stats }: InterviewsClientProps) {
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [filters, setFilters] = useState<InterviewFilters>({
    search: "",
    status: new Set(),
    dateRange: {
      start: "",
      end: "",
    },
    interviewer: new Set(),
  });

  // Filter interviews based on current filters
  const filteredInterviews = interviews.filter((interview) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchMatch = 
        interview.studentName.toLowerCase().includes(searchTerm) ||
        interview.interviewerName.toLowerCase().includes(searchTerm) ||
        interview.location.toLowerCase().includes(searchTerm);
      if (!searchMatch) return false;
    }

    // Status filter
    if (filters.status.size > 0 && !filters.status.has(interview.status)) {
      return false;
    }

    // Interviewer filter
    if (filters.interviewer.size > 0 && !filters.interviewer.has(interview.interviewerName)) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const interviewDate = new Date(interview.dateTime);
      if (filters.dateRange.start && new Date(filters.dateRange.start) > interviewDate) {
        return false;
      }
      if (filters.dateRange.end && new Date(filters.dateRange.end) < interviewDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interview Schedule</h1>
      </div>

      {/* Stats Section */}
      <InterviewStats stats={stats} />

      {/* Filters Section */}
      <InterviewFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        interviewers={Array.from(new Set(interviews.map(int => int.interviewerName)))}
      />

      {/* Interview List */}
      <InterviewList interviews={filteredInterviews} />
    </div>
  );
}
