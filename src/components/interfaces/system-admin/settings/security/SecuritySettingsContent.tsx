'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Switch,
  Select,
  SelectItem,
  Slider,
  Divider,
} from '@nextui-org/react';

const passwordRequirements = [
  { key: 'uppercase', label: 'Uppercase Letters' },
  { key: 'lowercase', label: 'Lowercase Letters' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'special', label: 'Special Characters' },
];

const twoFactorMethods = [
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' },
  { key: 'both', label: 'Both' },
];

const logRetentionPeriods = [
  { key: '30', label: '30 Days' },
  { key: '60', label: '60 Days' },
  { key: '90', label: '90 Days' },
  { key: '180', label: '180 Days' },
  { key: '365', label: '1 Year' },
];

export default function SecuritySettingsContent() {
  const [loading, setLoading] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [loginAttempts, setLoginAttempts] = useState(5);
  const [sessionTimeout, setSessionTimeout] = useState(30);

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
          <h1 className="text-2xl font-semibold">Security Settings</h1>
          <p className="text-default-500">
            Configure security and authentication settings
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

      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Authentication Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Password Requirements */}
          <div className="space-y-4">
            <h4 className="text-medium font-medium">Password Requirements</h4>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-small text-default-500">Minimum Length: {passwordLength}</p>
                <Slider
                  size="sm"
                  step={1}
                  minValue={6}
                  maxValue={32}
                  value={passwordLength}
                  onChange={(value) => setPasswordLength(value as number)}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                {passwordRequirements.map((req) => (
                  <div key={req.key} className="flex items-center gap-2">
                    <Switch size="sm" />
                    <span className="text-small">{req.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h4 className="text-medium font-medium">Two-Factor Authentication</h4>
              <Switch size="sm" />
            </div>
            <Select
              label="2FA Method"
              placeholder="Select 2FA method"
              labelPlacement="outside"
            >
              {twoFactorMethods.map((method) => (
                <SelectItem key={method.key} value={method.key}>
                  {method.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Divider />

          {/* Session Management */}
          <div className="space-y-4">
            <h4 className="text-medium font-medium">Session Management</h4>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-small text-default-500">Session Timeout (minutes): {sessionTimeout}</p>
                <Slider
                  size="sm"
                  step={5}
                  minValue={5}
                  maxValue={120}
                  value={sessionTimeout}
                  onChange={(value) => setSessionTimeout(value as number)}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch size="sm" />
                  <span className="text-small">Allow Concurrent Logins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch size="sm" />
                  <span className="text-small">Auto Logout on Inactivity</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Login Security */}
          <div className="space-y-4">
            <h4 className="text-medium font-medium">Login Security</h4>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-small text-default-500">Max Login Attempts: {loginAttempts}</p>
                <Slider
                  size="sm"
                  step={1}
                  minValue={3}
                  maxValue={10}
                  value={loginAttempts}
                  onChange={(value) => setLoginAttempts(value as number)}
                  className="max-w-md"
                />
              </div>

              <Input
                type="number"
                label="Lockout Duration (minutes)"
                placeholder="Enter lockout duration"
                labelPlacement="outside"
                min={5}
                max={60}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Audit Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Audit Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Activity Logging */}
          <div className="space-y-4">
            <h4 className="text-medium font-medium">Activity Logging</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch size="sm" defaultSelected />
                <span className="text-small">Log User Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch size="sm" defaultSelected />
                <span className="text-small">Log System Changes</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch size="sm" defaultSelected />
                <span className="text-small">Log Login Activities</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Log Retention */}
          <div className="space-y-4">
            <h4 className="text-medium font-medium">Log Retention</h4>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Select
                label="Storage Duration"
                placeholder="Select duration"
                labelPlacement="outside"
              >
                {logRetentionPeriods.map((period) => (
                  <SelectItem key={period.key} value={period.key}>
                    {period.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch size="sm" />
                  <span className="text-small">Auto Archive Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch size="sm" />
                  <span className="text-small">Compress Archived Logs</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
