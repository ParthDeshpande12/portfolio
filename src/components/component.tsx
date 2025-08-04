"use client"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function UnfixedHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const boostSectionRef = useRef<HTMLDivElement>(null)
  const boostHeadingRef = useRef<HTMLHeadingElement>(null)
  const boostTextRef = useRef<HTMLParagraphElement>(null)
  const slicesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    setIsLoaded(true)

    if (typeof window !== "undefined" && heroContainerRef.current && heroSectionRef.current) {
      const ctx = gsap.context(() => {
        // Slice cover animation - covers the image over full 200vh
        const coverTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            pin: heroSectionRef.current,
            // pinSpacing: true, // Use default (true) to push next section down
          },
        })

        // Animate slices from 0 to 102% height (covering the image)
        coverTl.to(slicesRef.current, {
          height: "102%",
          duration: 1,
          ease: "power2.inOut",
          stagger: {
            amount: 0.3,
            from: "start",
          },
        })

        // Background image zoom-out effect during slice animation
        coverTl.to(
          ".hero-background-image",
          {
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        )


        // BOOST section with wavy swipe transition
        if (boostHeadingRef.current && boostTextRef.current) {
          // Set initial states
          gsap.set(boostHeadingRef.current, { 
            y: 100, 
            opacity: 0
          })
          gsap.set(boostTextRef.current, { 
            y: 80, 
            opacity: 0
          })

          // Initial reveal animation
          ScrollTrigger.create({
            trigger: boostSectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
            once: true,
            onEnter: () => {
              const boostTl = gsap.timeline()
              
              boostTl.to(boostHeadingRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
              })
              
              boostTl.to(boostTextRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              }, "-=0.6")
            }
          })

          // Wavy swipe transition with scroll direction awareness
          let currentText = "Namaste"
          let isTransitioning = false

          ScrollTrigger.create({
            trigger: boostSectionRef.current,
            start: "top top",
            end: "+=80%", // Reduced from 250% to 100% for faster transition
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const direction = self.direction // 1 for down, -1 for up
              
              if (!isTransitioning && boostHeadingRef.current) {
                // Forward transition: Namaste → नमस्ते
                if (progress > 0.6 && currentText === "Namaste" && direction === 1) {
                  isTransitioning = true
                  currentText = "नमस्ते"
                  
                  // Wavy swipe up animation
                  gsap.to(boostHeadingRef.current, {
                    y: -150,
                    rotationX: -45,
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                      if (boostHeadingRef.current) {
                        // Switch to Hindi
                        boostHeadingRef.current.textContent = "नमस्ते"
                        boostHeadingRef.current.style.fontFamily = "'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif"
                        boostHeadingRef.current.style.color = "#ffffff"
                        boostHeadingRef.current.style.background = "transparent"
                        
                        // Start from below with wave effect
                        gsap.set(boostHeadingRef.current, {
                          y: 150,
                          rotationX: 45,
                          scale: 0.8,
                          opacity: 0
                        })
                        
                        // Wavy entrance
                        gsap.to(boostHeadingRef.current, {
                          y: 0,
                          rotationX: 0,
                          scale: 1,
                          opacity: 1,
                          duration: 0.5,
                          ease: "elastic.out(1, 0.6)",
                          onComplete: () => {
                            isTransitioning = false
                          }
                        })
                      }
                    }
                  })
                }
                
                // Reverse transition: नमस्ते → Namaste
                else if (progress < 0.4 && currentText === "नमस्ते" && direction === -1) {
                  isTransitioning = true
                  currentText = "Namaste"
                  
                  // Wavy swipe down animation (reverse)
                  gsap.to(boostHeadingRef.current, {
                    y: 150,
                    rotationX: 45,
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                      if (boostHeadingRef.current) {
                        // Switch to English
                        boostHeadingRef.current.textContent = "Namaste"
                        boostHeadingRef.current.style.fontFamily = "'Inter', 'Arial', sans-serif"
                        boostHeadingRef.current.style.color = "#ffffff"
                        boostHeadingRef.current.style.background = "transparent"
                        
                        // Start from above with wave effect
                        gsap.set(boostHeadingRef.current, {
                          y: -150,
                          rotationX: -45,
                          scale: 0.8,
                          opacity: 0
                        })
                        
                        // Wavy entrance from top
                        gsap.to(boostHeadingRef.current, {
                          y: 0,
                          rotationX: 0,
                          scale: 1,
                          opacity: 1,
                          duration: 0.5,
                          ease: "elastic.out(1, 0.6)",
                          onComplete: () => {
                            isTransitioning = false
                          }
                        })
                      }
                    }
                  })
                }
              }
            }
          })
        }
      }, heroContainerRef)

      return () => {
        ctx.revert()
      }
    }
  }, [isLoaded])

  return (
    <>
      {/* Hero Section with Image Animation */}
      <div ref={heroContainerRef} className="h-[200vh] relative z-10 bg-[#181a1b]">
        <section ref={heroSectionRef} className="h-screen sticky top-0 overflow-hidden bg-[#181a1b] z-30">
          {/* Hero Image Container - Full viewport size */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            {/* Background Image Container with zoom-out effect and slices */}
            <div
              className="hero-background-image relative w-full h-full"
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                style={{
                  backgroundImage: `url('/images/hero.jpg')`,
                  filter: "brightness(0.8) contrast(1.1)",
                }}
              />
              
              {/* Slice Cover Effect */}
              <div className="absolute bottom-0 left-0 h-full w-full z-20 pointer-events-none">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) slicesRef.current[index] = el
                    }}
                    className="absolute h-0"
                    style={{
                      background: "#181a1b",
                      transformOrigin: "bottom",
                      left:
                        index === 0
                          ? "-1%"
                          : `${index * 25 - 1}%`,
                      width:
                        index === 0
                          ? "27%"
                          : index === 3
                            ? "28%"
                            : "27%",
                      bottom: "-1%",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* BOOST Section - Hindi Heading Morphing on Scroll */}
      <section 
        ref={boostSectionRef}
        className="min-h-screen bg-[#181a1b] text-white relative z-20 py-8 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Morphing heading: Namaste → नमस्ते */}
            <h2 
              ref={boostHeadingRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white mb-10 sm:mb-14 md:mb-16 tracking-tight leading-none pb-4 break-words"
              style={{
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                textRendering: "optimizeLegibility",
                minHeight: "80px"
              }}
            >
              Namaste
            </h2>
            
            {/* Static subheading */}
            <p 
              ref={boostTextRef}
              className="text-base sm:text-lg md:text-2xl lg:text-4xl text-gray-300 max-w-5xl leading-relaxed mx-auto px-1 sm:px-2"
              style={{
                textAlign: "center"
              }}
            >
              To the storytellers, visionaries, and creators, if you seek a performer who breathes life into every frame with depth, grace, and unwavering dedication, let&apos;s bring your vision to life, together
            </p>

            {/* Scroll indicator */}
            <div className="mt-10 sm:mt-12 md:mt-16 opacity-60">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-white mx-auto rounded-full animate-pulse"></div>
              <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-gray-400">Scroll to see the magic</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}