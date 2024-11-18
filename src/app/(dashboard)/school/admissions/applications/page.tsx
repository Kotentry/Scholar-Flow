import { Suspense } from "react";
import { mockApplicationData } from "@/lib/data/mockApplicationData";
import ApplicationsClient from "@/components/interfaces/school/admissions/applications/ApplicationsClient";
import { Application } from "@/lib/types/admissions";

// Convert mockApplicationData to Application type
const mockApplications: Application[] = Array(10).fill(null).map((_, index) => ({
  id: `app-${index + 1}`,
  applicationNumber: `APP-${2024}-${(index + 1).toString().padStart(4, '0')}`,
  status: index === 0 ? "pending" : index === 1 ? "under_review" : index === 2 ? "accepted" : "rejected",
  priority: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
  appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  gradeAppliedFor: mockApplicationData.gradeLevel,
  academicYear: "2024-2025",
  lastUpdated: new Date().toISOString(),
  ...mockApplicationData,
}));

// Mock stats with default values of 0
const mockStats = {
  total: mockApplications.length || 0,
  pending: mockApplications.filter(app => app.status === "pending").length || 0,
  under_review: mockApplications.filter(app => app.status === "under_review").length || 0,
  accepted: mockApplications.filter(app => app.status === "accepted").length || 0,
  rejected: mockApplications.filter(app => app.status === "rejected").length || 0,
  todayApplications: mockApplications.filter(app => {
    const today = new Date();
    const appDate = new Date(app.appliedAt);
    return appDate.toDateString() === today.toDateString();
  }).length || 0,
  thisWeekApplications: mockApplications.filter(app => {
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    const appDate = new Date(app.appliedAt);
    return appDate >= weekAgo;
  }).length || 0,
};

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationsClient 
        initialApplications={mockApplications}
        stats={mockStats}
      />
    </Suspense>
  );
}
