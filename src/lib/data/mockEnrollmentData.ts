import { Enrollment } from "../types/enrollments";
import { addDays, subDays } from "date-fns";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const allergies = ["Peanuts", "Dairy", "Dust", "Pollen", "None"];
const medications = ["Insulin", "Inhaler", "None"];

export const mockEnrollmentData: Enrollment = {
  id: "ENR-2024-0001",
  applicationId: "APP-2024-0001",
  studentId: "STU-2024-0001",
  studentName: "Alice Johnson",
  gradeLevel: "Grade 9",
  academicYear: "2024-2025",
  enrollmentDate: new Date().toISOString(),
  status: "active",
  paymentStatus: "paid",
  tuitionFee: 50000,
  paidAmount: 50000,
  dueDate: addDays(new Date(), 30).toISOString(),
  documents: [
    {
      type: "birth_certificate",
      name: "Birth Certificate",
      url: "https://example.com/docs/birth_certificate.pdf",
    },
    {
      type: "medical_records",
      name: "Medical Records",
      url: "https://example.com/docs/medical_records.pdf",
    },
  ],
  guardian: {
    name: "Robert Johnson",
    relationship: "Father",
    phone: "+1234567890",
    email: "robert@example.com",
  },
  medicalInfo: {
    bloodGroup: "O+",
    allergies: ["None"],
    medications: ["None"],
    emergencyContact: "+1234567890",
  },
  section: "A",
  rollNumber: "24001",
  lastUpdated: new Date().toISOString(),
};

export function generateMockEnrollments(count: number): Enrollment[] {
  return Array(count).fill(null).map((_, index) => ({
    id: `ENR-2024-${(index + 1).toString().padStart(4, '0')}`,
    applicationId: `APP-2024-${(index + 1).toString().padStart(4, '0')}`,
    studentId: `STU-2024-${(index + 1).toString().padStart(4, '0')}`,
    studentName: `Student ${index + 1}`,
    gradeLevel: `Grade ${Math.floor(Math.random() * 4) + 9}`,
    academicYear: "2024-2025",
    enrollmentDate: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
    status: ["pending", "active", "withdrawn", "graduated", "suspended"][Math.floor(Math.random() * 5)] as Enrollment["status"],
    paymentStatus: ["pending", "partial", "paid", "overdue", "waived"][Math.floor(Math.random() * 5)] as Enrollment["paymentStatus"],
    tuitionFee: 50000,
    paidAmount: Math.floor(Math.random() * 50000),
    dueDate: addDays(new Date(), Math.floor(Math.random() * 60)).toISOString(),
    documents: [
      {
        type: "birth_certificate",
        name: "Birth Certificate",
        url: "https://example.com/docs/birth_certificate.pdf",
      },
      {
        type: "medical_records",
        name: "Medical Records",
        url: "https://example.com/docs/medical_records.pdf",
      },
    ],
    guardian: {
      name: `Parent ${index + 1}`,
      relationship: Math.random() > 0.5 ? "Father" : "Mother",
      phone: "+1234567890",
      email: `parent${index + 1}@example.com`,
    },
    medicalInfo: {
      bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      allergies: [allergies[Math.floor(Math.random() * allergies.length)]],
      medications: [medications[Math.floor(Math.random() * medications.length)]],
      emergencyContact: "+1234567890",
    },
    section: ["A", "B", "C"][Math.floor(Math.random() * 3)],
    rollNumber: `24${(index + 1).toString().padStart(3, '0')}`,
    lastUpdated: new Date().toISOString(),
  }));
}
