"use client"

import type React from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export default function AboutMe() {
  // Ref for the image container
  const imageRef = useRef<HTMLDivElement>(null)
  // Framer Motion scroll/zoom logic
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  // Scale from 1 to 1.08 as you scroll through the section
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section className="bg-black text-white">
      {/* Header Section */}
      <motion.div
        className="text-center py-10 sm:py-12 md:py-16 px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs sm:text-sm font-light tracking-wider mb-2 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Origin-Focused
          </motion.p>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
EXPLORE THE STORY
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            [ FROM ARTISTIC PASSION TO CREATIVE EXCELLENCE - A STORY OF INSPIRATION ]
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 grid-cols-1 items-start">
          {/* Left Column - Image Section (Sticky only on desktop) */}
          <div className="pt-8 sm:pt-16 mb-8 lg:mb-0 lg:sticky lg:top-8 self-start max-w-md w-full mx-auto lg:mx-0">
            <section className="image-section">
              <div className="relative" ref={imageRef}>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[3/2]">
                  {/* Background album covers (z-0) */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-20 sm:w-32 h-24 sm:h-40 bg-gray-300 rounded-lg transform -rotate-12 opacity-60 z-0"></div>
                  <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-16 sm:w-28 h-20 sm:h-36 bg-gray-400 rounded-lg transform rotate-6 opacity-40 z-0"></div>
                  {/* Main album cover replaced with c.png, with zoom effect, inside the border */}
                  <div className="absolute inset-2 sm:inset-4 rounded-lg overflow-hidden z-10">
                    <motion.div
                      style={{ scale }}
                      className="w-full h-full will-change-transform"
                    >
                      <Image src="/images/c.png" alt="About Me" fill className="object-cover rounded-lg" />
                    </motion.div>
                    {/* White border frame above the zooming image */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-white/30 shadow-xl z-20"></div>
                  </div>
                </div>
              </div>
              {/* Add redirect button below the image */}
              <div className="pt-4 sm:pt-8 flex justify-start">
                <Link href="/actress-bio">
                  <button
                    className="px-4 sm:px-6 py-2 rounded-xl border border-gray-300 bg-white/10 backdrop-blur-md text-white font-semibold shadow-md transition-all duration-300 hover:bg-white/20 hover:border-gray-100 hover:shadow-lg text-sm sm:text-base"
                    style={{
                      boxShadow: "0 4px 24px 0 rgba(200,200,200,0.08)",
                    }}
                  >
                    View Bio
                  </button>
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column - Content Sections (Scrollable) */}
          <section className="content-sections">
            {/* Section 01 - Planning */}
            <ContentSection
              sectionNumber="01"
              title={<span className="font-extrabold text-white">Artistic Vision and Creative Leadership</span>}
              description={
                <>
                  <span className="block text-lg font-semibold text-white mb-2">Born in the bustling metropolis of <span className="font-bold text-gray-300">Mumbai</span>, Maya Sharma is a dynamic fusion of artistic vision, innovative thinking, and creative excellence.</span>
                  <span className="block mb-2 text-gray-200">Her journey started in the world of performing arts, where she completed intensive training in <span className="font-bold text-white">Method Acting</span> and earned certifications in <span className="font-bold text-white">Contemporary Dance</span> and <span className="font-bold text-white">Digital Media Production</span>.</span>
                  <span className="block mb-2 text-gray-300">As a <span className="font-bold text-white">lead creative director</span> and <span className="font-bold text-white">artistic mentor</span> at premier entertainment companies, she continues to push boundaries in storytelling and visual artistry.</span>
                  <div className="my-4">
                    <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300 font-medium bg-black/30 py-2 rounded-md">
                      Driven by passion and guided by creativity, she navigates a journey where art, innovation, and storytelling intersect. In her relentless pursuit of artistic excellence, she seeks not just recognition, but meaningful impact, with every project reflecting her dedication to inspiring others.
                    </blockquote>
                  </div>
                  <span className="block mt-2 text-gray-200">A <span className="font-bold text-white">visionary storyteller</span>, she aspires to create transformative experiences through her craft, aiming to touch hearts and inspire minds across diverse audiences worldwide.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-14 h-14 border-2 border-gray-700 rounded-full flex items-center justify-center shadow-lg shadow-gray-900/20 bg-black/30">
                  <div className="w-7 h-7 border-l-2 border-t-2 border-gray-400 transform rotate-45"></div>
                </div>
              }
            />

            {/* Section 02 - Concept & Strategy */}
            <ContentSection
              sectionNumber="02"
              title={<span className="font-extrabold text-white">Diverse Talents and Artistic Excellence</span>}
              description={
                <>
                  <span className="block text-lg font-semibold text-white mb-2">Beyond the world of medicine, her soul finds its rhythm in creativity and storytelling.</span>
                  <span className="block mb-2 text-gray-200">She has mastered multiple creative disciplines, specializing in <span className="font-bold text-white">Visual Storytelling and Character Development</span> while exploring photography, cinematography, screenwriting, contemporary art, yoga, and mindfulness practices.</span>
                  <span className="block mb-2 text-gray-300">Her dedication to the craft encompasses both on-screen and behind-the-camera work, having collaborated with award-winning filmmakers and contributing to innovative projects that blend traditional and digital media.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border-2 border-gray-700 shadow-lg shadow-gray-900/20">
                  <div
                    className="w-8 h-8 rounded-full bg-gray-800"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #222 0px, #222 2px, transparent 2px, transparent 4px)",
                    }}
                  ></div>
                </div>
              }
              hasBorder
            />

            {/* Section 03 - Design Onboarding */}
            <ContentSection
              sectionNumber="03"
              title={<span className="font-extrabold text-white">Professional Projects and Creative Collaborations</span>}
              description={
                <>
                  <span className="block text-lg font-semibold text-white mb-2">Her innovative approach and creative excellence have established her as a respected professional in entertainment and media production.</span>
                  <span className="block mb-2 text-gray-200">She has partnered with leading production houses and creative agencies, contributing to films, digital content, marketing campaigns, and artistic projects with exceptional quality and innovative vision.</span>
                  <span className="block mb-2 text-gray-300">Whether developing creative concepts or executing artistic visions, she brings originality, professionalism, and transformative energy to every collaboration she joins.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border-2 border-gray-700 shadow-lg shadow-gray-900/20">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="w-6 h-6 relative">
                      <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                        <div className="w-0.5 h-full bg-white absolute left-1/2 top-0 transform -translate-x-1/2"></div>
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45 origin-center"></div>
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-45 origin-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              hasBorder
            />
          </section>
        </div>
      </div>
    </section>
  )
}

