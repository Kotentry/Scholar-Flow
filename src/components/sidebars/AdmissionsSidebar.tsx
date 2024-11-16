"use client";

import { School } from "@/lib/data/schoolsData";
import { Button, Progress, Avatar, Switch, Divider } from "@nextui-org/react";
import { FaHome, FaUser, FaUsers, FaGraduationCap, FaFileAlt, FaQuestionCircle, FaCheckCircle, FaSignOutAlt, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";
import { SchoolDetailsModal } from "../interfaces/admissions/browse/SchoolDetailsModal";

interface AdmissionsSidebarProps {
  school: School;
  isOpen?: boolean;
}

const steps = [
  {
    id: "",
    title: "Welcome",
    icon: <FaHome className="text-xl" />,
    description: "Application Overview",
  },
  {
    id: "personal-info",
    title: "Personal Information",
    icon: <FaUser className="text-xl" />,
    description: "Basic details and contact",
  },
  {
    id: "guardian-info",
    title: "Guardian Information",
    icon: <FaUsers className="text-xl" />,
    description: "Parent/Guardian details",
  },
  {
    id: "academic-history",
    title: "Academic History",
    icon: <FaGraduationCap className="text-xl" />,
    description: "Educational background",
  },
  {
    id: "documents",
    title: "Documents",
    icon: <FaFileAlt className="text-xl" />,
    description: "Required documentation",
  },
  {
    id: "questionnaire",
    title: "Questionnaire",
    icon: <FaQuestionCircle className="text-xl" />,
    description: "Additional information",
  },
  {
    id: "review",
    title: "Review & Submit",
    icon: <FaCheckCircle className="text-xl" />,
    description: "Review your application",
  },
];

export default function AdmissionsSidebar({ school, isOpen = true }: AdmissionsSidebarProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isGuest, setIsGuest] = useState(true);
  const [email, setEmail] = useState("guest@example.com"); // This would come from auth state
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setCurrentStep(hash);

      // Update completed steps
      const currentIndex = steps.findIndex(step => step.id === hash);
      if (currentIndex > 0) {
        const newCompletedSteps = steps
          .slice(0, currentIndex)
          .map(step => step.id)
          .filter(id => id !== "");
        setCompletedSteps(newCompletedSteps);
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // Calculate progress
    const totalSteps = steps.length - 2; // Exclude welcome and review steps
    const completedCount = completedSteps.length;
    const progress = Math.round((completedCount / totalSteps) * 100);
    setProgress(progress);
  }, [completedSteps]);

  useEffect(() => {
    if (currentStep) {
      const element = document.getElementById(`step-${currentStep}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);

  const getStepStatus = (stepId: string) => {
    // If we're at review step, mark questionnaire as complete
    if (currentStep === "review" && stepId === "questionnaire") {
      return "complete";
    }
    
    if (completedSteps.includes(stepId)) return "complete";
    if (currentStep === stepId) return "current";
    return "pending";
  };

  const handleStepClick = (stepId: string) => {
    // Welcome step is always accessible
    if (stepId === "") {
      window.location.hash = stepId;
      return;
    }

    // Get indices
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    // Only allow moving backwards or to current step
    if (stepIndex <= currentIndex) {
      window.location.hash = stepId;
      
      // Scroll the step into view
      setTimeout(() => {
        const element = document.getElementById(`step-${stepId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/admissions/schools');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="w-80 h-screen bg-white border-r flex flex-col sticky top-0">
        {/* School Info */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">{school.name}</h2>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setShowDetails(true)}
            >
              <FaInfoCircle className="text-xl text-zinc-600" />
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              name={email.charAt(0).toUpperCase()}
              size="sm"
              className="bg-zinc-200"
            />
            <div className="flex-grow">
              <p className="font-medium text-sm">
                {email}
              </p>
            </div>
            <Switch
              size="sm"
              isSelected={!isGuest}
              onValueChange={(value) => setIsGuest(!value)}
            />
          </div>
          {isGuest && (
            <Alert
              variant="warning"
              icon={<FaExclamationTriangle className="text-yellow-600" />}
            >
              Currently logged in as a guest. Progress won&apos;t be saved if not finished.
            </Alert>
          )}
        </div>

        {/* Steps */}
        <div className="flex-grow p-2 overflow-y-auto">
          {/* Welcome Step */}
          <Button
            key={steps[0].id}
            id="step-welcome"
            className={`w-full justify-start gap-3 mb-1 h-auto py-3 px-4 transition-colors ${
              currentStep === ""
                ? "bg-zinc-900 text-white hover:!bg-zinc-900"
                : "bg-zinc-100 hover:bg-zinc-200"
            }`}
            variant="light"
            onClick={() => handleStepClick("")}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === ""
                ? "bg-white text-zinc-900"
                : "bg-zinc-100"
            }`}>
              {steps[0].icon}
            </div>
            <div className="text-left">
              <p className="font-medium">{steps[0].title}</p>
              <p className={`text-xs ${
                currentStep === "" ? "text-zinc-100" : "text-zinc-500"
              }`}>
                {steps[0].description}
              </p>
            </div>
          </Button>

          <Divider className="my-2" />

          {/* Application Steps */}
          {steps.slice(1, -1).map((step) => {
            const status = getStepStatus(step.id);
            return (
              <Button
                key={step.id}
                id={`step-${step.id}`}
                className={`w-full justify-start gap-3 mb-1 h-auto py-3 px-4 transition-colors ${
                  status === "current"
                    ? "bg-zinc-900 text-white hover:!bg-zinc-900"
                    : status === "complete"
                    ? "bg-zinc-100 hover:bg-zinc-200"
                    : "opacity-50 cursor-not-allowed"
                }`}
                variant="light"
                onClick={() => handleStepClick(step.id)}
                isDisabled={getStepStatus(step.id) === "pending"}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === "complete"
                    ? "bg-zinc-900 text-white"
                    : status === "current"
                    ? "bg-white text-zinc-900"
                    : "bg-zinc-100"
                }`}>
                  {status === "complete" ? (
                    <FaCheckCircle />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium">{step.title}</p>
                  <p className={`text-xs ${
                    status === "current" ? "text-zinc-100" : "text-zinc-500"
                  }`}>
                    {step.description}
                  </p>
                </div>
              </Button>
            );
          })}

          {/* Review Step */}
          <Divider className="my-2" />
          <Button
            key="review"
            id="step-review"
            className={`w-full justify-start gap-3 mb-1 h-auto py-3 px-4 transition-colors ${
              currentStep === "review"
                ? "bg-zinc-900 text-white hover:!bg-zinc-900"
                : completedSteps.length === steps.length - 2
                ? "bg-zinc-100 hover:bg-zinc-200"
                : "opacity-50 cursor-not-allowed"
            }`}
            variant="light"
            onClick={() => {
              if (completedSteps.length === steps.length - 2) {
                window.location.hash = "review";
              }
            }}
            isDisabled={completedSteps.length < steps.length - 2}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === "review"
                ? "bg-white text-zinc-900"
                : completedSteps.length === steps.length - 2
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100"
            }`}>
              <FaCheckCircle />
            </div>
            <div className="text-left">
              <p className="font-medium">Review & Submit</p>
              <p className={`text-xs ${
                currentStep === "review" ? "text-zinc-100" : "text-zinc-500"
              }`}>
                Review your application
              </p>
            </div>
          </Button>
        </div>

        {/* Progress and Logout */}
        <div className="p-4 border-t">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {completedSteps.length + (currentStep ? 1 : 0)}/{steps.length - 1}
              </span>
              <span className="text-sm text-zinc-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="w-full"
              classNames={{
                indicator: "bg-zinc-900",
              }}
            />
          </div>
          <Divider className="my-4" />
          <Button
            className="w-full justify-start text-red-500"
            variant="light"
            onClick={handleLogout}
            startContent={<FaSignOutAlt />}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* School Details Modal */}
      <SchoolDetailsModal
        school={school}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
