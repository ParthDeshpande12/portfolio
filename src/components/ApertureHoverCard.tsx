"use client"

import Image from "next/image"

interface ApertureHoverCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  date: string
  category?: string
  className?: string
}

export default function ApertureHoverCard({
  imageSrc,
  imageAlt,
  title,
  date,
  category,
  className = "",
}: ApertureHoverCardProps) {
  return (
    <article className={`group cursor-pointer ${className}`}>
      {/* Image Container with Aperture Overlay */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105 group-hover:blur-sm"
        />

        {/* Film Grain Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgICAgPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPgo8L3N2Zz4K')] pointer-events-none" />

        {/* Vignette Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />

        {/* Aperture Lines/Blades */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center">
          <div className="relative w-24 h-24 transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
            {/* Center Glassmorph Circle with Thin Plus Sign */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center transition-all duration-500 group-hover:w-16 group-hover:h-16">
              {/* Thin Plus Sign */}
              <div className="relative w-6 h-6">
                <span className="absolute left-1/2 top-0 w-0.5 h-full bg-white/80 rounded-full" style={{transform: 'translateX(-50%)'}} />
                <span className="absolute top-1/2 left-0 h-0.5 w-full bg-white/80 rounded-full" style={{transform: 'translateY(-50%)'}} />
              </div>
            </div>
          </div>
        </div>

        {/* Corner Frame Lines */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
          {/* Top Left */}
          <div className="absolute top-4 left-4 w-6 h-6">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-white/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-white/80 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300" />
          </div>

          {/* Top Right */}
          <div className="absolute top-4 right-4 w-6 h-6">
            <div className="absolute top-0 right-0 w-full h-0.5 bg-white/80 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200" />
            <div className="absolute top-0 right-0 w-0.5 h-full bg-white/80 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300" />
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-4 left-4 w-6 h-6">
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200" />
            <div className="absolute bottom-0 left-0 w-0.5 h-full bg-white/80 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300" />
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-4 right-4 w-6 h-6">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white/80 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200" />
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-white/80 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300" />
          </div>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 transform translate-y-2 group-hover:translate-y-0">
            {category}
          </div>
        )}

        {/* Exposure Info Overlay */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-mono">
            f/2.8 • 1/125s • ISO 400
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 font-sans" style={{fontFamily: 'Quicksand, Arial, sans-serif', fontSize: '1.5rem', lineHeight: '2.2rem'}}>
          {title}
        </h3>
        <p className="text-base text-gray-500 font-medium" style={{fontSize: '1.1rem', letterSpacing: '0.01em'}}>{date}</p>
      </div>
    </article>
  )
}