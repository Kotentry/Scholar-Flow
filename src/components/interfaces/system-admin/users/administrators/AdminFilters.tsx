'use client';

import { useState } from 'react';
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from '@nextui-org/react';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineAdjustments,
} from 'react-icons/hi';
import AdministratorModal  from './AdministratorModal';
import type { AdministratorFormData } from '@/lib/schemas/administrator';

const statusOptions = [
  { key: 'all', label: 'All Status' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

const roleOptions = [
  { key: 'all', label: 'All Roles' },
  { key: 'super_admin', label: 'Super Admin' },
  { key: 'system_admin', label: 'System Admin' },
  { key: 'support_admin', label: 'Support Admin' },
];

interface AdminFiltersProps {
  onSearch?: (value: string) => void;
  onStatusChange?: (status: string) => void;
  onRoleChange?: (role: string) => void;
}

export default function AdminFilters({
  onSearch,
  onStatusChange,
  onRoleChange,
}: AdminFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(new Set(['all']));
  const [selectedRole, setSelectedRole] = useState(new Set(['all']));
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleStatusChange = (keys: any) => {
    setSelectedStatus(keys);
    const status = Array.from(keys)[0];
    onStatusChange?.(status);
  };

  const handleRoleChange = (keys: any) => {
    setSelectedRole(keys);
    const role = Array.from(keys)[0];
    onRoleChange?.(role);
  };

  const handleSubmit = async (data: AdministratorFormData) => {
    // TODO: Implement API call
    console.log('Form submitted:', data);
    setIsAdminModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <Input
        placeholder="Search administrators..."
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
              aria-label="Status filter"
              selectionMode="single"
              selectedKeys={selectedStatus}
              onSelectionChange={handleStatusChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.key}>{status.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Role Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<HiOutlineFilter className="w-4 h-4" />}
                className="font-medium bg-black text-white"
              >
                Role
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Role filter"
              selectionMode="single"
              selectedKeys={selectedRole}
              onSelectionChange={handleRoleChange}
            >
              {roleOptions.map((role) => (
                <DropdownItem key={role.key}>{role.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Add Administrator Button */}
        <Button
          color="primary"
          startContent={<HiOutlinePlus className="w-4 h-4" />}
          className="font-medium bg-black text-white"
          onPress={() => setIsAdminModalOpen(true)}
        >
          Add Administrator
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Results Count */}
        <div className="flex items-center gap-2 text-default-500">
          <HiOutlineFilter className="w-4 h-4" />
          <span className="text-small">3 administrators</span>
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

        {/* Role Filter */}
        {!selectedRole.has('all') && (
          <Chip
            onClose={() => handleRoleChange(new Set(['all']))}
            variant="flat"
            size="sm"
          >
            Role: {Array.from(selectedRole)[0]}
          </Chip>
        )}
      </div>

      {/* Administrator Modal */}
      <AdministratorModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSubmit={handleSubmit}
        mode="create"
      />
    </div>
  );
}
