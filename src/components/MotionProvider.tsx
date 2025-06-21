"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        style={{ scrollBehavior: 'smooth' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
