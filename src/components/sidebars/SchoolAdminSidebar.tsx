'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCash,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineChevronRight,
  HiOutlineUserCircle,
  HiOutlineLibrary,
  HiOutlineMail,
} from "react-icons/hi";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    href: "/school/dashboard",
  },
  {
    label: "Admissions",
    icon: <HiOutlineClipboardList className="w-5 h-5" />,
    children: [
      { label: "Applications", href: "/school/admissions/applications" },
      { label: "Interviews", href: "/school/admissions/interviews" },
      { label: "Enrollment", href: "/school/admissions/enrollments" },
    ],
  },
  {
    label: "Academic",
    icon: <HiOutlineAcademicCap className="w-5 h-5" />,
    children: [
      { label: "Teachers", href: "/school/academic/teachers" },
      { label: "Students", href: "/school/academic/students" },
      { label: "Classes", href: "/school/academic/classes" },
      { label: "Subjects", href: "/school/academic/subjects" },
      { label: "Timetable", href: "/school/academic/timetable" },
    ],
  },
  {
    label: "Students",
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    children: [
      { label: "Directory", href: "/school/students/directory" },
      { label: "Attendance", href: "/school/students/attendance" },
      { label: "Performance", href: "/school/students/performance" },
      { label: "Behavior", href: "/school/students/behavior" },
      { label: "Health Records", href: "/school/students/health" },
    ],
  },
  {
    label: "Staff",
    icon: <HiOutlineUserCircle className="w-5 h-5" />,
    children: [
      { label: "Directory", href: "/school/staff/directory" },
      { label: "Attendance", href: "/school/staff/attendance" },
      { label: "Performance", href: "/school/staff/performance" },
      { label: "Development", href: "/school/staff/development" },
    ],
  },
  {
    label: "Finance",
    icon: <HiOutlineCash className="w-5 h-5" />,
    children: [
      { label: "Fee Management", href: "/school/finance/fees" },
      { label: "Expenses", href: "/school/finance/expenses" },
      { label: "Payroll", href: "/school/finance/payroll" },
      { label: "Reports", href: "/school/finance/reports" },
    ],
  },
  {
    label: "Resources",
    icon: <HiOutlineLibrary className="w-5 h-5" />,
    children: [
      { label: "Assets", href: "/school/resources/assets" },
      { label: "Facilities", href: "/school/resources/facilities" },
      { label: "Library", href: "/school/resources/library" },
      { label: "Inventory", href: "/school/resources/inventory" },
    ],
  },
  {
    label: "Communication",
    icon: <HiOutlineMail className="w-5 h-5" />,
    children: [
      { label: "Announcements", href: "/school/communication/announcements" },
      { label: "Messages", href: "/school/communication/messages" },
      { label: "Parent Portal", href: "/school/communication/parent-portal" },
      { label: "Documents", href: "/school/communication/documents" },
    ],
  },
  {
    label: "Activities",
    icon: <HiOutlineCalendar className="w-5 h-5" />,
    children: [
      { label: "Events", href: "/school/activities/events" },
      { label: "Clubs", href: "/school/activities/clubs" },
      { label: "Sports", href: "/school/activities/sports" },
      { label: "Field Trips", href: "/school/activities/trips" },
    ],
  },
  {
    label: "Reports",
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    children: [
      { label: "Academic", href: "/school/reports/academic" },
      { label: "Administrative", href: "/school/reports/administrative" },
      { label: "Custom Reports", href: "/school/reports/custom" },
    ],
  },
  {
    label: "Settings",
    icon: <HiOutlineCog className="w-5 h-5" />,
    children: [
      { label: "School Profile", href: "/school/settings/profile" },
      { label: "System", href: "/school/settings/system" },
      { label: "Users", href: "/school/settings/users" },
      { label: "Integrations", href: "/school/settings/integrations" },
    ],
  },
];

export default function SchoolAdminSidebar({ isOpen }: { isOpen: boolean }) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{
        x: isOpen ? 0 : -240,
        width: "240px"
      }}
      exit={{ x: -240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-[4rem] h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-hidden z-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleItem(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith(`/school/${item.label.toLowerCase()}`)
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </div>
                      <HiOutlineChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openItems.includes(item.label) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openItems.includes(item.label) && item.children && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-11 pr-3 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                  pathname === child.href
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                <span className="mr-2">-</span>
                                {child.icon}
                                <span className="ml-3">{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
