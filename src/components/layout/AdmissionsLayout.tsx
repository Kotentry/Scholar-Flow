"use client";

import { School } from "@/lib/data/schoolsData";
import AdmissionsSidebar  from "@/components/sidebars/AdmissionsSidebar";

interface AdmissionsLayoutProps {
  children: React.ReactNode;
  school: School;
}

export default function AdmissionsLayout({ children, school }: AdmissionsLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdmissionsSidebar school={school} />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
