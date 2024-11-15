import { 
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserAdd,
  HiOutlineUserRemove,
  HiOutlineLockClosed,
  HiOutlineKey,
} from 'react-icons/hi';

export interface Administrator {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
  permissions: string[];
  avatar?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  usersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  type: 'auth' | 'user' | 'role' | 'permission' | 'system';
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

// Dummy Administrators Data
export const administrators: Administrator[] = [
  {
    id: 'ADM001',
    name: 'John Doe',
    email: 'john.doe@scholarflow.com',
    role: 'Super Admin',
    status: 'active',
    lastActive: '2024-01-20T10:30:00Z',
    permissions: ['all'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: 'ADM002',
    name: 'Jane Smith',
    email: 'jane.smith@scholarflow.com',
    role: 'System Admin',
    status: 'active',
    lastActive: '2024-01-20T09:45:00Z',
    permissions: ['manage_users', 'manage_schools', 'view_reports'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
  {
    id: 'ADM003',
    name: 'Mike Johnson',
    email: 'mike.johnson@scholarflow.com',
    role: 'Support Admin',
    status: 'inactive',
    lastActive: '2024-01-19T16:20:00Z',
    permissions: ['view_schools', 'manage_support'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  },
];

// Dummy Roles Data
export const roles: Role[] = [
  {
    id: 'ROLE001',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: [
      {
        id: 'PERM001',
        name: 'All Access',
        description: 'Complete system access',
        module: 'System',
        actions: ['create', 'read', 'update', 'delete'],
      },
    ],
    usersCount: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'ROLE002',
    name: 'System Admin',
    description: 'System administration with limited restrictions',
    permissions: [
      {
        id: 'PERM002',
        name: 'User Management',
        description: 'Manage system users',
        module: 'Users',
        actions: ['create', 'read', 'update'],
      },
      {
        id: 'PERM003',
        name: 'School Management',
        description: 'Manage schools',
        module: 'Schools',
        actions: ['create', 'read', 'update', 'delete'],
      },
    ],
    usersCount: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'ROLE003',
    name: 'Support Admin',
    description: 'Handle support and basic system operations',
    permissions: [
      {
        id: 'PERM004',
        name: 'Support Management',
        description: 'Manage support tickets',
        module: 'Support',
        actions: ['read', 'update'],
      },
      {
        id: 'PERM005',
        name: 'School Viewing',
        description: 'View school information',
        module: 'Schools',
        actions: ['read'],
      },
    ],
    usersCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
];

// Activity Types Configuration
export const activityTypes = {
  auth: {
    icon: HiOutlineKey,
    color: 'warning',
  },
  user: {
    icon: HiOutlineUser,
    color: 'primary',
  },
  role: {
    icon: HiOutlineLockClosed,
    color: 'secondary',
  },
  permission: {
    icon: HiOutlineKey,
    color: 'success',
  },
  system: {
    icon: HiOutlineCog,
    color: 'default',
  },
};

// Dummy Activity Logs
export const activityLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    userId: 'ADM001',
    userName: 'John Doe',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    action: 'User Login',
    type: 'auth',
    details: 'Successful login from Chrome browser',
    ipAddress: '192.168.1.1',
    timestamp: '2024-01-20T10:30:00Z',
    status: 'success',
  },
  {
    id: 'LOG002',
    userId: 'ADM002',
    userName: 'Jane Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    action: 'Created New Role',
    type: 'role',
    details: 'Created new role: Support Admin',
    ipAddress: '192.168.1.2',
    timestamp: '2024-01-20T09:45:00Z',
    status: 'success',
  },
  {
    id: 'LOG003',
    userId: 'ADM003',
    userName: 'Mike Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    action: 'Permission Update',
    type: 'permission',
    details: 'Modified permissions for role: System Admin',
    ipAddress: '192.168.1.3',
    timestamp: '2024-01-19T16:20:00Z',
    status: 'warning',
  },
  {
    id: 'LOG004',
    userId: 'ADM001',
    userName: 'John Doe',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    action: 'User Deactivated',
    type: 'user',
    details: 'Deactivated user account: support.admin',
    ipAddress: '192.168.1.1',
    timestamp: '2024-01-19T14:15:00Z',
    status: 'success',
  },
  {
    id: 'LOG005',
    userId: 'ADM002',
    userName: 'Jane Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    action: 'Failed Login',
    type: 'auth',
    details: 'Failed login attempt from unknown IP',
    ipAddress: '192.168.1.100',
    timestamp: '2024-01-19T12:30:00Z',
    status: 'failed',
  },
];
