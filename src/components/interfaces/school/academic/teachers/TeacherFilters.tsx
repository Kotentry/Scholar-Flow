'use client';

import { useState } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import { TeacherFilters as TeacherFiltersType, TeacherRole } from "@/lib/types/academics";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

const statusOptions = [
  { key: 'active', label: 'Active', color: 'success' as const },
  { key: 'inactive', label: 'Inactive', color: 'warning' as const },
];

const roleOptions = [
  { key: 'class_teacher', label: 'Class Teacher', color: 'primary' as const },
  { key: 'subject_teacher', label: 'Subject Teacher', color: 'secondary' as const },
  { key: 'assistant_teacher', label: 'Assistant Teacher', color: 'success' as const },
];

const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Literature",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
];

interface TeacherFiltersProps {
  filters: TeacherFiltersType;
  onFiltersChange: (filters: TeacherFiltersType) => void;
}

export default function TeacherFilters({ filters, onFiltersChange }: TeacherFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value,
    });
  };

  const handleStatusChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      status: keys as Set<"active" | "inactive">,
    });
  };

  const handleRoleChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      role: keys as Set<TeacherRole>,
    });
  };

  const handleSubjectsChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      subjects: keys,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: new Set(),
      role: new Set(),
      subjects: new Set(),
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <Input
          placeholder="Search teachers..."
          value={filters.search}
          onValueChange={handleSearchChange}
          startContent={<HiOutlineSearch className="text-default-400" />}
          classNames={{
            input: "bg-transparent",
            inputWrapper: "bg-default-100",
          }}
        />
      </div>

      {/* Status Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Status
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Status filter"
          closeOnSelect={false}
          selectedKeys={filters.status}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleStatusChange(keys as Set<string>)}
        >
          {statusOptions.map((status) => (
            <DropdownItem key={status.key}>
              <div className="flex items-center gap-2">
                <Chip size="sm" color={status.color}>{status.label}</Chip>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Role Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Role
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Role filter"
          closeOnSelect={false}
          selectedKeys={filters.role}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleRoleChange(keys as Set<string>)}
        >
          {roleOptions.map((role) => (
            <DropdownItem key={role.key}>
              <div className="flex items-center gap-2">
                <Chip size="sm" color={role.color}>{role.label}</Chip>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Subjects Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Subjects
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Subjects filter"
          closeOnSelect={false}
          selectedKeys={filters.subjects}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleSubjectsChange(keys as Set<string>)}
        >
          {subjectOptions.map((subject) => (
            <DropdownItem key={subject}>
              {subject}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Clear Filters */}
      {(filters.status.size > 0 || filters.role.size > 0 || filters.subjects.size > 0) && (
        <Button
          variant="flat"
          onPress={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
