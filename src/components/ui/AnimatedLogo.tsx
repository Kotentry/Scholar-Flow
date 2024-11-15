'use client';

import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";

interface AnimatedLogoProps {
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: {
    text: "text-lg md:text-xl",
    icon: "text-lg md:text-xl -top-4",
  },
  sm: {
    text: "text-2xl md:text-3xl",
    icon: "text-xl md:text-2xl -top-4",
  },
  md: {
    text: "text-4xl md:text-5xl",
    icon: "text-3xl md:text-4xl -top-6",
  },
  lg: {
    text: "text-5xl md:text-6xl",
    icon: "text-4xl md:text-5xl -top-8",
  },
};

export default function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
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
  const { text: textSize, icon: iconSize } = sizeClasses[size];

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
            className={`${textSize} font-bold ${char === 'l' ? 'relative' : ''}`}
          >
            {char === 'l' && (
              <motion.span
                className={`absolute -right-1 ${iconSize} text-primary`}
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
            className={`${textSize} font-bold`}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
