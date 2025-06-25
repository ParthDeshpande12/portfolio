"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function MorphingTextScroll() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !headingRef.current) return;
    headingRef.current.style.visibility = "visible";
    const text = new SplitType(headingRef.current, { types: "chars" });
    gsap.set(text.chars, { yPercent: 100, opacity: 0 });

    // --- Scroll Reveal Animation (earlier reveal, sticky, and line animation) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 95%", // reveal a bit earlier
        end: "+=105%",   // sticky effect for the section
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        toggleActions: "play reverse play reverse",
        once: false,
      },
    });
    // Reveal text
    tl.to(text.chars, {
      yPercent: 0,
      opacity: 1,
      ease: "sine.out",
      stagger: { from: "center", amount: 0.5, ease: "power1.out" },
    }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[30vh]">
      <h1
        ref={headingRef}
        className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tight text-center leading-tight mt-8 z-10"
        style={{ overflow: "hidden" }}
      >
        BOOST YOUR DRIVE
      </h1>
    </div>
  );
}
