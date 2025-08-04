"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { Linkedin, Twitter, Instagram } from "lucide-react"

interface ContactHeroSectionProps {
  className?: string
}

const ContactHeroSection = ({ className = "" }: ContactHeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Framer Motion scroll hooks for this section only
  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen bg-black text-white flex flex-col justify-between overflow-hidden ${className}`}
    >
      <motion.div
        className="flex-1 flex items-center justify-center pt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div className="text-center space-y-6">
          <div className="space-y-5 text-xl font-light">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <span className="text-white font-medium">Office: </span>
              <span className="text-white/70">Bangalore, India</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <span className="text-white font-medium">Mail: </span>
              <span className="text-white/70">maya.creative@example.com</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <span className="text-white font-medium">Phone: </span>
              <span className="text-white/70">+91 87654 32109</span>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center justify-center gap-10 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            <motion.button
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Linkedin size={22} />
              <span className="text-base">LinkedIn</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Twitter size={22} />
              <span className="text-base">Twitter</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Instagram size={22} />
              <span className="text-base">Instagram</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="pb-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.button
          className="bg-white text-black px-12 py-4 rounded-full text-base font-medium hover:bg-white/90 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        >
          Send Message
        </motion.button>
      </motion.div>
    </section>
  )
}

export default ContactHeroSection 