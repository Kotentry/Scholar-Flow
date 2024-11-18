'use client';

import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import { EnrollmentFilters } from "@/lib/types/enrollments";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

interface EnrollmentFiltersProps {
  filters: EnrollmentFilters;
  onFiltersChange: (filters: EnrollmentFilters) => void;
  gradeLevels: string[];
}

export default function EnrollmentFilters({ filters, onFiltersChange, gradeLevels }: EnrollmentFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value,
    });
  };

  const handleStatusChange = (value: string[]) => {
    onFiltersChange({
      ...filters,
      status: new Set(value),
    });
  };

  const handleGradeLevelChange = (value: string[]) => {
    onFiltersChange({
      ...filters,
      gradeLevel: new Set(value),
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: new Set(),
      gradeLevel: new Set(),
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <Input
          placeholder="Search enrollments..."
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
          selectedKeys={Array.from(filters.status)}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleStatusChange(Array.from(keys) as string[])}
        >
          <DropdownItem key="pending">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="warning">Pending</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="active">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="success">Active</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="withdrawn">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="danger">Withdrawn</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="graduated">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="primary">Graduated</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="suspended">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="default">Suspended</Chip>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Grade Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Grade
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Grade filter"
          closeOnSelect={false}
          selectedKeys={Array.from(filters.gradeLevel)}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleGradeLevelChange(Array.from(keys) as string[])}
        >
          {gradeLevels.map((grade) => (
            <DropdownItem key={grade}>
              {grade}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Clear Filters */}
      {(filters.status.size > 0 || filters.gradeLevel.size > 0) && (
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
