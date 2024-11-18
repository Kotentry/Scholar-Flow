'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Button,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineCalendar } from "react-icons/hi";
import { gradeOptions } from "@/lib/data/school-applications";
import { ApplicationStatus } from "@/lib/types/admissions";
import { format } from "date-fns";

const statusOptions: { key: ApplicationStatus; label: string; color: "default" | "primary" | "success" | "danger" }[] = [
  { key: "pending", label: "Pending Review", color: "default" },
  { key: "under_review", label: "Under Review", color: "primary" },
  { key: "accepted", label: "Approved", color: "success" },
  { key: "rejected", label: "Rejected", color: "danger" },
];

interface ApplicationFiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: Set<ApplicationStatus>;
    grades: Set<string>;
    dateRange: {
      start: string;
      end: string;
    };
  }) => void;
}

export default function ApplicationFilters({ onFilterChange }: ApplicationFiltersProps) {
  const [selectedStatus, setSelectedStatus] = useState<Set<ApplicationStatus>>(new Set([]));
  const [selectedGrades, setSelectedGrades] = useState<Set<string>>(new Set([]));
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      search: searchQuery,
      status: selectedStatus,
      grades: selectedGrades,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus(new Set([]));
    setSelectedGrades(new Set([]));
    setStartDate("");
    setEndDate("");
    onFilterChange({
      search: "",
      status: new Set([]),
      grades: new Set([]),
      dateRange: {
        start: "",
        end: "",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Search by name, email, or phone number..."
            startContent={<HiOutlineSearch className="text-default-400" />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
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
            selectedKeys={selectedStatus}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              setSelectedStatus(keys as Set<ApplicationStatus>);
              handleFilterChange();
            }}
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
            selectedKeys={selectedGrades}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              setSelectedGrades(keys as Set<string>);
              handleFilterChange();
            }}
          >
            {gradeOptions.map((grade) => (
              <DropdownItem key={grade}>{grade}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Date Range Filter */}
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button 
              className="bg-black text-white"
              startContent={<HiOutlineCalendar className="text-white" />}
            >
              Date Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <div className="flex flex-col gap-4">
              <Input
                type="date"
                label="Start Date"
                placeholder="From"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  handleFilterChange();
                }}
              />
              <Input
                type="date"
                label="End Date"
                placeholder="To"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {(selectedStatus.size > 0 || selectedGrades.size > 0 || startDate || endDate) && (
          <Button
            className="bg-default-100"
            size="sm"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {(selectedStatus.size > 0 || selectedGrades.size > 0 || startDate || endDate) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-wrap gap-2"
        >
          {Array.from(selectedStatus).map((status) => (
            <Chip
              key={status}
              onClose={() => {
                const newSelection = new Set(selectedStatus);
                newSelection.delete(status);
                setSelectedStatus(newSelection);
                handleFilterChange();
              }}
              variant="flat"
              color={statusOptions.find(s => s.key === status)?.color}
            >
              {statusOptions.find(s => s.key === status)?.label}
            </Chip>
          ))}
          {Array.from(selectedGrades).map((grade) => (
            <Chip
              key={grade}
              onClose={() => {
                const newSelection = new Set(selectedGrades);
                newSelection.delete(grade);
                setSelectedGrades(newSelection);
                handleFilterChange();
              }}
              variant="flat"
            >
              {grade}
            </Chip>
          ))}
          {(startDate || endDate) && (
            <Chip
              onClose={() => {
                setStartDate("");
                setEndDate("");
                handleFilterChange();
              }}
              variant="flat"
            >
              {startDate && endDate
                ? `${format(new Date(startDate), "MMM d, yyyy")} - ${format(new Date(endDate), "MMM d, yyyy")}`
                : startDate
                ? `From ${format(new Date(startDate), "MMM d, yyyy")}`
                : `Until ${format(new Date(endDate), "MMM d, yyyy")}`}
            </Chip>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
