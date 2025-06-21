"use client"

import { createContext, useContext, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface GSAPContextType {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
}

const GSAPContext = createContext<GSAPContextType | null>(null)

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const context = useRef<GSAPContextType>({
    gsap,
    ScrollTrigger,
  })

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <GSAPContext.Provider value={context.current}>
      {children}
    </GSAPContext.Provider>
  )
}

export function useGSAP() {
  const context = useContext(GSAPContext)
  if (!context) {
    throw new Error('useGSAP must be used within a GSAPProvider')
  }
  return context
} 