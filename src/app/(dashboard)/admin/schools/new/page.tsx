import SchoolRegistrationForm from "@/components/interfaces/system-admin/schools/registration/SchoolRegistrationForm";

export default function NewSchoolPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Register New School</h1>
        <p className="text-default-500">
          Complete the registration process to add a new school to the system.
        </p>
      </div>

      {/* Registration Form */}
      <SchoolRegistrationForm />
    </div>
  );
}
