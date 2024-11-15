import { Department, UserRoleType } from "@/types/auth.types";

export const formatUserId = (input: string, role: UserRoleType): string => {
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

export const isValidUserId = (userId: string, role: UserRoleType): boolean => {
  const parts = userId.split('-');
  
  if (role === 'ADMIN') {
    // SYS-A-0001 format
    if (parts.length !== 3) return false;
    if (parts[0] !== 'SYS') return false;
    if (!/^[ABC]$/.test(parts[1])) return false;
    if (!/^\d{4}$/.test(parts[2])) return false;
    return true;
  } else {
    // School format: XXX-Y-ZZ-0001
    const roleMap: Record<UserRoleType, string> = {
      ADMIN: 'A',
      SCHOOL_ADMIN: 'A',
      TEACHER: 'T',
      STUDENT: 'S',
      PARENT: 'P'
    };

    if (parts.length !== (role === 'TEACHER' ? 4 : 3)) return false;
    if (!/^[A-Z]{3}$/.test(parts[0])) return false;
    if (parts[1] !== roleMap[role]) return false;
    
    if (role === 'TEACHER') {
      if (!/^[A-Z]{2}$/.test(parts[2])) return false;
      if (!/^\d{4}$/.test(parts[3])) return false;
    } else {
      if (!/^\d{4}$/.test(parts[2])) return false;
    }
    
    return true;
  }
};

export const generateUserId = (
  schoolPrefix: string,
  role: UserRoleType,
  department?: Department,
  sequence?: number
): string => {
  const roleMap: Record<UserRoleType, string> = {
    ADMIN: 'A',
    SCHOOL_ADMIN: 'A',
    TEACHER: 'T',
    STUDENT: 'S',
    PARENT: 'P'
  };

  const seq = String(sequence || 1).padStart(4, '0');
  const roleCode = roleMap[role];
  const deptCode = department ? `-${department}` : '';

  return `${schoolPrefix}-${roleCode}${deptCode}-${seq}`;
};
