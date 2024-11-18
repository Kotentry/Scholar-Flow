'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import AdminSidebar from "../sidebars/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    // Initial check
    checkMobile();
    
    // Set up listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  // Handle body overflow
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isSidebarOpen]);

  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: "New School Registration",
      message: "Harvard School has requested registration",
      time: "5 minutes ago",
      type: "registration",
    },
    {
      id: 2,
      title: "System Update",
      message: "New features are available for deployment",
      time: "1 hour ago",
      type: "system",
    },
    {
      id: 3,
      title: "Backup Complete",
      message: "System backup completed successfully",
      time: "2 hours ago",
      type: "backup",
    },
  ];

  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@scholarflow.com",
    role: "System Administrator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    actions: [
      { label: "Profile", href: "/admin/profile" },
      { label: "Settings", href: "/admin/profile/settings" },
      { label: "Security", href: "/admin/profile/security" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        notifications={notifications}
        user={user}
        logoSize="sm"
      />
      <div className="flex min-h-[calc(100vh-4rem)] relative overflow-x-hidden">
        {/* Overlay for mobile */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <div className={`${isMobile ? 'fixed z-50' : 'relative'}`}>
              <AdminSidebar />
            </div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          layout
          className="flex-1 overflow-x-hidden"
          initial={false}
          animate={{
            marginLeft: isMobile ? 0 : (isSidebarOpen ? "16rem" : "0rem"),
            x: isMobile && isSidebarOpen ? "16rem" : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className="p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
