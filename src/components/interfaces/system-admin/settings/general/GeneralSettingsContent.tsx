'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Divider,
} from '@nextui-org/react';
import { HiOutlineUpload } from 'react-icons/hi';

const timezones = [
  { key: 'africa/accra', label: 'Africa/Accra (GMT)' },
  { key: 'africa/lagos', label: 'Africa/Lagos (GMT+1)' },
  { key: 'africa/cairo', label: 'Africa/Cairo (GMT+2)' },
];

const dateFormats = [
  { key: 'dd/mm/yyyy', label: 'DD/MM/YYYY' },
  { key: 'mm/dd/yyyy', label: 'MM/DD/YYYY' },
  { key: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
];

const timeFormats = [
  { key: '12', label: '12 Hour' },
  { key: '24', label: '24 Hour' },
];

const weekdays = [
  { key: 'sunday', label: 'Sunday' },
  { key: 'monday', label: 'Monday' },
];

export default function GeneralSettingsContent() {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFavicon(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: Implement save functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">General Settings</h1>
          <p className="text-default-500">
            Configure general platform settings and preferences
          </p>
        </div>
        <Button
          color="primary"
          className="font-medium bg-black text-white"
          onPress={handleSave}
          isLoading={loading}
        >
          Save Changes
        </Button>
      </div>

      {/* Platform Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Platform Information</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Input
              label="System Name"
              placeholder="Enter system name"
              labelPlacement="outside"
            />
            <Input
              label="Organization Name"
              placeholder="Enter organization name"
              labelPlacement="outside"
            />
            <Input
              label="Contact Email"
              placeholder="Enter contact email"
              type="email"
              labelPlacement="outside"
            />
            <Input
              label="Support Email"
              placeholder="Enter support email"
              type="email"
              labelPlacement="outside"
            />
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              type="tel"
              labelPlacement="outside"
            />
            <Input
              label="Address"
              placeholder="Enter address"
              labelPlacement="outside"
            />
          </div>

          <Divider />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-small font-medium">Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-default-100 rounded-lg" />
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<HiOutlineUpload className="w-4 h-4" />}
                  as="label"
                  htmlFor="logo-upload"
                >
                  Upload Logo
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-small font-medium">Favicon</label>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-default-100 rounded-lg" />
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<HiOutlineUpload className="w-4 h-4" />}
                  as="label"
                  htmlFor="favicon-upload"
                >
                  Upload Favicon
                </Button>
                <input
                  id="favicon-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFaviconChange}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Regional Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Select
              label="Timezone"
              placeholder="Select timezone"
              labelPlacement="outside"
            >
              {timezones.map((timezone) => (
                <SelectItem key={timezone.key} value={timezone.key}>
                  {timezone.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Date Format"
              placeholder="Select date format"
              labelPlacement="outside"
            >
              {dateFormats.map((format) => (
                <SelectItem key={format.key} value={format.key}>
                  {format.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Time Format"
              placeholder="Select time format"
              labelPlacement="outside"
            >
              {timeFormats.map((format) => (
                <SelectItem key={format.key} value={format.key}>
                  {format.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="First Day of Week"
              placeholder="Select first day"
              labelPlacement="outside"
            >
              {weekdays.map((day) => (
                <SelectItem key={day.key} value={day.key}>
                  {day.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Currency"
              placeholder="GHS"
              disabled
              labelPlacement="outside"
            />

            <Input
              label="Number Format"
              placeholder="1,234.56"
              disabled
              labelPlacement="outside"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
