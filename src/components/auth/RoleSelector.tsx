'use client';

import { motion } from "framer-motion";
import { roleOptions } from "@/lib/constants/roles";
import { UserRoleType } from "@/types/auth.types";
import { Card } from "@nextui-org/react";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRoleType) => void;
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100">
      <Card className="p-8 w-full max-w-4xl bg-background/60 backdrop-blur-md">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl font-bold text-foreground"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Select Your Role
          </motion.h1>
          
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
            {roleOptions.map((role, index) => {
              const position = calculatePosition(index, roleOptions.length, 150);
              return (
                <motion.div
                  key={role.value}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: position.x,
                    y: position.y
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.button
                    onClick={() => onRoleSelect(role.value as UserRoleType)}
                    className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-primary hover:bg-primary-500 text-white p-4 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="text-2xl">{role.icon}</div>
                    <div className="text-xs mt-1 text-center font-medium">
                      {role.label}
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
