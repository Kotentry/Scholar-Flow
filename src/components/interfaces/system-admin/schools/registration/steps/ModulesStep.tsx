'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardBody, Chip, Button } from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';
import { moduleConfig } from '@/lib/schemas/school-registration';
import {
  HiOutlineCube,
  HiOutlineCash,
  HiOutlineCheck,
} from 'react-icons/hi';

export default function ModulesStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SchoolRegistrationData>();

  const selectedModules = watch('modules.selectedModules') || [];

  const toggleModule = (moduleId: string, isDefault: boolean = false) => {
    if (isDefault) return; // Cannot toggle default modules
    
    const isSelected = selectedModules.includes(moduleId);
    const newSelection = isSelected
      ? selectedModules.filter((id) => id !== moduleId)
      : [...selectedModules, moduleId];
    setValue('modules.selectedModules', newSelection);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const selectedPremiumModules = moduleConfig.premiumModules.filter(
      (module) => selectedModules.includes(module.id)
    );
    return selectedPremiumModules.reduce((total, module) => total + module.price, 0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Module Selection</h2>
        <p className="text-default-500">
          Select the modules to enable for this school
        </p>
        {errors.modules?.selectedModules?.message && (
          <p className="text-danger text-small">
            {errors.modules.selectedModules.message}
          </p>
        )}
      </div>

      {/* Default Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Default Modules</h3>
          <Chip color="primary" variant="flat">Free</Chip>
        </div>
        <div className="grid gap-4">
          {moduleConfig.defaultModules.map((module) => (
            <Card
              key={module.id}
              className="border-2 border-primary bg-primary/5"
            >
              <CardBody className="gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary text-white">
                    <HiOutlineCube className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{module.name}</h3>
                      <div className="flex items-center gap-2">
                        <Chip
                          color="success"
                          variant="flat"
                          startContent={<HiOutlineCheck className="w-4 h-4" />}
                        >
                          Enabled
                        </Chip>
                      </div>
                    </div>
                    <p className="text-default-500">{module.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature) => (
                    <Chip
                      key={feature}
                      variant="flat"
                      size="sm"
                      className="text-xs"
                    >
                      {feature}
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Premium Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Premium Modules</h3>
          <Chip
            color="primary"
            variant="solid"
            className="bg-black"
          >
            Total: GHS {calculateTotalPrice().toLocaleString()}
          </Chip>
        </div>
        <div className="grid gap-4">
          {moduleConfig.premiumModules.map((module) => {
            const isSelected = selectedModules.includes(module.id);

            return (
              <Card
                key={module.id}
                isPressable
                onPress={() => toggleModule(module.id)}
                className={isSelected ? 'border-2 border-primary' : ''}
              >
                <CardBody className="gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-primary text-white' : 'bg-default-100'
                    }`}>
                      <HiOutlineCube className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{module.name}</h3>
                        <div className="flex items-center gap-2">
                          <Chip
                            startContent={<HiOutlineCash className="w-4 h-4" />}
                            variant="flat"
                            color="warning"
                          >
                            GHS {module.price.toLocaleString()}
                          </Chip>
                          <Chip
                            color={isSelected ? 'primary' : 'default'}
                            variant={isSelected ? 'solid' : 'flat'}
                            size="sm"
                          >
                            {isSelected ? 'Selected' : 'Optional'}
                          </Chip>
                        </div>
                      </div>
                      <p className="text-default-500">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature) => (
                      <Chip
                        key={feature}
                        variant="flat"
                        size="sm"
                        className="text-xs"
                      >
                        {feature}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
