'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Announcement() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate sparkles positions
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 60 + Math.random() * 30,
      delay: Math.random() * 2,
      duration: 2 + Math.random()
    }))
    setSparkles(newSparkles)
  }, [])

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
      gsap.to([titleRef.current, namesRef.current, dateRef.current], {
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
      
      tl.fromTo(namesRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      
      tl.fromTo(dateRef.current,
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
      className="relative min-h-screen flex items-end justify-center overflow-hidden"
    >
      {/* Background Image - No overlay on main area */}
      <div ref={bgRef} className="absolute inset-0 md:-top-20">
        {/* Mobile: use c1.jpg */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-contain md:hidden"
          style={{
            backgroundImage: 'url(/images/60x120/c1.jpg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
          }}
        />
        {/* Desktop: use original image */}
        <div 
          className="hidden md:block absolute inset-0 bg-no-repeat bg-contain"
          style={{
            backgroundImage: 'url(/images/15x21/DSC01337.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Gradient overlay at bottom only - for text readability */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 opacity-20 z-5"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD700]">
          <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-32 right-16 w-12 h-12 opacity-15 z-5"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -15, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD700]">
          <circle cx="50" cy="30" r="12" fill="currentColor" />
          <circle cx="50" cy="70" r="12" fill="currentColor" />
          <circle cx="30" cy="50" r="12" fill="currentColor" />
          <circle cx="70" cy="50" r="12" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Sparkles around names */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: '4px',
              height: '4px',
              background: '#FFD700',
              boxShadow: '0 0 10px #FFD700'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -30]
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Content - Positioned at bottom */}
      <div className="relative z-10 text-center px-4 pb-8 md:pb-16 pt-[60vh] md:pt-0 w-full max-w-4xl mx-auto">
        {/* Names - Diagonal style */}
        <div ref={namesRef} className="mb-6 relative">
          <div className="flex flex-col items-center gap-0">
            {/* Groom name - left aligned, rotated */}
            <p 
              className="font-script text-5xl md:text-8xl lg:text-9xl text-white self-start ml-4 md:ml-12 -rotate-3"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Trung Kiên
            </p>
            
            {/* & symbol - stylized with floating animation */}
            <motion.p 
              className="font-script text-6xl md:text-9xl lg:text-[10rem] text-[#FFD700] my-1"
              style={{ 
                textShadow: '0 2px 20px rgba(0,0,0,0.6)'
              }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              &
            </motion.p>
            
            {/* Bride name - right aligned, rotated opposite */}
            <p 
              className="font-script text-5xl md:text-8xl lg:text-9xl text-white self-end mr-4 md:mr-12 rotate-3"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Ngọc Thùy
            </p>
          </div>
        </div>

        {/* Wedding Title */}
        <div ref={titleRef} className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#FFD700]" style={{ boxShadow: '0 0 10px rgba(255,215,0,0.5)' }} />
            <svg 
              className="w-6 h-6 text-[#FFD700] pulsing-heart" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              style={{ 
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#FFD700]" style={{ boxShadow: '0 0 10px rgba(255,215,0,0.5)' }} />
          </div>
          <p className="font-montserrat text-sm md:text-base text-white uppercase tracking-[0.3em] font-medium" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
            Lễ Thành Hôn
          </p>
        </div>

        {/* Date Section */}
        <div ref={dateRef} className="flex flex-col items-center gap-3">
          {/* Day of week */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]/50" />
            <p className="font-montserrat text-[#FFD700] text-sm md:text-base font-semibold tracking-[0.2em] uppercase" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
              Thứ Bảy
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]/50" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 md:gap-6">
            <p className="font-playfair text-2xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>03</p>
            <div className="w-px h-8 md:h-12 bg-[#FFD700]/50" />
            <p className="font-playfair text-2xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>01</p>
            <div className="w-px h-8 md:h-12 bg-[#FFD700]/50" />
            <p className="font-playfair text-2xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>2026</p>
          </div>

          {/* Lunar date */}
          <p className="font-playfair text-base md:text-xl text-white/90 italic" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
            Nhằm ngày 15 tháng 11 năm Ất Tỵ
          </p>
        </div>
      </div>
    </section>
  )
}
