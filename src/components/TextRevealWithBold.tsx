import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealWithBoldProps {
  text: string;
  className?: string;
}

// Animates the whole line upward, keeps the first letter bold
export default function TextRevealWithBold({ text, className = "" }: TextRevealWithBoldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
        },
      }
    );
    return () => {
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <span style={{ fontWeight: 700, fontSize: '2.8rem', display: 'inline' }}>{text.charAt(0)}</span>
      <span className="text-white/80 text-lg md:text-xl leading-relaxed font-philosopher" style={{ fontWeight: 400, fontSize: '1.4rem', lineHeight: '2.2rem', display: 'inline' }}>{text.slice(1)}</span>
    </div>
  );
}
