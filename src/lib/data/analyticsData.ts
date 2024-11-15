import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineClipboardCheck,
  HiOutlineExclamation,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineGlobe,
} from 'react-icons/hi';

export const kpiStats = [
  {
    id: 1,
    title: 'Total Schools',
    value: 150,
    change: 12,
    trend: 'up',
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 2,
    title: 'Total Students',
    value: 25000,
    change: 8,
    trend: 'up',
    icon: HiOutlineAcademicCap,
  },
  {
    id: 3,
    title: 'Total Staff',
    value: 1200,
    change: 5,
    trend: 'up',
    icon: HiOutlineUserGroup,
  },
  {
    id: 4,
    title: 'Total Revenue',
    value: 'GHS 2.5M',
    change: 15,
    trend: 'up',
    icon: HiOutlineCurrencyDollar,
  },
  {
    id: 5,
    title: 'Collection Rate',
    value: '85%',
    change: -2,
    trend: 'down',
    icon: HiOutlineChartBar,
  },
  {
    id: 6,
    title: 'System Usage',
    value: '92%',
    change: 3,
    trend: 'up',
    icon: HiOutlineClipboardCheck,
  },
];

export const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      name: 'Revenue',
      data: [350000, 420000, 380000, 450000, 480000, 520000],
    },
    {
      name: 'Collections',
      data: [300000, 380000, 320000, 420000, 400000, 450000],
    },
  ],
};

export const userEngagementData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      name: 'Active Users',
      data: [2500, 3200, 2800, 3100, 2900, 1800, 1500],
    },
  ],
};

export const quickInsights = [
  {
    id: 1,
    title: 'New School Registrations',
    value: 5,
    status: 'success',
    time: '2 hours ago',
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 2,
    title: 'Pending Staff Approvals',
    value: 12,
    status: 'warning',
    time: '1 hour ago',
    icon: HiOutlineUserGroup,
  },
  {
    id: 3,
    title: 'Payment Issues',
    value: 3,
    status: 'danger',
    time: '30 minutes ago',
    icon: HiOutlineExclamation,
  },
  {
    id: 4,
    title: 'System Updates',
    value: 2,
    status: 'primary',
    time: '1 day ago',
    icon: HiOutlineClock,
  },
];

export const systemHealth = [
  {
    id: 1,
    title: 'System Security',
    status: 'success',
    value: '98%',
    description: 'All security measures are up to date',
    icon: HiOutlineShieldCheck,
  },
  {
    id: 2,
    title: 'Server Status',
    status: 'success',
    value: '100%',
    description: 'All servers are operational',
    icon: HiOutlineServer,
  },
  {
    id: 3,
    title: 'Database Performance',
    status: 'warning',
    value: '85%',
    description: 'Minor optimization needed',
    icon: HiOutlineDatabase,
  },
  {
    id: 4,
    title: 'API Response Time',
    status: 'success',
    value: '120ms',
    description: 'Response time is optimal',
    icon: HiOutlineGlobe,
  },
];
