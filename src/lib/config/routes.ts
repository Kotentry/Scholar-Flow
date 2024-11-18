import { UserRoleType } from "@/types/auth.types";

export const redirectMap: Record<UserRoleType, string> = {
  ADMIN: "/admin/dashboard",
  SCHOOL_ADMIN: "/school/dashboard",
  TEACHER: "/teacher/dashboard",
  STUDENT: "/student/dashboard",
  PARENT: "/parent/dashboard",
} as const;

// You can add more route configurations here
export const authRoutes = ["/login", "/register"] as const;
export const protectedRoutes = ["/dashboard", "/profile"] as const;

// Helper function to get dashboard route by role
export const getDashboardRoute = (role: UserRoleType): string => {
  return redirectMap[role];
};
