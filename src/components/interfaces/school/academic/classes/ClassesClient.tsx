'use client';

import { useState } from "react";
import { Class, ClassStats as ClassStatsType, ClassFilters as ClassFiltersType } from "@/lib/types/academics";
import ClassStatsComponent from "./ClassStats";
import ClassFilters from "./ClassFilters";
import ClassList from "./ClassList";
import { Button } from "@nextui-org/react";
import { HiOutlinePlusCircle } from "react-icons/hi";

interface ClassesClientProps {
  initialClasses: Class[];
  stats: ClassStatsType;
}

export default function ClassesClient({ initialClasses, stats }: ClassesClientProps) {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFilterChange = (filters: ClassFiltersType) => {
    let filtered = [...initialClasses];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status.size > 0) {
      filtered = filtered.filter(cls => filters.status.has(cls.status));
    }

    // Academic Year filter
    if (filters.academicYear.size > 0) {
      filtered = filtered.filter(cls => filters.academicYear.has(cls.academicYear));
    }

    setClasses(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <Button
          className="bg-black text-white"
          startContent={<HiOutlinePlusCircle className="text-xl" />}
          onPress={() => setShowCreateModal(true)}
        >
          Create Class
        </Button>
      </div>

      {/* Stats Section */}
      <ClassStatsComponent stats={stats} />

      {/* Filters Section */}
      <ClassFilters onFilterChange={handleFilterChange} />

      {/* Classes List */}
      <ClassList 
        classes={classes}
        showCreateModal={showCreateModal}
        onCloseCreateModal={() => setShowCreateModal(false)}
      />
    </div>
  );
}
