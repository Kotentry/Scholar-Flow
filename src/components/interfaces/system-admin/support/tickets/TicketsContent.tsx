'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Tabs,
  Tab,
} from '@nextui-org/react';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineFolder,
} from 'react-icons/hi';
import { TicketsList } from './TicketsList';
import { TicketModal } from './TicketModal';
import { TicketStats } from './TicketStats';
import { TicketMetrics } from './TicketMetrics';
import {
  tickets,
  ticketCategories,
  ticketStatuses,
  userRoles,
  type UserRole,
} from '@/lib/data/ticketsData';

export default function TicketsContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(new Set(['all']));
  const [selectedCategory, setSelectedCategory] = useState(new Set(['all']));
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (keys: any) => {
    setSelectedStatus(keys);
  };

  const handleCategoryChange = (keys: any) => {
    setSelectedCategory(keys);
  };

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    onOpen();
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (selectedRole !== 'all' && ticket.user.role !== selectedRole) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <p className="text-default-500">
          View and respond to support tickets
        </p>
      </div>

      {/* Stats */}
      <TicketStats tickets={tickets} />

      {/* Metrics */}
      <TicketMetrics tickets={tickets} />

      {/* Role Tabs */}
      <Tabs
        aria-label="User roles"
        size="lg"
        variant="underlined"
        fullWidth
        selectedKey={selectedRole}
        onSelectionChange={(key) => setSelectedRole(key as UserRole | 'all')}
      >
        {userRoles.map((role) => (
          <Tab
            key={role.key}
            title={role.label}
          />
        ))}
      </Tabs>

      {/* Filters */}
      <div>
        <div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <Input
              placeholder="Search tickets..."
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

            {/* Status Filter */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<HiOutlineFilter className="w-4 h-4" />}
                  className="font-medium bg-black text-white h-10"
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
                <DropdownItem key="all">All Statuses</DropdownItem>
                {ticketStatuses.map((status) => (
                  <DropdownItem key={status.key}>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={status.color as any}
                      className="capitalize"
                    >
                      {status.label}
                    </Chip>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Category Filter */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<HiOutlineFolder className="w-4 h-4" />}
                  className="font-medium bg-black text-white h-10"
                >
                  Category
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Category filter"
                selectionMode="single"
                selectedKeys={selectedCategory}
                onSelectionChange={handleCategoryChange}
              >
                <DropdownItem key="all">All Categories</DropdownItem>
                {ticketCategories.map((category) => (
                  <DropdownItem key={category.key}>
                    {category.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <TicketsList
        tickets={filteredTickets}
        onTicketSelect={handleTicketSelect}
      />

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isOpen}
        onClose={onClose}
        ticketId={selectedTicket}
      />
    </div>
  );
}
