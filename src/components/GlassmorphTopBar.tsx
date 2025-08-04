"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreenStatic from "@/components/loading-screen-static";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlassmorphTopBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    // Set initial state - completely hidden and moved up
    gsap.set(barRef.current, { opacity: 0, y: -40, display: "block" });

    // Show glassmorph bar only after scrolling past the main content trigger
    const logoTrigger = ScrollTrigger.create({
      trigger: ".content", // Use the main content section as the trigger
      start: "top top", // When the top of .content hits the top of the viewport
      end: "+=99999",
      onEnter: () => {
        gsap.to(barRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(barRef.current, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    return () => {
      logoTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full z-40 h-[100px] pointer-events-none"
      style={{
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        backdropFilter: "blur(8px) saturate(120%)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)",
        mask: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        WebkitMask: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
      }}
    >
      {/* Top highlight */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        }}
      />
      {/* Static LoadingScreen (no animation, no props) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <LoadingScreenStatic />
      </div>
    </div>
  );
}