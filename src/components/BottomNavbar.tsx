"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, MotionConfig, AnimatePresence } from "framer-motion"
import { User, FileText, Briefcase, Zap, Link, LucideIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  name: string
  icon: LucideIcon
}

interface BottomNavbarProps {
  items?: NavItem[]
  onSectionChange?: (index: number, item: NavItem) => void
}

const defaultNavItems: NavItem[] = [
  { id: "hero", name: "Home", icon: User },
  { id: "introduction", name: "About", icon: FileText },
  { id: "work", name: "Work", icon: Briefcase },
  { id: "integrations", name: "Skills", icon: Zap },
  { id: "contact", name: "Contact", icon: Link },
]

const BottomNavbar = ({ items = defaultNavItems, onSectionChange }: BottomNavbarProps) => {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollY } = useScroll()

  const navbarY = useTransform(scrollY, [0, 100], [20, 0])
  const navbarOpacity = useTransform(scrollY, [0, 50], [0.9, 1])

  useEffect(() => {
    if (!items) return

    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)
      sections.forEach((section, index) => {
        if (!section) return
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        // Move trigger for integrations section up by 100px
        const offset = items[index].id === 'integrations' ? 100 : 0
        const scrollPosition = window.scrollY + window.innerHeight / 2 - offset

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          if (activeSection !== index) {
            setActiveSection(index)
            onSectionChange?.(index, items[index])
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items, activeSection, onSectionChange])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        style={{ y: navbarY, opacity: navbarOpacity }}
        className="fixed bottom-6 left-0 right-0 z-50 flex justify-center items-center w-full px-4"
      >
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="relative"
        >
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-2 shadow-2xl">
            <div className="relative flex items-center justify-center">
              {items.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === index

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative flex items-center justify-center px-4 py-3 mx-1 rounded-full",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                    )}
                    whileHover={{
                      scale: 1.05,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3
                      },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.1
                      },
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white rounded-full shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex items-center space-x-2">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          color: isActive ? "#1f2937" : "rgba(255, 255, 255, 0.9)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          duration: 0.3,
                        }}
                      >
                        <Icon size={18} />
                      </motion.div>

                      <motion.span
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          color: isActive ? "#1f2937" : "rgba(255, 255, 255, 0.9)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          duration: 0.3,
                        }}
                        className="font-medium text-sm"
                      >
                        {item.name}
                      </motion.span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.nav>
      </motion.div>
    </MotionConfig>
  )
}

export default BottomNavbar
export { defaultNavItems }