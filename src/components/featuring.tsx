"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
  {
    id: "a",
    title: "Project A",
    description: "A creative branding and design showcase.",
    image: "/images/a.png",
  },
  {
    id: "b",
    title: "Project B",
    description: "A modern web experience for a tech startup.",
    image: "/images/b.png",
  },
  {
    id: "c",
    title: "Project C",
    description: "A visual storytelling project for a non-profit.",
    image: "/images/c.png",
  },
  {
    id: "d",
    title: "Project D",
    description: "A product launch campaign for a new app.",
    image: "/images/d.png",
  },
]

export default function Featuring() {
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Optionally, add scroll/animation logic here
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Featured Work</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A selection of recent projects and creative solutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg cursor-pointer group relative"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full h-72">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority={project.id === "a"}
                />
                {hovered === project.id && (
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="text-white text-xl font-semibold tracking-wide">View Details</span>
                  </motion.div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
