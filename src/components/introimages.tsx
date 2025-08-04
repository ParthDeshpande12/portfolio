"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function IntroImages() {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  })

  // Use direct scrollYProgress instead of spring to avoid interference
  // const smoothProgress = useSpring(scrollYProgress, {
  //   stiffness: 400,
  //   damping: 40
  // })

  // STOP zooming completely once it fills the screen (back to original)
  // Adjust scrollYProgress mapping so zoom starts when section is near center
  // The sticky container is h-screen, so center is at 50vh scroll

  // Move the zoom trigger back to 0.40 (similar to 0.35, which worked perfectly)
  const volunteerScale = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [1, 1, 2.5, 2.5])
  const volunteerZIndex = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 50])

  // Push surrounding images away as center image zooms (back to original)
  // Reduced push distance for mobile
  const leftImagesPush = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [0, 0, -200, -200])
  const rightImagesPush = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [0, 0, 200, 200])
  const sideImagesScale = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [1, 1, 0.8, 0.8])

  // Mobile-specific push distances (less aggressive)

  // Surprise text animation - appears AFTER zoom completes (back to original)
  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 0.6, 1], [0, 0, 1, 1])
  const textScale = useTransform(scrollYProgress, [0, 0.55, 0.6, 1], [0.5, 0.5, 1, 1])
  const textY = useTransform(scrollYProgress, [0, 0.55, 0.6, 1], [50, 50, 0, 0])

  return (
    <section className="h-[150vh] bg-[#181a1b] relative" ref={imageContainerRef}>
      {/* Sticky container that holds the images */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Image Grid with Zoom Effect */}
        <div className="w-full px-2 sm:px-4 md:px-0">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex md:hidden flex-col h-[500px] w-full">
            {/* Top Images Row - Mobile */}
            <motion.div
              className="flex gap-2 h-[100px] mb-4"
              style={{
                y: useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [0, 0, -80, -80]),
                scale: sideImagesScale,
              }}
            >
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src="/images/2.jpg"
                  alt="Top image 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="Top image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Center Image - Mobile */}
            <motion.div
              className="flex-1 mx-4 relative"
              id="volunteer-section"
              style={{
                scale: volunteerScale,
                zIndex: volunteerZIndex,
                transformOrigin: "center center",
              }}
            >
              <div className="relative h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/1.jpg"
                  alt="Center image"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={95}
                  sizes="(max-width: 640px) 80vw, 60vw"
                />
              </div>
            </motion.div>

            {/* Bottom Images Row - Mobile */}
            <motion.div
              className="flex gap-2 h-[100px] mt-4"
              style={{
                y: useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [0, 0, 80, 80]),
                scale: sideImagesScale,
              }}
            >
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src="/images/2.jpg"
                  alt="Bottom image 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="Bottom image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:flex h-[500px] w-full">
            {/* Far Left - GETS PUSHED LEFT */}
            <motion.div
              className="w-[200px] -ml-32"
              style={{
                x: leftImagesPush,
                scale: sideImagesScale,
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/1.jpg"
                  alt="Left image 1"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Second Column - GETS PUSHED LEFT */}
            <motion.div
              className="flex-1 min-w-0 flex flex-col gap-4 mx-8"
              style={{
                x: leftImagesPush,
                scale: sideImagesScale,
              }}
            >
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src="/images/2.jpg"
                  alt="Left image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="Left image 3"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Center - ZOOM STOPS AT FULL SCREEN */}
            <motion.div
              className="flex-[2.5] min-w-0 mx-4 relative"
              id="volunteer-section"
              style={{
                scale: volunteerScale,
                zIndex: volunteerZIndex,
                transformOrigin: "center center",
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/1.jpg"
                  alt="Center image"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={95}
                  sizes="(max-width: 1200px) 40vw, 30vw"
                />
              </div>
            </motion.div>

            {/* Fourth Column - GETS PUSHED RIGHT */}
            <motion.div
              className="flex-1 min-w-0 flex flex-col gap-4 mx-8"
              style={{
                x: rightImagesPush,
                scale: sideImagesScale,
              }}
            >
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src="/images/2.jpg"
                  alt="Right image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="Right image 3"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Far Right - GETS PUSHED RIGHT */}
            <motion.div
              className="w-[200px] -mr-32"
              style={{
                x: rightImagesPush,
                scale: sideImagesScale,
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/1.jpg"
                  alt="Right image 1"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* SURPRISE TEXT - POSITIONED RELATIVE TO VIEWPORT - Mobile responsive */}
        <motion.div
          className="absolute bottom-8 sm:bottom-16 md:bottom-32 right-4 sm:right-8 md:right-16 z-[100] max-w-[calc(100vw-2rem)] sm:max-w-none"
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] stroke-black leading-tight">
            <span className="inline-block w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-white mr-2 sm:mr-4 align-middle drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></span>
            where care drives change.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}