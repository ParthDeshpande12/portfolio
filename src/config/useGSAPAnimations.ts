"use client"

import { useMemo } from "react"

// Custom easing curves matching GSAP
export const customEasing = {
  inOutDefault: [0.9, 0.1, 0.1, 0.9] as const,
  inOutStrong: [1, 0, 0, 1] as const,
  outDefault: [0, 0, 0, 1] as const,
}

// Animation timing constants
export const animationConfig = {
  transitionOffset: 500,
  staggerDefault: 0.06,
  durationDefault: 1.2,
  exitDuration: 0.5,
  exitStagger: 0.02,
}

export const useGSAPAnimations = () => {
  const animations = useMemo(
    () => ({
      // Text reveal animations (slide up from bottom, exit up)
      splitTextAnimation: {
        hidden: { y: "100%" },
        visible: (i: number) => ({
          y: "0%",
          transition: {
            duration: animationConfig.durationDefault,
            ease: customEasing.outDefault,
            delay: i * animationConfig.staggerDefault,
          },
        }),
        exit: (i: number) => ({
          y: "-105%",
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
            delay: i * animationConfig.exitStagger,
          },
        }),
      },

      // Slide up animation for larger elements
      slideUpAnimation: {
        hidden: { y: "100%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: {
            duration: animationConfig.durationDefault,
            ease: customEasing.outDefault,
          },
        },
        exit: {
          y: "-100%",
          opacity: 0,
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
          },
        },
      },

      // Navigation items animation
      navAnimation: {
        hidden: { y: "100%" },
        visible: (i: number) => ({
          y: "0%",
          transition: {
            duration: animationConfig.durationDefault / 2,
            ease: customEasing.outDefault,
            delay: i * (animationConfig.staggerDefault * 2),
          },
        }),
        exit: (i: number) => ({
          y: "-100%",
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
            delay: i * animationConfig.exitStagger,
          },
        }),
      },

      // Line/bar animations (width based)
      lineAnimation: {
        hidden: { width: "0%" },
        visible: (i: number) => ({
          width: "100%",
          transition: {
            duration: animationConfig.durationDefault,
            ease: customEasing.outDefault,
            delay: i * (animationConfig.staggerDefault * 1.5),
          },
        }),
        exit: (i: number) => ({
          width: "0%",
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
            delay: i * animationConfig.exitStagger,
          },
        }),
      },

      // Scale animations for buttons/icons
      scaleAnimation: {
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
          },
        },
        exit: {
          scale: 0,
          opacity: 0,
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
          },
        },
      },

      // Fade animations for main content
      fadeAnimation: {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: animationConfig.durationDefault,
            ease: customEasing.outDefault,
          },
        },
        exit: {
          opacity: 0,
          y: -50,
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
          },
        },
      },

      // Stagger container for multiple elements
      staggerContainer: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: animationConfig.staggerDefault,
          },
        },
        exit: {
          transition: {
            staggerChildren: animationConfig.exitStagger,
          },
        },
      },

      // Loading screen animation
      loadingAnimation: {
        hidden: { opacity: 1 },
        exit: {
          opacity: 0,
          transition: {
            duration: animationConfig.exitDuration,
            ease: customEasing.outDefault,
          },
        },
      },

      // Page transition overlay
      transitionOverlay: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: animationConfig.exitDuration },
      },
    }),
    [],
  )

  return animations
}
