import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholar Flow | Admissions",
  description: "Find and apply to the best schools that match your needs",
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      {children}
    </div>
  );
}
