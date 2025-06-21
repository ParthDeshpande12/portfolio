"use client"
import { useEffect, useRef } from "react"
import { Download } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

function animateGrain(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height
  function draw() {
    if (!ctx) return
    const imageData = ctx.createImageData(w, h)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const shade = Math.floor(Math.random() * 255)
      imageData.data[i] = shade
      imageData.data[i + 1] = shade
      imageData.data[i + 2] = shade
      imageData.data[i + 3] = 18 // alpha for subtle grain
    }
    ctx.putImageData(imageData, 0, 0)
  }
  let frame: number
  function loop() {
    draw()
    frame = requestAnimationFrame(loop)
  }
  loop()
  return () => cancelAnimationFrame(frame)
}

export default function Component() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section) return
    const darks = section.querySelectorAll(".js-dark")
    const whites = section.querySelectorAll(".js-white")
    // Remove animation classes initially
    darks.forEach(el => el.classList.remove(
      "animate-dark-text-1", "animate-dark-text-2", "animate-dark-text-3"
    ))
    whites.forEach(el => el.classList.remove(
      "animate-white-text-1", "animate-white-text-2", "animate-white-text-3"
    ))
    // Animate on scroll
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        darks.forEach((el, i) => el.classList.add(`animate-dark-text-${i+1}`))
        whites.forEach((el, i) => el.classList.add(`animate-white-text-${i+1}`))
      }
    })
    // Animated line scroll trigger
    if (line) {
      gsap.set(line, { scaleX: 0, transformOrigin: 'left' })
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%-=100', // move trigger up by 100px
        once: true,
        onEnter: () => {
          gsap.to(line, { scaleX: 1, duration: 0.8, ease: 'power3.out' })
        }
      })
    }
    // Animated grain canvas
    const canvas = canvasRef.current
    let cleanup: (() => void) | undefined
    if (canvas) {
      canvas.width = 200
      canvas.height = 60
      cleanup = animateGrain(canvas)
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <section ref={sectionRef} className="sticky top-0 h-[calc(100vh)] bg-gray-900 overflow-hidden z-20">
      {/* Animated Line - Left to Right */}
      <div className="w-2/3 h-1 bg-white rounded-full mt-20 ml-4" ref={lineRef} style={{ transform: 'scaleX(0)' }} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-600 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-gray-600 rotate-12"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 border border-gray-600 rotate-45"></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 border border-gray-600 rotate-12"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-gray-600 rotate-45"></div>
      </div>

      {/* Simple Hover Button - Center Right Position, Larger Size */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2 z-20">
        <a href="/SUMAN_RANA_PORTFOLIO.pdf" download target="_blank" rel="noopener noreferrer">
          <button className="group relative overflow-hidden rounded-full px-12 py-6 bg-yellow-400 text-gray-900 text-2xl font-semibold transition-all duration-500 hover:scale-110 shadow-lg">
            {/* Animated Grain Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 z-20 w-full h-full opacity-40 mix-blend-overlay"
              style={{ borderRadius: '9999px' }}
            />
            {/* Left to right black color transition overlay on hover */}
            <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-30" />

            {/* Button content */}
            <div className="relative flex items-center gap-3 z-40 transition-colors duration-500 group-hover:text-white">
              <Download className="w-7 h-7 transition-colors duration-500 group-hover:text-white" />
              Download Portfolio
            </div>
          </button>
        </a>
      </div>

      {/* Main Content - Layered Text Animation */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10 pr-8 md:pr-16">
        <div className="relative space-y-4">
          {/* LET'S - Layered Text */}
          <div className="relative overflow-hidden">
            {/* Dark background text */}
            <h1 className="absolute text-7xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-[0.85] tracking-tighter font-condensed js-dark">
              {"LET'S"}
            </h1>
            {/* White foreground text */}
            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter font-condensed js-white z-10">
              {"LET'S"}
            </h1>
          </div>

          {/* WORK - Layered Text */}
          <div className="relative overflow-hidden">
            {/* Dark background text */}
            <h1 className="absolute text-7xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-[0.85] tracking-tighter font-condensed js-dark">
              WORK
            </h1>
            {/* White foreground text */}
            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter font-condensed js-white z-10">
              WORK
            </h1>
          </div>

          {/* TOGETHER - Layered Text */}
          <div className="relative overflow-hidden">
            {/* Dark background text */}
            <h1 className="absolute text-7xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-[0.85] tracking-tighter font-condensed js-dark">
              TOGETHER
            </h1>
            {/* White foreground text */}
            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter font-condensed js-white z-10">
              TOGETHER
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        .font-condensed {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          font-weight: 900;
          font-stretch: condensed;
          letter-spacing: -0.05em;
        }
        @media (min-width: 768px) {
          .font-condensed {
            letter-spacing: -0.025em;
          }
        }

        /* Both texts slide in from left */
        @keyframes slide-from-left {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* First word - LET'S */
        .animate-dark-text-1 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards;
          opacity: 0;
        }
        .animate-white-text-1 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
          opacity: 0;
        }

        /* Second word - WORK */
        .animate-dark-text-2 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
          opacity: 0;
        }
        .animate-white-text-2 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
          opacity: 0;
        }

        /* Third word - TOGETHER */
        .animate-dark-text-3 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
          opacity: 0;
        }
        .animate-white-text-3 {
          animation: slide-from-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
          opacity: 0;
        }

        @keyframes noise {
          0%,100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
        }
        .animate-noise {
          animation: noise 1.2s steps(10) infinite;
        }
      `}</style>
    </section>
  )
}
