import { z } from 'zod';

export const permissionSchema = z.object({
  module: z.string().min(1, 'Module is required'),
  actions: z.array(z.enum(['create', 'read', 'update', 'delete'])).min(1, 'At least one action is required'),
});

export const roleFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be less than 200 characters'),
  permissions: z.array(permissionSchema).min(1, 'At least one permission is required'),
});

export type RoleFormData = z.infer<typeof roleFormSchema>;
export type PermissionFormData = z.infer<typeof permissionSchema>;
