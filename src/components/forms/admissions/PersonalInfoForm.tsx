"use client";

import { useFormContext } from "react-hook-form";
import { Input, Button, Card, CardBody, Avatar } from "@nextui-org/react";
import { z } from "zod";
import { FaUser, FaCamera } from "react-icons/fa";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.object({
    street: z.string().min(5, "Street address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  }),
  profileImage: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onNext: () => void;
}

export function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<PersonalInfoFormData>();

  return (
    <div className="space-y-8">
      <Card>
        <CardBody>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar
                className="w-24 h-24"
                src={watch("profileImage")}
                fallback={
                  <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-12 h-12 text-zinc-400" />
                  </div>
                }
              />
              <Button
                isIconOnly
                className="absolute bottom-0 right-0 bg-zinc-900 text-white"
                size="sm"
              >
                <FaCamera />
              </Button>
            </div>
            <p className="text-sm text-zinc-600">Upload your photo</p>
          </div>
        </CardBody>
      </Card>

      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("firstName")}
            label="First Name"
            placeholder="Enter your first name"
            errorMessage={errors.firstName?.message}
          />
          <Input
            {...register("middleName")}
            label="Middle Name (Optional)"
            placeholder="Enter your middle name"
          />
          <Input
            {...register("lastName")}
            label="Last Name"
            placeholder="Enter your last name"
            errorMessage={errors.lastName?.message}
          />
          <Input
            {...register("dateOfBirth")}
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            errorMessage={errors.dateOfBirth?.message}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("email")}
            label="Email Address"
            placeholder="Enter your email address"
            errorMessage={errors.email?.message}
          />
          <Input
            {...register("phone")}
            label="Phone Number"
            placeholder="Enter your phone number"
            errorMessage={errors.phone?.message}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("address.street")}
            label="Street Address"
            placeholder="Enter your street address"
            errorMessage={errors.address?.street?.message}
            className="md:col-span-2"
          />
          <Input
            {...register("address.city")}
            label="City"
            placeholder="Enter your city"
            errorMessage={errors.address?.city?.message}
          />
          <Input
            {...register("address.state")}
            label="State"
            placeholder="Enter your state"
            errorMessage={errors.address?.state?.message}
          />
          <Input
            {...register("address.zipCode")}
            label="ZIP Code"
            placeholder="Enter your ZIP code"
            errorMessage={errors.address?.zipCode?.message}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
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
          Next: Guardian Information
        </Button>
      </div>
    </div>
  );
}
