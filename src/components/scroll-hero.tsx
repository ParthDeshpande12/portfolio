"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Spotlight } from "@/components/ui/spotlight-new"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollHero() {
  const logoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg">("lg")

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform scroll progress to scale and position - Much more dramatic zoom out for image
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.15]) // Extreme zoom out from 1 to 0.15
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]) // More vertical movement
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0.3]) // Fade out effect

  // Parallax text transforms: move and scale less than image for slower effect
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]) // Only scale down to 0.6
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]) // Move less vertically
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0]) // Fade out a bit sooner

  // Scroll-up animation for each word
  const words = ["Actor.", "Doctor.", "Entrepreneur."];
  const wordOffsets = [0, 0.08, 0.16]; // Staggered scroll offsets

  // Use separate useTransform hooks for each word
  const word0Y = useTransform(scrollYProgress, [wordOffsets[0], wordOffsets[0]+0.25], [0, -60 - 0*20]);
  const word0Opacity = useTransform(scrollYProgress, [wordOffsets[0], wordOffsets[0]+0.18, wordOffsets[0]+0.25], [1, 0.7, 0]);
  const word1Y = useTransform(scrollYProgress, [wordOffsets[1], wordOffsets[1]+0.25], [0, -60 - 1*20]);
  const word1Opacity = useTransform(scrollYProgress, [wordOffsets[1], wordOffsets[1]+0.18, wordOffsets[1]+0.25], [1, 0.7, 0]);
  const word2Y = useTransform(scrollYProgress, [wordOffsets[2], wordOffsets[2]+0.25], [0, -60 - 2*20]);
  const word2Opacity = useTransform(scrollYProgress, [wordOffsets[2], wordOffsets[2]+0.18, wordOffsets[2]+0.25], [1, 0.7, 0]);

  useEffect(() => {
    // Function to detect screen size
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize("sm")
      } else if (width < 1024) {
        setScreenSize("md")
      } else {
        setScreenSize("lg")
      }
    }

    // Initial screen size detection
    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)

    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  useEffect(() => {
    if (!logoRef.current || !contentRef.current) return

    // Responsive initial states based on screen size
    const getResponsiveValues = () => {
      switch (screenSize) {
        case "sm":
          return { y: "70vh", scale: 2, yPercent: -50 }
        case "md":
          return { y: "75vh", scale: 2.8, yPercent: -50 }
        case "lg":
        default:
          return { y: "80vh", scale: 3.5, yPercent: -50 }
      }
    }

    // Set initial responsive state for logo
    const initialValues = getResponsiveValues()
    gsap.set(logoRef.current, initialValues)

    // Create the scroll trigger animation for logo
    const logoScrollTrigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top 95%",
      onEnter: () => {
        // Animate logo to final position when scrolling down
        gsap.to(logoRef.current, {
          y: -16,
          scale: 1,
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
        })
      },
      onLeaveBack: () => {
        // Reset logo to responsive initial position when scrolling back up
        const resetValues = getResponsiveValues()
        gsap.to(logoRef.current, {
          y: resetValues.y,
          scale: resetValues.scale,
          yPercent: resetValues.yPercent,
          duration: 1,
          ease: "power3.out",
        })
      },
    })

    // Cleanup function
    return () => {
      logoScrollTrigger.kill()
    }
  }, [screenSize])

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      {/* Fixed Logo with proper boundaries */}
      <div
        ref={logoRef}
        className="logo fixed top-1 left-1/2 transform -translate-x-1/2 z-[100] max-w-[90vw] px-4"
        style={{
          width: screenSize === "sm" ? "180px" : screenSize === "md" ? "240px" : "300px",
          maxWidth: "90vw",
        }}
      >
        <div className="relative w-full">
          <Image
            src="/images/heading.png"
            alt="Your Logo"
            width={300}
            height={100}
            className="w-full h-auto object-contain drop-shadow-lg"
            priority
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 300px"
          />
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen bg-black flex items-end justify-center px-4 pb-32 overflow-hidden">
        {/* Hero Background Image with Framer Motion */}
        <motion.div 
          ref={heroImageRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{
            scale: heroScale,
            y: heroY,
            opacity: heroOpacity
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Parallax Hero Text (centered, above image, below logo) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            scale: textScale,
            y: textY,
            opacity: textOpacity,
            left: '8vw',
            top: 0,
            width: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <span
            className="flex flex-col items-start gap-6 md:gap-10 text-4xl md:text-7xl font-light text-white text-left mt-0 md:mt-4"
            style={{ 
              fontFamily: 'Poiret One, Inter, sans-serif', 
              minWidth: 'max-content'
            }}
          >
            {words.map((word, i) => {
              // Each word animates up and fades out as you scroll
              let y, opacity;
              if (i === 0) { y = word0Y; opacity = word0Opacity; }
              else if (i === 1) { y = word1Y; opacity = word1Opacity; }
              else { y = word2Y; opacity = word2Opacity; }
              return (
                <motion.span
                  key={word}
                  style={{ y, opacity, display: 'block' }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        </motion.div>
        {/* Spotlight Effect Above Image */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Spotlight />
        </div>
        {/* Content overlay */}
        <div className="relative z-30 h-20"></div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="content min-h-screen bg-gray-900 py-20 border-t-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-4 pt-12">
          {/* Your existing content goes here */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Your Content</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Replace this with your actual application content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}