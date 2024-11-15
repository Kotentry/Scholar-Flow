export const UserRole = ["ADMIN", "SCHOOL_ADMIN", "TEACHER", "STUDENT", "PARENT"] as const;
export type UserRoleType = typeof UserRole[number];
export type AdminLevel = "A" | "B" | "C";
export type Department = "SC" | "AR" | "CO" | "EN" | "SS";

export interface SchoolInfo {
  id: string;
  name: string;
  prefix: string;
  address: string;
  contactPhone: string;
}

export interface UserCredentials {
  schoolId?: string;
  userId: string;
  password: string;
  role: UserRoleType;
  department?: Department;
  adminLevel?: AdminLevel;
}

export interface RoleOption {
  value: UserRoleType;
  label: string;
  icon: JSX.Element;
  description: string;
  idExample: string;
}

// Type for NextAuth session
export interface SessionUser {
  id: string;
  role: UserRoleType;
  schoolId?: string;
  
  department?: Department;
}
