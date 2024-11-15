'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
  Tooltip,
  ButtonGroup,
  Selection,
} from '@nextui-org/react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineBan,
  HiOutlineCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { administrators } from '@/lib/data/userManagementData';
import type { Administrator } from '@/lib/data/userManagementData';
import AdministratorModal  from './AdministratorModal';
import ConfirmationModal  from './ConfirmationModal';
import type { AdministratorFormData } from '@/lib/schemas/administrator';

const statusColorMap = {
  active: 'success',
  inactive: 'danger',
};

export default function AdministratorsList() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'delete' | 'activate' | 'deactivate';
    isBulk: boolean;
  } | null>(null);

  const handleEdit = (admin: Administrator) => {
    setEditingAdmin(admin);
    setIsAdminModalOpen(true);
  };

  const handleSubmit = async (data: AdministratorFormData) => {
    // TODO: Implement API call
    console.log('Form submitted:', data);
    setIsAdminModalOpen(false);
    setEditingAdmin(null);
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    // TODO: Implement API call
    console.log('Confirmed action:', {
      type: confirmAction.type,
      isBulk: confirmAction.isBulk,
      selectedKeys: Array.from(selectedKeys),
    });

    setIsConfirmModalOpen(false);
    setConfirmAction(null);
    setSelectedKeys(new Set([]));
  };

  const getConfirmationProps = () => {
    if (!confirmAction) return null;

    const isBulk = confirmAction.isBulk;
    const count = selectedKeys.size;

    switch (confirmAction.type) {
      case 'delete':
        return {
          title: `Delete ${isBulk ? 'Administrators' : 'Administrator'}`,
          message: isBulk
            ? `Are you sure you want to delete ${count} administrators? This action cannot be undone.`
            : 'Are you sure you want to delete this administrator? This action cannot be undone.',
          actionLabel: `Delete ${isBulk ? `${count} Administrators` : 'Administrator'}`,
          type: 'danger' as const,
        };
      case 'activate':
        return {
          title: `Activate ${isBulk ? 'Administrators' : 'Administrator'}`,
          message: isBulk
            ? `Are you sure you want to activate ${count} administrators?`
            : 'Are you sure you want to activate this administrator?',
          actionLabel: `Activate ${isBulk ? `${count} Administrators` : 'Administrator'}`,
          type: 'success' as const,
        };
      case 'deactivate':
        return {
          title: `Deactivate ${isBulk ? 'Administrators' : 'Administrator'}`,
          message: isBulk
            ? `Are you sure you want to deactivate ${count} administrators?`
            : 'Are you sure you want to deactivate this administrator?',
          actionLabel: `Deactivate ${isBulk ? `${count} Administrators` : 'Administrator'}`,
          type: 'warning' as const,
        };
      default:
        return null;
    }
  };

  const handleSelectionChange = (keys: Selection) => {
    // Handle "Select All" case
    if (keys === "all") {
      setSelectedKeys(new Set(administrators.map(admin => admin.id)));
    } else {
      setSelectedKeys(keys);
    }
  };

  const columns = [
    { name: 'ADMINISTRATOR', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'LAST ACTIVE', uid: 'lastActive' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const renderCell = (admin: Administrator, columnKey: string) => {
    const cellValue = admin[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            name={admin.name}
            description={admin.email}
            avatarProps={{
              src: admin.avatar,
              size: 'sm',
            }}
          />
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{admin.role}</p>
            <p className="text-bold text-tiny text-default-500">
              {admin.permissions.length} permissions
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[admin.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'lastActive':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {new Date(admin.lastActive).toLocaleDateString()}
            </p>
            <p className="text-bold text-tiny text-default-500">
              {new Date(admin.lastActive).toLocaleTimeString()}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit administrator">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => handleEdit(admin)}
              >
                <HiOutlinePencil className="text-default-500 w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content={admin.status === 'active' ? 'Deactivate' : 'Activate'}>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => {
                  setConfirmAction({
                    type: admin.status === 'active' ? 'deactivate' : 'activate',
                    isBulk: false,
                  });
                  setSelectedKeys(new Set([admin.id]));
                  setIsConfirmModalOpen(true);
                }}
              >
                {admin.status === 'active' ? (
                  <HiOutlineBan className="text-danger w-4 h-4" />
                ) : (
                  <HiOutlineCheck className="text-success w-4 h-4" />
                )}
              </Button>
            </Tooltip>
            <Tooltip content="Delete administrator" color="danger">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => {
                  setConfirmAction({
                    type: 'delete',
                    isBulk: false,
                  });
                  setSelectedKeys(new Set([admin.id]));
                  setIsConfirmModalOpen(true);
                }}
              >
                <HiOutlineTrash className="text-danger w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const confirmationProps = getConfirmationProps();

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {(selectedKeys instanceof Set && selectedKeys.size > 0) && (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-default-50">
          <div className="flex items-center gap-2 text-default-600">
            <HiOutlineUserGroup className="w-5 h-5" />
            <span>{selectedKeys.size} administrators selected</span>
          </div>
          <ButtonGroup>
            <Button
              color="success"
              variant="flat"
              onPress={() => {
                setConfirmAction({
                  type: 'activate',
                  isBulk: true,
                });
                setIsConfirmModalOpen(true);
              }}
            >
              Activate All
            </Button>
            <Button
              color="warning"
              variant="flat"
              onPress={() => {
                setConfirmAction({
                  type: 'deactivate',
                  isBulk: true,
                });
                setIsConfirmModalOpen(true);
              }}
            >
              Deactivate All
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                setConfirmAction({
                  type: 'delete',
                  isBulk: true,
                });
                setIsConfirmModalOpen(true);
              }}
            >
              Delete All
            </Button>
          </ButtonGroup>
        </div>
      )}

      {/* Administrators Table */}
      <Table
        aria-label="Administrators table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={administrators}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Administrator Modal */}
      <AdministratorModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setEditingAdmin(null);
        }}
        onSubmit={handleSubmit}
        administrator={editingAdmin}
        mode={editingAdmin ? 'edit' : 'create'}
      />

      {/* Confirmation Modal */}
      {confirmationProps && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setConfirmAction(null);
            setSelectedKeys(new Set([]));
          }}
          onConfirm={handleConfirm}
          {...confirmationProps}
        />
      )}
    </div>
  );
}
