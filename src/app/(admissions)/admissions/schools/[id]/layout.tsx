import AdmissionsLayout from "@/components/layout/AdmissionsLayout";
import { schools } from "@/lib/data/schoolsData";
import { notFound } from "next/navigation";

export default function SchoolLayout({ children, params }: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const school = schools.find((s) => s.id === params.id);

  if (!school) {
    notFound();
  }

  return (
    <AdmissionsLayout
      school={school}
      currentStep="personal-info"
      currentSubStep="basic-details"
      completedSteps={[]}
      completedSubSteps={[]}
    >
      {children}
    </AdmissionsLayout>
  );
}
