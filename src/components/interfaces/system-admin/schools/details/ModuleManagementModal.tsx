'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Chip,
} from '@nextui-org/react';
import {
  HiOutlineCube,
  HiOutlineCash,
  HiOutlinePlus,
  HiOutlineX,
} from 'react-icons/hi';
import { moduleConfig } from '@/lib/schemas/school-registration';
import { formatCurrency } from '@/lib/utils/formatters';

interface ModuleManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModules: string[];
  onModulesChange: (modules: string[]) => void;
}

export default function ModuleManagementModal({
  isOpen,
  onClose,
  selectedModules,
  onModulesChange,
}: ModuleManagementModalProps) {
  const handleToggleModule = (moduleId: string, isDefault: boolean = false) => {
    if (isDefault) return; // Cannot toggle default modules

    const newSelection = selectedModules.includes(moduleId)
      ? selectedModules.filter(id => id !== moduleId)
      : [...selectedModules, moduleId];

    onModulesChange(newSelection);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const selectedPremiumModules = moduleConfig.premiumModules.filter(
      module => selectedModules.includes(module.id)
    );
    return selectedPremiumModules.reduce((total, module) => total + module.price, 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Manage Modules</h3>
              <p className="text-small text-default-500">
                Add or remove modules for this school
              </p>
            </ModalHeader>
            <ModalBody className="gap-6">
              {/* Default Modules */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-medium font-semibold">Default Modules</h4>
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
                              <h5 className="text-medium font-semibold">{module.name}</h5>
                              <Chip color="success" variant="flat">Enabled</Chip>
                            </div>
                            <p className="text-small text-default-500">
                              {module.description}
                            </p>
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
                  <h4 className="text-medium font-semibold">Premium Modules</h4>
                  <Chip
                    color="primary"
                    variant="solid"
                    className="bg-black"
                  >
                    Total: {formatCurrency(calculateTotalCost())}
                  </Chip>
                </div>
                <div className="grid gap-4">
                  {moduleConfig.premiumModules.map((module) => {
                    const isSelected = selectedModules.includes(module.id);

                    return (
                      <Card
                        key={module.id}
                        isPressable
                        onPress={() => handleToggleModule(module.id)}
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
                                <h5 className="text-medium font-semibold">{module.name}</h5>
                                <div className="flex items-center gap-2">
                                  <Chip
                                    startContent={<HiOutlineCash className="w-4 h-4" />}
                                    variant="flat"
                                    color="warning"
                                  >
                                    {formatCurrency(module.price)}
                                  </Chip>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color={isSelected ? 'danger' : 'primary'}
                                  >
                                    {isSelected ? (
                                      <HiOutlineX className="w-4 h-4" />
                                    ) : (
                                      <HiOutlinePlus className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <p className="text-small text-default-500">
                                {module.description}
                              </p>
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="bg-black"
                onPress={onClose}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
