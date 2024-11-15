'use client';

import { useState } from 'react';
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from '@nextui-org/react';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineAdjustments,
  HiOutlineDocumentReport,
} from 'react-icons/hi';

const typeOptions = [
  { key: 'all', label: 'All Types' },
  { key: 'auth', label: 'Authentication' },
  { key: 'user', label: 'User Management' },
  { key: 'role', label: 'Role Management' },
  { key: 'permission', label: 'Permissions' },
  { key: 'system', label: 'System' },
];

const statusOptions = [
  { key: 'all', label: 'All Status' },
  { key: 'success', label: 'Success' },
  { key: 'failed', label: 'Failed' },
  { key: 'warning', label: 'Warning' },
];

interface ActivityFiltersProps {
  onSearch?: (value: string) => void;
  onTypeChange?: (type: string) => void;
  onStatusChange?: (status: string) => void;
}

export default function ActivityFilters({
  onSearch,
  onTypeChange,
  onStatusChange,
}: ActivityFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState(new Set(['all']));
  const [selectedStatus, setSelectedStatus] = useState(new Set(['all']));

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleTypeChange = (keys: any) => {
    setSelectedType(keys);
    const type = Array.from(keys)[0];
    onTypeChange?.(type);
  };

  const handleStatusChange = (keys: any) => {
    setSelectedStatus(keys);
    const status = Array.from(keys)[0];
    onStatusChange?.(status);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <Input
        placeholder="Search activities..."
        value={search}
        onValueChange={handleSearch}
        startContent={<HiOutlineSearch className="text-default-400" />}
        radius="lg"
        classNames={{
          input: 'text-small',
          inputWrapper: 'h-12',
        }}
      />

      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {/* Type Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<HiOutlineFilter className="w-4 h-4" />}
                className="font-medium bg-black text-white"
              >
                Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Activity type filter"
              selectionMode="single"
              selectedKeys={selectedType}
              onSelectionChange={handleTypeChange}
            >
              {typeOptions.map((type) => (
                <DropdownItem key={type.key}>{type.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Status Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<HiOutlineAdjustments className="w-4 h-4" />}
                className="font-medium bg-black text-white"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Activity status filter"
              selectionMode="single"
              selectedKeys={selectedStatus}
              onSelectionChange={handleStatusChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.key}>{status.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Export Button */}
        <Button
          color="primary"
          startContent={<HiOutlineDocumentReport className="w-4 h-4" />}
          className="font-medium bg-black text-white"
        >
          Export Logs
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Results Count */}
        <div className="flex items-center gap-2 text-default-500">
          <HiOutlineFilter className="w-4 h-4" />
          <span className="text-small">5 activities</span>
        </div>

        {/* Search Filter */}
        {search && (
          <Chip
            onClose={() => handleSearch('')}
            variant="flat"
            size="sm"
          >
            Search: {search}
          </Chip>
        )}

        {/* Type Filter */}
        {!selectedType.has('all') && (
          <Chip
            onClose={() => handleTypeChange(new Set(['all']))}
            variant="flat"
            size="sm"
          >
            Type: {Array.from(selectedType)[0]}
          </Chip>
        )}

        {/* Status Filter */}
        {!selectedStatus.has('all') && (
          <Chip
            onClose={() => handleStatusChange(new Set(['all']))}
            variant="flat"
            size="sm"
          >
            Status: {Array.from(selectedStatus)[0]}
          </Chip>
        )}
      </div>
    </div>
  );
}
