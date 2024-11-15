'use client';

import { useState } from 'react';
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineCalendar,
} from 'react-icons/hi';

interface ReportFiltersProps {
  filterOptions: {
    key: string;
    label: string;
  }[];
  filterLabel: string;
  onSearch?: (value: string) => void;
  onFilterChange?: (filter: string) => void;
  onDateChange?: (range: { from: string; to: string }) => void;
}

const dateRanges = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7days', label: 'Last 7 Days' },
  { key: 'last30days', label: 'Last 30 Days' },
  { key: 'thisMonth', label: 'This Month' },
  { key: 'lastMonth', label: 'Last Month' },
  { key: 'last3months', label: 'Last 3 Months' },
  { key: 'last6months', label: 'Last 6 Months' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'lastYear', label: 'Last Year' },
];

export default function ReportFilters({
  filterOptions,
  filterLabel,
  onSearch,
  onFilterChange,
  onDateChange,
}: ReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(new Set(['all']));
  const [selectedDateRange, setSelectedDateRange] = useState<string>('last30days');

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleFilterChange = (keys: any) => {
    setSelectedFilter(keys);
    const filter = Array.from(keys)[0];
    onFilterChange?.(filter);
  };

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
    // Calculate date range based on selection
    const now = new Date();
    let from = new Date();
    let to = now;

    switch (value) {
      case 'today':
        from = now;
        break;
      case 'yesterday':
        from = new Date(now.setDate(now.getDate() - 1));
        to = new Date(now.setHours(23, 59, 59, 999));
        break;
      case 'last7days':
        from = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'last30days':
        from = new Date(now.setDate(now.getDate() - 30));
        break;
      case 'thisMonth':
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        to = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last3months':
        from = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case 'last6months':
        from = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'thisYear':
        from = new Date(now.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        from = new Date(now.getFullYear() - 1, 0, 1);
        to = new Date(now.getFullYear() - 1, 11, 31);
        break;
    }

    onDateChange?.({
      from: from.toISOString(),
      to: to.toISOString(),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Search */}
      <Input
        placeholder="Search reports..."
        value={search}
        onValueChange={handleSearch}
        startContent={<HiOutlineSearch className="text-default-400" />}
        radius="lg"
        className="w-full sm:max-w-[320px]"
        classNames={{
          input: 'text-small',
          inputWrapper: 'h-10',
        }}
      />

      {/* Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            startContent={<HiOutlineFilter className="w-4 h-4" />}
            className="font-medium bg-black text-white h-10"
          >
            {filterLabel}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Filter options"
          selectionMode="single"
          selectedKeys={selectedFilter}
          onSelectionChange={handleFilterChange}
        >
          <DropdownItem key="all">All {filterLabel}</DropdownItem>
          {filterOptions.map((option) => (
            <DropdownItem key={option.key}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Date Range */}
      <Select
        label="Date Range"
        placeholder="Select date range"
        selectedKeys={[selectedDateRange]}
        className="max-w-[200px]"
        startContent={<HiOutlineCalendar className="text-default-400" />}
        onChange={(e) => handleDateRangeChange(e.target.value)}
      >
        {dateRanges.map((range) => (
          <SelectItem key={range.key} value={range.key}>
            {range.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
