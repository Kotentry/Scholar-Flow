import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Initial sign in
        token.id = user.id as string;
        token.role = user.role;
        token.schoolId = user.schoolId;
        token.department = user.department;
      }

      if (trigger === "update" && session) {
        // Handle session update
        return {
          ...token,
          id: session.user.id,
          role: session.user.role,
          schoolId: session.user.schoolId,
          department: session.user.department,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Send properties to the client
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.schoolId = token.schoolId;
        session.user.department = token.department;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});

