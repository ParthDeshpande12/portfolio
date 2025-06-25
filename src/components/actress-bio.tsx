"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Mail, Phone, MapPin, Film, Star } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function ActressBio() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.02])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      // Advanced image animations - entrance only
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.9,
          opacity: 0,
          rotationY: -10,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 2,
          ease: "power3.out",
          delay: 0.5,
        },
      )

      // Advanced title animations with text reveal
      const titleChars = titleRef.current?.querySelectorAll(".char")
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.05,
            delay: 0.8,
          },
        )
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 1.5,
        },
      )

      // Bio text animation
      gsap.fromTo(
        ".bio-text",
        {
          opacity: 0,
          y: 40,
          skewY: 2,
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power3.out",
          delay: 2,
        },
      )

      // Advanced marquee animations - true infinite loop
      gsap.set(".marquee-track-1", { y: "0%" })
      gsap.set(".marquee-track-2", { y: "0%" })

      // First column - true infinite loop
      gsap.to(".marquee-track-1", {
        y: "-100%",
        duration: 25,
        ease: "none",
        repeat: -1,
      })

      // Second column - true infinite loop with different speed
      gsap.to(".marquee-track-2", {
        y: "-50%",
        duration: 35,
        ease: "none",
        repeat: -1,
      })

      // Scroll-triggered animations with advanced effects
      gsap.fromTo(
        ".scroll-reveal",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".scroll-reveal",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Award cards animation
      gsap.fromTo(
        ".award-card",
        {
          opacity: 0,
          x: -50,
          rotationY: -10,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".awards-container",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Marquee photos fade-in animation
      gsap.fromTo(
        ".marquee-photo",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [mounted])

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  const marqueePhotos1 = [
    "/images/a.png",
    "/images/b.png",
    "/images/c.png",
    "/images/d.png",
  ]

  const marqueePhotos2 = [
    "/images/d.png",
    "/images/c.png",
    "/images/b.png",
    "/images/a.png",
  ]

  // Show loading state during initial render
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className="bg-black text-white"
      style={{
        minHeight: "100vh",
        overflow: "visible",
        height: "auto",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <section
        className="flex items-center px-6 py-20"
        style={{
          minHeight: "100vh",
          overflow: "visible",
          height: "auto",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Main Photo */}
            <motion.div
              ref={imageRef}
              className="relative"
              style={{
                y: imageY,
                scale: imageScale,
              }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Advanced image container with 3D effects */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/hero.jpg"
                    alt="Suman Rana"
                    width={600}
                    height={1200}
                    className="w-full h-auto object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-white/10"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                ></motion.div>

                <motion.div
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-full border border-white/10"
                  animate={{
                    rotate: -360,
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Right Side - Name and Info */}
            <div className="space-y-12">
              {/* Main Title with character animation */}
              <div>
                <h1 ref={titleRef} className="text-6xl lg:text-8xl font-light tracking-tight mb-4">
                  <div className="block">{splitText("Suman")}</div>
                  <div className="block text-white/70">{splitText("Rana")}</div>
                </h1>
                <p ref={subtitleRef} className="text-xl text-white/60 font-light">
                  Actor . Doctor . Entrepreneur
                </p>
              </div>

              {/* Bio */}
              <div className="bio-text space-y-6">
                <p className="text-lg leading-relaxed text-white/80">
                  A multifaceted talent from Kishtwar, blends medical expertise with artistic brilliance, excelling as a
                  doctor, actor, model, and creative visionary. Her relentless pursuit of excellence and patriotic
                  spirit inspire transformative storytelling and impactful collaborations.
                </p>

                <motion.div
                  className="flex flex-wrap gap-6 text-white/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={16} />
                    <span>Mumbai, Maharastra, India</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Details Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Career Highlights */}
            <div className="scroll-reveal space-y-8">
              <h2 className="text-3xl font-light border-b border-white/20 pb-4">Personal Details</h2>
              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Full Name</h3>
                  <p className="text-xl">Suman Rana</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Nationality</h3>
                  <p className="text-xl">Indian भारतीय</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Born</h3>
                  <p className="text-xl">3 April, Kishtwar, J&K</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Height</h3>
                  <p className="text-xl">5 foot 7 Inch</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Vitals</h3>
                  <p className="text-xl">34-26-36</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Shoe Size</h3>
                  <p className="text-xl">6 (EU 38)</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Skin Tone</h3>
                  <p className="text-xl">Pinkish, Fair, Even, No Marks</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Hair Color</h3>
                  <p className="text-xl">Satanic Brown</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Eye Color</h3>
                  <p className="text-xl">Dark Brown</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Tattoo</h3>
                  <p className="text-xl">Small Tattoo on the right ankle</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Medical History</h3>
                  <p className="text-xl">No Marks, No Allergy</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Passport</h3>
                  <p className="text-xl">Valid, frequent traveller</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Marital Status</h3>
                  <p className="text-xl">Single, Never Married</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Resident</h3>
                  <p className="text-xl">Mumbai, Maharastra, India</p>
                </motion.div>
              </div>
            </div>

            {/* Special Skills */}
            <div className="scroll-reveal space-y-8">
              <h2 className="text-3xl font-light border-b border-white/20 pb-4">Special Skills</h2>
              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Languages</h3>
                  <p className="text-xl">Fluent in Hindi, English, Punjabi, Haryanvi, Rajasthani, and Urdu.</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Dance</h3>
                  <p className="text-xl">Proficient in Bollywood and various Folk Dance styles.</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Dance</h3>
                  <p className="text-xl">
                    Skilled in Yoga, Meditation, Swimming, and basic Horse Riding. Comfortable with animals (including
                    insects/reptiles) and children. Capable of performing stunts.
                  </p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Communication</h3>
                  <p className="text-xl">Strong seminar and communication skills.</p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
                    Medical Knowledge (Relevant for specific roles):
                  </h3>
                  <p className="text-xl">
                    Ph.D. in Health Management with specializations in Obstetrics & Gynaecology. Certified in ACLS
                    (Advanced Cardiovascular Life Supports) and BLS (Basic Life Support).
                  </p>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Philanthropic Endeavors</h3>
                  <p className="text-xl">
                    Involved with Suman Rana&apos;s Trust for older age & Orphan Kids, and leads a private team dedicated to
                    street animals & human care.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Highlights Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Career Highlights */}
            <div className="scroll-reveal space-y-8">
              <h2 className="text-3xl font-light border-b border-white/20 pb-4">Career Highlights</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Indian Films</h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;Aam Aadmi&quot; (2018)</p>
                        <p className="text-white/60 text-sm">Suman Rana as Kiara Rana</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;A Biopic from the Film Industry&quot; (2019)</p>
                        <p className="text-white/60 text-sm">Actress</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;Miracle&quot; (2019)</p>
                        <p className="text-white/60 text-sm">Actress</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;JCLS 369&quot; (2026)</p>
                        <p className="text-white/60 text-sm">Actress</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;Let&apos;s Meet&quot; (2025)</p>
                        <p className="text-white/60 text-sm">Suman Rana as Priya</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Film size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;THE DIPLOMAT&quot; (2025)</p>
                        <p className="text-white/60 text-sm">Shaheen, Uzma&apos;s friend in Malaysia</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Indian Prime Time TV Serials</h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;Zindagi ke Mehak&quot; (2016 ZEE TV)</p>
                        <p className="text-white/60 text-sm">Suman Rana as Shruti Oberoi</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star size={16} className="text-white/40" />
                      <div>
                        <p className="text-xl">&quot;Meri Hanikarak Biwi&quot; (2017 & TV)</p>
                        <p className="text-white/60 text-sm">Suman Rana appeared as Tanya</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Photo Marquee */}
            <div className="lg:col-span-1">
              <div className="relative h-96 overflow-hidden" ref={marqueeRef}>
                <div className="flex gap-3 h-full">
                  {/* First Column */}
                  <div className="flex-1 marquee-track-1 space-y-3">
                    {[...marqueePhotos1, ...marqueePhotos1].map((photo, index) => (
                      <motion.div
                        key={`col1-${index}`}
                        className="marquee-photo relative"
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={photo.startsWith('/images/') ? photo : `/images/${photo}`}
                          alt={`Portfolio ${index + 1}`}
                          width={160}
                          height={220}
                          className="w-full h-auto rounded-lg object-cover shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Second Column */}
                  <div className="flex-1 marquee-track-2 space-y-3">
                    {[...marqueePhotos2, ...marqueePhotos2].map((photo, index) => (
                      <motion.div
                        key={`col2-${index}`}
                        className="marquee-photo relative"
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={photo.startsWith('/images/') ? photo : `/images/${photo}`}
                          alt={`Portfolio ${index + 1}`}
                          width={160}
                          height={220}
                          className="w-full h-auto rounded-lg object-cover shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fade gradients */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="scroll-reveal space-y-8">
            <h2 className="text-4xl font-light">Youtube</h2>
            <p className="text-white/60 text-lg">Watch the official music video &apos;Badami Rangya&apos;</p>

            <motion.div
              className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.youtube.com/embed/b-tl4nFIVW8"
                title="Badami Rangya - Official Music Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal space-y-8">
            <h2 className="text-3xl font-light border-b border-white/20 pb-4">Professional Contact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 10, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="text-white/40" size={20} />
                <div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Email</p>
                  <p className="text-lg">officialsumanrana@gmail.com</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 10, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="text-white/40" size={20} />
                <div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Agent</p>
                  <p className="text-lg">+ 91 837 799 0420</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 10, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="text-white/40" size={20} />
                <div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Location</p>
                  <p className="text-lg">Mumbai, Maharastra, India</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            className="text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            © 2025 Suman Rana. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </motion.div>
  )
}
