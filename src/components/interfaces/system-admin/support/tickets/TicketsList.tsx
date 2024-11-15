'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  User,
  Checkbox,
  ButtonGroup,
} from '@nextui-org/react';
import {
  HiOutlineEye,
  HiOutlineTicket,
  HiOutlineCheck,
  HiOutlineArchive,
  HiOutlineExclamation,
} from 'react-icons/hi';
import type { Ticket } from '@/lib/data/ticketsData';
import { ticketPriorities, ticketStatuses } from '@/lib/data/ticketsData';
import { formatDistanceToNow } from 'date-fns';

interface TicketsListProps {
  tickets: Ticket[];
  onTicketSelect: (ticketId: string) => void;
}

export function TicketsList({ tickets, onTicketSelect }: TicketsListProps) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const getStatusColor = (status: string) => {
    return ticketStatuses.find(s => s.key === status)?.color || 'default';
  };

  const getPriorityColor = (priority: string) => {
    return ticketPriorities.find(p => p.key === priority)?.color || 'default';
  };

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleBulkAction = (action: 'resolve' | 'archive' | 'urgent') => {
    // TODO: Implement bulk actions
    console.log(`Bulk ${action} for tickets:`, Array.from(selectedKeys));
    setSelectedKeys(new Set([]));
  };

  if (tickets.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="p-4 rounded-full bg-default-100">
              <HiOutlineTicket className="w-8 h-8 text-default-500" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-large font-medium">No Tickets Found</p>
              <p className="text-small text-default-500">
                There are no tickets matching your current filters.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedKeys.size > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-small text-default-500">
            {selectedKeys.size} ticket{selectedKeys.size > 1 ? 's' : ''} selected
          </span>
          <ButtonGroup>
            <Button
              size="sm"
              variant="flat"
              startContent={<HiOutlineCheck className="w-4 h-4" />}
              onPress={() => handleBulkAction('resolve')}
            >
              Mark Resolved
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<HiOutlineArchive className="w-4 h-4" />}
              onPress={() => handleBulkAction('archive')}
            >
              Archive
            </Button>
            <Button
              size="sm"
              variant="flat"
              color="danger"
              startContent={<HiOutlineExclamation className="w-4 h-4" />}
              onPress={() => handleBulkAction('urgent')}
            >
              Mark Urgent
            </Button>
          </ButtonGroup>
        </div>
      )}

      {/* Tickets Table */}
      <Card>
        <CardBody>
          <Table aria-label="Support tickets">
            <TableHeader>
              <TableColumn>
                <Checkbox
                  isIndeterminate={selectedKeys.size > 0 && selectedKeys.size < tickets.length}
                  isSelected={selectedKeys.size === tickets.length}
                  onValueChange={(selected) => {
                    setSelectedKeys(new Set(selected ? tickets.map(t => t.id) : []));
                  }}
                />
              </TableColumn>
              <TableColumn>TICKET</TableColumn>
              <TableColumn>USER</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>LAST UPDATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedKeys.has(ticket.id)}
                      onValueChange={(selected) => {
                        const newKeys = new Set(selectedKeys);
                        if (selected) {
                          newKeys.add(ticket.id);
                        } else {
                          newKeys.delete(ticket.id);
                        }
                        setSelectedKeys(newKeys);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{ticket.title}</span>
                      <span className="text-small text-default-500">
                        {ticket.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <User
                      name={ticket.user.name}
                      description={ticket.user.school}
                      avatarProps={{
                        src: `https://i.pravatar.cc/150?u=${ticket.user.id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={getStatusColor(ticket.status) as any}
                      className="capitalize"
                    >
                      {ticket.status.replace('_', ' ')}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={getPriorityColor(ticket.priority) as any}
                      className="capitalize"
                    >
                      {ticket.priority}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {formatDate(ticket.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => onTicketSelect(ticket.id)}
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
