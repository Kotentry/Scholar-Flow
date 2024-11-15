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
  HiOutlinePlus,
  HiOutlineKey,
} from 'react-icons/hi';
import RoleModal from './RoleModal';
import type { RoleFormData } from '@/lib/schemas/role';

const moduleOptions = [
  { key: 'all', label: 'All Modules' },
  { key: 'system', label: 'System' },
  { key: 'users', label: 'Users' },
  { key: 'schools', label: 'Schools' },
  { key: 'support', label: 'Support' },
];

interface RoleFiltersProps {
  onSearch?: (value: string) => void;
  onModuleChange?: (module: string) => void;
}

export default function RoleFilters({
  onSearch,
  onModuleChange,
}: RoleFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState(new Set(['all']));
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleModuleChange = (keys: any) => {
    setSelectedModule(keys);
    const module = Array.from(keys)[0];
    onModuleChange?.(module);
  };

  const handleSubmit = async (data: RoleFormData) => {
    // TODO: Implement API call
    console.log('Form submitted:', data);
    setIsRoleModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <Input
        placeholder="Search roles..."
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
          {/* Module Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<HiOutlineFilter className="w-4 h-4" />}
                className="font-medium bg-black text-white"
              >
                Module
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Module filter"
              selectionMode="single"
              selectedKeys={selectedModule}
              onSelectionChange={handleModuleChange}
            >
              {moduleOptions.map((module) => (
                <DropdownItem key={module.key}>{module.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Add Role Button */}
        <Button
          color="primary"
          startContent={<HiOutlinePlus className="w-4 h-4" />}
          className="font-medium bg-black text-white"
          onPress={() => setIsRoleModalOpen(true)}
        >
          Add Role
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Results Count */}
        <div className="flex items-center gap-2 text-default-500">
          <HiOutlineKey className="w-4 h-4" />
          <span className="text-small">3 roles</span>
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

        {/* Module Filter */}
        {!selectedModule.has('all') && (
          <Chip
            onClose={() => handleModuleChange(new Set(['all']))}
            variant="flat"
            size="sm"
          >
            Module: {Array.from(selectedModule)[0]}
          </Chip>
        )}
      </div>

      {/* Role Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSubmit={handleSubmit}
        mode="create"
      />
    </div>
  );
}
