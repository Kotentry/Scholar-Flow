import { UserRole } from "@/types/auth.types";

export const redirectMap: Record<UserRole, string> = {
  ADMIN: "/admin/dashboard",
  SCHOOL_ADMIN: "/school/dashboard",
  TEACHER: "/teacher/dashboard",
  STUDENT: "/student/dashboard",
  PARENT: "/parent/dashboard",
} as const;
