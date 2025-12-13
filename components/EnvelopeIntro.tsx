'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface EnvelopeIntroProps {
  onComplete: () => void
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const envelopeRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const waxSealRef = useRef<HTMLButtonElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete
        })
      }
    })

    // Lift envelope slightly
    tl.to(envelopeRef.current, {
      y: -20,
      duration: 0.4,
      ease: 'power2.out'
    })

    // Wax seal disappears first - smooth fade out with scale
    tl.to(waxSealRef.current, {
      opacity: 0,
      scale: 0.3,
      y: -10,
      duration: 0.6,
      ease: 'power2.in'
    }, '-=0.2') // Start slightly before envelope lift completes

    // Small pause after wax seal disappears
    tl.to({}, { duration: 0.3 })

    // Open the flap with 3D rotation - smooth and natural
    tl.to(flapRef.current, {
      rotateX: 180,
      z: 20,
      duration: 1.8,
      ease: 'power3.inOut'
    })

    // Hold for a moment to see the opened envelope
    tl.to({}, { duration: 0.6 })

    // Fade out envelope
    tl.to(envelopeRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.inOut'
    })
  }

  useEffect(() => {
    // Initial animation sequence - smooth and elegant
    const tl = gsap.timeline()
    
    // Envelope gracefully fades in and settles
    tl.fromTo(envelopeRef.current,
      { y: -60, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.4, 
        ease: 'power3.out'
      }
    )

    // Shadow smoothly appears
    tl.fromTo(shadowRef.current,
      { scaleX: 0.3, opacity: 0 },
      { 
        scaleX: 1, 
        opacity: 0.3, 
        duration: 1,
        ease: 'power2.out'
      },
      '-=1.2'
    )

    // Gentle floating animation - very subtle
    gsap.to(envelopeRef.current, {
      y: -5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.4
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ 
        perspective: '1500px',
        background: 'linear-gradient(135deg, #FAF9F6 0%, #E8E6E1 50%, #FAF9F6 100%)'
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-sparkle"
            style={{
              background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-2xl animate-float-heart opacity-20"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            💕
          </div>
        ))}

        {/* Decorative corner flourishes */}
        <svg className="absolute top-8 left-8 w-32 h-32 text-accent/20" viewBox="0 0 100 100">
          <path d="M10 90 Q10 10 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
        </svg>
        <svg className="absolute top-8 right-8 w-32 h-32 text-accent/20 rotate-90" viewBox="0 0 100 100">
          <path d="M10 90 Q10 10 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-32 h-32 text-accent/20 -rotate-90" viewBox="0 0 100 100">
          <path d="M10 90 Q10 10 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-8 right-8 w-32 h-32 text-accent/20 rotate-180" viewBox="0 0 100 100">
          <path d="M10 90 Q10 10 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* Shadow under envelope */}
      <div
        ref={shadowRef}
        className="absolute w-[380px] h-8 rounded-[50%] bg-navy/20 blur-xl"
        style={{ top: 'calc(50% + 140px)' }}
      />

      {/* Save the Date - Centered above envelope */}
      <div className="absolute top-16 left-0 right-0 text-center z-30 pointer-events-none">
        <p className="font-script text-5xl md:text-6xl text-navy font-normal tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          Save the Date
        </p>
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <svg className="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>
      </div>


      {/* Main Envelope */}
      <div
        ref={envelopeRef}
        className="relative cursor-pointer group mt-32"
        onClick={startAnimation}
        style={{ transformStyle: 'preserve-3d' }}
      >

        {/* Envelope Body - Luxury Paper Texture */}
        <div 
          className="relative w-[380px] h-[260px] rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F6F0 50%, #EDE9E0 100%)',
            boxShadow: `
              0 25px 50px -12px rgba(25, 47, 74, 0.25),
              0 0 0 1px rgba(25, 47, 74, 0.1),
              inset 0 1px 0 rgba(255,255,255,0.8)
            `,
            zIndex: 10
          }}
        >
          {/* Paper texture overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
            }}
          />

          {/* Inner envelope design - V shape */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 380 260" className="w-full h-full">
              {/* Left fold line */}
              <path 
                d="M0 0 L190 130" 
                stroke="#192F4A" 
                strokeWidth="0.5" 
                opacity="0.15"
              />
              {/* Right fold line */}
              <path 
                d="M380 0 L190 130" 
                stroke="#192F4A" 
                strokeWidth="0.5" 
                opacity="0.15"
              />
            </svg>
          </div>

          {/* Decorative border with gold accent */}
          <div className="absolute inset-3 border border-[#D4AF37]/40 rounded pointer-events-none" />
          <div className="absolute inset-4 border border-navy/10 rounded pointer-events-none" />

          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full text-[#D4AF37]/60">
              <path d="M0 16 Q0 0 16 0 M0 16 L0 24 M16 0 L24 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 rotate-90">
            <svg viewBox="0 0 32 32" className="w-full h-full text-[#D4AF37]/60">
              <path d="M0 16 Q0 0 16 0 M0 16 L0 24 M16 0 L24 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-8 h-8 -rotate-90">
            <svg viewBox="0 0 32 32" className="w-full h-full text-[#D4AF37]/60">
              <path d="M0 16 Q0 0 16 0 M0 16 L0 24 M16 0 L24 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-8 h-8 rotate-180">
            <svg viewBox="0 0 32 32" className="w-full h-full text-[#D4AF37]/60">
              <path d="M0 16 Q0 0 16 0 M0 16 L0 24 M16 0 L24 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>

          {/* Inner envelope opening - V shape to show card inside */}
          <div className="absolute top-0 left-0 right-0 h-[140px] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
              <svg viewBox="0 0 380 140" className="w-full h-full">
                <path 
                  d="M0 0 L190 140 L380 0" 
                  fill="rgba(25, 47, 74, 0.05)"
                  stroke="rgba(25, 47, 74, 0.1)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Wax Seal - Red Seal with Save the Date */}
        <button
          ref={waxSealRef}
          onClick={(e) => {
            e.stopPropagation()
            startAnimation()
          }}
          className="absolute top-[139px] left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group"
          style={{
            transform: 'translateX(-50%) translateY(-50%)',
            zIndex: 20
          }}
          aria-label="Mở thiệp"
        >
          <div 
            className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #7F1D1D, #991B1B, #7F1D1D)',
              boxShadow: `
                0 8px 20px rgba(127, 29, 29, 0.6),
                0 0 0 2px rgba(255, 255, 255, 0.15),
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 4px rgba(0,0,0,0.4)
              `
            }}
          >
            {/* Seal texture */}
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
            
            {/* Monogram */}
            <div className="flex items-center gap-0.5 text-white group-hover:scale-105 transition-transform">
              <span className="font-playfair text-2xl font-bold">K</span>
              <span className="text-base">&</span>
              <span className="font-playfair text-2xl font-bold">T</span>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
          </div>
          
          {/* Seal drip effect - dark red */}
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-3 rounded-b-full"
            style={{ background: 'linear-gradient(180deg, #7F1D1D, #5C1515)' }}
          />
          
          {/* Click hint - small pulse animation */}
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-75" />
        </button>
        
        {/* Click instruction - Below wax seal */}
        <div className="absolute top-[139px] left-1/2 -translate-x-1/2 translate-y-[100px] z-30 pointer-events-none">
          <p className="font-montserrat text-xs md:text-sm text-navy/60 font-medium animate-pulse whitespace-nowrap" style={{ animationDuration: '2s' }}>
            Click để mở
          </p>
        </div>

        {/* Envelope Flap */}
        <div
          ref={flapRef}
          className="absolute left-0 w-[380px]"
          style={{ 
            top: '0px',
            transformStyle: 'preserve-3d',
            zIndex: 15,
            transformOrigin: '50% 0%',
            transform: 'rotateX(0deg)'
          }}
        >
          <div className="relative w-full h-[142px]" style={{ transformStyle: 'preserve-3d', marginTop: '-2px' }}>
            {/* Front of Flap */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F6F0 50%, #EDE9E0 100%)',
                boxShadow: `
                  0 4px 12px rgba(25, 47, 74, 0.15),
                  inset 0 -2px 10px rgba(25, 47, 74, 0.08)
                `,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Flap decorative line */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              
              {/* Small ornament on flap */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <svg width="24" height="16" viewBox="0 0 24 16" className="text-[#D4AF37]/40">
                  <path d="M12 0 L24 8 L12 16 L0 8 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
            </div>
            
            {/* Back of Flap (Elegant lining) - shown when flap opens */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(145deg, #F8F6F0 0%, #EDE9E0 50%, #E5DDD0 100%)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Elegant pattern on back - subtle gold accents */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 380 140">
                  <pattern id="innerPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="15" cy="15" r="1.5" fill="#D4AF37"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#innerPattern)"/>
                </svg>
              </div>
              
              {/* Decorative border inside */}
              <div className="absolute inset-2 border border-[#D4AF37]/20" style={{ clipPath: 'polygon(2% 5%, 50% 98%, 98% 5%)' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