// Content Section Component with Only Top-Right Icon
interface ContentSectionProps {
  sectionNumber: string
  title: React.ReactNode // Allow JSX
  description: React.ReactNode // Allow JSX
  bulletPoints: string[]
  decorativeElement: React.ReactNode
  hasBorder?: boolean
}

function ContentSection({
  sectionNumber,
  title,
  description,
  bulletPoints,
  decorativeElement,
  hasBorder = false,
}: ContentSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`relative space-y-6 sm:space-y-8 py-6 sm:py-8 ${hasBorder ? "border-t border-white/10 pt-10 sm:pt-16" : ""}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Right Icon Only */}
      <div className="absolute top-4 sm:top-8 right-0">{decorativeElement}</div>

      <div className="flex flex-col sm:flex-row items-start sm:space-x-6 space-y-2 sm:space-y-0">
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm font-light">[ {sectionNumber} ]</span>
        </motion.div>
        <div className="space-y-4 sm:space-y-6 pr-2 sm:pr-8 md:pr-16">
          <motion.h2
            className="text-lg sm:text-xl md:text-3xl font-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {title}
          </motion.h2>

          {/* Render description directly, not inside <p> */}
          <motion.div
            className="text-sm sm:text-base md:text-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {description}
          </motion.div>

          <motion.div
            className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {bulletPoints.map((point, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                - {point}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
