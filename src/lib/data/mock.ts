import { SchoolInfo, UserCredentials } from "@/types/auth.types";

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
    department: 'SC'
  }
];
