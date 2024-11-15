import { z } from 'zod';

export const administratorFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(50, 'Email must be less than 50 characters'),
  role: z
    .string()
    .min(1, 'Role is required'),
  status: z
    .enum(['active', 'inactive'])
    .default('active'),
  permissions: z
    .array(z.string())
    .min(1, 'At least one permission is required'),
});

export type AdministratorFormData = z.infer<typeof administratorFormSchema>;
