"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useLoaderContext } from "@/context/LoaderContext"
import { motion, AnimatePresence } from "framer-motion"


export default function GlobalTopMenu() {
  const router = useRouter();
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
    // Global scroll lock using a class
    if (open) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('scroll-locked');
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

  // GSAP-powered page transition for menu links
  const handleMenuLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    try {
      const { gsap } = await import("gsap");
      const navWrap = document.querySelector(".osmo-nav");
      const menu = navWrap?.querySelector(".osmo-menu");
      const overlay = navWrap?.querySelector(".osmo-overlay");
      const bgPanels = navWrap?.querySelectorAll(".bg-panel");
      const menuLinks = navWrap?.querySelectorAll(".menu-link");
      const fadeTargets = navWrap?.querySelectorAll("[data-menu-fade]");
      const menuCloseButton = navWrap?.querySelector(".menu-close-button");
      const tl = gsap.timeline();
      // Animate menu close (reverse of open)
      if (menuCloseButton) {
        tl.to(menuCloseButton, { autoAlpha: 0, yPercent: -20, duration: 0.3 });
      }
      if (overlay) tl.to(overlay, { autoAlpha: 0 }, "<+=0.1");
      if (menu) tl.to(menu, { xPercent: 120 }, "<");
      if (menuLinks && menuLinks.length > 0) tl.to(menuLinks, { yPercent: 140, rotate: 10, stagger: 0.04 }, "<");
      if (fadeTargets && fadeTargets.length > 0) tl.to(fadeTargets, { autoAlpha: 0, yPercent: 50, stagger: 0.03 }, "<");
      if (bgPanels && bgPanels.length > 0) tl.to(bgPanels, { xPercent: 101, stagger: 0.08, duration: 0.4 }, "<");
      tl.set(navWrap, { display: "none" }).call(() => setOpen(false));
      // Wait for animation to finish, then navigate
      tl.call(() => {
        router.push(href);
      });
    } catch (error) {
      console.error("Error in menu link transition:", error);
      router.push(href); // fallback
    }
  };

  const handleMenuToggle = async () => {
    if (typeof window === "undefined") return
    // ...existing code...
    if (typeof window === "undefined") return

    try {
      const { gsap } = await import("gsap")

      const navWrap = document.querySelector(".osmo-nav")
      if (!navWrap) {
        console.warn("Navigation wrapper not found")
        return
      }

      const overlay = navWrap.querySelector(".osmo-overlay")
      const menu = navWrap.querySelector(".osmo-menu")
      const menuButton = document.querySelector(".menu-button")

      if (!overlay || !menu || !menuButton) {
        console.warn("Required menu elements not found")
        return
      }

      const bgPanels = navWrap.querySelectorAll(".bg-panel")
      const menuLinks = navWrap.querySelectorAll(".menu-link")
      const fadeTargets = navWrap.querySelectorAll("[data-menu-fade]")
      const menuButtonTexts = menuButton.querySelectorAll("p")
      const menuButtonIcon = menuButton.querySelector(".menu-button-icon")
      const menuCloseButton = navWrap.querySelector(".menu-close-button")

      const tl = gsap.timeline()

      if (!open) {
        // Open animation
        setOpen(true)
        tl.clear()
          .set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .set(menuCloseButton, { autoAlpha: 0 }, "<")

        // Only animate if elements exist
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1 })
        }

        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
        }

        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")

        if (bgPanels.length > 0) {
          tl.fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
        }

        if (menuLinks.length > 0) {
          tl.fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
        }

        if (fadeTargets.length > 0) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2")
        }

        if (menuCloseButton) {
          tl.fromTo(
            menuCloseButton,
            { autoAlpha: 0, yPercent: -20 },
            { autoAlpha: 1, yPercent: 0, duration: 0.4 },
            "<+=0.1",
          )
        }
      } else {
        // Close animation
        tl.clear()

        if (menuCloseButton) {
          tl.to(menuCloseButton, { autoAlpha: 0, yPercent: -20, duration: 0.3 })
        }

        tl.to(overlay, { autoAlpha: 0 }, "<+=0.1").to(menu, { xPercent: 120 }, "<")

        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, "<")
        }

        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0 }, "<")
        }

        tl.set(navWrap, { display: "none" }).call(() => setOpen(false))
      }
    } catch (error) {
      console.error("Error in menu toggle:", error)
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
            <Link href="/" className="group" prefetch={false}>
              <span className="relative text-base font-semibold text-white cursor-pointer select-none">
                HOME
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" style={{ marginTop: 0 }} />
              </span>
            </Link>
          </div>

          {/* Menu Button top right */}
          <div className="relative pointer-events-auto" ref={menuRef}>
            <button
              className="menu-button group"
              type="button"
              onClick={handleMenuToggle}
            >
              <span className="flex items-center gap-2 relative">
                <span className="menu-button-text p-large">MAYA SHARMA</span>
                <span className="icon-wrap flex items-center justify-center">
                  <svg
                    className="menu-button-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor" />
                    <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="menu-underline block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left absolute left-0 right-0 -bottom-1" />
              </span>
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
                      <Link href="/films" className="menu-link" onClick={e => handleMenuLinkClick(e, "/films") }>
                        <p className="menu-link-heading">Films</p>
                        <p className="eyebrow">01</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/tv" className="menu-link" onClick={e => handleMenuLinkClick(e, "/tv") }>
                        <p className="menu-link-heading">TV</p>
                        <p className="eyebrow">02</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/ads" className="menu-link" onClick={e => handleMenuLinkClick(e, "/ads") }>
                        <p className="menu-link-heading">Ads</p>
                        <p className="eyebrow">03</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/extras" className="menu-link" onClick={e => handleMenuLinkClick(e, "/extras") }>
                        <p className="menu-link-heading">Extras</p>
                        <p className="eyebrow">04</p>
                        <div className="menu-link-bg"></div>
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link href="/actress-bio" className="menu-link" onClick={e => handleMenuLinkClick(e, "/actress-bio") }>
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

      <style jsx global>{`



      /* Global scroll lock utility class */
      body.scroll-locked {
        overflow-x: hidden !important;
        /* Only lock horizontal scroll, allow vertical scroll for dropdown menu */
        position: relative !important;
        width: 100vw !important;
        /* Optionally add padding-right for scrollbar width if needed */
      }
      body {
        overflow-y: scroll;
      }

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

        /* Menu Button Styles */
        .menu-button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0 0.75em;
          margin: 0;
          height: 48px;
          min-width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-button-text {
          font-size: 1.125em;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 600;
          margin: 0;
          line-height: 1;
        }
        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.5em;
        }
        .menu-button-icon {
          width: 1.25em;
          height: 1.25em;
          display: block;
        }
        .menu-underline {
          left: 0;
          right: 0;
          bottom: -4px;
          position: absolute;
        }

        .menu-button-icon {
          width: 1em;
          height: 1em;
        }

        .menu-button-text {
          flex-flow: column;
          justify-content: center;
          align-items: flex-end;
          min-height: 2.5em;
          display: flex;
          overflow: visible;
        }

        .icon-wrap {
          transition: transform 0.4s cubic-bezier(0.65, 0.05, 0, 1);
        }

        .p-large {
          font-size: 1.125em;
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
        }

        /* Menu Header - exact same structure as main header */
        .menu-header {
          z-index: 210;
          /* Remove fixed height and reduce padding */
          padding-top: 0.5em;
          padding-bottom: 0.5em;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          pointer-events: none;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .menu-header .menu-nav-row__right,
        .menu-header .menu-close-button {
          pointer-events: auto;
        }
        .menu-header .menu-close-button {
          margin-right: var(--container-padding);
          margin-top: 0;
          opacity: 1 !important;
          transform: none !important;
          align-self: center;
        }

        /* Only hide logo space, not the close button's container */
        .menu-nav-logo-space {
          display: none !important;
        }

        .menu-nav-row {
          justify-content: space-between;
          align-items: center;
          width: 100%;
          display: flex;
        }

        .menu-nav-logo-space {
          width: 13em; /* Same width as nav-logo-row */
        }
        @media screen and (max-width: 767px) {
          .menu-nav-logo-space {
            width: 2em;
          }
        }

        .menu-nav-row__right {
          grid-column-gap: 0.625rem;
          grid-row-gap: 0.625rem;
          pointer-events: auto; /* Enable clicks for the button */
          justify-content: flex-end;
          align-items: center;
          display: flex;
        }

        .menu-close-button {
          color: var(--color-dark);
          /* Remove opacity and transform here, handled by animation and override above */
          position: relative;
          right: 0;
          top: 0;
          z-index: 220;
          background: none;
          border: none;
          box-shadow: none;
        }

        /* Osmo Navigation Styles */
        .osmo-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 200;
          overflow: hidden;
        }

        .osmo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(19, 19, 19, 0.4);
          cursor: pointer;
        }

        .osmo-menu {
          padding-bottom: var(--menu-padding);
          grid-column-gap: 5em;
          grid-row-gap: 5em;
          padding-top: calc(4 * var(--menu-padding)); /* Increased top padding */
          flex-flow: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 35em;
          max-width: 90vw;
          height: 100vh;
          margin-left: auto;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .menu-bg {
          z-index: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .menu-inner {
          z-index: 1;
          grid-column-gap: 5em;
          grid-row-gap: 5em;
          flex-flow: column;
          justify-content: space-between;
          align-items: flex-start;
          height: 100%;
          min-height: calc(100vh - calc(6 * var(--menu-padding)));
          display: flex;
          position: relative;
          overflow: visible;
        }

        .bg-panel {
          z-index: 0;
          background-color: var(--color-neutral-300);
          border-top-left-radius: 1.25em;
          border-bottom-left-radius: 1.25em;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .bg-panel-1 {
          background-color: var(--color-primary);
        }

        .bg-panel-2 {
          background-color: var(--color-neutral-100);
        }

        .menu-list {
          flex-flow: column;
          width: 100%;
          margin-bottom: 0;
          padding-left: 0;
          list-style: none;
          display: flex;
        }

        .menu-list-item {
          position: relative;
          overflow: hidden;
        }

        .menu-link {
          padding-top: 0.75em;
          padding-bottom: 0.75em;
          padding-left: var(--menu-padding);
          grid-column-gap: 0.75em;
          grid-row-gap: 0.75em;
          width: 100%;
          text-decoration: none;
          display: flex;
          color: inherit;
        }


        .menu-link-heading {
          z-index: 1;
          text-transform: uppercase;
          font-family: 'PP Neue Corp Tight', Arial, sans-serif;
          font-size: 5.625em;
          font-weight: 700;
          line-height: 0.75;
          transition: transform 0.55s cubic-bezier(0.65, 0.05, 0, 1);
          position: relative;
          text-shadow: 0px 1em 0px var(--color-neutral-200);
          margin: 0;
          color: var(--color-dark) !important;
        }

        .menu-link,
        .menu-section-title,
        .social-link {
          color: var(--color-dark) !important;
        }

        .eyebrow {
          color: var(--color-primary) !important;
        }

        .osmo-menu {
          background: var(--color-neutral-300) !important;
        }

        .eyebrow {
          z-index: 1;
          color: var(--color-primary);
          text-transform: uppercase;
          font-family: 'RM Mono', Arial, sans-serif;
          font-weight: 400;
          position: relative;
          margin: 0;
        }

        .menu-link-bg {
          z-index: 0;
          background-color: var(--color-neutral-800);
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.65, 0.05, 0, 1);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: scale3d(1, 0, 1);
        }

        .menu-details {
          padding-left: var(--menu-padding);
          grid-column-gap: 1.25em;
          grid-row-gap: 1.25em;
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-start;
          display: flex;
        }

        .menu-section-title {
          font-size: 0.875em;
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
        }

        .socials-row {
          grid-column-gap: 1.5em;
          grid-row-gap: 1.5em;
          flex-flow: row;
          display: flex;
          flex-wrap: wrap;
        }

        .social-link {
          text-decoration: none;
          position: relative;
          color: inherit;
          font-size: 1.125em;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* Hover Effects */
        @media (hover: hover) {
          .menu-button:hover .icon-wrap {
            transform: rotate(90deg);
          }

          .menu-link:hover .menu-link-heading {
            transform: translate(0px, -1em);
            transition-delay: 0.1s;
          }

          .menu-link:hover .menu-link-bg {
            transform: scale(1, 1);
          }

          .social-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: var(--color-primary);
            transform-origin: right center;
            transform: scale(0, 1);
            transition: transform 0.4s var(--cubic-default);
          }

          .social-link:hover::after {
            transform-origin: left center;
            transform: scale(1, 1);
          }
        }

        /* Mobile Responsive */
        @media screen and (max-width: 767px) {
          :root {
            --menu-padding: 1em;
          }

          .osmo-menu {
            padding-top: calc(6 * var(--menu-padding));
            width: 100vw;
            max-width: 100vw;
          }

          .bg-panel {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          .menu-list-item {
            height: 4.5em;
          }

          .menu-link-heading {
            font-size: 4em;
          }

          .socials-row {
            grid-column-gap: 1em;
            grid-row-gap: 1em;
          }

          .social-link {
            font-size: 1em;
          }

          .menu-nav-logo-space {
            width: auto;
          }
        }

        @media screen and (max-width: 479px) {
          .osmo-menu {
            padding-top: calc(7 * var(--menu-padding));
            padding-bottom: calc(2 * var(--menu-padding));
          }
        }
      `}</style>


    </AnimatePresence>
  )
}




