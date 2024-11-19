'use client';

import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

interface SubjectFiltersProps {
  filters: {
    search: string;
    status: Set<string>;
    class: Set<string>;
    teacher: Set<string>;
  };
  onFiltersChange: (filters: any) => void;
}

const statusOptions = [
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

const classOptions = ["9", "10", "11", "12"];
const teacherOptions = ["John Doe", "Jane Smith", "Bob Wilson", "Alice Brown"];

export default function SubjectFilters({ filters, onFiltersChange }: SubjectFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value,
    });
  };

  const handleStatusChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      status: keys,
    });
  };

  const handleClassChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      class: keys,
    });
  };

  const handleTeacherChange = (keys: Set<string>) => {
    onFiltersChange({
      ...filters,
      teacher: keys,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <Input
          placeholder="Search subjects..."
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
          onSelectionChange={keys => handleStatusChange(keys as Set<string>)}
        >
          {statusOptions.map((status) => (
            <DropdownItem key={status.key}>
              {status.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Class Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Class
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Class filter"
          closeOnSelect={false}
          selectedKeys={filters.class}
          selectionMode="multiple"
          onSelectionChange={keys => handleClassChange(keys as Set<string>)}
        >
          {classOptions.map((classNum) => (
            <DropdownItem key={classNum}>
              Class {classNum}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Teacher Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Teacher
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Teacher filter"
          closeOnSelect={false}
          selectedKeys={filters.teacher}
          selectionMode="multiple"
          onSelectionChange={keys => handleTeacherChange(keys as Set<string>)}
        >
          {teacherOptions.map((teacher) => (
            <DropdownItem key={teacher}>
              {teacher}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
