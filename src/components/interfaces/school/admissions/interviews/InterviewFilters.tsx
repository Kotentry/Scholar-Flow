'use client';

import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import { InterviewFilters } from "@/lib/types/interviews";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineCalendar } from "react-icons/hi";

interface InterviewFiltersProps {
  filters: InterviewFilters;
  onFiltersChange: (filters: InterviewFilters) => void;
  interviewers: string[];
}

export default function InterviewFilters({ filters, onFiltersChange, interviewers }: InterviewFiltersProps) {
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

  const handleInterviewerChange = (value: string[]) => {
    onFiltersChange({
      ...filters,
      interviewer: new Set(value),
    });
  };

  const handleDateChange = (field: "start" | "end", value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      status: new Set(),
      interviewer: new Set(),
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <Input
          placeholder="Search interviews..."
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
          <DropdownItem key="scheduled">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="warning">Scheduled</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="completed">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="success">Completed</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="cancelled">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="danger">Cancelled</Chip>
            </div>
          </DropdownItem>
          <DropdownItem key="no_show">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="default">No Show</Chip>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Interviewer Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            className="bg-black text-white"
            startContent={<HiOutlineFilter className="text-white" />}
          >
            Interviewer
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Interviewer filter"
          closeOnSelect={false}
          selectedKeys={Array.from(filters.interviewer)}
          selectionMode="multiple"
          onSelectionChange={(keys) => handleInterviewerChange(Array.from(keys) as string[])}
        >
          {interviewers.map((interviewer) => (
            <DropdownItem key={interviewer}>
              {interviewer}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Clear Filters */}
      {(filters.status.size > 0 || filters.interviewer.size > 0) && (
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
