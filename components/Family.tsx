'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Family() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate sparkles and hearts positions for background
    const newSparkles: Array<{ id: number; x: number; y: number; delay: number; duration: number }> = []
    
    // Golden sparkles (20)
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: i + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      })
    }
    
    // Floating hearts (8)
    for (let i = 0; i < 8; i++) {
      newSparkles.push({
        id: i + 200,
        x: 10 + Math.random() * 80,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3
      })
    }
    
    setSparkles(newSparkles)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.family-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-cream overflow-hidden"
    >
      {/* Background gradient like envelope */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FAF9F6 0%, #E8E6E1 50%, #FAF9F6 100%)'
        }}
      />
      
      {/* Animated Background Particles - like envelope */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden sparkles */}
        {Array.from({ length: 20 }, (_, i) => {
          const sparkle = sparkles.find(s => s.id === i + 100) || { x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 3, duration: 2 + Math.random() * 2 }
          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )
        })}
        
        {/* Floating hearts - pink */}
        {Array.from({ length: 8 }, (_, i) => {
          const heart = sparkles.find(s => s.id === i + 200) || { x: 10 + Math.random() * 80, y: Math.random() * 100, delay: Math.random() * 4, duration: 4 + Math.random() * 3 }
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💕
            </motion.div>
          )
        })}

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

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 opacity-10"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
          <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 w-16 h-16 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
          delay: 1
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
          <circle cx="50" cy="30" r="12" fill="currentColor" />
          <circle cx="50" cy="70" r="12" fill="currentColor" />
          <circle cx="30" cy="50" r="12" fill="currentColor" />
          <circle cx="70" cy="50" r="12" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
        </svg>
      </motion.div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="family-content max-w-4xl mx-auto">
          {/* Card */}
          <div 
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)',
              boxShadow: '0 20px 40px rgba(25, 47, 74, 0.12), 0 0 0 1px rgba(25, 47, 74, 0.1)'
            }}
          >
            {/* VIP Decorative corner elements - Ornate */}
            <div className="absolute top-6 left-6 w-12 h-12">
              <svg viewBox="0 0 48 48" className="w-full h-full text-[#D4AF37]/50">
                <path d="M0 0 L48 0 L48 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="48" cy="0" r="3" fill="currentColor" />
                <circle cx="0" cy="48" r="3" fill="currentColor" />
                <path d="M8 8 L16 8 M8 8 L8 16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rotate-90">
              <svg viewBox="0 0 48 48" className="w-full h-full text-[#D4AF37]/50">
                <path d="M0 0 L48 0 L48 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="48" cy="0" r="3" fill="currentColor" />
                <circle cx="0" cy="48" r="3" fill="currentColor" />
                <path d="M8 8 L16 8 M8 8 L8 16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-6 w-12 h-12 -rotate-90">
              <svg viewBox="0 0 48 48" className="w-full h-full text-[#D4AF37]/50">
                <path d="M0 0 L48 0 L48 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="48" cy="0" r="3" fill="currentColor" />
                <circle cx="0" cy="48" r="3" fill="currentColor" />
                <path d="M8 8 L16 8 M8 8 L8 16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-6 right-6 w-12 h-12 rotate-180">
              <svg viewBox="0 0 48 48" className="w-full h-full text-[#D4AF37]/50">
                <path d="M0 0 L48 0 L48 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="48" cy="0" r="3" fill="currentColor" />
                <circle cx="0" cy="48" r="3" fill="currentColor" />
                <path d="M8 8 L16 8 M8 8 L8 16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            
            {/* VIP Ornamental border - Double line with pattern */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Outer border */}
              <div className="absolute inset-2 rounded-3xl border border-[#D4AF37]/30" />
              {/* Inner border */}
              <div className="absolute inset-4 rounded-3xl border border-[#D4AF37]/20" />
              
              {/* Decorative dots at corners */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#D4AF37]/40" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]/40" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#D4AF37]/40" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]/40" />
              
              {/* Ornamental pattern on sides */}
              <div className="absolute top-1/2 left-2 -translate-y-1/2">
                <div className="flex flex-col gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                </div>
              </div>
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                <div className="flex flex-col gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                </div>
              </div>
              <div className="absolute left-1/2 top-2 -translate-x-1/2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                </div>
              </div>
              <div className="absolute left-1/2 bottom-2 -translate-x-1/2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                </div>
              </div>
            </div>
            {/* Title */}
            <div className="text-center mb-10">
              <motion.h2 
                className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Wedding
              </motion.h2>
              <div className="flex items-center justify-center gap-3">
                <motion.div 
                  className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.svg 
                  className="w-5 h-5 text-[#D4AF37]" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </motion.svg>
                <motion.div 
                  className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>

            {/* Two columns - Always side by side with avatars */}
            <div className="grid grid-cols-2 gap-3 md:gap-8 mb-10">
              {/* Nhà Trai */}
              <div className="text-center flex flex-col items-center">
                <h3 className="font-playfair text-base md:text-3xl text-navy mb-3 md:mb-6 font-medium">
                  Nhà Trai
                </h3>
                
                <div className="space-y-1 md:space-y-1 mb-3 md:mb-6">
                  <p className="font-montserrat text-xs md:text-base text-navy/70 leading-tight">
                    Ông: <span className="font-medium text-navy">Ngô Đăng Chính</span>
                  </p>
                  <p className="font-montserrat text-xs md:text-base text-navy/70 leading-tight">
                    Bà: <span className="font-medium text-navy">Bùi Thị Hà</span>
                  </p>
                </div>

                <p className="font-montserrat text-[10px] md:text-sm text-navy/50 mb-5 md:mb-8 leading-tight">
                  Ấp 6 - Đồng Tâm<br className="md:hidden" /> T. Đồng Nai
                </p>

                {/* Avatar - Above name */}
                <motion.div
                  className="relative mb-5 md:mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-20 h-20 md:w-32 md:h-32"
                    animate={{
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Outer glow effect */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#E8C547]/15 to-[#D4AF37]/20 blur-xl" style={{ borderRadius: '50%' }} />
                    
                    {/* Decorative SVG border frame */}
                    <svg className="absolute -inset-3 w-full h-full" style={{ borderRadius: '50%' }} viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                          <stop offset="50%" stopColor="#E8C547" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E8C547" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                      
                      {/* Outer decorative ring with pattern */}
                      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient1)" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldGradient2)" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Decorative elements at cardinal points */}
                      <g>
                        {/* Top */}
                        <circle cx="100" cy="5" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 100 0 L 100 10 M 95 5 L 105 5" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Bottom */}
                        <circle cx="100" cy="195" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 100 190 L 100 200 M 95 195 L 105 195" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Left */}
                        <circle cx="5" cy="100" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 0 100 L 10 100 M 5 95 L 5 105" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Right */}
                        <circle cx="195" cy="100" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 190 100 L 200 100 M 195 95 L 195 105" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                      </g>
                      
                      {/* Inner decorative ring */}
                      <circle cx="100" cy="100" r="82" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />
                      <circle cx="100" cy="100" r="78" fill="none" stroke="url(#goldGradient1)" strokeWidth="1" />
                    </svg>
                    
                    {/* Middle ring with subtle pattern */}
                    <div className="absolute -inset-2 rounded-full border-2 border-[#D4AF37]/30" style={{ borderRadius: '50%' }} />
                    
                    {/* Inner decorative border with gradient */}
                    <div 
                      className="absolute -inset-1 rounded-full"
                      style={{
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(232, 197, 71, 0.3) 50%, rgba(212, 175, 55, 0.5) 100%)',
                        padding: '2px'
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-transparent" style={{ borderRadius: '50%' }} />
                    </div>
                    
                    {/* Avatar image container with elegant inset border */}
                    <div className="relative w-full h-full rounded-full overflow-hidden z-10" style={{
                      boxShadow: `
                        0 8px 32px rgba(212, 175, 55, 0.25),
                        inset 0 0 0 3px rgba(255, 255, 255, 0.95),
                        inset 0 0 0 5px rgba(212, 175, 55, 0.4)
                      `,
                      borderRadius: '50%'
                    }}>
                      <Image
                        src="/images/avatar/cr.jpg"
                        alt="Chú rể"
                        fill
                        className="object-cover rounded-full"
                        style={{ borderRadius: '50%' }}
                        quality={85}
                        sizes="(max-width: 768px) 80px, 128px"
                      />
                    </div>
                    
                    {/* Subtle inner glow - static */}
                    <div
                      className="absolute -inset-0.5 rounded-full border border-[#D4AF37]/20"
                      style={{ 
                        borderRadius: '50%',
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Groom name - Script font */}
                <motion.p
                  className="font-script text-xl md:text-5xl text-[#D4AF37] leading-tight"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  Trung Kiên
                </motion.p>
              </div>

              {/* Nhà Gái */}
              <div className="text-center flex flex-col items-center">
                <h3 className="font-playfair text-base md:text-3xl text-navy mb-3 md:mb-6 font-medium">
                  Nhà Gái
                </h3>
                
                <div className="space-y-1 md:space-y-1 mb-3 md:mb-6">
                  <p className="font-montserrat text-xs md:text-base text-navy/70 leading-tight">
                    Ông: <span className="font-medium text-navy">Phạm Thanh Tâm</span>
                  </p>
                  <p className="font-montserrat text-xs md:text-base text-navy/70 invisible">
                    &nbsp;
                  </p>
                </div>

                <p className="font-montserrat text-[10px] md:text-sm text-navy/50 mb-5 md:mb-8 leading-tight">
                  Thôn 11 - Nghĩa Trung<br className="md:hidden" /> T. Đồng Nai
                </p>

                {/* Avatar - Above name */}
                <motion.div
                  className="relative mb-5 md:mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-20 h-20 md:w-32 md:h-32"
                    animate={{
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  >
                    {/* Outer glow effect */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#E8C547]/15 to-[#D4AF37]/20 blur-xl" style={{ borderRadius: '50%' }} />
                    
                    {/* Decorative SVG border frame */}
                    <svg className="absolute -inset-3 w-full h-full" style={{ borderRadius: '50%' }} viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                          <stop offset="50%" stopColor="#E8C547" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E8C547" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                      
                      {/* Outer decorative ring with pattern */}
                      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient1)" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldGradient2)" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Decorative elements at cardinal points */}
                      <g>
                        {/* Top */}
                        <circle cx="100" cy="5" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 100 0 L 100 10 M 95 5 L 105 5" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Bottom */}
                        <circle cx="100" cy="195" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 100 190 L 100 200 M 95 195 L 105 195" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Left */}
                        <circle cx="5" cy="100" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 0 100 L 10 100 M 5 95 L 5 105" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        {/* Right */}
                        <circle cx="195" cy="100" r="2.5" fill="#D4AF37" opacity="0.7" />
                        <path d="M 190 100 L 200 100 M 195 95 L 195 105" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                      </g>
                      
                      {/* Inner decorative ring */}
                      <circle cx="100" cy="100" r="82" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />
                      <circle cx="100" cy="100" r="78" fill="none" stroke="url(#goldGradient1)" strokeWidth="1" />
                    </svg>
                    
                    {/* Middle ring with subtle pattern */}
                    <div className="absolute -inset-2 rounded-full border-2 border-[#D4AF37]/30" style={{ borderRadius: '50%' }} />
                    
                    {/* Inner decorative border with gradient */}
                    <div 
                      className="absolute -inset-1 rounded-full"
                      style={{
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(232, 197, 71, 0.3) 50%, rgba(212, 175, 55, 0.5) 100%)',
                        padding: '2px'
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-transparent" style={{ borderRadius: '50%' }} />
                    </div>
                    
                    {/* Avatar image container with elegant inset border */}
                    <div className="relative w-full h-full rounded-full overflow-hidden z-10" style={{
                      boxShadow: `
                        0 8px 32px rgba(212, 175, 55, 0.25),
                        inset 0 0 0 3px rgba(255, 255, 255, 0.95),
                        inset 0 0 0 5px rgba(212, 175, 55, 0.4)
                      `,
                      borderRadius: '50%'
                    }}>
                      <Image
                        src="/images/avatar/cd.jpg"
                        alt="Cô dâu"
                        fill
                        className="object-cover rounded-full"
                        style={{ borderRadius: '50%' }}
                        quality={85}
                        sizes="(max-width: 768px) 80px, 128px"
                      />
                    </div>
                    
                    {/* Subtle inner glow - static */}
                    <div
                      className="absolute -inset-0.5 rounded-full border border-[#D4AF37]/20"
                      style={{ 
                        borderRadius: '50%',
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Bride name - Script font */}
                <motion.p
                  className="font-script text-xl md:text-5xl text-[#D4AF37] leading-tight"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  Ngọc Thùy
                </motion.p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
              <p className="font-script text-3xl text-[#D4AF37]">Thư Mời</p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
            </div>

            {/* Invitation text */}
            <p className="text-center font-montserrat text-base text-navy/70 mb-8 max-w-xl mx-auto">
              Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi
            </p>

            {/* Photo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="relative w-64 h-[512px] md:w-80 md:h-[640px] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src="/images/60x120/c2.jpg"
                  alt="Wedding couple"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 256px, 320px"
                />
                {/* Animated border glow */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(45deg, #D4AF37, #E8C547, #FFD700, #E8C547, #D4AF37)',
                    backgroundSize: '200% 200%',
                    filter: 'blur(10px)',
                    zIndex: -1
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Message */}
            <div className="text-center">
              <p className="font-playfair text-xl md:text-2xl text-navy/80 italic">
                "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
