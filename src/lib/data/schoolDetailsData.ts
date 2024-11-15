import { type SchoolRegistrationData } from '../types/school-registration';
import { moduleConfig } from '../schemas/school-registration';

// Sample school registration data
export const schoolDetails: SchoolRegistrationData = {
  basicInfo: {
    name: "St. Mary's International School",
    type: 'secondary',
    email: 'info@stmarys.edu.gh',
    phone: '+233 20 123 4567',
    website: 'https://stmarys.edu.gh',
  },
  location: {
    address: '123 Independence Avenue',
    city: 'Accra',
    state: 'Greater Accra',
    country: 'Ghana',
    postalCode: 'GA-123',
  },
  contact: {
    principalName: 'Dr. Kwame Mensah',
    principalEmail: 'principal@stmarys.edu.gh',
    principalPhone: '+233 20 123 4568',
    adminName: 'Mrs. Sarah Owusu',
    adminEmail: 'admin@stmarys.edu.gh',
    adminPhone: '+233 20 123 4569',
  },
  infrastructure: {
    totalClassrooms: 45,
    hasLibrary: true,
    hasLaboratory: true,
    hasSportsGround: true,
    hasCanteen: true,
    totalCapacity: 1200,
  },
  documents: {
    registrationCertificate: null,
    taxDocument: null,
    licenseCertificate: null,
    otherDocuments: [],
  },
  modules: {
    selectedModules: [
      'academic',
      'attendance',
      'communication',
      'financial',
      'hr',
      'library',
    ],
  },
};

// Performance metrics
export const performanceMetrics = {
  academicPerformance: {
    currentScore: 85,
    previousScore: 82,
    trend: 'up',
    details: {
      examPass: 92,
      attendance: 88,
      assignments: 84,
      extracurricular: 78,
    },
  },
  studentMetrics: {
    totalStudents: 980,
    newAdmissions: 150,
    graduationRate: 98,
    dropoutRate: 0.5,
    genderDistribution: {
      male: 510,
      female: 470,
    },
  },
  staffMetrics: {
    totalStaff: 85,
    teachingStaff: 65,
    nonTeachingStaff: 20,
    staffAttendance: 96,
    qualifiedTeachers: 62,
  },
  financialMetrics: {
    feeCollection: 92,
    outstandingDues: 850000,
    monthlyRevenue: 450000,
    monthlyExpenses: 380000,
    yearlyBudget: 5400000,
  },
};

// Module usage statistics
export const moduleUsageStats = {
  academic: {
    name: 'Academic Management',
    usagePercentage: 94,
    activeUsers: 78,
    lastSync: '2023-11-20T08:30:00Z',
    metrics: {
      coursesManaged: 45,
      assessmentsCreated: 280,
      gradesRecorded: 4500,
    },
  },
  attendance: {
    name: 'Attendance System',
    usagePercentage: 98,
    activeUsers: 82,
    lastSync: '2023-11-20T08:45:00Z',
    metrics: {
      dailyRecords: 950,
      averageAttendance: 94,
      lateArrivals: 23,
    },
  },
  communication: {
    name: 'Communication Portal',
    usagePercentage: 88,
    activeUsers: 920,
    lastSync: '2023-11-20T08:15:00Z',
    metrics: {
      messagesSent: 1250,
      announcements: 45,
      parentResponses: 780,
    },
  },
  financial: {
    name: 'Financial Management',
    usagePercentage: 92,
    activeUsers: 15,
    lastSync: '2023-11-20T08:00:00Z',
    metrics: {
      transactions: 450,
      invoicesGenerated: 980,
      paymentsProcessed: 850,
    },
  },
  hr: {
    name: 'HR Management',
    usagePercentage: 85,
    activeUsers: 12,
    lastSync: '2023-11-20T07:30:00Z',
    metrics: {
      leaveRequests: 25,
      recruitmentDrives: 2,
      performanceReviews: 65,
    },
  },
  library: {
    name: 'Library Management',
    usagePercentage: 78,
    activeUsers: 45,
    lastSync: '2023-11-20T08:20:00Z',
    metrics: {
      booksCheckedOut: 180,
      totalResources: 5800,
      activeReaders: 420,
    },
  },
};

// Recent activities
export const recentActivities = [
  {
    id: 1,
    type: 'academic',
    action: 'Exam Results Published',
    description: 'Final term examination results for Grade 10 published',
    timestamp: '2023-11-20T08:30:00Z',
    user: 'Dr. Kwame Mensah',
  },
  {
    id: 2,
    type: 'attendance',
    action: 'Attendance Report Generated',
    description: 'Monthly attendance report for November generated',
    timestamp: '2023-11-20T08:15:00Z',
    user: 'Mrs. Sarah Owusu',
  },
  {
    id: 3,
    type: 'financial',
    action: 'Fee Collection',
    description: 'Term 2 fee collection initiated for all classes',
    timestamp: '2023-11-20T08:00:00Z',
    user: 'Mr. John Addo',
  },
  {
    id: 4,
    type: 'communication',
    action: 'Announcement',
    description: 'Parent-Teacher meeting schedule announced',
    timestamp: '2023-11-19T15:30:00Z',
    user: 'Mrs. Sarah Owusu',
  },
  {
    id: 5,
    type: 'hr',
    action: 'Leave Approval',
    description: 'Approved leave request for 3 teaching staff',
    timestamp: '2023-11-19T14:45:00Z',
    user: 'Dr. Kwame Mensah',
  },
];
