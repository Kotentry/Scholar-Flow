'use client';

import { useFormContext } from 'react-hook-form';
import {
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';

const schoolTypes = [
  { value: 'primary', label: 'Primary School' },
  { value: 'secondary', label: 'Secondary School' },
  { value: 'tertiary', label: 'Tertiary Institution' },
];

export default function BasicInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SchoolRegistrationData>();

  const currentType = watch('basicInfo.type');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <p className="text-default-500">
          Enter the basic details of the school
        </p>
      </div>

      <div className="grid gap-6">
        <Input
          label="School Name"
          placeholder="Enter school name"
          {...register('basicInfo.name')}
          errorMessage={errors.basicInfo?.name?.message}
          isInvalid={!!errors.basicInfo?.name}
        />

        <Select
          label="School Type"
          placeholder="Select school type"
          selectedKeys={currentType ? [currentType] : []}
          onChange={(e) => setValue('basicInfo.type', e.target.value as any)}
          errorMessage={errors.basicInfo?.type?.message}
          isInvalid={!!errors.basicInfo?.type}
        >
          {schoolTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="email"
          label="School Email"
          placeholder="Enter school email"
          {...register('basicInfo.email')}
          errorMessage={errors.basicInfo?.email?.message}
          isInvalid={!!errors.basicInfo?.email}
        />

        <Input
          type="tel"
          label="Phone Number"
          placeholder="Enter phone number"
          {...register('basicInfo.phone')}
          errorMessage={errors.basicInfo?.phone?.message}
          isInvalid={!!errors.basicInfo?.phone}
        />

        <Input
          label="Website (Optional)"
          placeholder="Enter school website"
          {...register('basicInfo.website')}
          errorMessage={errors.basicInfo?.website?.message}
          isInvalid={!!errors.basicInfo?.website}
          description="Must include http:// or https://"
        />
      </div>
    </div>
  );
}
