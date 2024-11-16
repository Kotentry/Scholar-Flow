"use client";

import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.div 
        className="w-full p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/admissions/browse-schools" 
          className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <FaGraduationCap className="text-xl" />
          <span>Looking to apply? Browse our schools</span>
          <span className="text-xl">→</span>
        </Link>
      </motion.div>
      {children}
    </div>
  );
}
