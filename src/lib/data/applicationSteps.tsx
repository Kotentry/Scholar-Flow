import { FaHome, FaUser, FaUsers, FaGraduationCap, FaFileAlt, FaQuestionCircle } from "react-icons/fa";
import { ReactNode } from "react";

export interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export const applicationSteps: ApplicationStep[] = [
  {
    id: "",
    title: "Welcome",
    description: "Application Overview",
    icon: <FaHome className="text-xl" />,
  },
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Basic details and contact",
    icon: <FaUser className="text-xl" />,
  },
  {
    id: "guardian-info",
    title: "Guardian Information",
    description: "Parent/Guardian details",
    icon: <FaUsers className="text-xl" />,
  },
  {
    id: "academic-history",
    title: "Academic History",
    description: "Educational background",
    icon: <FaGraduationCap className="text-xl" />,
  },
  {
    id: "documents",
    title: "Documents",
    description: "Required documentation",
    icon: <FaFileAlt className="text-xl" />,
  },
  {
    id: "questionnaire",
    title: "Questionnaire",
    description: "Additional information",
    icon: <FaQuestionCircle className="text-xl" />,
  },
];
