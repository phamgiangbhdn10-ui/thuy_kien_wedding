'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Announcement() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)
  const monogramRef = useRef<HTMLDivElement>(null)
  const inviteRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Fade out effect on scroll
      gsap.to([titleRef.current, namesRef.current, monogramRef.current, inviteRef.current], {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true
        }
      })

      // Initial animations
      const tl = gsap.timeline({ delay: 0.3 })
      
      tl.fromTo(monogramRef.current,
        { scale: 0, opacity: 0, rotateY: -180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.7)' }
      )
      
      tl.fromTo(namesRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      
      tl.fromTo(inviteRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Luxurious Background */}
      <div ref={bgRef} className="absolute inset-0 -top-20">
        {/* Base gradient */}
        <div className="absolute inset-0 luxury-bg" />
        
        {/* Golden shimmer overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="gold-pattern w-full h-full" />
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-[#D4AF37]/20 animate-pulse" />
        <div className="absolute top-32 left-20 w-48 h-48 rounded-full border border-accent/15" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-[#D4AF37]/15" />
        <div className="absolute bottom-40 right-32 w-64 h-64 rounded-full border border-accent/10" />
        
        {/* Floating Leaves */}
        <svg className="absolute top-32 left-24 w-24 h-36 opacity-25 animate-float" viewBox="0 0 40 60">
          <defs>
            <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B8E23" />
              <stop offset="100%" stopColor="#8AB52D" />
            </linearGradient>
          </defs>
          <path d="M20 5 Q32 22 20 55 Q8 22 20 5" fill="url(#leafGrad1)" />
        </svg>
        <svg className="absolute bottom-48 right-40 w-20 h-28 opacity-20 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 40 60">
          <path d="M20 5 Q32 22 20 55 Q8 22 20 5" fill="#6B8E23" />
        </svg>
        <svg className="absolute top-1/2 left-1/4 w-16 h-24 opacity-15 rotate-45 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 40 60">
          <path d="M20 5 Q32 22 20 55 Q8 22 20 5" fill="#6B8E23" />
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-14 h-20 opacity-15 -rotate-12 animate-float" style={{ animationDelay: '1.5s' }} viewBox="0 0 40 60">
          <path d="M20 5 Q32 22 20 55 Q8 22 20 5" fill="#6B8E23" />
        </svg>

        {/* Sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-sparkle"
            style={{
              background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Monogram with Heart Tree */}
        <div ref={monogramRef} className="mb-10">
          {/* Heart Tree Icon */}
          <div className="flex justify-center mb-6">
            <svg width="80" height="100" viewBox="0 0 60 80" className="text-accent drop-shadow-lg">
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B8E23" />
                  <stop offset="100%" stopColor="#8AB52D" />
                </linearGradient>
              </defs>
              <path d="M30 75 L30 40" stroke="url(#heartGrad)" strokeWidth="4" fill="none" />
              <path d="M30 20 Q45 5 45 18 Q45 28 30 40 Q15 28 15 18 Q15 5 30 20" fill="url(#heartGrad)" />
              <path d="M30 45 Q20 42 18 48 Q16 56 28 58" fill="url(#heartGrad)" opacity="0.7" />
              <path d="M30 45 Q40 42 42 48 Q44 56 32 58" fill="url(#heartGrad)" opacity="0.7" />
            </svg>
          </div>

          {/* Elegant Monogram */}
          <div className="inline-flex items-center justify-center gap-6 px-10 py-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-xl border border-[#D4AF37]/30">
            <span className="font-playfair text-8xl md:text-9xl text-navy font-light drop-shadow-sm">K</span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            </div>
            <span className="font-playfair text-8xl md:text-9xl text-navy font-light drop-shadow-sm">T</span>
          </div>
        </div>

        {/* Names */}
        <div ref={namesRef} className="mb-10">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-navy heading-shadow">
            <span className="block mb-3 elegant-underline">Ngô Trung Kiên</span>
            <span className="text-[#D4AF37] text-4xl md:text-5xl font-light drop-shadow-sm">&</span>
            <span className="block mt-3 elegant-underline">Phạm Ngọc Thuỷ</span>
          </h1>
        </div>

        {/* Wedding Announcement Title */}
        <div ref={titleRef} className="mb-10">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
            <svg className="w-8 h-8 text-[#D4AF37] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
          </div>
          <p className="font-montserrat text-sm md:text-base text-navy uppercase tracking-[0.4em] font-medium">
            Lễ Thành Hôn
          </p>
        </div>

        {/* Invitation Text */}
        <div ref={inviteRef}>
          <p className="font-playfair text-xl md:text-2xl text-navy/80 italic max-w-2xl mx-auto leading-relaxed mb-10">
            Trân trọng kính mời quý khách đến dự buổi tiệc chung vui cùng gia đình chúng tôi
          </p>
          
          <div className="inline-block px-10 py-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-[#D4AF37]/30">
            <p className="font-montserrat text-[#D4AF37] text-lg font-semibold tracking-wider mb-2">
              THỨ BẢY
            </p>
            <p className="font-playfair text-6xl md:text-7xl text-navy font-semibold drop-shadow-sm">
              03.01.2026
            </p>
            <p className="font-montserrat text-navy/60 text-sm tracking-widest mt-2">
              (Nhằm ngày 15 tháng 11 năm Ất Tỵ)
            </p>
          </div>
        </div>
      </div>

      {/* Corner Decorations - More prominent */}
      <div className="absolute top-8 left-8 w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/40">
          <path d="M0 80 Q0 0 80 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="80" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-24 h-24 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/40">
          <path d="M0 80 Q0 0 80 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="80" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 w-24 h-24 -rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/40">
          <path d="M0 80 Q0 0 80 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="80" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-24 h-24 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/40">
          <path d="M0 80 Q0 0 80 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="80" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
