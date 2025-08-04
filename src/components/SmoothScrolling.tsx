"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrolling() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP ScrollTrigger integration
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update)
      
      window.ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true })
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
      window.ScrollTrigger.addEventListener("refresh", () => lenis.raf(Date.now()))
      window.ScrollTrigger.refresh()
    }

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}