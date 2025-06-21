"use client"

import BottomNavbar from '@/components/BottomNavbar'
import { navigationItems } from '@/config/navigation'

// Import your existing sections
import Hero from '@/sections/Hero'
import Introduction from '@/sections/Introduction'
import Features from '@/sections/Features'
import Integrations from '@/sections/Integrations'
import ContactUs from '@/sections/ContactUs'

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="min-h-[160vh] bg-neutral-900">
        <Introduction />
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-[160vh]">
        <Features />
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="min-h-screen w-full p-0 m-0">
        <Integrations />
      </section>

      {/* Contact Us Section - Rendered directly, no wrapper */}
      <section id="contact" className="h-screen bg-neutral-950">
        <ContactUs />
      </section>

      {/* Bottom Navigation */}
      <BottomNavbar 
        items={navigationItems}
      />
    </main>
  )
}
