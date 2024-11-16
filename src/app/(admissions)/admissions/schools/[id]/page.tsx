"use client";

import { schools } from "@/lib/data/schoolsData";
import { Card, CardBody, Button } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { PersonalInfoForm } from "@/components/forms/admissions/PersonalInfoForm";
import { GuardianInfoForm } from "@/components/forms/admissions/GuardianInfoForm";
import { AcademicHistoryForm } from "@/components/forms/admissions/AcademicHistoryForm";
import { DocumentsForm } from "@/components/forms/admissions/DocumentsForm";
import { QuestionnaireForm } from "@/components/forms/admissions/QuestionnaireForm";
import { ReviewForm } from "@/components/forms/admissions/ReviewForm";
import { FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { applicationSteps } from "@/lib/data/applicationSteps";
import { FaCheckCircle } from "react-icons/fa";

interface SchoolPageProps {
  params: {
    id: string;
  };
}

export default function SchoolPage({ params }: SchoolPageProps) {
  const school = schools.find((s) => s.id === params.id);
  const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
  const [currentStep, setCurrentStep] = useState(hash || "");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const methods = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    // Update progress based on completed steps
    const totalSteps = applicationSteps.length;
    const completedCount = completedSteps.length;
    setProgress((completedCount / totalSteps) * 100);
  }, [completedSteps]);

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setCurrentStep(hash);

      // Update completed steps
      if (hash === "review") {
        // When reaching review, mark all previous steps as complete
        const allSteps = applicationSteps
          .slice(1, -1) // Exclude welcome and review
          .map(step => step.id);
        setCompletedSteps(allSteps);
      } else if (hash) {
        const currentIndex = applicationSteps.findIndex(step => step.id === hash);
        if (currentIndex > 0) {
          const newCompletedSteps = applicationSteps
            .slice(1, currentIndex)
            .map(step => step.id)
            .filter(id => id !== "");
          setCompletedSteps(newCompletedSteps);
        }
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!school) {
    notFound();
  }

  // Get current step component
  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case "personal-info":
        return <PersonalInfoForm onNext={() => handleNextStep("personal-info")} />;
      case "guardian-info":
        return (
          <GuardianInfoForm
            onNext={() => handleNextStep("guardian-info")}
            onPrevious={() => handlePreviousStep("guardian-info")}
          />
        );
      case "academic-history":
        return (
          <AcademicHistoryForm
            onNext={() => handleNextStep("academic-history")}
            onPrevious={() => handlePreviousStep("academic-history")}
          />
        );
      case "documents":
        return (
          <DocumentsForm
            onNext={() => handleNextStep("documents")}
            onPrevious={() => handlePreviousStep("documents")}
          />
        );
      case "questionnaire":
        return (
          <QuestionnaireForm
            onNext={() => handleNextStep("questionnaire")}
            onPrevious={() => handlePreviousStep("questionnaire")}
          />
        );
      case "review":
        return (
          <ReviewForm
            onPrevious={() => handlePreviousStep("review")}
          />
        );
      default:
        return null;
    }
  };

  const getStepStatus = (stepId: string) => {
    // Mark questionnaire as complete if we've reached review
    if (stepId === "questionnaire" && (currentStep === "review" || completedSteps.includes("questionnaire"))) {
      return "complete";
    }
    
    if (completedSteps.includes(stepId)) return "complete";
    if (currentStep === stepId) return "current";
    return "pending";
  };

  const handleNextStep = (currentStepId: string) => {
    const currentIndex = applicationSteps.findIndex(step => step.id === currentStepId);
    if (currentIndex < applicationSteps.length - 1) {
      const nextStep = applicationSteps[currentIndex + 1];
      window.location.hash = nextStep.id;
      setCompletedSteps([...completedSteps, currentStepId]);
    }
  };

  const handlePreviousStep = (currentStepId: string) => {
    const currentIndex = applicationSteps.findIndex(step => step.id === currentStepId);
    if (currentIndex > 0) {
      const previousStep = applicationSteps[currentIndex - 1];
      window.location.hash = previousStep.id;
    }
  };

  const renderWelcomeSection = () => (
    <div className="space-y-6">
      <Card>
        <CardBody className="space-y-6">
          {/* Welcome Section */}
          {!currentStep && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Your Application Journey</h2>
              <p className="text-zinc-600">
                You&apos;re about to begin your application to {school.name}. Here&apos;s what you need to know:
              </p>
            </div>
          )}

          {/* Progress Overview */}
          {!currentStep && (
            <div className="space-y-3">
              {applicationSteps.slice(1).map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-4 border rounded-lg"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        status === "complete"
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100"
                      }`}
                    >
                      {status === "complete" ? (
                        <FaCheckCircle />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                    {status === "complete" && (
                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => {
                          window.location.hash = step.id;
                          setTimeout(() => {
                            const element = document.getElementById(`step-${step.id}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }, 100);
                        }}
                      >
                        Review
                      </Button>
                    )}
                    {status === "current" && (
                      <Button
                        size="sm"
                        className="ml-auto bg-zinc-900 text-white"
                        onClick={() => {
                          window.location.hash = step.id;
                          setTimeout(() => {
                            const element = document.getElementById(`step-${step.id}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }, 100);
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          {!currentStep && (
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-zinc-900 text-white font-medium"
                onClick={() => {
                  window.location.hash = "personal-info";
                  setTimeout(() => {
                    const element = document.getElementById('step-personal-info');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
              >
                Begin Application
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Important Information */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Important Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Required Documents</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                <li>Birth Certificate or Passport</li>
                <li>Academic Transcripts</li>
                <li>Immunization Records</li>
                <li>Recent Photograph</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Estimated Time</h4>
              <p className="text-sm text-zinc-600">
                The application typically takes 30-45 minutes to complete. You can save your progress and return later.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-zinc-600">
                Contact our admissions team at {school.contact.email} or {school.contact.phone}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {/* Form Content */}
        {getCurrentStepComponent() || renderWelcomeSection()}
      </div>
    </FormProvider>
  );
}
