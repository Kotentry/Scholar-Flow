"use client";

import { useFormContext } from "react-hook-form";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { z } from "zod";

const guardianInfoSchema = z.object({
  guardian: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    relationship: z.string().min(1, "Please select a relationship"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    occupation: z.string().min(2, "Occupation must be at least 2 characters"),
    address: z.object({
      sameAsStudent: z.boolean(),
      street: z.string().min(5, "Street address must be at least 5 characters"),
      city: z.string().min(2, "City must be at least 2 characters"),
      state: z.string().min(2, "State must be at least 2 characters"),
      zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
    }),
  }),
  emergency: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    relationship: z.string().min(1, "Please select a relationship"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
});

const relationshipOptions = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "guardian", label: "Legal Guardian" },
  { value: "grandparent", label: "Grandparent" },
  { value: "other", label: "Other" },
];

type GuardianInfoFormData = z.infer<typeof guardianInfoSchema>;

interface GuardianInfoFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function GuardianInfoForm({ onNext, onPrevious }: GuardianInfoFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<GuardianInfoFormData>();

  return (
    <div className="space-y-8">
      {/* Primary Guardian */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Guardian</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("guardian.firstName")}
            label="First Name"
            placeholder="Enter guardian's first name"
            errorMessage={errors.guardian?.firstName?.message}
          />
          <Input
            {...register("guardian.lastName")}
            label="Last Name"
            placeholder="Enter guardian's last name"
            errorMessage={errors.guardian?.lastName?.message}
          />
          <Select
            {...register("guardian.relationship")}
            label="Relationship"
            placeholder="Select relationship"
            errorMessage={errors.guardian?.relationship?.message}
          >
            {relationshipOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register("guardian.occupation")}
            label="Occupation"
            placeholder="Enter guardian's occupation"
            errorMessage={errors.guardian?.occupation?.message}
          />
          <Input
            {...register("guardian.email")}
            label="Email Address"
            placeholder="Enter guardian's email"
            errorMessage={errors.guardian?.email?.message}
          />
          <Input
            {...register("guardian.phone")}
            label="Phone Number"
            placeholder="Enter guardian's phone"
            errorMessage={errors.guardian?.phone?.message}
          />
        </div>
      </div>

      {/* Guardian Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Guardian Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("guardian.address.street")}
            label="Street Address"
            placeholder="Enter guardian's street address"
            errorMessage={errors.guardian?.address?.street?.message}
            className="md:col-span-2"
          />
          <Input
            {...register("guardian.address.city")}
            label="City"
            placeholder="Enter guardian's city"
            errorMessage={errors.guardian?.address?.city?.message}
          />
          <Input
            {...register("guardian.address.state")}
            label="State"
            placeholder="Enter guardian's state"
            errorMessage={errors.guardian?.address?.state?.message}
          />
          <Input
            {...register("guardian.address.zipCode")}
            label="ZIP Code"
            placeholder="Enter guardian's ZIP code"
            errorMessage={errors.guardian?.address?.zipCode?.message}
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("emergency.firstName")}
            label="First Name"
            placeholder="Enter emergency contact's first name"
            errorMessage={errors.emergency?.firstName?.message}
          />
          <Input
            {...register("emergency.lastName")}
            label="Last Name"
            placeholder="Enter emergency contact's last name"
            errorMessage={errors.emergency?.lastName?.message}
          />
          <Select
            {...register("emergency.relationship")}
            label="Relationship"
            placeholder="Select relationship"
            errorMessage={errors.emergency?.relationship?.message}
          >
            {relationshipOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register("emergency.phone")}
            label="Phone Number"
            placeholder="Enter emergency contact's phone"
            errorMessage={errors.emergency?.phone?.message}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          variant="bordered"
          onClick={onPrevious}
        >
          Previous: Personal Information
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
          Next: Academic History
        </Button>
      </div>
    </div>
  );
}
