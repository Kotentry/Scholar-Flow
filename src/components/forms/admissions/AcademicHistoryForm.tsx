"use client";

import { useFormContext } from "react-hook-form";
import { Input, Select, SelectItem, Button, Textarea } from "@nextui-org/react";
import { z } from "zod";

const academicHistorySchema = z.object({
  currentSchool: z.object({
    name: z.string().min(2, "School name must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    grade: z.string().min(1, "Please select current grade"),
    startDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)"),
    endDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)").optional(),
  }),
  previousSchools: z.array(
    z.object({
      name: z.string().min(2, "School name must be at least 2 characters"),
      address: z.string().min(5, "Address must be at least 5 characters"),
      grade: z.string().min(1, "Please select grade"),
      startDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)"),
      endDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)"),
    })
  ).optional(),
  academicPerformance: z.object({
    gpa: z.string().optional(),
    rank: z.string().optional(),
    honors: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
  }),
  extracurricular: z.array(
    z.object({
      activity: z.string().min(2, "Activity name must be at least 2 characters"),
      role: z.string().min(2, "Role must be at least 2 characters"),
      duration: z.string().min(1, "Please specify duration"),
      description: z.string().min(10, "Description must be at least 10 characters"),
    })
  ).optional(),
});

const gradeOptions = [
  { value: "6", label: "6th Grade" },
  { value: "7", label: "7th Grade" },
  { value: "8", label: "8th Grade" },
  { value: "9", label: "9th Grade" },
  { value: "10", label: "10th Grade" },
  { value: "11", label: "11th Grade" },
  { value: "12", label: "12th Grade" },
];

type AcademicHistoryFormData = z.infer<typeof academicHistorySchema>;

interface AcademicHistoryFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function AcademicHistoryForm({ onNext, onPrevious }: AcademicHistoryFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<AcademicHistoryFormData>();

  return (
    <div className="space-y-8">
      {/* Current School */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Current School</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("currentSchool.name")}
            label="School Name"
            placeholder="Enter current school name"
            errorMessage={errors.currentSchool?.name?.message}
          />
          <Input
            {...register("currentSchool.address")}
            label="School Address"
            placeholder="Enter school address"
            errorMessage={errors.currentSchool?.address?.message}
          />
          <Select
            {...register("currentSchool.grade")}
            label="Current Grade"
            placeholder="Select current grade"
            errorMessage={errors.currentSchool?.grade?.message}
          >
            {gradeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register("currentSchool.startDate")}
              label="Start Date"
              placeholder="YYYY-MM"
              errorMessage={errors.currentSchool?.startDate?.message}
            />
            <Input
              {...register("currentSchool.endDate")}
              label="End Date (Optional)"
              placeholder="YYYY-MM"
              errorMessage={errors.currentSchool?.endDate?.message}
            />
          </div>
        </div>
      </div>

      {/* Academic Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("academicPerformance.gpa")}
            label="GPA (Optional)"
            placeholder="Enter your GPA"
            errorMessage={errors.academicPerformance?.gpa?.message}
          />
          <Input
            {...register("academicPerformance.rank")}
            label="Class Rank (Optional)"
            placeholder="Enter your class rank"
            errorMessage={errors.academicPerformance?.rank?.message}
          />
          <Textarea
            {...register("academicPerformance.honors")}
            label="Honors & Awards"
            placeholder="List any academic honors or awards (one per line)"
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Extracurricular Activities */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Extracurricular Activities</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("extracurricular.0.activity")}
              label="Activity Name"
              placeholder="Enter activity name"
              errorMessage={errors.extracurricular?.[0]?.activity?.message}
            />
            <Input
              {...register("extracurricular.0.role")}
              label="Role/Position"
              placeholder="Enter your role"
              errorMessage={errors.extracurricular?.[0]?.role?.message}
            />
            <Input
              {...register("extracurricular.0.duration")}
              label="Duration"
              placeholder="e.g., 2 years, Sep 2022 - Present"
              errorMessage={errors.extracurricular?.[0]?.duration?.message}
            />
            <Textarea
              {...register("extracurricular.0.description")}
              label="Description"
              placeholder="Describe your involvement and achievements"
              className="md:col-span-2"
              errorMessage={errors.extracurricular?.[0]?.description?.message}
            />
          </div>
          <Button
            variant="bordered"
            size="sm"
            className="w-full"
          >
            Add Another Activity
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          variant="bordered"
          onClick={onPrevious}
        >
          Previous: Guardian Information
        </Button>
        <Button
          variant="bordered"
          onClick={() => window.location.hash = ""}
        >
          Save & Continue Later
        </Button>
        <Button
          color="primary"
          className="bg-zinc-900"
          onClick={onNext}
        >
          Next: Documents
        </Button>
      </div>
    </div>
  );
}
