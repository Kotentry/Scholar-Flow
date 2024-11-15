'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardBody, Divider } from '@nextui-org/react';
import {
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineGlobe,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineCube,
} from 'react-icons/hi';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';
import { availableModules } from '../steps/ModulesStep';

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number | null;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  if (!value) return null;
  
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-default-100">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-small text-default-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function ReviewStep() {
  const { watch } = useFormContext<SchoolRegistrationData>();
  const formData = watch();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Review Information</h2>
        <p className="text-default-500">
          Review and confirm all the provided information
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            <div className="grid gap-4">
              <InfoItem
                icon={HiOutlineAcademicCap}
                label="School Name"
                value={formData.basicInfo.name}
              />
              <InfoItem
                icon={HiOutlineAcademicCap}
                label="School Type"
                value={formData.basicInfo.type}
              />
              <InfoItem
                icon={HiOutlineMail}
                label="Email"
                value={formData.basicInfo.email}
              />
              <InfoItem
                icon={HiOutlinePhone}
                label="Phone"
                value={formData.basicInfo.phone}
              />
              {formData.basicInfo.website && (
                <InfoItem
                  icon={HiOutlineGlobe}
                  label="Website"
                  value={formData.basicInfo.website}
                />
              )}
            </div>
          </CardBody>
        </Card>

        {/* Location */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <div className="grid gap-4">
              <InfoItem
                icon={HiOutlineLocationMarker}
                label="Address"
                value={formData.location.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="City"
                  value={formData.location.city}
                />
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="State/Province"
                  value={formData.location.state}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="Country"
                  value={formData.location.country}
                />
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="Postal Code"
                  value={formData.location.postalCode}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <div className="grid gap-6">
              <div>
                <p className="font-medium mb-3">Principal</p>
                <div className="grid gap-4">
                  <InfoItem
                    icon={HiOutlineAcademicCap}
                    label="Name"
                    value={formData.contact.principalName}
                  />
                  <InfoItem
                    icon={HiOutlineMail}
                    label="Email"
                    value={formData.contact.principalEmail}
                  />
                  <InfoItem
                    icon={HiOutlinePhone}
                    label="Phone"
                    value={formData.contact.principalPhone}
                  />
                </div>
              </div>
              <Divider />
              <div>
                <p className="font-medium mb-3">Administrator</p>
                <div className="grid gap-4">
                  <InfoItem
                    icon={HiOutlineAcademicCap}
                    label="Name"
                    value={formData.contact.adminName}
                  />
                  <InfoItem
                    icon={HiOutlineMail}
                    label="Email"
                    value={formData.contact.adminEmail}
                  />
                  <InfoItem
                    icon={HiOutlinePhone}
                    label="Phone"
                    value={formData.contact.adminPhone}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Infrastructure</h3>
            </div>
            <div className="grid gap-4">
              <InfoItem
                icon={HiOutlineOfficeBuilding}
                label="Total Classrooms"
                value={formData.infrastructure.totalClassrooms}
              />
              <InfoItem
                icon={HiOutlineOfficeBuilding}
                label="Total Capacity"
                value={formData.infrastructure.totalCapacity}
              />
              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.infrastructure)
                  .filter(([key, value]) => key.startsWith('has') && value)
                  .map(([key]) => (
                    <div
                      key={key}
                      className="px-3 py-1 rounded-full bg-success/10 text-success text-small"
                    >
                      {key.replace('has', '')}
                    </div>
                  ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Documents */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Documents</h3>
            </div>
            <div className="grid gap-4">
              {Object.entries(formData.documents)
                .filter(([key, value]) => key !== 'otherDocuments' && value)
                .map(([key, value]: [string, any]) => (
                  <InfoItem
                    key={key}
                    icon={HiOutlineDocumentText}
                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                    value={value.name}
                  />
                ))}
              {formData.documents.otherDocuments?.length > 0 && (
                <div>
                  <p className="text-small text-default-500 mb-2">
                    Additional Documents
                  </p>
                  <div className="grid gap-2">
                    {formData.documents.otherDocuments.map((file: File, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg bg-default-100"
                      >
                        <HiOutlineDocumentText className="w-4 h-4" />
                        <span className="text-small">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Modules */}
        <Card>
          <CardBody className="gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold">Selected Modules</h3>
            </div>
            <div className="grid gap-4">
              {formData.modules.selectedModules.map((moduleId) => {
                const module = availableModules.find((m) => m.id === moduleId);
                if (!module) return null;

                return (
                  <div
                    key={moduleId}
                    className="flex items-center gap-3 p-3 rounded-lg bg-default-100"
                  >
                    <div className="p-2 rounded-lg bg-primary text-white">
                      <HiOutlineCube className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-small text-default-500">
                        {module.description}
                      </p>
                    </div>
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
