import { UserRoleType } from "@/types/auth.types";

export const redirectMap: Record<UserRoleType, string> = {
  ADMIN: "/admin/dashboard",
  SCHOOL_ADMIN: "/school/dashboard",
  TEACHER: "/teacher/dashboard",
  STUDENT: "/student/dashboard",
  PARENT: "/parent/dashboard",
} as const;
