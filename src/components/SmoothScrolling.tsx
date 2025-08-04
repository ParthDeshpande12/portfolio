"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrolling() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP ScrollTrigger integration
    if (typeof window !== 'undefined' && 'ScrollTrigger' in window) {
      const ScrollTrigger = (window as typeof window & { ScrollTrigger: { 
        update: () => void; 
        scrollerProxy: (element: Element, config: object) => void;
        addEventListener: (event: string, callback: () => void) => void;
        refresh: () => void;
      } }).ScrollTrigger
      
      lenis.on('scroll', ScrollTrigger.update)
      
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (arguments.length) {
            lenis.scrollTo(value || 0, { immediate: true })
            return
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: document.body.style.transform ? "transform" : "fixed"
      })
      
      // Refresh ScrollTrigger after setup
      ScrollTrigger.addEventListener("refresh", () => lenis.raf(Date.now()))
      ScrollTrigger.refresh()
    }

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}