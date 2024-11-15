export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketCategory = 'technical' | 'billing' | 'account' | 'general';
export type UserRole = 'school_admin' | 'teacher' | 'parent' | 'student';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    school: string;
    role: UserRole;
  };
  messages: {
    id: string;
    content: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
      role: 'user' | 'staff';
    };
    attachments?: {
      id: string;
      name: string;
      url: string;
      size: number;
    }[];
  }[];
}

export const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Cannot access student records',
    description: 'I am unable to view or edit student records in the system. Getting an error message.',
    category: 'technical',
    priority: 'high',
    status: 'open',
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-02-10T09:00:00Z',
    user: {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@school.com',
      school: 'Accra Academy',
      role: 'teacher',
    },
    messages: [
      {
        id: 'MSG-001',
        content: 'Hello, I keep getting an "Access Denied" error when trying to view student records. I have attached a screenshot of the error.',
        createdAt: '2024-02-10T09:00:00Z',
        sender: {
          id: 'USR-001',
          name: 'John Smith',
          role: 'user',
        },
        attachments: [
          {
            id: 'ATT-001',
            name: 'error-screenshot.png',
            url: '/attachments/error-screenshot.png',
            size: 245000,
          },
        ],
      },
      {
        id: 'MSG-002',
        content: 'Hi John, thank you for reporting this issue. Could you please let me know which specific student records you were trying to access?',
        createdAt: '2024-02-10T09:15:00Z',
        sender: {
          id: 'STF-001',
          name: 'Support Team',
          role: 'staff',
        },
      },
      {
        id: 'MSG-003',
        content: 'I was trying to access the Grade 10 Science class records. This was working fine yesterday.',
        createdAt: '2024-02-10T09:20:00Z',
        sender: {
          id: 'USR-001',
          name: 'John Smith',
          role: 'user',
        },
      },
      {
        id: 'MSG-004',
        content: 'I understand. We had a system update last night that might have affected some permissions. Let me check and fix this for you.',
        createdAt: '2024-02-10T09:25:00Z',
        sender: {
          id: 'STF-001',
          name: 'Support Team',
          role: 'staff',
        },
      },
    ],
  },
  {
    id: 'TKT-002',
    title: 'Payment not reflecting',
    description: 'Made a payment yesterday but it is not showing in the system.',
    category: 'billing',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-02-09T14:30:00Z',
    updatedAt: '2024-02-10T10:15:00Z',
    user: {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@school.com',
      school: 'Wesley Girls',
      role: 'school_admin',
    },
    messages: [
      {
        id: 'MSG-005',
        content: 'I made a payment of GHS 2,500 via mobile money yesterday but it\'s not showing in our account. I have attached the receipt.',
        createdAt: '2024-02-09T14:30:00Z',
        sender: {
          id: 'USR-002',
          name: 'Sarah Johnson',
          role: 'user',
        },
        attachments: [
          {
            id: 'ATT-002',
            name: 'payment-receipt.pdf',
            url: '/attachments/payment-receipt.pdf',
            size: 125000,
          },
        ],
      },
      {
        id: 'MSG-006',
        content: 'Hello Sarah, I can help you with this. Could you please provide the transaction reference number from your receipt?',
        createdAt: '2024-02-09T14:45:00Z',
        sender: {
          id: 'STF-002',
          name: 'Support Team',
          role: 'staff',
        },
      },
      {
        id: 'MSG-007',
        content: 'The reference number is MOB-2024-0209-1234',
        createdAt: '2024-02-09T14:50:00Z',
        sender: {
          id: 'USR-002',
          name: 'Sarah Johnson',
          role: 'user',
        },
      },
      {
        id: 'MSG-008',
        content: 'Thank you. I can see the transaction in our payment gateway. It seems there was a delay in syncing. I\'m processing it now and it should reflect in your account within the next 30 minutes.',
        createdAt: '2024-02-09T15:00:00Z',
        sender: {
          id: 'STF-002',
          name: 'Support Team',
          role: 'staff',
        },
      },
    ],
  },
  {
    id: 'TKT-003',
    title: 'Unable to view child\'s grades',
    description: 'Cannot access my child\'s end of term grades.',
    category: 'technical',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-02-08T11:45:00Z',
    updatedAt: '2024-02-09T16:20:00Z',
    user: {
      id: 'USR-003',
      name: 'Michael Brown',
      email: 'michael.b@parent.com',
      school: 'Achimota School',
      role: 'parent',
    },
    messages: [
      {
        id: 'MSG-009',
        content: 'I\'m trying to view my son\'s end of term grades but getting a blank screen.',
        createdAt: '2024-02-08T11:45:00Z',
        sender: {
          id: 'USR-003',
          name: 'Michael Brown',
          role: 'user',
        },
      },
      {
        id: 'MSG-010',
        content: 'Hi Michael, I apologize for the inconvenience. Could you try clearing your browser cache and refreshing the page?',
        createdAt: '2024-02-08T12:00:00Z',
        sender: {
          id: 'STF-003',
          name: 'Support Team',
          role: 'staff',
        },
      },
      {
        id: 'MSG-011',
        content: 'I tried that but still having the same issue.',
        createdAt: '2024-02-08T12:05:00Z',
        sender: {
          id: 'USR-003',
          name: 'Michael Brown',
          role: 'user',
        },
      },
      {
        id: 'MSG-012',
        content: 'Let me check your account permissions... I found the issue. Your account wasn\'t properly linked to your child\'s profile. I\'ve fixed it now. Please try again.',
        createdAt: '2024-02-08T12:15:00Z',
        sender: {
          id: 'STF-003',
          name: 'Support Team',
          role: 'staff',
        },
      },
      {
        id: 'MSG-013',
        content: 'Perfect! I can see the grades now. Thank you for your help.',
        createdAt: '2024-02-08T12:20:00Z',
        sender: {
          id: 'USR-003',
          name: 'Michael Brown',
          role: 'user',
        },
      },
    ],
  },
];

export const userRoles = [
  { key: 'all', label: 'All Roles' },
  { key: 'school_admin', label: 'School Admin' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'parent', label: 'Parent' },
  { key: 'student', label: 'Student' },
];

export const ticketCategories = [
  { key: 'technical', label: 'Technical Support' },
  { key: 'billing', label: 'Billing & Payments' },
  { key: 'account', label: 'Account Management' },
  { key: 'general', label: 'General Inquiry' },
];

export const ticketPriorities = [
  { key: 'low', label: 'Low', color: 'default' },
  { key: 'medium', label: 'Medium', color: 'warning' },
  { key: 'high', label: 'High', color: 'danger' },
  { key: 'urgent', label: 'Urgent', color: 'danger' },
];

export const ticketStatuses = [
  { key: 'open', label: 'Open', color: 'warning' },
  { key: 'in_progress', label: 'In Progress', color: 'primary' },
  { key: 'resolved', label: 'Resolved', color: 'success' },
  { key: 'closed', label: 'Closed', color: 'default' },
];
