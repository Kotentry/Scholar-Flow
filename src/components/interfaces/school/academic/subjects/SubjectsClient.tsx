'use client';

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import SubjectStats from "./SubjectStats";
import SubjectFilters from "./SubjectFilters";
import SubjectList from "./SubjectList";
import CreateSubjectForm from "./CreateSubjectForm";

// Mock data
const mockSubjects = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    description: "Basic mathematics including algebra, geometry, and trigonometry",
    creditHours: 4,
    class: "10",
    teacher: "John Doe",
    status: "active",
  },
  {
    id: "2",
    name: "Physics",
    code: "PHY101",
    description: "Introduction to physics concepts and principles",
    creditHours: 4,
    class: "10",
    teacher: "Jane Smith",
    status: "active",
  },
  // Add more mock subjects as needed
];

const mockStats = {
  total: 12,
  active: 10,
  inactive: 2,
  byClass: [
    { class: "9", count: 4 },
    { class: "10", count: 4 },
    { class: "11", count: 2 },
    { class: "12", count: 2 },
  ],
  byTeacher: [
    { teacher: "John Doe", count: 3 },
    { teacher: "Jane Smith", count: 2 },
    { teacher: "Bob Wilson", count: 4 },
    { teacher: "Alice Brown", count: 3 },
  ],
  averageCreditHours: 3.5,
};

export default function SubjectsClient() {
  const [subjects] = useState(mockSubjects);
  const [stats] = useState(mockStats);
  const [filters, setFilters] = useState({
    search: "",
    status: new Set(["active"]),
    class: new Set(),
    teacher: new Set(),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <Button 
          onPress={onOpen}
          className="bg-black text-white"
        >
          Add Subject
        </Button>
      </div>

      <SubjectStats stats={stats} />
      
      <SubjectFilters 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
      />

      <SubjectList 
        subjects={subjects}
      />

      <CreateSubjectForm 
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}
