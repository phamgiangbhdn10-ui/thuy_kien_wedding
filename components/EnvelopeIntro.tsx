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
  const cardRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
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
      duration: 0.3,
      ease: 'power2.out'
    })

    // Open the flap with 3D rotation
    tl.to(flapRef.current, {
      rotateX: 180,
      duration: 1,
      ease: 'power3.inOut'
    })

    // Card rises out of envelope
    tl.to(cardRef.current, {
      y: -320,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.4')

    // Scale up card beautifully
    tl.to(cardRef.current, {
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.3')

    // Fade envelope and enlarge card to fill screen
    tl.to(envelopeRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.6
    }, '-=0.4')

    tl.to(cardRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, '-=0.3')
  }

  useEffect(() => {
    // Initial animation sequence
    const tl = gsap.timeline()
    
    // Envelope drops in with bounce
    tl.fromTo(envelopeRef.current,
      { y: -200, opacity: 0, rotateZ: -5 },
      { y: 0, opacity: 1, rotateZ: 0, duration: 1.2, ease: 'bounce.out' }
    )

    // Shadow appears
    tl.fromTo(shadowRef.current,
      { scaleX: 0.5, opacity: 0 },
      { scaleX: 1, opacity: 0.3, duration: 0.5 },
      '-=0.8'
    )

    // Gentle floating animation
    gsap.to(envelopeRef.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5
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

      {/* Main Envelope */}
      <div
        ref={envelopeRef}
        className="relative cursor-pointer group"
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
            `
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

          {/* Wax Seal - Prominent */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-300">
            <div 
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #2A4A6B, #192F4A)',
                boxShadow: `
                  0 8px 20px rgba(25, 47, 74, 0.4),
                  inset 0 2px 4px rgba(255,255,255,0.1),
                  inset 0 -2px 4px rgba(0,0,0,0.2)
                `
              }}
            >
              {/* Seal texture */}
              <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              
              {/* Monogram */}
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <span className="font-playfair text-2xl font-semibold">K</span>
                <span className="text-xl">&</span>
                <span className="font-playfair text-2xl font-semibold">T</span>
              </div>
            </div>
            
            {/* Seal drip effect */}
            <div 
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 rounded-b-full"
              style={{ background: 'linear-gradient(180deg, #192F4A, #0F1F30)' }}
            />
          </div>
        </div>

        {/* Envelope Flap */}
        <div
          ref={flapRef}
          className="absolute -top-[1px] left-0 w-[380px] origin-top"
          style={{ 
            transformStyle: 'preserve-3d',
            zIndex: 10
          }}
        >
          {/* Front of Flap */}
          <div
            className="relative w-full"
            style={{
              height: '140px',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F3EE 100%)',
              boxShadow: 'inset 0 -2px 10px rgba(25, 47, 74, 0.1)',
              backfaceVisibility: 'hidden'
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
          
          {/* Back of Flap (Navy lining) */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '140px',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, #2A4A6B 0%, #192F4A 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Inner pattern on back */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 380 140">
                <pattern id="innerPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#D4AF37"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#innerPattern)"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Wedding Card Inside */}
        <div
          ref={cardRef}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[340px]"
          style={{ 
            transformOrigin: 'center center',
            zIndex: 5
          }}
        >
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDFCFA 100%)',
              boxShadow: '0 15px 40px rgba(25, 47, 74, 0.2), 0 0 0 1px rgba(212, 175, 55, 0.2)'
            }}
          >
            {/* Card gold border */}
            <div className="absolute inset-0 border-2 border-[#D4AF37]/30 rounded-lg pointer-events-none" />
            
            <div className="p-8 text-center">
              {/* Heart Tree - matching invitation */}
              <div className="flex justify-center mb-4">
                <svg width="60" height="70" viewBox="0 0 60 80" className="text-accent">
                  <path 
                    d="M30 75 L30 45" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                  />
                  <path 
                    d="M30 25 Q42 12 42 22 Q42 30 30 40 Q18 30 18 22 Q18 12 30 25" 
                    fill="currentColor"
                  />
                  <path 
                    d="M25 50 Q18 48 16 52 Q14 58 22 60" 
                    fill="currentColor" 
                    opacity="0.6"
                  />
                  <path 
                    d="M35 50 Q42 48 44 52 Q46 58 38 60" 
                    fill="currentColor" 
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Elegant Monogram */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="font-playfair text-5xl text-navy font-light tracking-wide">K</span>
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-[#D4AF37]" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] my-1" />
                  <div className="w-px h-4 bg-[#D4AF37]" />
                </div>
                <span className="font-playfair text-5xl text-navy font-light tracking-wide">T</span>
              </div>
              
              <p className="font-playfair text-lg text-navy italic mb-1">
                Trung Kiên & Ngọc Thuỷ
              </p>
              
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 my-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#D4AF37]">
                  <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="currentColor"/>
                </svg>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
              
              <p className="font-montserrat text-xs text-navy/70 uppercase tracking-[0.25em] mb-3">
                Trân Trọng Kính Mời
              </p>
              
              <div className="inline-block px-6 py-2 border border-[#D4AF37]/40 rounded">
                <p className="font-playfair text-2xl text-accent font-medium">
                  03.01.2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Instruction */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
        <div className="relative">
          <p className="font-montserrat text-base text-navy/80 mb-3 tracking-wide">
            ✨ Nhấn vào thiệp để mở ✨
          </p>
          <div className="flex justify-center">
            <div className="w-10 h-14 border-2 border-navy/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Title at top */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
        <p className="font-playfair text-3xl text-navy mb-2">Wedding Invitation</p>
        <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </div>
  )
}
