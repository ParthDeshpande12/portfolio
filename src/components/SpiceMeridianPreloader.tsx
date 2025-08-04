"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { Flip } from "gsap/Flip"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, Flip)

  // Custom ease animations
  CustomEase.create("customEase", "0.6, 0.01, 0.05, 1")
  CustomEase.create("directionalEase", "0.16, 1, 0.3, 1")
  CustomEase.create("smoothBlur", "0.25, 0.1, 0.25, 1")
  CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1")

  // Prevent layout shifts during animation
  gsap.config({ force3D: true })
}

interface SpiceMeridianPreloaderProps {
  onComplete?: () => void
}

export default function SpiceMeridianPreloader({ onComplete }: SpiceMeridianPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mainTlRef = useRef<gsap.core.Timeline | null>(null)
  const restartBtnRef = useRef<HTMLButtonElement>(null)

  const [isClient, setIsClient] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const INITIAL_ZOOM = 1.2

  // Using your app's images for smooth transition
  const images = [
    "/images/a.png",
    "/images/b.png", 
    "/images/c.png",
    "/images/hero.jpg", // Final image that matches hero section
  ]

  // Function to initialize the animation
  const initAnimation = () => {
    if (!containerRef.current) return

    // Kill any existing timeline
    if (mainTlRef.current) mainTlRef.current.kill()

    // Reset button
    gsap.set(restartBtnRef.current, { opacity: 0, pointerEvents: "none" })

    // Reset container with proper initial state
    gsap.set(containerRef.current, {
      width: "400px",
      height: "300px",
      position: "relative",
      overflow: "hidden",
      opacity: 1,
    })

    // Get all wrappers and images
    const wrappers = containerRef.current.querySelectorAll(".image-wrapper")
    const finalWrapper = containerRef.current.querySelector("#final-image") as HTMLElement
    const finalImage = finalWrapper.querySelector("img") as HTMLImageElement

    // Reset all wrappers to initial state - fix visibility glitch
    gsap.set(wrappers, {
      visibility: "visible",
      clipPath: "inset(100% 0 0 0)",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      clearProps: "transform,transformOrigin",
    })

    // Reset all images with initial zoom - ensure they're loaded
    gsap.set(containerRef.current.querySelectorAll(".image-wrapper img"), {
      scale: INITIAL_ZOOM,
      transformOrigin: "center center",
      opacity: 1,
      clearProps: "width,height",
    })

    // Create a new timeline with longer delay to completely eliminate initial glitches
    mainTlRef.current = gsap.timeline({ delay: 0.3 })
    const mainTl = mainTlRef.current

    // PHASE 1: Image loading sequence - smoother timing
    wrappers.forEach((wrapper, index) => {
      if (index > 0) {
        mainTl.add("image" + index, "<0.2")
      }

      mainTl.to(
        wrapper,
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "smoothBlur",
        },
        index > 0 ? "image" + index : 0,
      )
    })

    // PHASE 2: Final image expansion - longer delay for better timing
    mainTl.add("finalAnimation", ">0.3")

    mainTl.add(() => {
      const state = Flip.getState(finalWrapper)

      // Remove overflow hidden to allow expansion
      gsap.set(containerRef.current, { overflow: "visible" })

      // Position the final wrapper to cover the viewport
      gsap.set(finalWrapper, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100dvw",
        height: "100dvh",
        zIndex: 9999,
      })

      // Use FLIP to animate the container expansion
      Flip.from(state, {
        duration: 1.4,
        ease: "customEase",
        absolute: true,
      })

      // Simultaneously animate the image scale
      gsap.to(finalImage, {
        scale: 1.0,
        duration: 1.4,
        ease: "customEase",
        onComplete: () => {
          // Start cross-fade transition
          setIsCompleting(true)
          if (overlayRef.current) {
            overlayRef.current.classList.add('fade-out')
          }
          
          // Call onComplete to start showing main content
          if (onComplete) {
            onComplete()
          }
        },
      })
    }, "finalAnimation")

    return mainTl
  }

  useEffect(() => {
    setIsClient(true)
    
    // Prevent scroll during preloader - add class to html and body
    document.documentElement.classList.add('preloader-active')
    document.body.classList.add('preloader-active')
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.documentElement.style.height = '100vh'
    
    return () => {
      // Re-enable scroll when component unmounts
      document.documentElement.classList.remove('preloader-active')
      document.body.classList.remove('preloader-active')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.height = ''
    }
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Preload all images first to prevent glitches
    const preloadImages = () => {
      return Promise.all(
        images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = reject
            img.src = src
          })
        })
      )
    }

    // Initialize animation after images are loaded
    preloadImages()
      .then(() => {
        setImagesLoaded(true)
        // Small delay to ensure DOM is ready
        setTimeout(initAnimation, 200)
      })
      .catch(() => {
        setImagesLoaded(true)
        // Fallback if images fail to load
        setTimeout(initAnimation, 300)
      })

    // Handle window resize
    const handleResize = () => {
      // No need to reposition elements after preloader is complete
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (mainTlRef.current) mainTlRef.current.kill()
    }
  }, [isClient])

  const handleRestart = () => {
    initAnimation()
  }

  if (!isClient || !imagesLoaded) {
    return (
      <div className="preloader-overlay">
        <div className="preloader-container">
          <div style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontFamily: 'PP Neue Montreal, sans-serif',
            opacity: 0.6 
          }}>
            Loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #181a1b;
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          transition: opacity 0.6s ease-out;
          overflow: hidden;
        }
        
        /* Prevent scrolling on html and body when preloader is active */
        .preloader-active {
          overflow: hidden !important;
          height: 100vh !important;
        }
        
        .preloader-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        
        .preloader-overlay::before {
          content: "";
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: transparent url("http://assets.iceable.com/img/noise-transparent.png") repeat 0 0;
          background-size: 300px 300px;
          animation: noise-animation 0.3s steps(5) infinite;
          opacity: 0.03;
          will-change: transform;
          z-index: 100;
          pointer-events: none;
        }
        
        @keyframes noise-animation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(2%, -4%); }
          40% { transform: translate(-2%, 5%); }
          50% { transform: translate(-4%, 2%); }
          60% { transform: translate(3%, 0); }
          70% { transform: translate(0, 3%); }
          80% { transform: translate(-3%, 0); }
          90% { transform: translate(2%, 2%); }
          100% { transform: translate(1%, 0); }
        }
        
        .preloader-container {
          position: relative;
          width: 400px;
          height: 300px;
          overflow: hidden;
          z-index: 5;
        }
        
        .image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          visibility: visible;
          opacity: 1;
        }
        
        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center center;
        }
        
        /* Add a subtle overlay to match hero section styling */
        #final-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(24, 26, 27, 0.1);
          pointer-events: none;
          z-index: 1;
        }
        
        #final-image {
          z-index: 10;
        }
        
        .restart-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 30px;
          height: 30px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 60;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.3s ease;
        }
        
        .restart-btn:hover {
          transform: rotate(45deg);
        }
        
        .dot-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 4px;
          transition: transform 0.3s ease;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          margin: auto;
        }
      `}</style>

      <div ref={overlayRef} className="preloader-overlay">
        {/* Restart Button */}
        <button ref={restartBtnRef} className="restart-btn" onClick={handleRestart}>
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </button>

        <div ref={containerRef} className="preloader-container">
          {images.map((src, index) => (
            <div key={index} className="image-wrapper" id={index === images.length - 1 ? "final-image" : undefined}>
              <img src={src || "/placeholder.svg"} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}