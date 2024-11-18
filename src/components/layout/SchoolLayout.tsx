'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import SchoolAdminSidebar from "../sidebars/SchoolAdminSidebar";

interface SchoolLayoutProps {
  children: React.ReactNode;
}

export default function SchoolLayout({ children }: SchoolLayoutProps) {
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
  
  const user = {
    name: 'John Doe',
    email: 'i0dYr@example.com',
    role: 'School Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    actions: [
      { label: 'Profile', href: '/school/settings/profile' },
      { label: 'Settings', href: '/school/settings/system' },
      { label: 'Security', href: '/school/settings/security' }
    ]
  };

  const notifications = [
    {
      id: 1,
      title: "New Student Registration",
      message: "A new student has registered for the upcoming semester",
      time: "5 minutes ago",
      type: "registration",
    },
    {
      id: 2,
      title: "Exam Results Published",
      message: "The results for the mid-term exams are now available",
      time: "2 hours ago",
      type: "academic",
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight at 11 PM",
      time: "1 day ago",
      type: "system",
    },
  ];

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
            <motion.div 
              className={`${isMobile ? 'fixed left-0 top-[4rem]' : 'relative'} z-50`}
              initial={{ width: 0 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <SchoolAdminSidebar isOpen={isSidebarOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          layout
          className="flex-1 overflow-x-hidden"
          initial={false}
          animate={{
            marginLeft: isMobile ? 0 : (isSidebarOpen ? "240px" : "0px"),
            x: isMobile && isSidebarOpen ? "16rem" : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <>
            {children}
          </>
        </motion.main>
      </div>
    </div>
    // <>
    // <Header
    //   onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
    //   isSidebarOpen={isSidebarOpen}
    //   notifications={notifications}
    //   user={user}
    //   logoSize="sm"
    // />
    // <div>
    // {children}
    // </div>
    // </>
  );
}
