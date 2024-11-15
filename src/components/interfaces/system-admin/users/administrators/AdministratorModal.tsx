'use client';

import { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { administratorFormSchema, type AdministratorFormData } from '@/lib/schemas/administrator';
import { roles } from '@/lib/data/userManagementData';
import type { Administrator } from '@/lib/data/userManagementData';

interface AdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdministratorFormData) => void;
  administrator?: Administrator;
  mode: 'create' | 'edit';
}

const availablePermissions = [
  { value: 'manage_users', label: 'Manage Users' },
  { value: 'manage_schools', label: 'Manage Schools' },
  { value: 'view_reports', label: 'View Reports' },
  { value: 'manage_support', label: 'Manage Support' },
  { value: 'view_schools', label: 'View Schools' },
];

export default function AdministratorModal({
  isOpen,
  onClose,
  onSubmit,
  administrator,
  mode,
}: AdministratorModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdministratorFormData>({
    resolver: zodResolver(administratorFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      status: 'active',
      permissions: [],
    },
  });

  useEffect(() => {
    if (administrator && mode === 'edit') {
      reset({
        name: administrator.name,
        email: administrator.email,
        role: administrator.role,
        status: administrator.status,
        permissions: administrator.permissions,
      });
    }
  }, [administrator, mode, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {mode === 'create' ? 'Add Administrator' : 'Edit Administrator'}
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-4">
                {/* Name Input */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Name"
                      placeholder="Enter administrator name"
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                    />
                  )}
                />

                {/* Email Input */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Email"
                      placeholder="Enter administrator email"
                      errorMessage={errors.email?.message}
                      isInvalid={!!errors.email}
                    />
                  )}
                />

                {/* Role Select */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Role"
                      placeholder="Select administrator role"
                      errorMessage={errors.role?.message}
                      isInvalid={!!errors.role}
                    >
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                {/* Status Select */}
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      placeholder="Select administrator status"
                      errorMessage={errors.status?.message}
                      isInvalid={!!errors.status}
                    >
                      <SelectItem key="active" value="active">
                        Active
                      </SelectItem>
                      <SelectItem key="inactive" value="inactive">
                        Inactive
                      </SelectItem>
                    </Select>
                  )}
                />

                {/* Permissions Checkboxes */}
                <div className="space-y-2">
                  <p className="text-small font-medium">Permissions</p>
                  <Controller
                    name="permissions"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-2">
                        {availablePermissions.map((permission) => (
                          <Checkbox
                            key={permission.value}
                            value={permission.value}
                            isSelected={field.value.includes(permission.value)}
                            onValueChange={(isSelected) => {
                              const newPermissions = isSelected
                                ? [...field.value, permission.value]
                                : field.value.filter((p) => p !== permission.value);
                              field.onChange(newPermissions);
                            }}
                          >
                            {permission.label}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  />
                  {errors.permissions && (
                    <p className="text-tiny text-danger">
                      {errors.permissions.message}
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                className="bg-black text-white"
                isLoading={isSubmitting}
              >
                {mode === 'create' ? 'Add Administrator' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
