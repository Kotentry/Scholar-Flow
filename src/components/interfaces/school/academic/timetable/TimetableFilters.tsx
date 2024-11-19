'use client';

import { Input, Select, SelectItem } from "@nextui-org/react";

interface TimetableFiltersProps {
  filters: {
    class: string;
    section: string;
    day: string;
  };
  onFiltersChange: (filters: any) => void;
}

const classes = ["9", "10", "11", "12"];
const sections = ["A", "B", "C", "D"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetableFilters({ filters, onFiltersChange }: TimetableFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Select
        label="Class"
        placeholder="Select class"
        selectedKeys={filters.class ? [filters.class] : []}
        onChange={(e) => handleFilterChange("class", e.target.value)}
        className="w-full md:w-1/3"
      >
        {classes.map((cls) => (
          <SelectItem key={cls} value={cls}>
            Class {cls}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Section"
        placeholder="Select section"
        selectedKeys={filters.section ? [filters.section] : []}
        onChange={(e) => handleFilterChange("section", e.target.value)}
        className="w-full md:w-1/3"
      >
        {sections.map((section) => (
          <SelectItem key={section} value={section}>
            Section {section}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Day"
        placeholder="Select day"
        selectedKeys={filters.day ? [filters.day] : []}
        onChange={(e) => handleFilterChange("day", e.target.value)}
        className="w-full md:w-1/3"
      >
        {days.map((day) => (
          <SelectItem key={day} value={day}>
            {day}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
