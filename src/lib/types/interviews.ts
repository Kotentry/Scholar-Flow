export type InterviewStatus = "scheduled" | "completed" | "cancelled" | "no_show";

export interface Interview {
  id: string;
  applicationId: string;
  studentName: string;
  gradeLevel: string;
  dateTime: string;
  duration: number; // in minutes
  status: InterviewStatus;
  interviewerName: string;
  notes?: string;
  feedback?: {
    academicPotential: number;
    behavioralAssessment: number;
    communicationSkills: number;
    overallRating: number;
    comments: string;
  };
  documents?: string[];
  location: string;
  meetingLink?: string;
  isOnline: boolean;
}

export interface InterviewFilters {
  search: string;
  status: Set<InterviewStatus>;
  dateRange: {
    start: string;
    end: string;
  };
  interviewer: Set<string>;
}
