export interface School {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'tertiary';
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  isActive: boolean;
  logo: string;
  description: string;
  features: string[];
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
    name: 'Cambridge International School',
    type: 'secondary',
    status: 'active',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60',
    description: 'A leading international school providing world-class education with a focus on academic excellence and personal development.',
    features: ['International Curriculum', 'Advanced Labs', 'Sports Complex', 'Arts Center'],
    location: {
      address: '123 Education Drive',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria'
    },
    contact: {
      email: 'info@cambridge.edu.ng',
      phone: '+234 123 456 7890',
      website: 'www.cambridge.edu.ng',
      adminName: 'Dr. James Wilson',
      adminEmail: 'admin@cambridge.edu.ng',
      adminPhone: '+234 123 456 7891'
    },
    metrics: {
      totalStudents: 1200,
      totalTeachers: 80,
      classrooms: 45,
      performanceIndex: 92
    },
    lastActive: '2024-03-20'
  },
  {
    id: '2',
    name: 'St. Mary\'s Primary School',
    type: 'primary',
    status: 'active',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=60',
    description: 'Nurturing young minds with a balanced approach to education, focusing on academic excellence and character development.',
    features: ['Modern Library', 'Play Areas', 'Music Room', 'Computer Lab'],
    location: {
      address: '45 Church Street',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria'
    },
    contact: {
      email: 'info@stmarys.edu.ng',
      phone: '+234 123 456 7892',
      website: 'www.stmarys.edu.ng',
      adminName: 'Mrs. Sarah Johnson',
      adminEmail: 'admin@stmarys.edu.ng',
      adminPhone: '+234 123 456 7893'
    },
    metrics: {
      totalStudents: 600,
      totalTeachers: 40,
      classrooms: 25,
      performanceIndex: 88
    },
    lastActive: '2024-03-19'
  },
  {
    id: '3',
    name: 'Tech University of Innovation',
    type: 'tertiary',
    status: 'active',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60',
    description: 'A modern university focused on technology, innovation, and entrepreneurship, preparing students for the digital age.',
    features: ['Research Centers', 'Innovation Hub', 'Tech Incubator', 'Digital Library'],
    location: {
      address: '789 Innovation Avenue',
      city: 'Port Harcourt',
      state: 'Rivers',
      country: 'Nigeria'
    },
    contact: {
      email: 'info@techuni.edu.ng',
      phone: '+234 123 456 7894',
      website: 'www.techuni.edu.ng',
      adminName: 'Prof. David Okonkwo',
      adminEmail: 'admin@techuni.edu.ng',
      adminPhone: '+234 123 456 7895'
    },
    metrics: {
      totalStudents: 5000,
      totalTeachers: 300,
      classrooms: 120,
      performanceIndex: 95
    },
    lastActive: '2024-03-18'
  }
];
