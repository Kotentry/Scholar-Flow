export type EnrollmentStatus = "pending" | "active" | "withdrawn" | "graduated" | "suspended";
export type PaymentStatus = "pending" | "partial" | "paid" | "overdue" | "waived";

export interface Enrollment {
  id: string;
  applicationId: string;
  studentId: string;
  studentName: string;
  gradeLevel: string;
  academicYear: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  tuitionFee: number;
  paidAmount: number;
  dueDate: string;
  documents: {
    type: string;
    name: string;
    url: string;
  }[];
  guardian: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  medicalInfo?: {
    bloodGroup: string;
    allergies: string[];
    medications: string[];
    emergencyContact: string;
  };
  section?: string;
  rollNumber?: string;
  lastUpdated: string;
}

export interface EnrollmentFilters {
  search: string;
  status: Set<EnrollmentStatus>;
  paymentStatus: Set<PaymentStatus>;
  gradeLevel: Set<string>;
  academicYear: string;
}
