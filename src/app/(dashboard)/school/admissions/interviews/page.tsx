import { Suspense } from "react";
import { generateMockInterviews } from "@/lib/data/mockInterviewData";
import InterviewsClient from "@/components/interfaces/school/admissions/interviews/InterviewsClient";
import { Interview } from "@/lib/types/interviews";

// Generate mock interviews
const mockInterviews: Interview[] = generateMockInterviews(10);

// Mock stats
const mockStats = {
  total: mockInterviews.length || 0,
  scheduled: mockInterviews.filter(int => int.status === "scheduled").length || 0,
  completed: mockInterviews.filter(int => int.status === "completed").length || 0,
  cancelled: mockInterviews.filter(int => int.status === "cancelled").length || 0,
  no_show: mockInterviews.filter(int => int.status === "no_show").length || 0,
  todayInterviews: mockInterviews.filter(int => {
    const today = new Date();
    const intDate = new Date(int.dateTime);
    return intDate.toDateString() === today.toDateString();
  }).length || 0,
  upcomingInterviews: mockInterviews.filter(int => {
    const now = new Date();
    const intDate = new Date(int.dateTime);
    return intDate > now;
  }).length || 0,
};

export default function InterviewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewsClient 
        initialInterviews={mockInterviews}
        stats={mockStats}
      />
    </Suspense>
  );
}
