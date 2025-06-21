"use client";
import { useRef } from "react";
import ContactRevealSection from "@/components/contact-reveal-section";

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="contactus" className="relative w-full h-screen z-30" ref={containerRef}>
      <div className="h-screen z-10">
        <ContactRevealSection portraitImage="/images/portrait.png" />
      </div>
    </div>
  );
}