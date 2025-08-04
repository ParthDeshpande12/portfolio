"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variant?: "stagger" | "fade" | "slide";
  delay?: number;
}

export const AnimatedContainer = ({
  children,
  className = "",
  variant = "fade",
  delay = 0,
}: AnimatedContainerProps) => {
  // Dummy variants for fallback
  const variants = {
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slide: { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    stagger: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  };
  const getVariant = () => {
    switch (variant) {
      case "stagger":
        return variants.stagger;
      case "slide":
        return variants.slide;
      default:
        return variants.fade;
    }
  };
  return (
    <motion.div
      className={className}
      variants={getVariant()}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};
