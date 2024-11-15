import { MOCK_USERS, MOCK_SCHOOLS } from "@/lib/data/mock";
import { LoginFormData } from "@/lib/validations/auth.schema";
import { UserRoleType } from "@/types/auth.types";


interface AuthenticatedUser {
  id: string;
  role: UserRoleType;
  schoolId?: string;
  department?: string;
}

export async function validateCredentials(
  credentials: LoginFormData
): Promise<AuthenticatedUser> {
  try {
    // Extract school prefix from user ID (first 3 characters)
    const schoolPrefix = credentials.userId.split('-')[0];

    // Only check school prefix for non-admin users
    if (credentials.role !== 'ADMIN') {
      // Find school by prefix
      const school = MOCK_SCHOOLS.find(s => s.prefix === schoolPrefix);
      if (!school) {
        throw new Error("Invalid school prefix");
      }
    } else if (schoolPrefix !== 'SYS') {
      // For admin users, ensure they're using the SYS prefix
      throw new Error("Invalid system admin prefix");
    }

    // Find matching user
    const user = MOCK_USERS.find(
      (u) => 
        u.userId === credentials.userId && 
        u.password === credentials.password &&
        u.role === credentials.role
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.userId,
      role: user.role,
      schoolId: user.schoolId,
      department: user.department,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Authentication failed");
  }
}
