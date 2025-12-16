'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Quotes() {
  const sectionRef = useRef<HTMLElement>(null)
  const groomRef = useRef<HTMLDivElement>(null)
  const brideRef = useRef<HTMLDivElement>(null)
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
      gsap.fromTo([groomRef.current, brideRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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

      <motion.div
        className="absolute top-16 left-16 w-14 h-14 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
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
        className="absolute bottom-16 right-16 w-12 h-12 opacity-10"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
          <circle cx="50" cy="30" r="12" fill="currentColor" />
          <circle cx="50" cy="70" r="12" fill="currentColor" />
          <circle cx="30" cy="50" r="12" fill="currentColor" />
          <circle cx="70" cy="50" r="12" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.6" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Lời Của Chúng Tôi
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

        {/* Two Quotes - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Groom's Quote */}
          <motion.div
            ref={groomRef}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{ 
              y: [0, -8, 0],
              boxShadow: [
                '0 20px 40px rgba(25, 47, 74, 0.12)',
                '0 25px 50px rgba(212, 175, 55, 0.2)',
                '0 20px 40px rgba(25, 47, 74, 0.12)'
              ]
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut" },
              x: { duration: 0.8, ease: "easeOut" },
              rotateY: { duration: 0.8, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="rounded-3xl p-10 md:p-12 border-2 border-[#D4AF37]/20 h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
              }}
              whileHover={{ borderColor: 'rgba(212, 175, 55, 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 rounded-3xl"
                whileHover={{ background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)' }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                {/* Groom name - Script font */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-script text-4xl md:text-5xl text-[#D4AF37] mb-2">
                    Trung Kiên
                  </p>
                  <p className="font-montserrat text-xs text-navy/50 uppercase tracking-widest">
                    Chú Rể
                  </p>
                </motion.div>

                <motion.div
                  className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                {/* Quote - Elegant script style */}
                <motion.p
                  className="font-playfair text-xl md:text-2xl text-navy/80 italic leading-relaxed text-center font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "Em là ánh sáng của cuộc đời anh, là lý do anh thức dậy mỗi sáng với nụ cười trên môi. Cảm ơn em đã chọn anh."
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bride's Quote */}
          <motion.div
            ref={brideRef}
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{ 
              y: [0, -8, 0],
              boxShadow: [
                '0 20px 40px rgba(25, 47, 74, 0.12)',
                '0 25px 50px rgba(212, 175, 55, 0.2)',
                '0 20px 40px rgba(25, 47, 74, 0.12)'
              ]
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              x: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              rotateY: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="rounded-3xl p-10 md:p-12 border-2 border-[#D4AF37]/20 h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
              }}
              whileHover={{ borderColor: 'rgba(212, 175, 55, 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 rounded-3xl"
                whileHover={{ background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)' }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                {/* Bride name - Script font */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-script text-4xl md:text-5xl text-[#D4AF37] mb-2">
                    Ngọc Thùy
                  </p>
                  <p className="font-montserrat text-xs text-navy/50 uppercase tracking-widest">
                    Cô Dâu
                  </p>
                </motion.div>

                <motion.div
                  className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                {/* Quote - Elegant script style */}
                <motion.p
                  className="font-playfair text-xl md:text-2xl text-navy/80 italic leading-relaxed text-center font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "Anh là người khiến em tin vào tình yêu đích thực. Cảm ơn anh đã đến và làm cho cuộc sống của em trở nên hoàn hảo."
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
