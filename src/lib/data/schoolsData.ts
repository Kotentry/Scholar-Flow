export interface School {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'tertiary';
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  isActive: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
  };
  metrics: {
    totalStudents: number;
    totalTeachers: number;
    classrooms: number;
    performanceIndex: number;
  };
  lastActive: string;
}

export const schools: School[] = [
  {
    id: '1',
    name: "St. Mary's International School",
    type: 'secondary',
    status: 'active',
    isActive: true,
    location: {
      address: '123 Independence Avenue',
      city: 'Accra',
      state: 'Greater Accra',
      country: 'Ghana',
    },
    contact: {
      email: 'info@stmarys.edu.gh',
      phone: '+233 20 123 4567',
      website: 'https://stmarys.edu.gh',
      adminName: 'Mrs. Sarah Owusu',
      adminEmail: 'admin@stmarys.edu.gh',
      adminPhone: '+233 20 123 4569',
    },
    metrics: {
      totalStudents: 980,
      totalTeachers: 65,
      classrooms: 45,
      performanceIndex: 92,
    },
    lastActive: '2023-11-20T08:30:00Z',
  },
  {
    id: '2',
    name: 'Cambridge International Academy',
    type: 'primary',
    status: 'active',
    isActive: true,
    location: {
      address: '456 Liberation Road',
      city: 'Kumasi',
      state: 'Ashanti',
      country: 'Ghana',
    },
    contact: {
      email: 'info@cambridgeacademy.edu.gh',
      phone: '+233 20 234 5678',
      website: 'https://cambridgeacademy.edu.gh',
      adminName: 'Mr. John Addo',
      adminEmail: 'admin@cambridgeacademy.edu.gh',
      adminPhone: '+233 20 234 5679',
    },
    metrics: {
      totalStudents: 650,
      totalTeachers: 45,
      classrooms: 30,
      performanceIndex: 88,
    },
    lastActive: '2023-11-20T09:15:00Z',
  },
  {
    id: '3',
    name: 'Victory College',
    type: 'tertiary',
    status: 'pending',
    isActive: false,
    location: {
      address: '789 University Avenue',
      city: 'Cape Coast',
      state: 'Central',
      country: 'Ghana',
    },
    contact: {
      email: 'info@victorycollege.edu.gh',
      phone: '+233 20 345 6789',
      adminName: 'Dr. Emmanuel Koffi',
      adminEmail: 'admin@victorycollege.edu.gh',
      adminPhone: '+233 20 345 6780',
    },
    metrics: {
      totalStudents: 1200,
      totalTeachers: 85,
      classrooms: 60,
      performanceIndex: 85,
    },
    lastActive: '2023-11-19T14:45:00Z',
  },
  {
    id: '4',
    name: 'Royal Academy',
    type: 'secondary',
    status: 'inactive',
    isActive: false,
    location: {
      address: '321 Royal Street',
      city: 'Tamale',
      state: 'Northern',
      country: 'Ghana',
    },
    contact: {
      email: 'info@royalacademy.edu.gh',
      phone: '+233 20 456 7890',
      website: 'https://royalacademy.edu.gh',
      adminName: 'Mrs. Grace Mensah',
      adminEmail: 'admin@royalacademy.edu.gh',
      adminPhone: '+233 20 456 7891',
    },
    metrics: {
      totalStudents: 420,
      totalTeachers: 35,
      classrooms: 25,
      performanceIndex: 78,
    },
    lastActive: '2023-11-18T16:20:00Z',
  },
];
