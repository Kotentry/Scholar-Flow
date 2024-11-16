"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, className = "", light = false }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-4xl md:text-5xl font-bold ${light ? "text-white" : ""}`}
        >
          {title}
        </motion.h2>
        <div className="relative h-1 mt-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`absolute left-1/4 right-1/4 h-full ${light ? "bg-white" : "bg-zinc-900"}`}
            style={{ transformOrigin: "center" }}
          />
        </div>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-8 max-w-2xl mx-auto text-lg ${light ? "text-zinc-300" : "text-zinc-600"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
