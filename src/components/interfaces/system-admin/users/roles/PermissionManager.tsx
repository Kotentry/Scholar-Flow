'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Checkbox,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import {
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi';
import type { PermissionFormData } from '@/lib/schemas/role';

interface PermissionManagerProps {
  permissions: PermissionFormData[];
  onChange: (permissions: PermissionFormData[]) => void;
}

const moduleOptions = [
  { key: 'system', label: 'System' },
  { key: 'users', label: 'Users' },
  { key: 'schools', label: 'Schools' },
  { key: 'support', label: 'Support' },
];

const actionOptions = [
  { key: 'create', label: 'Create' },
  { key: 'read', label: 'Read' },
  { key: 'update', label: 'Update' },
  { key: 'delete', label: 'Delete' },
];

export default function PermissionManager({
  permissions,
  onChange,
}: PermissionManagerProps) {
  const [selectedModule, setSelectedModule] = useState(new Set([]));

  const handleAddPermission = () => {
    const module = Array.from(selectedModule)[0];
    if (!module) return;

    // Check if permission for this module already exists
    if (permissions.some(p => p.module === module)) return;

    const newPermission: PermissionFormData = {
      module,
      actions: ['read'], // Default to read permission
    };

    onChange([...permissions, newPermission]);
    setSelectedModule(new Set([]));
  };

  const handleRemovePermission = (module: string) => {
    onChange(permissions.filter(p => p.module !== module));
  };

  const handleActionToggle = (module: string, action: string, isSelected: boolean) => {
    onChange(
      permissions.map(p => {
        if (p.module === module) {
          return {
            ...p,
            actions: isSelected
              ? [...p.actions, action] as ('create' | 'read' | 'update' | 'delete')[]
              : p.actions.filter(a => a !== action),
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Add Permission */}
      <div className="flex items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="font-medium bg-black text-white"
            >
              Select Module
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Module selection"
            selectionMode="single"
            selectedKeys={selectedModule}
            onSelectionChange={setSelectedModule}
            disabledKeys={permissions.map(p => p.module)}
          >
            {moduleOptions.map((module) => (
              <DropdownItem key={module.key}>{module.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          color="primary"
          startContent={<HiOutlinePlus className="w-4 h-4" />}
          className="font-medium bg-black text-white"
          isDisabled={selectedModule.size === 0}
          onPress={handleAddPermission}
        >
          Add Permission
        </Button>
      </div>

      {/* Permissions List */}
      <div className="grid gap-4">
        {permissions.map((permission) => (
          <Card key={permission.module}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  {/* Module Name */}
                  <h4 className="font-medium">
                    {moduleOptions.find(m => m.key === permission.module)?.label}
                  </h4>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    {actionOptions.map((action) => (
                      <Checkbox
                        key={action.key}
                        isSelected={permission.actions.includes(action.key as any)}
                        onValueChange={(isSelected) =>
                          handleActionToggle(permission.module, action.key, isSelected)
                        }
                      >
                        {action.label}
                      </Checkbox>
                    ))}
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={() => handleRemovePermission(permission.module)}
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
