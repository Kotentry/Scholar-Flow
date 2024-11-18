import { Interview } from "../types/interviews";
import { addDays, addHours, format } from "date-fns";

const interviewers = [
  "Dr. Sarah Johnson",
  "Prof. Michael Chen",
  "Mrs. Emily Parker",
  "Mr. David Wilson",
];

const locations = [
  "Room 101 - Academic Block",
  "Conference Room A",
  "Principal's Office",
  "Library Discussion Room",
];

export const mockInterviewData: Interview = {
  id: "INT-2024-0001",
  applicationId: "APP-2024-0001",
  studentName: "Alice Johnson",
  gradeLevel: "Grade 9",
  dateTime: addHours(new Date(), 48).toISOString(),
  duration: 45,
  status: "scheduled",
  interviewerName: "Dr. Sarah Johnson",
  notes: "Candidate shows strong interest in science and mathematics.",
  location: "Room 101 - Academic Block",
  isOnline: false,
  feedback: {
    academicPotential: 4,
    behavioralAssessment: 5,
    communicationSkills: 4,
    overallRating: 4,
    comments: "Strong candidate with excellent communication skills.",
  },
  documents: [
    "https://example.com/docs/transcript.pdf",
    "https://example.com/docs/recommendation.pdf",
  ],
};

export function generateMockInterviews(count: number): Interview[] {
  return Array(count).fill(null).map((_, index) => ({
    id: `INT-2024-${(index + 1).toString().padStart(4, '0')}`,
    applicationId: `APP-2024-${(index + 1).toString().padStart(4, '0')}`,
    studentName: `Student ${index + 1}`,
    gradeLevel: `Grade ${Math.floor(Math.random() * 4) + 9}`,
    dateTime: addDays(new Date(), Math.floor(Math.random() * 14)).toISOString(),
    duration: 45,
    status: ["scheduled", "completed", "cancelled", "no_show"][Math.floor(Math.random() * 4)] as Interview["status"],
    interviewerName: interviewers[Math.floor(Math.random() * interviewers.length)],
    notes: Math.random() > 0.5 ? "Sample interview notes for the candidate." : undefined,
    location: locations[Math.floor(Math.random() * locations.length)],
    isOnline: Math.random() > 0.7,
    meetingLink: Math.random() > 0.7 ? "https://meet.google.com/xyz-abcd-123" : undefined,
    feedback: Math.random() > 0.5 ? {
      academicPotential: Math.floor(Math.random() * 2) + 3,
      behavioralAssessment: Math.floor(Math.random() * 2) + 3,
      communicationSkills: Math.floor(Math.random() * 2) + 3,
      overallRating: Math.floor(Math.random() * 2) + 3,
      comments: "Sample feedback comments for the interview.",
    } : undefined,
    documents: Math.random() > 0.5 ? [
      "https://example.com/docs/transcript.pdf",
      "https://example.com/docs/recommendation.pdf",
    ] : undefined,
  }));
}
