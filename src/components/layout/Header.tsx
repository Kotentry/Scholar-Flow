'use client';

import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Avatar,
} from "@nextui-org/react";
import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineClock,
  HiOutlineLogout,
} from "react-icons/hi";
import AnimatedLogo from "../ui/AnimatedLogo";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

interface UserAction {
  label: string;
  href: string;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  actions: UserAction[];
}

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  notifications: Notification[];
  user: UserData;
  logoSize?: "xs" | "sm" | "md" | "lg";
}

export default function Header({ 
  onMenuClick, 
  isSidebarOpen, 
  notifications,
  user,
  logoSize = "md",
}: HeaderProps) {
  const router = useRouter();
  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...");
    router.push("/login");
  };

  return (
    <Navbar
      maxWidth="full"
      className="bg-background/70 backdrop-blur-md border-b border-default-200"
      position="sticky"
    >
      <NavbarContent className="gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="p-2 hover:bg-default-100 rounded-lg"
        >
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineX className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineMenu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <AnimatedLogo size={logoSize} />
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                radius="full"
                className="relative"
              >
                <Badge 
                  content={notifications?.length > 0 ? notifications.length : ""}
                  color="primary"
                  shape="circle"
                  size="sm"
                >
                  <HiOutlineBell className="w-6 h-6" />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              className="w-80"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {notifications?.map((notification) => (
                <DropdownItem
                  key={notification.id}
                  description={notification.message}
                  startContent={<HiOutlineClock className="w-4 h-4 text-default-500" />}
                  classNames={{
                    base: "py-3",
                    title: "font-semibold",
                  }}
                >
                  {notification.title}
                  <div className="text-xs text-default-500">{notification.time}</div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user.name}
                size="sm"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="role" className="h-10 gap-2" isReadOnly>
                <p className="text-default-500">{user.role}</p>
              </DropdownItem>
              {user.actions.map((action) => (
                <DropdownItem 
                  key={action.href}
                  onClick={() => router.push(action.href)}
                >
                  {action.label}
                </DropdownItem>
              ))}
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                startContent={<HiOutlineLogout className="w-4 h-4" />}
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
