'use client';

import { useFormContext } from 'react-hook-form';
import { Input, Card, CardBody } from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';

export default function ContactStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SchoolRegistrationData>();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p className="text-default-500">
          Add contact details for school officials
        </p>
      </div>

      <div className="grid gap-8">
        {/* Principal Information */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Principal Details</h3>
              <p className="text-small text-default-500">
                Contact information for the school principal
              </p>
            </div>

            <Input
              label="Full Name"
              placeholder="Enter principal's name"
              {...register('contact.principalName')}
              errorMessage={errors.contact?.principalName?.message}
              isInvalid={!!errors.contact?.principalName}
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="Enter principal's email"
              {...register('contact.principalEmail')}
              errorMessage={errors.contact?.principalEmail?.message}
              isInvalid={!!errors.contact?.principalEmail}
            />

            <Input
              type="tel"
              label="Phone Number"
              placeholder="Enter principal's phone"
              {...register('contact.principalPhone')}
              errorMessage={errors.contact?.principalPhone?.message}
              isInvalid={!!errors.contact?.principalPhone}
            />
          </CardBody>
        </Card>

        {/* Administrator Information */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Administrator Details</h3>
              <p className="text-small text-default-500">
                Contact information for the school administrator
              </p>
            </div>

            <Input
              label="Full Name"
              placeholder="Enter administrator's name"
              {...register('contact.adminName')}
              errorMessage={errors.contact?.adminName?.message}
              isInvalid={!!errors.contact?.adminName}
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="Enter administrator's email"
              {...register('contact.adminEmail')}
              errorMessage={errors.contact?.adminEmail?.message}
              isInvalid={!!errors.contact?.adminEmail}
            />

            <Input
              type="tel"
              label="Phone Number"
              placeholder="Enter administrator's phone"
              {...register('contact.adminPhone')}
              errorMessage={errors.contact?.adminPhone?.message}
              isInvalid={!!errors.contact?.adminPhone}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
