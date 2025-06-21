"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlassmorphTopBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    // Set initial state - completely hidden and moved up (like header.png)
    gsap.set(barRef.current, { opacity: 0, y: -40, display: "block" });

    // Create ScrollTrigger to watch for the content section (same as header.png)
    const logoTrigger = ScrollTrigger.create({
      trigger: ".content", // Target the content section like header.png does
      start: "top 95%", // Same trigger point as header.png
      onEnter: () => {
        // Fade in the glassmorph bar from top when content is triggered (like header.png)
        gsap.to(barRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        // Reset to hidden position when scrolling back up (like header.png)
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
    </div>
  );
} 