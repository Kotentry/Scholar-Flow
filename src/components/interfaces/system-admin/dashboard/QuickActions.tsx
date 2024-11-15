'use client';

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  HiOutlineOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineInbox,
} from "react-icons/hi";

interface QuickAction {
  id: number;
  label: string;
  description: string;
  icon: string;
  href: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "building":
      return HiOutlineOfficeBuilding;
    case "chart":
      return HiOutlineChartBar;
    case "users":
      return HiOutlineUserGroup;
    case "inbox":
      return HiOutlineInbox;
    default:
      return HiOutlineOfficeBuilding;
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QuickActions({ actions }: QuickActionsProps) {
  const router = useRouter();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {actions.map((action) => {
        const Icon = getIcon(action.icon);
        return (
          <motion.div
            key={action.id}
            variants={item}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Card
              isPressable
              onPress={() => router.push(action.href)}
              className="border-none bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm w-full"
              
            >
              <CardBody className="gap-2 relative group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 -z-10 rounded-lg"
                  initial={false}
                  animate={{ scale: [0.8, 1], opacity: [0, 1] }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon container with hover animation */}
                <motion.div
                  className="p-2 rounded-lg bg-primary/10 w-fit relative z-10"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Text content with hover animation */}
                <motion.div
                  className="space-y-1 relative z-10"
                  initial={false}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-base font-semibold">{action.label}</h4>
                  <p className="text-xs text-default-500">
                    {action.description}
                  </p>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-8 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8 z-0"
                  initial={false}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 90,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </CardBody>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
