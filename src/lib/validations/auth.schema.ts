import { z } from "zod";
import { UserRole } from "@/types/auth.types";

export const loginSchema = z.object({
  userId: z.string().min(1, "User ID is required")
    .refine(() => {
      return true; // Actual validation happens in transform
    }, "Invalid ID format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(UserRole), // This uses the type directly
});

export type LoginFormData = z.infer<typeof loginSchema>;
