'use client';

import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";

export default function AnimatedLogo() {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const capVariants = {
    float: {
      y: [-2, 2],
      rotate: [-5, 5],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  const words = ["Scholar", "Flow"];

  return (
    <motion.div 
      className="flex items-center justify-center gap-3 select-none"
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        {words[0].split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className={`text-4xl md:text-5xl font-bold ${char === 'l' ? 'relative' : ''}`}
          >
            {char === 'l' && (
              <motion.span
                className="absolute -top-6 -right-1 text-3xl md:text-4xl text-primary"
                variants={capVariants}
                animate="float"
              >
                <HiOutlineAcademicCap />
              </motion.span>
            )}
            {char}
          </motion.span>
        ))}
      </div>
      <div className="flex">
        {words[1].split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i + words[0].length}
            variants={letterVariants}
            className="text-4xl md:text-5xl font-bold"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
