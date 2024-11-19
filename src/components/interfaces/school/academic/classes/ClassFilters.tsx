'use client';

import { useState } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import { ClassFilters } from "@/lib/types/academics";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

const academicYears = ['2023-2024', '2024-2025'];
const statusOptions = [
  { key: 'active', label: 'Active', color: 'success' as const },
  { key: 'inactive', label: 'Inactive', color: 'warning' as const },
  { key: 'archived', label: 'Archived', color: 'default' as const },
];

interface ClassFiltersProps {
  onFilterChange: (filters: ClassFilters) => void;
}

export default function ClassFilters({ onFilterChange }: ClassFiltersProps) {
  const [filters, setFilters] = useState<ClassFilters>({
    search: '',
    status: new Set(),
    academicYear: new Set(),
  });

  const handleSearchChange = (value: string) => {
    const newFilters = {
      ...filters,
      search: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (keys: Set<string>) => {
    const newFilters = {
      ...filters,
      status: keys as Set<string>,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAcademicYearChange = (keys: Set<string>) => {
    const newFilters = {
      ...filters,
      academicYear: keys as Set<string>,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      status: new Set(),
      academicYear: new Set(),
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <Input
          placeholder="Search classes..."
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

      {/* Academic Year Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Academic Year
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Academic year filter"
          closeOnSelect={false}
          selectedKeys={filters.academicYear}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleAcademicYearChange(keys as Set<string>)}
        >
          {academicYears.map((year) => (
            <DropdownItem key={year}>
              {year}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Clear Filters */}
      {(filters.status.size > 0 || filters.academicYear.size > 0) && (
        <Button
          className="bg-default-100"
          size="sm"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
