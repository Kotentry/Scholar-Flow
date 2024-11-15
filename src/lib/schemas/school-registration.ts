import { z } from 'zod';

// Module Pricing and Configuration
export const moduleConfig = {
  defaultModules: [
    {
      id: 'academic',
      name: 'Academic Management',
      description: 'Core academic management features',
      price: 0, // Free
      isDefault: true,
      features: ['Basic Curriculum Management', 'Simple Assessment System', 'Basic Grade Book'],
    },
    {
      id: 'attendance',
      name: 'Basic Attendance',
      description: 'Essential attendance tracking',
      price: 0, // Free
      isDefault: true,
      features: ['Student Attendance', 'Basic Reports', 'Manual Entry'],
    },
    {
      id: 'communication',
      name: 'Basic Communication',
      description: 'Essential communication tools',
      price: 0, // Free
      isDefault: true,
      features: ['Basic Announcements', 'Simple Messaging', 'Email Notifications'],
    },
  ],
  premiumModules: [
    {
      id: 'academic_pro',
      name: 'Academic Pro',
      description: 'Advanced academic management suite',
      price: 2500, // GHS
      features: ['Advanced Curriculum Planning', 'Complex Assessment Tools', 'Advanced Analytics'],
    },
    {
      id: 'financial',
      name: 'Financial Management',
      description: 'Complete financial management system',
      price: 3000,
      features: ['Fee Management', 'Payroll System', 'Budget Planning'],
    },
    {
      id: 'communication_pro',
      name: 'Communication Pro',
      description: 'Advanced communication platform',
      price: 1500,
      features: ['SMS Integration', 'Parent Portal', 'Multi-channel Communications'],
    },
    {
      id: 'hr',
      name: 'HR Management',
      description: 'Staff management and recruitment',
      price: 2000,
      features: ['Staff Records', 'Recruitment', 'Performance Reviews'],
    },
    {
      id: 'library',
      name: 'Library Management',
      description: 'Digital library management system',
      price: 1800,
      features: ['Book Inventory', 'Digital Lending', 'Resource Tracking'],
    },
  ],
};

// Basic Information Schema
export const basicInfoSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  type: z.enum(['primary', 'secondary', 'tertiary'], {
    required_error: 'Please select a school type',
  }),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

// Location Schema
export const locationSchema = z.object({
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'Please enter a valid city'),
  state: z.string().min(2, 'Please enter a valid state/province'),
  country: z.string().min(2, 'Please enter a valid country'),
  postalCode: z.string().min(4, 'Please enter a valid postal code'),
});

// Contact Schema
export const contactSchema = z.object({
  principalName: z.string().min(3, 'Please enter the principal\'s name'),
  principalEmail: z.string().email('Please enter a valid email address'),
  principalPhone: z.string().min(10, 'Please enter a valid phone number'),
  adminName: z.string().min(3, 'Please enter the administrator\'s name'),
  adminEmail: z.string().email('Please enter a valid email address'),
  adminPhone: z.string().min(10, 'Please enter a valid phone number'),
});

// Infrastructure Schema
export const infrastructureSchema = z.object({
  totalClassrooms: z.number().min(1, 'Must have at least 1 classroom'),
  hasLibrary: z.boolean(),
  hasLaboratory: z.boolean(),
  hasSportsGround: z.boolean(),
  hasCanteen: z.boolean(),
  totalCapacity: z.number().min(1, 'Total capacity must be at least 1'),
});

// Documents Schema
export const documentsSchema = z.object({
  registrationCertificate: z.any()
    .refine((file) => file instanceof File, 'Registration certificate is required'),
  taxDocument: z.any()
    .refine((file) => file instanceof File, 'Tax document is required'),
  licenseCertificate: z.any()
    .refine((file) => file instanceof File, 'License certificate is required'),
  otherDocuments: z.array(z.any()).optional(),
});

// Modules Schema
export const modulesSchema = z.object({
  selectedModules: z.array(z.string())
    .refine(
      (modules) => {
        // Check if all default modules are selected
        const defaultModuleIds = moduleConfig.defaultModules.map(m => m.id);
        return defaultModuleIds.every(id => modules.includes(id));
      },
      'Default modules are required'
    ),
});

// Complete Registration Schema
export const schoolRegistrationSchema = z.object({
  basicInfo: basicInfoSchema,
  location: locationSchema,
  contact: contactSchema,
  infrastructure: infrastructureSchema,
  documents: documentsSchema,
  modules: modulesSchema,
});
