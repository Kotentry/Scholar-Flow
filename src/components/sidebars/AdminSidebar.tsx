'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineSupport,
  HiOutlineUser,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineKey,
} from "react-icons/hi";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    href: "/admin/dashboard",
  },
  {
    label: "Schools",
    icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
    children: [
      { label: "All Schools", href: "/admin/schools" },
      { label: "Add School", href: "/admin/schools/new" },
    ],
  },
  {
    label: "User Management",
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    children: [
      {
        label: "Administrators",
        href: "/admin/users/administrators",
        icon: <HiOutlineKey className="w-5 h-5" />,
      },
      {
        label: "Roles & Permissions",
        href: "/admin/users/roles",
        icon: <HiOutlineLockClosed className="w-5 h-5" />,
      },
      {
        label: "Activity Logs",
        href: "/admin/users/logs",
        icon: <HiOutlineClipboardList className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Analytics",
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    children: [
      { label: "Overview", href: "/admin/analytics" },
      { label: "Reports", href: "/admin/analytics/reports" },
    ],
  },
  {
    label: "System Settings",
    icon: <HiOutlineCog className="w-5 h-5" />,
    children: [
      { label: "General", href: "/admin/settings/general" },
      { label: "Security", href: "/admin/settings/security" },
      { label: "Customization", href: "/admin/settings/customization" },
    ],
  },
  {
    label: "Audit Logs",
    icon: <HiOutlineClipboardList className="w-5 h-5" />,
    href: "/admin/audit-logs",
  },
  {
    label: "Support Center",
    icon: <HiOutlineSupport className="w-5 h-5" />,
    children: [
      { label: "Tickets", href: "/admin/support/tickets" },
      { label: "Knowledge Base", href: "/admin/support/knowledge-base" },
    ],
  },
  {
    label: "Profile",
    icon: <HiOutlineUser className="w-5 h-5" />,
    children: [
      { label: "Settings", href: "/admin/profile" },
      { label: "Security", href: "/admin/profile/security" },
    ],
  },
];

export default function AdminSidebar() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (item: NavItem) => {
    if (item.href) return isActive(item.href);
    return item.children?.some((child) => isActive(child.href));
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
      }}
      className="w-64 h-[calc(100vh-4rem)] bg-background border-r border-default-200 flex flex-col overflow-hidden fixed"
    >
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-3">
          {navItems.map((item) => (
            <div key={item.label} className="space-y-2">
              {item.href ? (
                <Link href={item.href}>
                  <motion.div
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-foreground text-background"
                        : "text-foreground/70 hover:bg-default-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </motion.div>
                </Link>
              ) : (
                <div>
                  <motion.button
                    onClick={() => toggleItem(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isGroupActive(item)
                        ? "bg-foreground text-background"
                        : "text-foreground/70 hover:bg-default-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                    <motion.div
                      animate={{
                        rotate: openItems.includes(item.label) ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {openItems.includes(item.label) && item.children && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <motion.div
                              className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                                isActive(child.href)
                                  ? "bg-foreground text-background"
                                  : "text-foreground/70 hover:bg-default-100"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-current mr-3" />
                              {child.icon}
                              <span className="ml-2">{child.label}</span>
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
