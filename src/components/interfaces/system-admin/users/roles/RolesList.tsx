'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Button,
  Tooltip,
  Divider,
} from '@nextui-org/react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineKey,
  HiOutlineLockClosed,
} from 'react-icons/hi';
import { roles } from '@/lib/data/userManagementData';
import type { Role } from '@/lib/data/userManagementData';
import RoleModal from './RoleModal';
import ConfirmationModal  from '../administrators/ConfirmationModal';
import type { RoleFormData } from '@/lib/schemas/role';

export default function RolesList() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setModalMode('edit');
    setIsRoleModalOpen(true);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setIsConfirmModalOpen(true);
  };

  const handleSubmit = async (data: RoleFormData) => {
    // TODO: Implement API call
    console.log('Form submitted:', data);
    setIsRoleModalOpen(false);
    setSelectedRole(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole) return;

    // TODO: Implement API call
    console.log('Deleting role:', selectedRole.id);
    setIsConfirmModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <Card
          key={role.id}
          className="group"
          isPressable
          onPress={() => setSelectedRole(role)}
        >
          <CardHeader className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-default-100">
                <HiOutlineLockClosed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <p className="text-small text-default-500">
                  {role.permissions.length} permissions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Tooltip content="Edit role">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => handleEdit(role)}
                >
                  <HiOutlinePencil className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip content="Delete role" color="danger">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => handleDelete(role)}
                >
                  <HiOutlineTrash className="w-4 h-4 text-danger" />
                </Button>
              </Tooltip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            {/* Description */}
            <p className="text-default-500">
              {role.description}
            </p>

            {/* Users Count */}
            <div className="flex items-center gap-2 text-default-500">
              <HiOutlineUserGroup className="w-4 h-4" />
              <span className="text-small">{role.usersCount} users</span>
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              <p className="text-small font-medium">Permissions</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <Chip
                    key={permission.id}
                    variant="flat"
                    size="sm"
                    startContent={<HiOutlineKey className="w-3 h-3" />}
                  >
                    {permission.name}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-default-500">
              <span className="text-tiny">
                Last updated {new Date(role.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Role Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setSelectedRole(null);
        }}
        onSubmit={handleSubmit}
        role={selectedRole}
        mode={modalMode}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setSelectedRole(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
        actionLabel="Delete Role"
        type="danger"
      />
    </div>
  );
}
