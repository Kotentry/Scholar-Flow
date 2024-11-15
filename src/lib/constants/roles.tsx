import { 
  HiOutlineAcademicCap, 
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineBookOpen,
  HiOutlineHome,
} from "react-icons/hi";
import { RoleOption } from "@/types/auth.types";

export const roleOptions: RoleOption[] = [
  { 
    value: "ADMIN", 
    label: "System Admin",
    icon: <HiOutlineAcademicCap className="w-5 h-5" />,
    description: "Manage all schools (Level A, B, or C)",
    idExample: "SYS-A-0001"
  },
  { 
    value: "SCHOOL_ADMIN", 
    label: "School Admin",
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    description: "Manage your school and staff",
    idExample: "HAR-A-0001"
  },
  { 
    value: "TEACHER", 
    label: "Teacher",
    icon: <HiOutlineUserCircle className="w-5 h-5" />,
    description: "Access your classes and students",
    idExample: "HAR-T-SC-0001"
  },
  { 
    value: "STUDENT", 
    label: "Student",
    icon: <HiOutlineBookOpen className="w-5 h-5" />,
    description: "View your courses and grades",
    idExample: "HAR-S-0001"
  },
  { 
    value: "PARENT", 
    label: "Parent",
    icon: <HiOutlineHome className="w-5 h-5" />,
    description: "Monitor your child's progress",
    idExample: "HAR-P-0001"
  },
];
