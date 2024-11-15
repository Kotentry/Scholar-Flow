import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { UserRoleType } from "./auth.types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRoleType;
      schoolId?: string;
      department?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRoleType;
    schoolId?: string;
    department?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRoleType;
    schoolId?: string;
    department?: string;
  }
}
