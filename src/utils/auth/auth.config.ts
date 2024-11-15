import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { validateCredentials } from "./validate-credentials";
import { LoginFormData} from '@/lib/validations/auth.schema';



export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        const typedCredentials = credentials as LoginFormData;
        
        if (!typedCredentials?.userId || !typedCredentials?.password || !typedCredentials?.role) {
          throw Error("Missing credentials");
        }

        try {
          return await validateCredentials(typedCredentials);
        } catch (error) {
          if (error instanceof Error) {
            throw Error(error.message || "Authentication failed");
          }else{
            throw Error("Authentication failed");
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
