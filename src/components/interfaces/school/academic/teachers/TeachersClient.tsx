'use client';

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { Teacher, TeacherFilters as TeacherFiltersType, TeacherStats as TeacherStatsType } from "@/lib/types/academics";
import TeacherList from "./TeacherList";
import TeacherStats from "./TeacherStats";
import TeacherFilters from "./TeacherFilters";
import CreateTeacherForm from "./CreateTeacherForm";
import { HiOutlinePlusCircle } from "react-icons/hi";

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@school.com",
    phone: "+1234567890",
    subjects: ["Mathematics", "Physics"],
    role: "class_teacher",
    joinedAt: "2023-01-01",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@school.com",
    phone: "+1234567891",
    subjects: ["English", "Literature"],
    role: "class_teacher",
    joinedAt: "2023-02-15",
    status: "active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@school.com",
    phone: "+1234567892",
    subjects: ["Chemistry", "Biology"],
    role: "subject_teacher",
    joinedAt: "2023-03-10",
    status: "active",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@school.com",
    phone: "+1234567893",
    subjects: ["History", "Geography"],
    role: "subject_teacher",
    joinedAt: "2023-04-01",
    status: "active",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.b@school.com",
    phone: "+1234567894",
    subjects: ["Computer Science", "Mathematics"],
    role: "subject_teacher",
    joinedAt: "2023-05-15",
    status: "inactive",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.d@school.com",
    phone: "+1234567895",
    subjects: ["Art", "Music"],
    role: "subject_teacher",
    joinedAt: "2023-06-01",
    status: "active",
  },
];

const mockStats: TeacherStatsType = {
  total: 6,
  active: 5,
  inactive: 1,
  byRole: [
    { role: "class_teacher", count: 2 },
    { role: "subject_teacher", count: 4 },
  ],
  bySubject: [
    { subject: "Mathematics", count: 2 },
    { subject: "Physics", count: 1 },
    { subject: "English", count: 1 },
    { subject: "Chemistry", count: 1 },
    { subject: "Biology", count: 1 },
    { subject: "History", count: 1 },
    { subject: "Geography", count: 1 },
    { subject: "Computer Science", count: 1 },
    { subject: "Art", count: 1 },
    { subject: "Music", count: 1 },
    { subject: "Literature", count: 1 },
  ],
  averageSubjectsPerTeacher: 2,
};

export default function TeachersClient() {
  const [teachers] = useState<Teacher[]>(mockTeachers);
  const [stats] = useState<TeacherStatsType>(mockStats);
  const [filters, setFilters] = useState<TeacherFiltersType>({
    search: "",
    status: new Set(["active"]),
    role: new Set(),
    subjects: new Set(),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFiltersChange = (newFilters: TeacherFiltersType) => {
    setFilters(newFilters);
    // In a real app, we would fetch filtered teachers here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button 
          onPress={onOpen}
          startContent={<HiOutlinePlusCircle className="text-xl" />}
          className="bg-black text-white"
        >
          Add Teacher
        </Button>
      </div>

      <TeacherStats stats={stats} />
      
      <TeacherFilters 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
      />

      <TeacherList 
        teachers={teachers}
      />

      <CreateTeacherForm 
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}
