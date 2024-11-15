'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';

export default function LocationStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SchoolRegistrationData>();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Location</h2>
        <p className="text-default-500">
          Provide the school&apos;s address and location details
        </p>
      </div>

      <div className="grid gap-6">
        <Input
          label="Street Address"
          placeholder="Enter street address"
          {...register('location.address')}
          errorMessage={errors.location?.address?.message}
          isInvalid={!!errors.location?.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="City"
            placeholder="Enter city"
            {...register('location.city')}
            errorMessage={errors.location?.city?.message}
            isInvalid={!!errors.location?.city}
          />

          <Input
            label="State/Province"
            placeholder="Enter state/province"
            {...register('location.state')}
            errorMessage={errors.location?.state?.message}
            isInvalid={!!errors.location?.state}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Country"
            placeholder="Enter country"
            {...register('location.country')}
            errorMessage={errors.location?.country?.message}
            isInvalid={!!errors.location?.country}
          />

          <Input
            label="Postal Code"
            placeholder="Enter postal code"
            {...register('location.postalCode')}
            errorMessage={errors.location?.postalCode?.message}
            isInvalid={!!errors.location?.postalCode}
          />
        </div>
      </div>
    </div>
  );
}
