"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CircleReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(circleRef.current, {
        width: "100px",
        height: "100px",
        borderRadius: "9999px",
        scale: 1
      })
      gsap.set(contentRef.current, {
        opacity: 0
      })

      // Create ScrollTrigger timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
          pin: false,
          once: true, // Only play once
          onEnter: () => {
            // Create the reveal animation sequence
            const revealTl = gsap.timeline()

            revealTl
              // Step 1: Expand circle to cover screen
              .to(circleRef.current, {
                width: "200vw",
                height: "200vh",
                duration: 1.2,
                ease: "power2.inOut",
              })
              // Step 2: Transform to rectangle
              .to(circleRef.current, {
                borderRadius: "0px",
                duration: 0.6,
                ease: "power2.out",
              })
              // Step 3: Fade in content
              .to(contentRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              })
              // Step 4: Fade out the black overlay
              .to(circleRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
              })
          }
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Black Circle Overlay */}
      <div 
        ref={circleRef}
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-black"
        style={{ borderRadius: "9999px" }}
      />

      {/* Content to be revealed */}
      <div 
        ref={contentRef}
        className="relative z-40 max-w-4xl text-center px-8"
      >
        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
          LET&apos;S CREATE
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Ready to bring your vision to life? Let&apos;s collaborate and create something extraordinary together.
        </p>
        
        {/* Call to action elements */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Creative Vision</h3>
            <p className="text-gray-400 text-sm">Bringing ideas to life</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
            <p className="text-gray-400 text-sm">Cutting-edge solutions</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Excellence</h3>
            <p className="text-gray-400 text-sm">Premium quality work</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm tracking-wider uppercase">
          Scroll down to get in touch
        </p>
      </div>
    </section>
  )
}
