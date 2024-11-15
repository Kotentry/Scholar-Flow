import { Metadata } from "next";
import AuthContainer from "@/components/auth/AuthContainer";

export const metadata: Metadata = {
  title: "Login - Scholar Flow",
  description: "Access your educational dashboard",
};

export default function LoginPage() {
  return <AuthContainer />;
}