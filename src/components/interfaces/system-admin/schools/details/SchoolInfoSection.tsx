'use client';

import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import {
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineGlobe,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlinePencil,
} from 'react-icons/hi';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';
import { formatNumber } from '@/lib/utils/formatters';

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number | boolean;
  formatter?: (value: number) => string;
}

function InfoItem({ icon: Icon, label, value, formatter }: InfoItemProps) {
  if (value === undefined || value === null) return null;

  const displayValue = typeof value === 'number' && formatter
    ? formatter(value)
    : typeof value === 'boolean'
    ? (value ? 'Yes' : 'No')
    : value;

  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-default-100">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-small text-default-500">{label}</p>
        <p className="font-medium">{displayValue}</p>
      </div>
    </div>
  );
}

interface SchoolInfoSectionProps {
  details: SchoolRegistrationData;
}

export default function SchoolInfoSection({ details }: SchoolInfoSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">School Information</h2>
          <p className="text-default-500">
            Detailed school profile and registration information
          </p>
        </div>
        <Button
          color="primary"
          variant="flat"
          startContent={<HiOutlinePencil className="w-4 h-4" />}
          className="font-medium bg-black text-white"
        >
          Edit Details
        </Button>
      </div>

      <div className="grid gap-4">
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
                value={details.basicInfo.name}
              />
              <InfoItem
                icon={HiOutlineAcademicCap}
                label="School Type"
                value={details.basicInfo.type}
              />
              <InfoItem
                icon={HiOutlineMail}
                label="Email"
                value={details.basicInfo.email}
              />
              <InfoItem
                icon={HiOutlinePhone}
                label="Phone"
                value={details.basicInfo.phone}
              />
              {details.basicInfo.website && (
                <InfoItem
                  icon={HiOutlineGlobe}
                  label="Website"
                  value={details.basicInfo.website}
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
                value={details.location.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="City"
                  value={details.location.city}
                />
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="State/Province"
                  value={details.location.state}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="Country"
                  value={details.location.country}
                />
                <InfoItem
                  icon={HiOutlineLocationMarker}
                  label="Postal Code"
                  value={details.location.postalCode}
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
                    value={details.contact.principalName}
                  />
                  <InfoItem
                    icon={HiOutlineMail}
                    label="Email"
                    value={details.contact.principalEmail}
                  />
                  <InfoItem
                    icon={HiOutlinePhone}
                    label="Phone"
                    value={details.contact.principalPhone}
                  />
                </div>
              </div>
              <div>
                <p className="font-medium mb-3">Administrator</p>
                <div className="grid gap-4">
                  <InfoItem
                    icon={HiOutlineAcademicCap}
                    label="Name"
                    value={details.contact.adminName}
                  />
                  <InfoItem
                    icon={HiOutlineMail}
                    label="Email"
                    value={details.contact.adminEmail}
                  />
                  <InfoItem
                    icon={HiOutlinePhone}
                    label="Phone"
                    value={details.contact.adminPhone}
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
                value={details.infrastructure.totalClassrooms}
                formatter={formatNumber}
              />
              <InfoItem
                icon={HiOutlineOfficeBuilding}
                label="Total Capacity"
                value={details.infrastructure.totalCapacity}
                formatter={formatNumber}
              />
              <div className="flex flex-wrap gap-2">
                {Object.entries(details.infrastructure)
                  .filter(([key, value]) => key.startsWith('has') && value)
                  .map(([key]) => (
                    <Chip
                      key={key}
                      variant="flat"
                      color="success"
                    >
                      {key.replace('has', '')}
                    </Chip>
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
              {Object.entries(details.documents)
                .filter(([key, value]) => key !== 'otherDocuments' && value)
                .map(([key, value]: [string, any]) => (
                  <InfoItem
                    key={key}
                    icon={HiOutlineDocumentText}
                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                    value={value.name || 'Not uploaded'}
                  />
                ))}
              {details.documents.otherDocuments?.length > 0 && (
                <div>
                  <p className="text-small text-default-500 mb-2">
                    Additional Documents
                  </p>
                  <div className="grid gap-2">
                    {details.documents.otherDocuments.map((file: File, index: number) => (
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
      </div>
    </section>
  );
}
