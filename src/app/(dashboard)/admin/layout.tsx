
import AdminLayout from "@/components/layout/AdminLayout";

export default function SystemAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
