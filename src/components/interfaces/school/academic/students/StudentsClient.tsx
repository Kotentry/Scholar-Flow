'use client';

import { useState, useMemo } from 'react';
import { AcademicStudent, AcademicStudentFilters, AcademicStudentStats } from '@/lib/types/academics';
import StudentStats from './StudentStats';
import StudentFilters from './StudentFilters';
import StudentList from './StudentList';
import StudentDetail from './StudentDetail';
import CreateStudentForm from './CreateStudentForm';
import { Card, Button } from '@nextui-org/react';

// Mock data for academic students
const mockStudents: AcademicStudent[] = [
  {
    id: '1',
    name: 'John Doe',
    rollNumber: 'STU001',
    email: 'john.doe@example.com',
    phone: '1234567890',
    gender: 'male',
    dateOfBirth: '2005-05-15',
    guardianName: 'Jane Doe',
    guardianPhone: '9876543210',
    section: 'A',
    admissionDate: '2020-06-01',
    status: 'active',
    currentClass: '10',
    currentSection: 'A',
    averageAttendance: 92.5,
    averageGrade: 'A',
    performances: [
      {
        studentId: '1',
        subject: 'Mathematics',
        marks: 85,
        totalMarks: 100,
        grade: 'A',
        examDate: '2023-12-01',
        examType: 'midterm'
      },
      {
        studentId: '1',
        subject: 'Science',
        marks: 78,
        totalMarks: 100,
        grade: 'B+',
        examDate: '2023-12-03',
        examType: 'midterm'
      }
    ],
    attendance: [
      {
        studentId: '1',
        date: '2023-12-01',
        status: 'present',
        subject: 'Mathematics'
      },
      {
        studentId: '1',
        date: '2023-12-02',
        status: 'late',
        subject: 'Science',
        remarks: 'Arrived 10 minutes late'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Smith',
    rollNumber: 'STU002',
    email: 'sarah.smith@example.com',
    phone: '2345678901',
    gender: 'female',
    dateOfBirth: '2005-08-20',
    guardianName: 'Mike Smith',
    guardianPhone: '8765432109',
    section: 'B',
    admissionDate: '2020-06-01',
    status: 'active',
    currentClass: '10',
    currentSection: 'B',
    averageAttendance: 88.0,
    averageGrade: 'A-',
    performances: [],
    attendance: []
  },
  {
    id: '3',
    name: 'Michael Johnson',
    rollNumber: 'STU003',
    email: 'michael.j@example.com',
    phone: '3456789012',
    gender: 'male',
    dateOfBirth: '2006-02-10',
    guardianName: 'Robert Johnson',
    guardianPhone: '7654321098',
    section: 'A',
    admissionDate: '2021-06-01',
    status: 'inactive',
    currentClass: '9',
    currentSection: 'A',
    averageAttendance: 75.5,
    averageGrade: 'B',
    performances: [],
    attendance: []
  },
  {
    id: '4',
    name: 'Emily Brown',
    rollNumber: 'STU004',
    email: 'emily.b@example.com',
    phone: '4567890123',
    gender: 'female',
    dateOfBirth: '2004-11-30',
    guardianName: 'David Brown',
    guardianPhone: '6543210987',
    section: 'C',
    admissionDate: '2019-06-01',
    status: 'graduated',
    currentClass: '12',
    currentSection: 'C',
    averageAttendance: 95.0,
    averageGrade: 'A+',
    performances: [],
    attendance: []
  },
  {
    id: '5',
    name: 'Alex Wilson',
    rollNumber: 'STU005',
    email: 'alex.w@example.com',
    phone: '5678901234',
    gender: 'other',
    dateOfBirth: '2005-07-25',
    guardianName: 'Patricia Wilson',
    guardianPhone: '5432109876',
    section: 'B',
    admissionDate: '2020-06-01',
    status: 'transferred',
    currentClass: '11',
    currentSection: 'B',
    averageAttendance: 82.0,
    averageGrade: 'B+',
    performances: [],
    attendance: []
  }
];

export default function StudentsClient() {
  const [selectedStudent, setSelectedStudent] = useState<AcademicStudent | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filters, setFilters] = useState<AcademicStudentFilters>({
    search: '',
    status: new Set(['active']),
    class: new Set(),
    section: new Set(),
    gender: new Set()
  });

  const stats: AcademicStudentStats = useMemo(() => {
    return {
      total: mockStudents.length,
      active: mockStudents.filter(s => s.status === 'active').length,
      inactive: mockStudents.filter(s => s.status === 'inactive').length,
      transferred: mockStudents.filter(s => s.status === 'transferred').length,
      graduated: mockStudents.filter(s => s.status === 'graduated').length,
      byGender: [
        { gender: 'male', count: mockStudents.filter(s => s.gender === 'male').length },
        { gender: 'female', count: mockStudents.filter(s => s.gender === 'female').length },
        { gender: 'other', count: mockStudents.filter(s => s.gender === 'other').length }
      ],
      byClass: Array.from(new Set(mockStudents.map(s => s.currentClass))).map(cls => ({
        class: cls,
        count: mockStudents.filter(s => s.currentClass === cls).length
      })),
      averageAttendance: mockStudents.reduce((acc, s) => acc + s.averageAttendance, 0) / mockStudents.length
    };
  }, [mockStudents]);

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status.size === 0 || filters.status.has(student.status);
      const matchesClass = filters.class.size === 0 || filters.class.has(student.currentClass);
      const matchesSection = filters.section.size === 0 || filters.section.has(student.currentSection);
      const matchesGender = filters.gender.size === 0 || filters.gender.has(student.gender);

      return matchesSearch && matchesStatus && matchesClass && matchesSection && matchesGender;
    });
  }, [filters, mockStudents]);

  const handleFiltersChange = (newFilters: Partial<AcademicStudentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button 
          onPress={() => setIsCreateOpen(true)}
          className="bg-black text-white"
        >
          Add Student
        </Button>
      </div>

      <Card className="p-4">
        <StudentStats stats={stats} />
      </Card>
      
      <Card className="p-4">
        <StudentFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          stats={stats}
        />
      </Card>

      <StudentList
        students={filteredStudents}
        onView={(student) => {
          setSelectedStudent(student);
          setIsDetailOpen(true);
        }}
        onEdit={(student) => {
          setSelectedStudent(student);
          setIsCreateOpen(true);
        }}
      />

      <StudentDetail
        student={selectedStudent}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedStudent(null);
        }}
      />

      <CreateStudentForm
        student={selectedStudent}
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
}
