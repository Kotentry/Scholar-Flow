'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@nextui-org/react";
import { UserRoleType } from "@/types/auth.types";
import { roleOptions } from "@/lib/constants/roles";
import LoginForm from "../forms/LoginForm";
import AnimatedLogo from "../ui/AnimatedLogo";
import AnimatedFeatures from "../ui/AnimatedFeatures";

export default function AuthContainer() {
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null);
  const [hoveredRole, setHoveredRole] = useState<UserRoleType | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Initialize with current window width
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePosition = useCallback((index: number, total: number) => {
    const radius = screenWidth < 640 ? 110 : 160;
    const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  }, [screenWidth]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const welcomeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-default-50 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Content Container */}
      <div className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8">
        {/* Welcome Section */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-6 p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={welcomeVariants}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm border border-white/10"
          >
            <AnimatedLogo />
            
            <motion.div 
              className="mt-8 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-24 h-[1px] bg-gradient-to-r from-foreground/5 via-foreground/20 to-foreground/5 mx-auto mb-8" />
              <AnimatedFeatures />
              <div className="w-24 h-[1px] bg-gradient-to-r from-foreground/5 via-foreground/20 to-foreground/5 mx-auto mt-8" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole ? 'welcome-back' : 'get-started'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  {selectedRole ? "Welcome Back!" : "Get Started"}
                </h2>
                <p className="text-base md:text-lg text-default-600">
                  {selectedRole 
                    ? "Let's get you signed in to your account" 
                    : hoveredRole
                      ? roleOptions.find(r => r.value === hoveredRole)?.description
                      : "Select your role to begin"}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Role Selection & Login Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Card className="w-full max-w-xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-lg shadow-2xl border border-white/20">
            <AnimatePresence mode="wait">
              {!selectedRole ? (
                <motion.div
                  key="role-selector"
                  className="p-12 relative flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Circular Role Selector */}
                  <motion.div 
                    className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 150,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Center Circle */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 -mt-12 -ml-12 sm:-mt-16 sm:-ml-16 rounded-full bg-gradient-to-br from-foreground/5 to-foreground/10 backdrop-blur-sm border border-white/20"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {roleOptions.map((role, index) => {
                      const position = calculatePosition(index, roleOptions.length);
                      return (
                        <motion.button
                          key={role.value}
                          className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 sm:w-28 sm:h-28 sm:-mt-14 sm:-ml-14 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-background/90 to-background/70 border-2 border-foreground/10 hover:border-foreground/90 transition-colors shadow-lg backdrop-blur-sm group"
                          style={{
                            x: position.x,
                            y: position.y,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.3,
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedRole(role.value as UserRoleType)}
                          onHoverStart={() => setHoveredRole(role.value)}
                          onHoverEnd={() => setHoveredRole(null)}
                        >
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: 150,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="flex flex-col items-center"
                          >
                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2 text-foreground/80 group-hover:text-foreground">{role.icon}</div>
                            <div className="text-xs sm:text-sm font-medium text-center px-1 sm:px-2 text-foreground/70 group-hover:text-foreground">
                              {role.label}
                            </div>
                          </motion.div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-form"
                  className="bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-md"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm 
                    initialRole={selectedRole} 
                    onBack={() => setSelectedRole(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}
