export const schoolStats = {
  totalSchools: 156,
  activeSchools: 142,
  pendingRegistrations: 8,
  inactiveSchools: 6,
  growthRate: 12.5,
  schoolTypes: {
    primary: 45,
    secondary: 68,
    tertiary: 43,
  },
  regions: {
    north: 42,
    south: 38,
    east: 35,
    west: 41,
  },
};

export const performanceMetrics = {
  averageAttendance: 94.5,
  averageGrades: 78.2,
  teacherRetention: 92.3,
  studentGrowth: 15.7,
  monthlyMetrics: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    attendance: [92, 94, 93, 95, 94, 96],
    grades: [75, 77, 76, 79, 78, 80],
    enrollment: [1200, 1250, 1300, 1350, 1400, 1450],
  },
};

export const recentActivities = [
  {
    id: 1,
    type: "registration",
    school: "Cambridge International School",
    action: "New School Registration",
    status: "pending",
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "enrollment",
    school: "Oxford Academy",
    action: "Bulk Student Enrollment",
    status: "success",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "academic",
    school: "St. Patrick's High",
    action: "Term Results Published",
    status: "success",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "administrative",
    school: "Riverside Elementary",
    action: "New Principal Assigned",
    status: "success",
    time: "5 hours ago",
  },
];

export const quickActions = [
  {
    id: 1,
    label: "Register School",
    description: "Add a new school to the system",
    icon: "building",
    href: "/admin/schools/new",
  },
  {
    id: 2,
    label: "View Reports",
    description: "Access detailed school reports",
    icon: "chart",
    href: "/admin/analytics/reports",
  },
  {
    id: 3,
    label: "Manage Users",
    description: "Handle user accounts and roles",
    icon: "users",
    href: "/admin/users",
  },
  {
    id: 4,
    label: "School Requests",
    description: "Review pending school requests",
    icon: "inbox",
    href: "/admin/schools/requests",
  },
];

export const schoolDistribution = {
  byType: {
    labels: ["Primary", "Secondary", "Tertiary"],
    data: [45, 68, 43],
  },
  byRegion: {
    labels: ["North", "South", "East", "West"],
    data: [42, 38, 35, 41],
  },
  byStatus: {
    labels: ["Active", "Pending", "Inactive"],
    data: [142, 8, 6],
  },
};

export const enrollmentTrends = {
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [15200, 15800, 16300, 16800, 17200, 17800],
  },
  bySchoolType: {
    labels: ["Primary", "Secondary", "Tertiary"],
    data: [8500, 6200, 3100],
  },
};
