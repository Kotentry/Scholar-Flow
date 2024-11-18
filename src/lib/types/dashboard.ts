export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalRevenue: number;
  attendanceRate: number;
  performanceRate: number;
}

export interface AttendanceData {
  date: string;
  students: number;
  teachers: number;
}

export interface PerformanceData {
  subject: string;
  score: number;
  average: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface ActivityLog {
  id: string;
  type: 'academic' | 'administrative' | 'financial' | 'general';
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'event' | 'holiday' | 'meeting';
  description: string;
}

export interface DashboardData {
  stats: SchoolStats;
  attendanceData: AttendanceData[];
  performanceData: PerformanceData[];
  revenueData: RevenueData[];
  recentActivities: ActivityLog[];
  upcomingEvents: UpcomingEvent[];
}
