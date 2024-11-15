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
  Textarea,
  Divider,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleFormSchema, type RoleFormData } from '@/lib/schemas/role';
import type { Role } from '@/lib/data/userManagementData';
import PermissionManager  from './PermissionManager';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
  role?: Role;
  mode: 'create' | 'edit';
}

export default function RoleModal({
  isOpen,
  onClose,
  onSubmit,
  role,
  mode,
}: RoleModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
    },
  });

  useEffect(() => {
    if (role && mode === 'edit') {
      reset({
        name: role.name,
        description: role.description,
        permissions: role.permissions.map(p => ({
          module: p.module,
          actions: p.actions as ('create' | 'read' | 'update' | 'delete')[],
        })),
      });
    }
  }, [role, mode, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePermissionsChange = (permissions: RoleFormData['permissions']) => {
    setValue('permissions', permissions, { shouldValidate: true });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {mode === 'create' ? 'Add Role' : 'Edit Role'}
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Role Name"
                        placeholder="Enter role name"
                        errorMessage={errors.name?.message}
                        isInvalid={!!errors.name}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Description"
                        placeholder="Enter role description"
                        errorMessage={errors.description?.message}
                        isInvalid={!!errors.description}
                      />
                    )}
                  />
                </div>

                <Divider />

                {/* Permissions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Permissions</h3>
                  <Controller
                    name="permissions"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <PermissionManager
                          permissions={field.value}
                          onChange={handlePermissionsChange}
                        />
                        {errors.permissions && (
                          <p className="text-tiny text-danger mt-1">
                            {errors.permissions.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
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
                {mode === 'create' ? 'Create Role' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
