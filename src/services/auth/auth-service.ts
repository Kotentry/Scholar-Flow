"use server";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/utils/auth/auth";
import { redirectMap } from "@/lib/constants/routes";
import { LoginFormData } from "@/lib/validations/auth.schema";



export async function signIn(credentials: LoginFormData) {
  try {
    const result = await nextAuthSignIn("credentials", {
      userId: credentials.userId,
      password: credentials.password,
      role: credentials.role,
      redirect: false,
    });

    if (result?.error) {
      throw new Error("Invalid credentials");
    }

    return { success: true, redirect: redirectMap[credentials.role] };
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.cause &&
        typeof error.cause === "object" &&
        "err" in error.cause
      ) {
        const underlyingError = (error.cause as { err: Error }).err;
        throw new Error(underlyingError.message || error.message);
      }
      throw error;
    
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function signInWithGoogle() {
  try {
    const result = await nextAuthSignIn("google", { redirect: false });
    
    if (result?.error) {
      throw new Error("Google sign-in failed");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred during Google sign-in");
  }
}

export async function signOut() {
  try {
    await nextAuthSignOut({ redirect: false });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred during sign out");
  }
}
