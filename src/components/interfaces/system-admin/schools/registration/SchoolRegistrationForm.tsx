'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Switch } from '@nextui-org/react';
import {
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineCube,
  HiOutlineClipboardCheck,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegistrationStep, type SchoolRegistrationData, type StepConfig } from '@/lib/types/school-registration';
import { schoolRegistrationSchema } from '@/lib/schemas/school-registration';
import BasicInfoStep from './steps/BasicInfoStep';
import LocationStep from './steps/LocationStep';
import ContactStep from './steps/ContactStep';
import InfrastructureStep from './steps/InfrastructureStep';
import DocumentsStep from './steps/DocumentsStep';
import ModulesStep from './steps/ModulesStep';
import ReviewStep from './steps/ReviewStep';

const steps: Record<RegistrationStep, StepConfig> = {
  basicInfo: {
    title: 'Basic Information',
    description: 'Enter the basic details of the school',
    icon: HiOutlineAcademicCap,
  },
  location: {
    title: 'Location',
    description: 'Provide the school\'s address and location details',
    icon: HiOutlineLocationMarker,
  },
  contact: {
    title: 'Contact Information',
    description: 'Add contact details for school officials',
    icon: HiOutlineUserGroup,
  },
  infrastructure: {
    title: 'Infrastructure',
    description: 'Specify the school\'s infrastructure details',
    icon: HiOutlineOfficeBuilding,
  },
  documents: {
    title: 'Documents',
    description: 'Upload required documents and certificates',
    icon: HiOutlineDocumentText,
  },
  modules: {
    title: 'Modules',
    description: 'Select the modules to enable for this school',
    icon: HiOutlineCube,
  },
  review: {
    title: 'Review',
    description: 'Review and confirm all information',
    icon: HiOutlineClipboardCheck,
  },
};

const stepOrder: RegistrationStep[] = [
  'basicInfo',
  'location',
  'contact',
  'infrastructure',
  'documents',
  'modules',
  'review',
];

export default function SchoolRegistrationForm() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('basicInfo');
  const [validationEnabled, setValidationEnabled] = useState(true);
  
  const methods = useForm<SchoolRegistrationData>({
    resolver: validationEnabled ? zodResolver(schoolRegistrationSchema) : undefined,
  });
  
  const currentStepIndex = stepOrder.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepOrder.length - 1;

  const handleNext = async () => {
    if (validationEnabled) {
      const isValid = await methods.trigger(currentStep);
      if (isValid) {
        setCurrentStep(stepOrder[currentStepIndex + 1]);
      }
    } else {
      setCurrentStep(stepOrder[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    setCurrentStep(stepOrder[currentStepIndex - 1]);
  };

  const handleSubmit = async (data: SchoolRegistrationData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'basicInfo':
        return <BasicInfoStep />;
      case 'location':
        return <LocationStep />;
      case 'contact':
        return <ContactStep />;
      case 'infrastructure':
        return <InfrastructureStep />;
      case 'documents':
        return <DocumentsStep />;
      case 'modules':
        return <ModulesStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto">
        {/* Validation Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <span className="text-small text-default-500">
              Form Validation
            </span>
            <Switch
              size="sm"
              isSelected={validationEnabled}
              onValueChange={setValidationEnabled}
            />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {stepOrder.map((step, index) => {
              const config = steps[step];
              const Icon = config.icon;
              const isActive = currentStepIndex === index;
              const isCompleted = currentStepIndex > index;

              return (
                <div
                  key={step}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-black text-white' : 
                        isCompleted ? 'bg-success text-white' : 
                        'bg-default-100 text-default-500'}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="text-sm font-medium">{config.title}</p>
                    <p className="text-xs text-default-500">{config.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardBody className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardBody>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            color="default"
            variant="flat"
            startContent={<HiOutlineArrowLeft className="w-4 h-4" />}
            onPress={handleBack}
            isDisabled={isFirstStep}
            className="font-medium"
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="flat"
            endContent={<HiOutlineArrowRight className="w-4 h-4" />}
            onPress={isLastStep ? methods.handleSubmit(handleSubmit) : handleNext}
            className="font-medium bg-black text-white"
          >
            {isLastStep ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
