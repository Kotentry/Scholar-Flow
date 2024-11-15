import SchoolsList from "@/components/interfaces/system-admin/schools/SchoolsList";
import { schools } from "@/lib/data/schoolsData";

export default function SchoolsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Schools</h1>
        <p className="text-default-500">
          Manage and monitor all registered schools in the system.
        </p>
      </div>

      {/* Schools List Component */}
      <SchoolsList schools={schools} />
    </div>
  );
}