"use client"

import BottomNavbar from '@/components/BottomNavbar'
import { navigationItems } from '@/config/navigation'
import { useEffect, useState } from 'react'
import LoadingScreen from "@/components/loading-screen"
import { useLoaderContext } from "@/context/LoaderContext"

// Extend the Window interface to include ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: {
      refresh: () => void
    }
  }
}

// Import your existing sections
import Introduction from '@/sections/Introduction'
import Features from '@/sections/Features'
import Integrations from '@/sections/Integrations'
import ContactUs from '@/sections/ContactUs'
import UnfixedHero from "@/components/component"

// Global flag to prevent loader on client-side navigation

export default function Home() {
  const { loaderShown, setLoaderShown } = useLoaderContext()
  const [isLoading, setIsLoading] = useState(!loaderShown)
  const [showNavbar, setShowNavbar] = useState(loaderShown)

  useEffect(() => {
    if (!loaderShown) {
      setIsLoading(true)
      setShowNavbar(false)
      window.scrollTo({ top: 0, behavior: "auto" })
    } else {
      setIsLoading(false)
      setShowNavbar(true)
    }
    // Fix ScrollTrigger race condition
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.refresh()
        console.log("ScrollTrigger refreshed") // Debug log
      }
    }, 500) // Longer delay to ensure all components are ready

    return () => clearTimeout(timer)
  }, [loaderShown])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowNavbar(true), 300) // Fade in after loading
    setLoaderShown(true)
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <section id="hero-section" className="bg-[#181a1b]">
        <UnfixedHero />
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="min-h-[160vh] bg-neutral-900">
        <Introduction />
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-[200vh] h-auto w-full bg-black">
        <Features />
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="min-h-[200vh] h-auto w-full bg-black">
        <Integrations />
      </section>

      {/* Let's Create Section (formerly Circle Reveal) */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative z-40 max-w-4xl text-center px-8">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            LET&apos;S CREATE
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Ready to bring your vision to life? Let&apos;s collaborate and create something extraordinary together.
          </p>
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

      {/* Contact Us Section */}
      <section id="contact" className="h-screen bg-neutral-950">
        <ContactUs />
      </section>

      {/* Loading Screen and Explosion Grid */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center w-full px-4 pointer-events-none">
        <div className={showNavbar ? "opacity-100 translate-y-0 transition-all duration-700 pointer-events-auto" : "opacity-0 translate-y-10 transition-all duration-700"}>
          <BottomNavbar 
            items={navigationItems}
          />
        </div>
      </div>
    </main>
  )
}