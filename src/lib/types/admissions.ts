export type ApplicationStatus = 
  | 'pending'
  | 'under_review'
  | 'accepted'
  | 'rejected';

export type ApplicationPriority = 'low' | 'medium' | 'high';

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  verified: boolean;
}

export interface Guardian {
  name: string;
  relationship: string;
  occupation: string;
  contact: string;
  email: string;
}

export interface AcademicRecord {
  school: string;
  grade: string;
  year: string;
  percentage: number;
}

export interface Application {
  id: string;
  applicationNumber: string;
  appliedAt: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  gradeAppliedFor: string;
  academicYear: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
  guardianName: string;
  relationship: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianAddress: string;
  guardianOccupation: string;
  previousSchool: string;
  gradeLevel: string;
  achievements: string;
  activities: string;
  gpa: string;
  awards: string[];
  birthCertificate: string;
  academicRecords: string;
  medicalRecords: string;
  recommendationLetter: string;
  additionalDocuments: string[];
  joinReason: string;
  academicGoals: string;
  specialRequirements: string;
  interests: string;
  strengths: string;
  challenges: string;
  notes?: string;
  lastUpdated: string;
  assignedTo?: string;
  tags?: string[];
}

export interface ApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  interviewScheduled: number;
  accepted: number;
  rejected: number;
  waitlisted: number;
  todayApplications: number;
  thisWeekApplications: number;
}

export interface ApplicationFilters {
  search: string;
  status: Set<ApplicationStatus>;
  grades: Set<string>;
  dateRange: {
    start: string;
    end: string;
  };
}
