'use client';

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import TimetableStats from "./TimetableStats";
import TimetableFilters from "./TimetableFilters";
import TimetableGrid from "./TimetableGrid";
import CreateTimetableForm from "./CreateTimetableForm";

// Mock data
const mockTimetable = {
  class: "10",
  section: "A",
  schedule: [
    {
      day: "Monday",
      periods: [
        { time: "8:00 AM - 9:00 AM", subject: "Mathematics", teacher: "John Doe" },
        { time: "9:00 AM - 10:00 AM", subject: "Physics", teacher: "Jane Smith" },
        { time: "10:00 AM - 11:00 AM", subject: "Chemistry", teacher: "Bob Wilson" },
        { time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Alice Brown" },
        { time: "12:30 PM - 1:30 PM", subject: "History", teacher: "Eve White" },
      ]
    },
    {
      day: "Tuesday",
      periods: [
        { time: "8:00 AM - 9:00 AM", subject: "Physics", teacher: "Jane Smith" },
        { time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "John Doe" },
        { time: "10:00 AM - 11:00 AM", subject: "English", teacher: "Alice Brown" },
        { time: "11:30 AM - 12:30 PM", subject: "Chemistry", teacher: "Bob Wilson" },
        { time: "12:30 PM - 1:30 PM", subject: "Computer Science", teacher: "Charlie Green" },
      ]
    },
    // Add more days...
  ]
};

const mockStats = {
  totalClasses: 6,
  totalSections: 12,
  totalPeriods: 35,
  averageDailyPeriods: 7,
  byClass: [
    { class: "9", sections: 2 },
    { class: "10", sections: 4 },
    { class: "11", sections: 3 },
    { class: "12", sections: 3 },
  ],
  bySubject: [
    { subject: "Mathematics", periods: 25 },
    { subject: "Physics", periods: 20 },
    { subject: "Chemistry", periods: 20 },
    { subject: "English", periods: 25 },
    { subject: "History", periods: 15 },
  ],
};

export default function TimetableClient() {
  const [timetable] = useState(mockTimetable);
  const [stats] = useState(mockStats);
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    day: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Timetable</h1>
        <Button 
          onPress={onOpen}
          className="bg-black text-white"
        >
          Create Timetable
        </Button>
      </div>

      <TimetableStats stats={stats} />
      
      <TimetableFilters 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
      />

      <TimetableGrid 
        timetable={timetable}
      />

      <CreateTimetableForm 
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}
