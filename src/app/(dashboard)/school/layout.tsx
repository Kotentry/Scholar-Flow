import SchoolLayout from "@/components/layout/SchoolLayout";

export default function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SchoolLayout>{children}</SchoolLayout>;
}
