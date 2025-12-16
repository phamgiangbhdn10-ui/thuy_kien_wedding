'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null)
  const receptionRef = useRef<HTMLDivElement>(null)
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
      gsap.fromTo(receptionRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
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
      className="relative py-28 md:py-36 overflow-hidden bg-cream"
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
      
      {/* Floating decorative elements with animation */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
          <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 opacity-10"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
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
        {/* Elegant Wedding Reception Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={receptionRef} 
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
            <div className="text-center mb-12">
              <motion.h2 
                className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Tiệc Cưới
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

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10">
              {/* Time Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-montserrat text-xs text-navy/60 uppercase tracking-[0.3em] mb-8 font-semibold">
                  Thời Gian
                </p>
                <div className="min-h-[200px] md:min-h-[240px] flex flex-col justify-center items-center relative">
                  <div className="mb-6">
                    <p className="font-playfair text-6xl md:text-7xl text-[#D4AF37] font-light leading-none" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
                      11:00
                    </p>
                    <p className="font-playfair text-xl md:text-2xl text-[#D4AF37]/80 font-light mt-1 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                      A.M
                    </p>
                  </div>
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
                  <p className="font-script text-2xl md:text-3xl text-navy/80 mb-3">
                    Thứ Bảy
                  </p>
                    <p className="font-playfair text-3xl md:text-4xl text-navy font-medium">
                    03.01.2026
                  </p>
                </div>
              </motion.div>

              {/* Location Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-montserrat text-xs text-navy/60 uppercase tracking-[0.3em] mb-8 font-semibold">
                  Địa Điểm
                </p>
                <div className="min-h-[200px] md:min-h-[240px] flex flex-col justify-center items-center">
                  <p className="font-playfair text-4xl md:text-5xl text-[#D4AF37] font-light mb-6 leading-tight">
                    Điểm Dừng Chân<br />Hương Nhung
                  </p>
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
                  <p className="font-montserrat text-base md:text-lg text-navy/70 leading-relaxed">
                    KM 20, QL 14 - Ấp 6<br />
                    Xã Đồng Tâm - T. Đồng Nai
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
              <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
            </div>

            {/* Map Link */}
            <div className="text-center">
              <a
                href="https://maps.app.goo.gl/3HT4Dc41cmuk5Eo27"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-light text-cream font-montserrat text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Xem trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
