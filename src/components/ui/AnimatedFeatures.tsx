'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  "Streamline Your Academic Management",
  "Effortless Student Progress Tracking",
  "Smart Attendance Management",
  "Comprehensive Grade Analysis",
  "Seamless Parent Communication",
  "Intuitive Course Planning",
  "Real-time Performance Insights",
  "Automated Report Generation"
];

export default function AnimatedFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[3rem] relative flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="text-base md:text-lg text-default-600 absolute text-center w-full px-4 max-w-md mx-auto"
        >
          {features[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
