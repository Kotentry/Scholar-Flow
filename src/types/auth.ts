export type UserRole = 'ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export type Department = 'SCIENCE' | 'MATHEMATICS' | 'LANGUAGES' | 'ARTS' | 'SPORTS';

export type AdminLevel = 'A' | 'B' | 'C';

export interface SchoolInfo {
  id: string;
  name: string;
  prefix: string;
  address: string;
  contactPhone: string;
}

export interface UserCredentials {
  schoolId?: string;     // School's unique ID (not required for system admins)
  userId: string;       // Generated ID (e.g., SYS-A-0001 or HAR-T-SC-0001)
  password: string;     // Initially generated, can be changed later
  role: UserRole;
  department?: Department;
  adminLevel?: AdminLevel;
}

export interface LoginCredentials {
  userId: string;
  password: string;
  role: UserRole;
}

// Helper function to format user ID as typed
export const formatUserId = (input: string, role: UserRole): string => {
  // Remove all non-alphanumeric characters except hyphens
  const cleaned = input.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  
  // Split by hyphens or by character positions if no hyphens
  let parts: string[];
  if (cleaned.includes('-')) {
    parts = cleaned.split('-');
  } else {
    // Auto-split based on expected format
    if (role === 'ADMIN') {
      // SYS-A-0000
      parts = [
        cleaned.slice(0, 3), // SYS
        cleaned.slice(3, 4), // A
        cleaned.slice(4)     // numbers
      ].filter(Boolean);
    } else {
      // XXX-Y-ZZ-0000
      parts = [
        cleaned.slice(0, 3), // School code
        cleaned.slice(3, 4), // Role
        cleaned.slice(4, 6), // Department
        cleaned.slice(6)     // numbers
      ].filter(Boolean);
    }
  }
  
  if (role === 'ADMIN') {
    // Format: SYS-X-0000 (where X is admin level)
    const prefix = (parts[0] || '').replace(/[^A-Z]/g, '').slice(0, 3);
    if (!prefix) return '';
    
    const level = parts[1]?.replace(/[^A-Z]/g, '').slice(0, 1);
    if (!level && parts.length < 2) return prefix;
    
    const numbers = parts[2]?.replace(/[^0-9]/g, '').slice(0, 4);
    if (!numbers && parts.length < 3) return `${prefix}-${level}`;
    
    // Only format numbers if they're complete or if we're not in the number section
    if (numbers?.length === 4 || parts.length < 3) {
      return `${prefix}-${level}${numbers ? `-${numbers.padEnd(4, '0')}` : ''}`;
    }
    
    // Return raw input while typing numbers
    return cleaned;
  } else {
    // Format: XXX-Y-ZZ-0000 (school code - role - dept - number)
    const prefix = (parts[0] || '').replace(/[^A-Z]/g, '').slice(0, 3);
    if (!prefix) return '';
    
    const role = parts[1]?.replace(/[^A-Z]/g, '').slice(0, 1);
    if (!role && parts.length < 2) return prefix;
    
    const dept = parts[2]?.replace(/[^A-Z]/g, '').slice(0, 2);
    if (!dept && parts.length < 3) return `${prefix}-${role}`;
    
    const numbers = parts[3]?.replace(/[^0-9]/g, '').slice(0, 4);
    if (!numbers && parts.length < 4) return `${prefix}-${role}-${dept}`;
    
    // Only format numbers if they're complete or if we're not in the number section
    if (numbers?.length === 4 || parts.length < 4) {
      return `${prefix}-${role}-${dept}${numbers ? `-${numbers.padEnd(4, '0')}` : ''}`;
    }
    
    // Return raw input while typing numbers
    return cleaned;
  }
};

// Helper function to validate user ID format
export const isValidUserId = (userId: string, role: UserRole): boolean => {
  if (role === 'ADMIN') {
    // SYS-[ABC]-\d{4} where first parts must be letters and last part must be numbers
    return /^[A-Z]{3}-[ABC]-[0-9]{4}$/.test(userId);
  }
  
  // XXX-[ASTPC]-(?:[A-Z]{2}-)?\d{4} where all parts except last 4 digits must be letters
  const schoolPattern = /^[A-Z]{3}-[ASTPC](?:-[A-Z]{2})?-[0-9]{4}$/;
  return schoolPattern.test(userId);
};

// Helper function to generate user ID
export const generateUserId = (
  schoolPrefix: string,
  role: UserRole,
  department?: Department,
  sequence?: number
): string => {
  const roleMap: Record<UserRole, string> = {
    ADMIN: 'A',
    SCHOOL_ADMIN: 'A',
    TEACHER: 'T',
    STUDENT: 'S',
    PARENT: 'P'
  };

  const seq = String(sequence || 1).padStart(4, '0');
  const roleCode = roleMap[role];
  const deptCode = department ? `-${department.substring(0, 2)}` : '';

  return `${schoolPrefix}-${roleCode}${deptCode}-${seq}`;
};

// Mock schools data
export const MOCK_SCHOOLS: SchoolInfo[] = [
  {
    id: '1',
    name: 'Hariom Academy',
    prefix: 'HAR',
    address: '123 Education Street',
    contactPhone: '+1234567890'
  },
  {
    id: '2',
    name: 'Springfield Elementary',
    prefix: 'SPR',
    address: '456 Learning Avenue',
    contactPhone: '+1234567891'
  }
];

// Mock users data
export const MOCK_USERS: UserCredentials[] = [
  {
    userId: 'SYS-A-0001',
    password: 'admin123',
    role: 'ADMIN',
    adminLevel: 'A'
  },
  {
    userId: 'SYS-B-0001',
    password: 'admin456',
    role: 'ADMIN',
    adminLevel: 'B'
  },
  {
    schoolId: '1',
    userId: 'HAR-A-0001',
    password: 'school123',
    role: 'SCHOOL_ADMIN'
  },
  {
    schoolId: '1',
    userId: 'HAR-T-SC-0001',
    password: 'teacher123',
    role: 'TEACHER',
    department: 'SCIENCE'
  },
  {
    schoolId: '1',
    userId: 'HAR-S-0001',
    password: 'student123',
    role: 'STUDENT'
  },
  {
    schoolId: '1',
    userId: 'HAR-P-0001',
    password: 'parent123',
    role: 'PARENT'
  }
];
