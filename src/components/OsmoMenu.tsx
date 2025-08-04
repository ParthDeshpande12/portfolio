"use client"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useLoaderContext } from "@/context/LoaderContext"
import { motion, AnimatePresence } from "framer-motion"

export default function OsmoMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { loaderShown } = useLoaderContext()

  useEffect(() => {
    // Load GSAP
    const loadGSAP = async () => {
      if (typeof window !== "undefined") {
        const { gsap } = await import("gsap")
        const { CustomEase } = await import("gsap/CustomEase")

        gsap.registerPlugin(CustomEase)
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99")
        gsap.defaults({
          ease: "main",
          duration: 0.7,
        })
      }
    }
    loadGSAP()
  }, [])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  const handleMenuToggle = async () => {
    if (typeof window !== "undefined") {
      const { gsap } = await import("gsap")

      const navWrap = document.querySelector(".osmo-nav")
      const overlay = navWrap?.querySelector(".osmo-overlay")
      const menu = navWrap?.querySelector(".osmo-menu")
      const bgPanels = navWrap?.querySelectorAll(".bg-panel")
      const menuLinks = navWrap?.querySelectorAll(".menu-link")
      const fadeTargets = navWrap?.querySelectorAll("[data-menu-fade]")
      const menuButton = document.querySelector(".menu-button")
      const menuButtonTexts = menuButton?.querySelectorAll("p")
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon")
      const menuCloseButton = navWrap?.querySelector(".menu-close-button")

      const tl = gsap.timeline()

      if (!open) {
        // Open animation
        setOpen(true)
        tl.clear()
          .set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .set(menuCloseButton, { autoAlpha: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
          .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2")
          .fromTo(
            menuCloseButton,
            { autoAlpha: 0, yPercent: -20 },
            { autoAlpha: 1, yPercent: 0, duration: 0.4 },
            "<+=0.1",
          )
      } else {
        // Close animation
        tl.clear()
          .to(menuCloseButton, { autoAlpha: 0, yPercent: -20, duration: 0.3 })
          .to(overlay, { autoAlpha: 0 }, "<+=0.1")
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" })
          .call(() => setOpen(false))
      }
    }
  }

  return (
    <AnimatePresence>
      {loaderShown && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 py-4"
        >
          {/* BIO Button top left */}
          <div className="pointer-events-auto">
            <Link href="/actress-bio" className="group">
              <span className="relative text-base font-semibold text-white cursor-pointer select-none">
                MAYA
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
              </span>
            </Link>
          </div>

          {/* Menu Button top right */}
          <div className="relative pointer-events-auto" ref={menuRef}>
            <button
              className="menu-button relative text-base font-semibold text-white cursor-pointer select-none flex items-center gap-2 focus:outline-none group"
              type="button"
              onClick={handleMenuToggle}
            >
              <div className="menu-button-text">
                <p className="p-large">Menu</p>
                <p className="p-large">Close</p>
              </div>
              <div className="icon-wrap">
                <svg
                  className="menu-button-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1 absolute left-0 right-0 bottom-[-6px]" />
            </button>

            {/* Osmo-style Full Screen Menu */}
            <div className="osmo-nav" style={{ display: "none" }}>
              <div className="osmo-overlay" onClick={handleMenuToggle}></div>
              <nav className="osmo-menu">
                <div className="menu-bg">
                  <div className="bg-panel bg-panel-1"></div>
                  <div className="bg-panel bg-panel-2"></div>
                  <div className="bg-panel bg-panel-3"></div>
                </div>

                {/* Header with Close Button - appears after menu opens */}
                <header className="menu-header">
                  <div className="menu-header-container">
                    <nav className="menu-nav-row">
                      {/* Empty space for logo alignment */}
                      <div className="menu-nav-logo-space"></div>

                      {/* Close Button - exact same position as Menu button */}
                      <div className="menu-nav-row__right">
                        <button className="menu-button menu-close-button" onClick={handleMenuToggle}>
                          <div className="menu-button-text">
                            <p className="p-large">Close</p>
                          </div>
                          <div className="icon-wrap">
                            <svg
                              className="menu-button-icon"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                                fill="currentColor"
                              />
                              <path
                                d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                                fill="currentColor"
                              />
                              <path
                                d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                                fill="currentColor"
                              />
                              <path
                                d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                                fill="currentColor"
                              />
                              <path
                                d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                                fill="currentColor"
                              />
                              <path
                                d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </nav>
                  </div>
                </header>

                <div className="menu-inner">
                  <ul className="menu-list">
                    <li className="menu-list-item">
                      <Link href="/films" className="menu-link" onClick={handleMenuToggle}>
                        <p className="menu-link-heading">Films</p>
                        <p className="eyebrow">01</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/tv" className="menu-link" onClick={handleMenuToggle}>
                        <p className="menu-link-heading">TV</p>
                        <p className="eyebrow">02</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/ads" className="menu-link" onClick={handleMenuToggle}>
                        <p className="menu-link-heading">Ads</p>
                        <p className="eyebrow">03</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/extras" className="menu-link" onClick={handleMenuToggle}>
                        <p className="menu-link-heading">Extras</p>
                        <p className="eyebrow">04</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/actress-bio" className="menu-link" onClick={handleMenuToggle}>
                        <p className="menu-link-heading">About</p>
                        <p className="eyebrow">05</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                  </ul>
                  <div className="menu-details">
                    <p data-menu-fade className="menu-section-title">
                      Socials
                    </p>
                    <div className="socials-row">
                      <Link href="https://instagram.com" data-menu-fade className="social-link" onClick={handleMenuToggle}>
                        Instagram
                      </Link>
                      <Link href="https://linkedin.com" data-menu-fade className="social-link" onClick={handleMenuToggle}>
                        LinkedIn
                      </Link>
                      <Link href="https://twitter.com" data-menu-fade className="social-link" onClick={handleMenuToggle}>
                        Twitter
                      </Link>
                      <Link href="https://behance.net" data-menu-fade className="social-link" onClick={handleMenuToggle}>
                        Behance
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        /* Prevent scrollbars */
        * {
          box-sizing: border-box;
        }

        /* Custom Fonts */
        @font-face {
          font-family: 'PP Neue Corp Tight';
          src: url('https://cdn.prod.website-files.com/673af51dea86ab95d124c3ee/673b0f5784f7060c0ac05534_PPNeueCorp-TightUltrabold.otf') format('opentype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Neue Montreal';
          src: url('https://cdn.prod.website-files.com/6819ed8312518f61b84824df/6819ed8312518f61b84825ba_PPNeueMontreal-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        /* CSS Variables */
        :root {
          --color-primary: #ff6b35;
          --color-neutral-100: #f8f8f8;
          --color-neutral-200: #e8e8e8;
          --color-neutral-300: #ffffff;
          --color-neutral-800: #2a2a2a;
          --color-dark: #131313;
          --menu-padding: 2em;
          --cubic-default: cubic-bezier(0.65, 0.05, 0, 1);
          --gap: 1.5rem;
          --container-padding: 1.5rem;
        }

        /* ...rest of the styled-jsx CSS from your component... */
      `}</style>
    </AnimatePresence>
  )
}
