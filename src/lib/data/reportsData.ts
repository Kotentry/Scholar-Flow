import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardCheck,
  HiOutlineChartBar,
} from 'react-icons/hi';

export const financialReports = {
  revenueBySchool: [
    { id: 1, school: 'Accra Academy', revenue: 450000, students: 800, collectionRate: 92 },
    { id: 2, school: 'Wesley Girls', revenue: 380000, students: 650, collectionRate: 88 },
    { id: 3, school: 'Achimota School', revenue: 520000, students: 950, collectionRate: 95 },
    { id: 4, school: 'Prempeh College', revenue: 410000, students: 750, collectionRate: 90 },
    { id: 5, school: 'Mfantsipim School', revenue: 390000, students: 700, collectionRate: 87 },
  ],
  paymentMethods: [
    { method: 'Mobile Money', percentage: 45, amount: 965000 },
    { method: 'Bank Transfer', percentage: 30, amount: 643000 },
    { method: 'Cash', percentage: 15, amount: 321000 },
    { method: 'Card', percentage: 10, amount: 214000 },
  ],
  outstandingPayments: [
    { id: 1, school: 'Accra Academy', amount: 45000, dueDate: '2024-02-15', status: 'overdue' },
    { id: 2, school: 'Wesley Girls', amount: 32000, dueDate: '2024-02-20', status: 'pending' },
    { id: 3, school: 'Achimota School', amount: 28000, dueDate: '2024-02-25', status: 'pending' },
    { id: 4, school: 'Prempeh College', amount: 38000, dueDate: '2024-02-10', status: 'overdue' },
    { id: 5, school: 'Mfantsipim School', amount: 42000, dueDate: '2024-02-28', status: 'pending' },
  ],
};

export const schoolReports = {
  enrollment: [
    { id: 1, school: 'Accra Academy', total: 800, newStudents: 120, withdrawals: 45, growth: 9.4 },
    { id: 2, school: 'Wesley Girls', total: 650, newStudents: 95, withdrawals: 35, growth: 9.2 },
    { id: 3, school: 'Achimota School', total: 950, newStudents: 140, withdrawals: 55, growth: 8.9 },
    { id: 4, school: 'Prempeh College', total: 750, newStudents: 110, withdrawals: 40, growth: 9.3 },
    { id: 5, school: 'Mfantsipim School', total: 700, newStudents: 105, withdrawals: 38, growth: 9.6 },
  ],
  staffing: [
    { id: 1, school: 'Accra Academy', teachers: 45, admins: 12, support: 15, ratio: 18 },
    { id: 2, school: 'Wesley Girls', teachers: 38, admins: 10, support: 12, ratio: 17 },
    { id: 3, school: 'Achimota School', teachers: 52, admins: 15, support: 18, ratio: 18 },
    { id: 4, school: 'Prempeh College', teachers: 42, admins: 11, support: 14, ratio: 18 },
    { id: 5, school: 'Mfantsipim School', teachers: 40, admins: 10, support: 13, ratio: 18 },
  ],
  performance: [
    { id: 1, school: 'Accra Academy', attendance: 92, grades: 85, satisfaction: 88 },
    { id: 2, school: 'Wesley Girls', attendance: 94, grades: 88, satisfaction: 90 },
    { id: 3, school: 'Achimota School', attendance: 91, grades: 86, satisfaction: 87 },
    { id: 4, school: 'Prempeh College', attendance: 93, grades: 87, satisfaction: 89 },
    { id: 5, school: 'Mfantsipim School', attendance: 92, grades: 85, satisfaction: 88 },
  ],
};

export const systemReports = {
  usage: [
    { module: 'Student Management', usage: 85, errors: 12, satisfaction: 90 },
    { module: 'Staff Management', usage: 78, errors: 8, satisfaction: 88 },
    { module: 'Financial Management', usage: 92, errors: 15, satisfaction: 85 },
    { module: 'Academic Management', usage: 88, errors: 10, satisfaction: 87 },
    { module: 'Communication', usage: 75, errors: 5, satisfaction: 92 },
  ],
  performance: [
    { metric: 'Response Time', value: '120ms', status: 'good', trend: 'stable' },
    { metric: 'Error Rate', value: '0.5%', status: 'good', trend: 'improving' },
    { metric: 'Uptime', value: '99.9%', status: 'excellent', trend: 'stable' },
    { metric: 'Database Load', value: '65%', status: 'warning', trend: 'increasing' },
    { metric: 'API Latency', value: '95ms', status: 'good', trend: 'improving' },
  ],
  security: [
    { event: 'Failed Login Attempts', count: 25, severity: 'medium', trend: 'decreasing' },
    { event: 'Data Access Violations', count: 3, severity: 'high', trend: 'stable' },
    { event: 'System Updates', count: 12, severity: 'low', trend: 'stable' },
    { event: 'Permission Changes', count: 45, severity: 'low', trend: 'increasing' },
    { event: 'Security Alerts', count: 8, severity: 'medium', trend: 'decreasing' },
  ],
};
