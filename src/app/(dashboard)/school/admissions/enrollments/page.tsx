import { Suspense } from "react";
import { generateMockEnrollments } from "@/lib/data/mockEnrollmentData";
import EnrollmentsClient from "@/components/interfaces/school/admissions/enrollments/EnrollmentsClient";
import { Enrollment } from "@/lib/types/enrollments";

// Generate mock enrollments
const mockEnrollments: Enrollment[] = generateMockEnrollments(10);

// Mock stats
const mockStats = {
  total: mockEnrollments.length || 0,
  active: mockEnrollments.filter(enr => enr.status === "active").length || 0,
  pending: mockEnrollments.filter(enr => enr.status === "pending").length || 0,
  withdrawn: mockEnrollments.filter(enr => enr.status === "withdrawn").length || 0,
  graduated: mockEnrollments.filter(enr => enr.status === "graduated").length || 0,
  suspended: mockEnrollments.filter(enr => enr.status === "suspended").length || 0,
  paymentPending: mockEnrollments.filter(enr => enr.paymentStatus === "pending").length || 0,
  paymentOverdue: mockEnrollments.filter(enr => enr.paymentStatus === "overdue").length || 0,
  totalFees: mockEnrollments.reduce((sum, enr) => sum + enr.tuitionFee, 0),
  totalPaid: mockEnrollments.reduce((sum, enr) => sum + enr.paidAmount, 0),
};

export default function EnrollmentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnrollmentsClient 
        initialEnrollments={mockEnrollments}
        stats={mockStats}
      />
    </Suspense>
  );
}
