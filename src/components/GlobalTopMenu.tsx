"use client";

import Link from "next/link";
import { useState } from "react";
import { useLoaderContext } from "@/context/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalTopMenu() {
  const [open, setOpen] = useState(false);
  const { loaderShown } = useLoaderContext();
  return (
    <AnimatePresence>
      {loaderShown && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 py-4 pointer-events-none"
        >
          {/* BIO Button top left */}
          <div className="pointer-events-auto">
            <Link href="/actress-bio" className="group">
              <span className="relative text-base font-semibold text-white cursor-pointer select-none">
                BIO
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
              </span>
            </Link>
          </div>
          {/* Work Menu top right */}
          <div className="relative pointer-events-auto">
            <button
              className="relative text-base font-semibold text-white cursor-pointer select-none flex items-center gap-2 focus:outline-none group"
              onClick={() => setOpen((v) => !v)}
              onBlur={() => setOpen(false)}
            >
              Work
              <span className={`inline-block transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                {/* ArrowUpRight icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 4H12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1 absolute left-0 right-0 bottom-[-6px]" />
            </button>
            <div
              className={`absolute right-0 mt-2 w-44 bg-black/40 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 transition-all duration-300 origin-top z-50 ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}`}
            >
              <ul className="py-2">
                {[
                  { label: 'Films', href: '/films' },
                  { label: 'TV', href: '/tv' },
                  { label: 'Ads', href: '/ads' },
                  { label: 'Extras', href: '/extra' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group flex items-center justify-between px-4 py-2 text-white hover:bg-white/5 transition-colors relative">
                      <span className="relative">
                        {item.label}
                        <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1 absolute left-0 right-0 bottom-[-2px]" />
                      </span>
                      <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                        {/* ArrowUpRight icon */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M6 4H12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
