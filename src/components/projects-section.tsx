"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  url?: string
  isComingSoon?: boolean
}

const projects: Project[] = [
  {
    id: "a",
    title: "Films",
    description: "Feature films and movie productions showcasing dramatic storytelling.",
    image: "/images/a.png",
    url: "/films",
  },
  {
    id: "b",
    title: "TV Shows",
    description: "Television series and episodic content for various networks.",
    image: "/images/b.png",
    url: "/tv",
  },
  {
    id: "c",
    title: "Advertisements",
    description: "Commercial and promotional content for major brands.",
    image: "/images/c.png",
    url: "/ads",
  },
  {
    id: "d",
    title: "Extra Content",
    description: "Behind-the-scenes and additional exclusive material.",
    image: "/images/d.png",
    url: "/extra",
  },
]

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize after a brief delay to ensure DOM is ready and previous animations are settled
    const initTimer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)

    return () => clearTimeout(initTimer)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    const ctx = gsap.context(() => {
      // Force ScrollTrigger refresh to recalculate after any pinned sections
      ScrollTrigger.refresh()

      // Header animation with ScrollTrigger
      gsap.fromTo(
        headerRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none", // Only play once, no reverse
            once: true, // Only trigger once
          },
        },
      )

      // Animate each project individually with its own trigger
      projectRefs.current.forEach((project, index) => {
        if (project) {
          // Set initial states
          gsap.set(project, { y: 100, opacity: 0 })
          
          const textContent = project.querySelector(".text-content")
          const button = project.querySelector(".project-button")
          
          if (textContent) gsap.set(textContent, { y: 30, opacity: 0 })
          if (button) gsap.set(button, { scale: 0.8, opacity: 0 })

          // Create individual ScrollTrigger for each project
          ScrollTrigger.create({
            trigger: project,
            start: "top 80%",
            toggleActions: "play none none none", // Only play once, no reverse
            once: true, // Only trigger once per reload
            onEnter: () => {
              // Animate project container
              gsap.to(project, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index < 2 ? index * 0.15 : (index - 2) * 0.1,
              })

              // Animate text content
              if (textContent) {
                gsap.to(textContent, {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: 0.2 + (index < 2 ? index * 0.15 : (index - 2) * 0.1),
                })
              }

              // Animate button
              if (button) {
                gsap.to(button, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: "back.out(1.7)",
                  delay: 0.4 + (index < 2 ? index * 0.15 : (index - 2) * 0.1),
                })
              }
            }
          })
        }
      })

    }, sectionRef)

    // Enhanced refresh handling
    const handleRefresh = () => {
      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.refresh()
      }
    }

    // Listen for various events that might affect scroll calculations
    window.addEventListener("resize", handleRefresh)
    window.addEventListener("orientationchange", handleRefresh)
    
    // Listen for image loads in this section
    const imgs = sectionRef.current?.querySelectorAll('img') || []
    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', handleRefresh)
      }
    })

    // Force refresh after animations might have settled
    const refreshTimer = setTimeout(handleRefresh, 500)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener("resize", handleRefresh)
      window.removeEventListener("orientationchange", handleRefresh)
      imgs.forEach(img => img.removeEventListener('load', handleRefresh))
      ctx.revert()
    }
  }, [isInitialized])

  return (
    <section 
      ref={sectionRef} 
      className="min-h-fit h-fit bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section // Add data attribute for debugging
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            className="h-0.5 bg-gray-700 mb-10 w-full origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: '50% 50%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="text-2xl md:text-3xl font-light text-gray-300 max-w-3xl">
            Discover my work in film, television, and brand partnerships
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24">
          {projects.map((project, index) => (
            <Link href={project.url || '#'} key={project.id}>
              <div
                ref={el => { projectRefs.current[index] = el }}
                className={`cursor-pointer ${
                  index === 1 ? "lg:mt-16 xl:mt-32" : ""
                } ${index === 3 ? "lg:mt-16 xl:mt-32" : ""}`}
                data-project-index={index}
              >
                {/* Project Image with Combined Effects */}
                <div
                  className="image-container relative rounded-lg sm:rounded-xl mb-4 sm:mb-5 aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <motion.div
                    className="w-full h-full"
                    initial={{
                      scale: 1.3,
                      y: "100%",
                      opacity: 0,
                    }}
                    whileInView={{
                      scale: 1,
                      y: "0%",
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: index < 2 ? index * 0.2 : (index - 2) * 0.15,
                    }}
                    viewport={{ 
                      once: true, 
                      margin: index < 2 ? "-20% 0px -20% 0px" : "-10% 0px -10% 0px" 
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Animated Circle Element */}
                  {hoveredProject === project.id && (
                    <motion.div
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                    </motion.div>
                  )}
                </div>

                {/* Project Content */}
                <div className="text-content">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="project-button inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200">
                    <span className="text-sm sm:text-base font-medium">Learn More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}