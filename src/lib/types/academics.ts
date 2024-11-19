export type ClassStatus = 'active' | 'inactive' | 'archived';
export type SubjectType = 'core' | 'elective' | 'extra_curricular';
export type TeacherRole = 'class_teacher' | 'subject_teacher';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  role: TeacherRole;
  joinedAt: string;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: SubjectType;
  description?: string;
  credits?: number;
  hoursPerWeek: number;
  teacher?: Teacher;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email?: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  address?: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  section: string; // section ID
  admissionDate: string;
  status: 'active' | 'inactive' | 'transferred' | 'graduated';
}

export interface ClassSection {
  id: string;
  name: string; // e.g., 'A', 'B', 'C'
  capacity: number;
  currentStrength: number;
  classTeacher?: Teacher;
  students: Student[];
}

export interface Class {
  id: string;
  name: string; // e.g., 'Grade 1', 'Grade 2'
  academicYear: string;
  sections: ClassSection[];
  subjects: Subject[];
  status: ClassStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ClassFilters {
  search: string;
  status: Set<ClassStatus>;
  academicYear: Set<string>;
}

export interface ClassStats {
  total: number;
  active: number;
  inactive: number;
  archived: number;
  totalStudents: number;
  totalSections: number;
  averageClassSize: number;
  academicYearDistribution: {
    year: string;
    count: number;
  }[];
}

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
  byRole: {
    role: TeacherRole;
    count: number;
  }[];
  bySubject: {
    subject: string;
    count: number;
  }[];
  averageSubjectsPerTeacher: number;
}

export interface TeacherFilters {
  search: string;
  status: Set<'active' | 'inactive'>;
  role: Set<TeacherRole>;
  subjects: Set<string>;
}

export interface TimeSlot {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  subject: Subject;
  teacher: Teacher;
  section: string; // section ID
}

export interface ClassTimetable {
  classId: string;
  slots: TimeSlot[];
}

export interface AcademicStudentStats {
  total: number;
  active: number;
  inactive: number;
  transferred: number;
  graduated: number;
  byGender: {
    gender: 'male' | 'female' | 'other';
    count: number;
  }[];
  byClass: {
    class: string;
    count: number;
  }[];
  averageAttendance: number;
}

export interface AcademicStudentFilters {
  search: string;
  status: Set<'active' | 'inactive' | 'transferred' | 'graduated'>;
  class: Set<string>;
  section: Set<string>;
  gender: Set<'male' | 'female' | 'other'>;
}

export interface AcademicPerformance {
  studentId: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  remarks?: string;
  examDate: string;
  examType: 'quiz' | 'assignment' | 'test' | 'midterm' | 'final';
}

export interface AcademicAttendance {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  remarks?: string;
}

export interface AcademicStudent extends Student {
  performances: AcademicPerformance[];
  attendance: AcademicAttendance[];
  currentClass: string;
  currentSection: string;
  rollNumber: string;
  averageAttendance: number;
  averageGrade: string;
}
