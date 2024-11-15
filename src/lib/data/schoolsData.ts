export interface School {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'tertiary';
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  location: {
    city: string;
    state: string;
    country: string;
  };
  metrics: {
    totalStudents: number;
    totalTeachers: number;
    classrooms: number;
    performanceIndex: number;
  };
  contacts: {
    principal: string;
    email: string;
    phone: string;
  };
  modules: {
    id: string;
    name: string;
    status: 'active' | 'inactive';
  }[];
  registration: {
    date: string;
    licenseNo: string;
    expiryDate: string;
  };
  lastActive: string;
}

export const schools: School[] = [
  {
    id: "SCH001",
    name: "Cambridge International School",
    type: "secondary",
    status: "active",
    location: {
      city: "London",
      state: "Greater London",
      country: "United Kingdom"
    },
    metrics: {
      totalStudents: 1250,
      totalTeachers: 85,
      classrooms: 45,
      performanceIndex: 92
    },
    contacts: {
      principal: "Dr. Sarah Williams",
      email: "principal@cambridge.edu",
      phone: "+44 20 7123 4567"
    },
    modules: [
      { id: "MOD001", name: "Academic Management", status: "active" },
      { id: "MOD002", name: "Financial Management", status: "active" },
      { id: "MOD003", name: "Communication Portal", status: "active" }
    ],
    registration: {
      date: "2020-03-15",
      licenseNo: "UK-SEC-2020-001",
      expiryDate: "2025-03-14"
    },
    lastActive: "2024-01-15T09:30:00"
  },
  {
    id: "SCH002",
    name: "St. Patrick's Academy",
    type: "primary",
    status: "active",
    location: {
      city: "Dublin",
      state: "Leinster",
      country: "Ireland"
    },
    metrics: {
      totalStudents: 850,
      totalTeachers: 45,
      classrooms: 30,
      performanceIndex: 88
    },
    contacts: {
      principal: "Mr. James O'Connor",
      email: "principal@stpatricks.edu",
      phone: "+353 1 234 5678"
    },
    modules: [
      { id: "MOD001", name: "Academic Management", status: "active" },
      { id: "MOD004", name: "Attendance System", status: "active" }
    ],
    registration: {
      date: "2021-06-20",
      licenseNo: "IR-PRI-2021-034",
      expiryDate: "2026-06-19"
    },
    lastActive: "2024-01-14T16:45:00"
  },
  {
    id: "SCH003",
    name: "Oxford Academy",
    type: "tertiary",
    status: "pending",
    location: {
      city: "Oxford",
      state: "Oxfordshire",
      country: "United Kingdom"
    },
    metrics: {
      totalStudents: 2000,
      totalTeachers: 150,
      classrooms: 75,
      performanceIndex: 95
    },
    contacts: {
      principal: "Prof. Michael Thompson",
      email: "principal@oxfordacademy.edu",
      phone: "+44 1865 123456"
    },
    modules: [
      { id: "MOD001", name: "Academic Management", status: "inactive" },
      { id: "MOD002", name: "Financial Management", status: "inactive" }
    ],
    registration: {
      date: "2024-01-10",
      licenseNo: "Pending",
      expiryDate: "Pending"
    },
    lastActive: "2024-01-13T11:20:00"
  },
  {
    id: "SCH004",
    name: "Riverside Elementary",
    type: "primary",
    status: "inactive",
    location: {
      city: "Manchester",
      state: "Greater Manchester",
      country: "United Kingdom"
    },
    metrics: {
      totalStudents: 0,
      totalTeachers: 0,
      classrooms: 25,
      performanceIndex: 0
    },
    contacts: {
      principal: "Mrs. Emma Roberts",
      email: "principal@riverside.edu",
      phone: "+44 161 234 5678"
    },
    modules: [
      { id: "MOD001", name: "Academic Management", status: "inactive" },
      { id: "MOD004", name: "Attendance System", status: "inactive" }
    ],
    registration: {
      date: "2019-09-01",
      licenseNo: "UK-PRI-2019-089",
      expiryDate: "2024-08-31"
    },
    lastActive: "2023-12-31T15:00:00"
  },
  {
    id: "SCH005",
    name: "Edinburgh Science Academy",
    type: "secondary",
    status: "suspended",
    location: {
      city: "Edinburgh",
      state: "Scotland",
      country: "United Kingdom"
    },
    metrics: {
      totalStudents: 950,
      totalTeachers: 60,
      classrooms: 35,
      performanceIndex: 75
    },
    contacts: {
      principal: "Dr. Andrew MacLeod",
      email: "principal@edinburghscience.edu",
      phone: "+44 131 234 5678"
    },
    modules: [
      { id: "MOD001", name: "Academic Management", status: "inactive" },
      { id: "MOD002", name: "Financial Management", status: "inactive" },
      { id: "MOD003", name: "Communication Portal", status: "inactive" }
    ],
    registration: {
      date: "2021-01-15",
      licenseNo: "UK-SEC-2021-012",
      expiryDate: "2026-01-14"
    },
    lastActive: "2024-01-10T13:15:00"
  }
];
