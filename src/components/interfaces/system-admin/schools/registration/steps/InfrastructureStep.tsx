'use client';

import { useFormContext } from 'react-hook-form';
import { Input, Switch, Card, CardBody } from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBeaker,
  HiOutlineTicket,
  HiOutlineUserGroup,
} from 'react-icons/hi';

const facilities = [
  {
    id: 'hasLibrary',
    label: 'Library',
    description: 'School has a functional library',
    icon: HiOutlineBookOpen,
  },
  {
    id: 'hasLaboratory',
    label: 'Laboratory',
    description: 'School has science laboratories',
    icon: HiOutlineBeaker,
  },
  {
    id: 'hasSportsGround',
    label: 'Sports Ground',
    description: 'School has sports facilities',
    icon: HiOutlineTicket,
  },
  {
    id: 'hasCanteen',
    label: 'Canteen',
    description: 'School has a canteen/cafeteria',
    icon: HiOutlineUserGroup,
  },
];

export default function InfrastructureStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SchoolRegistrationData>();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Infrastructure</h2>
        <p className="text-default-500">
          Specify the school&apos;s infrastructure details
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Capacity</h3>
              <p className="text-small text-default-500">
                Basic infrastructure capacity details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Total Classrooms"
                placeholder="Enter number of classrooms"
                {...register('infrastructure.totalClassrooms', {
                  valueAsNumber: true,
                })}
                errorMessage={errors.infrastructure?.totalClassrooms?.message}
                isInvalid={!!errors.infrastructure?.totalClassrooms}
                startContent={
                  <HiOutlineAcademicCap className="w-4 h-4 text-default-400" />
                }
              />

              <Input
                type="number"
                label="Total Capacity"
                placeholder="Enter total student capacity"
                {...register('infrastructure.totalCapacity', {
                  valueAsNumber: true,
                })}
                errorMessage={errors.infrastructure?.totalCapacity?.message}
                isInvalid={!!errors.infrastructure?.totalCapacity}
                startContent={
                  <HiOutlineUserGroup className="w-4 h-4 text-default-400" />
                }
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Facilities</h3>
              <p className="text-small text-default-500">
                Available facilities and amenities
              </p>
            </div>

            <div className="grid gap-4">
              {facilities.map((facility) => {
                const Icon = facility.icon;
                return (
                  <div
                    key={facility.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-default-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-default-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{facility.label}</p>
                        <p className="text-small text-default-500">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      {...register(`infrastructure.${facility.id}`)}
                      onChange={(e) =>
                        setValue(`infrastructure.${facility.id}`, e.target.checked)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
