"use client";
import { motion } from "framer-motion";
import type { ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "split" | "slide" | "fade";
  staggerDelay?: number;
  as?: ElementType;
}

export const AnimatedText = ({
  text,
  className = "",
  variant = "split",
  staggerDelay = 0,
  as: Component = "div",
}: AnimatedTextProps) => {
  // Dummy variants for fallback
  const variants = {
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slide: { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    split: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
    stagger: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
  };

  if (variant === "split") {
    return (
      <Component className={`overflow-hidden ${className}`}>
        <motion.div
          variants={variants.stagger}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={variants.split}
              custom={i + staggerDelay}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </Component>
    );
  }

  if (variant === "slide") {
    return (
      <Component className={`overflow-hidden ${className}`}>
        <motion.span
          className="block"
          variants={variants.slide}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  return (
    <Component className={className}>
      <motion.span
        variants={variants.fade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {text}
      </motion.span>
    </Component>
  );
};
