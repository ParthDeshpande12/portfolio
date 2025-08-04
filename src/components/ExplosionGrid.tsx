"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface GridItem {
  id: string
  title: string
  image: string
  description: string
}

interface ExplosionGridProps {
  items: GridItem[]
  onItemClick?: (item: GridItem) => void
}

export default function ExplosionGrid({ items, onItemClick }: ExplosionGridProps) {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const gridSectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const scrollTextRef = useRef<HTMLDivElement>(null)
  const galleryTextRef = useRef<HTMLDivElement>(null)

  /**
   * CORE FUNCTION: Calculate initial 3D transform for explosion effect
   */
  const calculateInitialTransform = (
    element: HTMLElement,
    offsetDistance = 300,
    maxRotation = 360,
    maxZTranslation = 2500,
  ) => {
    // Get viewport center
    const viewportCenter = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    }

    // Get element center using offsetLeft/offsetTop
    const elementCenter = {
      x: element.offsetLeft + element.offsetWidth / 2,
      y: element.offsetTop + element.offsetHeight / 2,
    }

    // Calculate angle from viewport center to element center
    const angle = Math.atan2(
      Math.abs(viewportCenter.height - elementCenter.y),
      Math.abs(viewportCenter.width - elementCenter.x),
    )

    // Calculate X and Y translation based on angle and distance
    const translateX = Math.abs(Math.cos(angle) * offsetDistance)
    const translateY = Math.abs(Math.sin(angle) * offsetDistance)

    // Calculate distance factor (how far from center)
    const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2))
    const currentDistance = Math.sqrt(
      Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2),
    )
    const distanceFactor = currentDistance / maxDistance

    // Calculate rotations based on position
    const rotationX =
      (elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor
    const rotationY =
      (elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor

    // Calculate Z-depth based on distance from center
    const translateZ = maxZTranslation * distanceFactor

    // Determine direction based on quadrant
    return {
      x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
      y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
      z: translateZ,
      rotateX: rotationX,
      rotateY: rotationY,
      distanceFactor: distanceFactor,
    }
  }

  useEffect(() => {
    // Hero section animations
    if (heroTitleRef.current) {
      // Photography title fade in
      gsap.fromTo(
        heroTitleRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
          delay: 0.5,
        },
      )
    }

    if (scrollTextRef.current) {
      // Scroll down text fade in
      gsap.fromTo(
        scrollTextRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.5,
          delay: 2.5,
          ease: "power2.out",
        },
      )
    }

    // Gallery text animation - appears before grid animation
    if (galleryTextRef.current) {
      gsap.fromTo(
        galleryTextRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.5,
          delay: 3.5,
          ease: "power2.out",
        },
      )
    }

    // Removed GSAP scroll out animation for hero section

    // Main explosion grid scroll animation
    const animateWorksGrid = () => {
      const grid = gridRef.current
      if (!grid) return

      const gridItems = grid.querySelectorAll(".grid-item")

      // Create the scroll-triggered timeline for explosion effect
      gsap
        .timeline({
          defaults: {
            ease: "expo.out",
          },
          scrollTrigger: {
            trigger: gridSectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.5,
          },
        })
        .set(grid, { perspective: 1000 }) // Essential for 3D effect
        .fromTo(
          gridItems,
          {
            // STARTING STATE: Elements are scattered around viewport
            x: (_, el) => calculateInitialTransform(el as HTMLElement).x,
            y: (_, el) => calculateInitialTransform(el as HTMLElement).y,
            z: (_, el) => calculateInitialTransform(el as HTMLElement).z,
            rotateX: (_, el) => calculateInitialTransform(el as HTMLElement).rotateX * 0.5,
            rotateY: (_, el) => calculateInitialTransform(el as HTMLElement).rotateY,
            autoAlpha: 0,
            scale: 0.6,
          },
          {
            // ENDING STATE: Elements fly into their grid positions
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: {
              amount: 0.3,
              from: "center",
              grid: [9, 4], // 9 columns, 4 rows
            },
          },
        )
    }

    // Initialize grid animation
    const timer = setTimeout(() => {
      animateWorksGrid()

      // Add hover animations for grid items
      const gridItems = document.querySelectorAll(".grid-item")
      gridItems.forEach((item) => {
        const tl = gsap.timeline({ paused: true })
        tl.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })

        item.addEventListener("mouseenter", () => tl.play())
        item.addEventListener("mouseleave", () => tl.reverse())
      })
    }, 100)

    // Handle resize
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        setTimeout(animateWorksGrid, 100)
      }, 300)
    }

    window.addEventListener("resize", handleResize)

    // Store refs in variables for cleanup
    const heroTitle = heroTitleRef.current
    const scrollText = scrollTextRef.current
    const galleryText = galleryTextRef.current
    const heroSection = heroSectionRef.current

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf([heroTitle, scrollText, galleryText, heroSection])
    }
  }, [items])

  const handleItemClick = (item: GridItem) => {
    setSelectedItem(item)

    if (modalRef.current && modalContentRef.current) {
      gsap.set(modalRef.current, {
        display: "flex",
        opacity: 0,
      })

      gsap.set(modalContentRef.current, {
        scale: 0.3,
        opacity: 0,
        rotationY: -15,
      })

      const tl = gsap.timeline()
      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        modalContentRef.current,
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        "-=0.1",
      )
    }

    if (onItemClick) {
      onItemClick(item)
    }
  }

  const closeModal = () => {
    if (modalRef.current && modalContentRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedItem(null)
          gsap.set(modalRef.current, { display: "none" })
        },
      })

      tl.to(modalContentRef.current, {
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1",
      )
    }
  }

  return (
    <div className="font-sans bg-black text-white">
      {/* Hero Section */}
      <div ref={heroSectionRef} className="h-screen flex flex-col items-center justify-center sticky top-0 z-20 bg-black px-2 sm:px-4">
        {/* Top Navigation */}
        <div className="absolute top-4 sm:top-8 left-2 right-2 sm:left-8 sm:right-8 flex justify-between items-center">
          <div className="text-white text-xs sm:text-sm font-light tracking-wider">PORTFOLIO</div>
          <div className="text-white text-xs sm:text-sm font-light tracking-wider">LET&#39;S WORK TOGETHER</div>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-wider mb-4 sm:mb-8"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            PHOTOGRAPHY
          </h1>

          <div ref={scrollTextRef} className="text-white text-xs sm:text-sm font-light tracking-widest opacity-70">
            SCROLL DOWN
          </div>
        </div>

        {/* Gallery Text - appears before grid animation */}
        <div 
          ref={galleryTextRef}
          className="absolute bottom-12 sm:bottom-24 left-1/2 transform -translate-x-1/2 text-center"
        >
          <span className="text-white/70 text-xs sm:text-sm font-light tracking-widest">
            MY WORK GALLERY
          </span>
        </div>
      </div>

      {/* Grid Section - This will be pinned during scroll */}
      <div ref={gridSectionRef} className="h-screen flex flex-col items-center justify-center bg-black">
        <div
          ref={gridRef}
          className="grid grid-cols-6 grid-rows-6 gap-4 w-full max-w-7xl h-[90vh] sm:h-[110vh] md:h-[80vh] lg:h-[80vh] mx-auto overflow-visible justify-items-stretch items-stretch"
          style={{ perspective: "1200px" }}
        >
          {items.slice(0, 36).map((item) => {
            // All images always visible, no responsive hiding
            return (
              <div
                key={item.id}
                className={"grid-item group rounded-lg overflow-hidden shadow-lg relative cursor-pointer flex items-stretch min-h-0 min-w-0 w-full h-full"}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover block transition-all duration-300 group-hover:blur-sm"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 11vw"
                  />
                  <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 border-none rounded-full px-4 py-2 flex items-center justify-center text-xs sm:text-sm cursor-pointer opacity-0 transition-all duration-300 backdrop-blur-sm text-gray-800 font-bold group-hover:opacity-100 hover:scale-110"
                    onClick={() => handleItemClick(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
          style={{ display: "none" }}
          onClick={closeModal}
        >
          <div
            ref={modalContentRef}
            className="relative bg-transparent rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 text-lg font-bold"
            >
              ×
            </button>

            <div className="relative w-full h-60 sm:h-80 md:h-[500px]">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3">
                <h2 className="text-3xl font-bold text-white">{selectedItem.title}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Export the GridItem type for use in other components
export type { GridItem }