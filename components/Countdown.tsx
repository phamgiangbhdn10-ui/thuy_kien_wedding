'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const sectionRef = useRef<HTMLElement>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([])
  const targetDate = new Date('2026-01-03T11:00:00').getTime()

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
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Initialize with current time
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)
    setPrevTimeLeft(initialTime)

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        const newTime = calculateTimeLeft()
        // Update prevTimeLeft with the current value before updating
        setPrevTimeLeft(current)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.countdown-item')
      if (items) {
        gsap.fromTo(items,
          { y: 60, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const WeddingCalendar = () => {
    const weddingDate = new Date('2026-01-03')
    const today = new Date()
    const currentMonth = weddingDate.getMonth()
    const currentYear = weddingDate.getFullYear()
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    
    // Check if today is in the same month
    const isTodayInMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear
    const todayDate = isTodayInMonth ? today.getDate() : null
    
    const weddingDay = weddingDate.getDate()
    
    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                       'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
    
    const days = []
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', index: i })
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ type: 'day', value: i, index: firstDay + i - 1 })
    }
    
    return (
      <div className="relative max-w-lg w-full mx-auto">
        <div 
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)',
            boxShadow: '0 25px 50px rgba(25, 47, 74, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.9)'
          }}
        >
          {/* Classic ornate decorative corners */}
          <div className="absolute top-4 left-4 w-24 h-24 text-[#D4AF37]/30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 L100 0 L100 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="0" r="3" fill="currentColor" />
              <circle cx="0" cy="100" r="3" fill="currentColor" />
              <path d="M10 10 Q20 5 30 10 Q35 20 30 30 Q20 35 10 30 Q5 20 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M15 15 Q22 12 28 15 Q30 20 28 25 Q22 28 15 25 Q12 20 15 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-24 h-24 text-[#D4AF37]/30 scale-x-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 L100 0 L100 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="0" r="3" fill="currentColor" />
              <circle cx="0" cy="100" r="3" fill="currentColor" />
              <path d="M10 10 Q20 5 30 10 Q35 20 30 30 Q20 35 10 30 Q5 20 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M15 15 Q22 12 28 15 Q30 20 28 25 Q22 28 15 25 Q12 20 15 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-24 h-24 text-[#D4AF37]/30 scale-y-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 L100 0 L100 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="0" r="3" fill="currentColor" />
              <circle cx="0" cy="100" r="3" fill="currentColor" />
              <path d="M10 10 Q20 5 30 10 Q35 20 30 30 Q20 35 10 30 Q5 20 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M15 15 Q22 12 28 15 Q30 20 28 25 Q22 28 15 25 Q12 20 15 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-24 h-24 text-[#D4AF37]/30 scale-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 L100 0 L100 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="0" r="3" fill="currentColor" />
              <circle cx="0" cy="100" r="3" fill="currentColor" />
              <path d="M10 10 Q20 5 30 10 Q35 20 30 30 Q20 35 10 30 Q5 20 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M15 15 Q22 12 28 15 Q30 20 28 25 Q22 28 15 25 Q12 20 15 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </div>
          
          {/* Classic ornate border pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-2 rounded-3xl border-2 border-[#D4AF37]/25" />
            <div className="absolute inset-4 rounded-3xl border border-[#D4AF37]/15" />
            {/* Swirl pattern along border */}
            <div className="absolute inset-3 rounded-3xl overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`swirl-${i}`}
                  className="absolute"
                  style={{
                    left: i % 3 === 0 ? '0' : i % 3 === 1 ? '50%' : 'auto',
                    right: i % 3 === 2 ? '0' : 'auto',
                    top: `${(i * 8.33) % 100}%`,
                    transform: `translate(-50%, -50%) ${i % 3 === 2 ? 'scaleX(-1)' : ''}`
                  }}
                >
                  <svg className="w-5 h-5 text-[#D4AF37]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2 Q8 6, 12 10 Q16 6, 12 2" />
                    <path d="M12 10 Q8 14, 12 18 Q16 14, 12 10" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative side swirl patterns */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg key={`left-swirl-${i}`} className="w-5 h-5 text-[#D4AF37]/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2 Q8 6, 12 10 Q16 6, 12 2" />
                <path d="M12 10 Q8 14, 12 18 Q16 14, 12 10" />
              </svg>
            ))}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg key={`right-swirl-${i}`} className="w-5 h-5 text-[#D4AF37]/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2 Q8 6, 12 10 Q16 6, 12 2" />
                <path d="M12 10 Q8 14, 12 18 Q16 14, 12 10" />
              </svg>
            ))}
          </div>
          
          {/* Month Header with ornate design */}
          <div className="text-center mb-8 relative z-10">
            <div className="relative inline-block">
              <h3 className="font-script text-3xl md:text-4xl text-[#D4AF37] mb-3 relative z-10">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#D4AF37]/60" />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
              <div className="relative">
                <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#D4AF37]/20" />
                </div>
              </div>
              <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
            </div>
          </div>
          
          {/* Week Days Header with decorative style */}
          <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
            {weekDays.map((day, index) => (
              <div
                key={`weekday-${index}`}
                className="text-center py-2 font-playfair text-sm md:text-base font-semibold text-[#D4AF37]/90 relative"
              >
                {day}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#D4AF37]/30" />
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 relative z-10">
            {days.map((item) => {
              if (item.type === 'empty') {
                return <div key={`empty-${item.index}`} className="aspect-square" />
              }
              
              const day = item.value
              const isWeddingDay = day === weddingDay
              const isToday = day === todayDate
              
              return (
                <div key={`day-${item.index}`} className="relative">
                  <div
                    className={`relative aspect-square flex items-center justify-center rounded-xl transition-colors ${
                      isWeddingDay
                        ? 'bg-transparent text-navy'
                        : isToday
                        ? 'bg-[#D4AF37]/15 text-navy border-2 border-[#D4AF37]'
                        : 'text-navy/70 hover:bg-cream-dark hover:text-navy border border-transparent hover:border-[#D4AF37]/20'
                    }`}
                  >
                    {isWeddingDay ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Elegant pulsing heart */}
                        <motion.div
                          className="relative z-10"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          {/* Soft glow behind */}
                          <div className="absolute inset-0 flex items-center justify-center -z-10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-500/20 blur-lg" />
                          </div>
                          {/* Beautiful heart icon */}
                          <svg 
                            className="w-12 h-12 md:w-14 md:h-14 text-red-500" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            style={{
                              filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))'
                            }}
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </motion.div>
                      </div>
                    ) : isToday ? (
                      <span className="font-playfair text-base md:text-lg font-semibold">{day}</span>
                    ) : (
                      <span className="font-playfair text-sm md:text-base">{day}</span>
                    )}
                  </div>
                  {isToday && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-playfair font-semibold text-[#D4AF37] whitespace-nowrap">
                      Today
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const FlipCard = ({ value, label, prevValue }: { value: number; label: string; prevValue: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
      if (value !== prevValue && cardRef.current) {
        gsap.fromTo(cardRef.current,
          { rotateX: -90, opacity: 0.5 },
          { rotateX: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        )
      }
    }, [value, prevValue])

    return (
      <div className="countdown-item flex flex-col items-center flex-shrink-0">
        <div 
          className="relative"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={cardRef}
            className="relative w-20 h-24 md:w-32 md:h-36 rounded-2xl overflow-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F6F0 100%)',
              boxShadow: `
                0 15px 35px rgba(25, 47, 74, 0.15),
                0 0 0 2px rgba(212, 175, 55, 0.3),
                inset 0 1px 0 rgba(255,255,255,0.8)
              `
            }}
          >
            {/* Top Half */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-cream-dark flex items-end justify-center overflow-hidden border-b border-[#D4AF37]/20">
              <span className="font-playfair text-5xl md:text-6xl text-navy font-bold translate-y-1/2 drop-shadow-sm">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            
            {/* Bottom Half */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream to-white flex items-start justify-center overflow-hidden">
              <span className="font-playfair text-5xl md:text-6xl text-navy font-bold -translate-y-1/2 drop-shadow-sm">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            
            {/* Center Line with gold accent */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30 transform -translate-y-px" />
            
            {/* Side Notches */}
            <div className="absolute left-0 top-1/2 w-3 h-5 bg-cream rounded-r-full -translate-y-1/2 shadow-inner" />
            <div className="absolute right-0 top-1/2 w-3 h-5 bg-cream rounded-l-full -translate-y-1/2 shadow-inner" />
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37]/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37]/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37]/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37]/40" />
          </div>
        </div>
        
        <span className="mt-4 font-montserrat text-sm md:text-base text-[#D4AF37] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF9F6 0%, #E8E6E1 50%, #FAF9F6 100%)'
      }}
    >
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
      
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
          animate={{
            backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-5 heading-shadow">
            Đếm Ngược Đến Ngày Trọng Đại
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Countdown Cards */}
        <div className="flex justify-center items-center gap-2 md:gap-8 flex-nowrap overflow-x-auto pb-4 md:pb-0">
          <FlipCard value={timeLeft.days} label="Ngày" prevValue={prevTimeLeft.days} />
          
          <div className="hidden md:flex flex-col gap-4 py-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
          </div>
          
          <FlipCard value={timeLeft.hours} label="Giờ" prevValue={prevTimeLeft.hours} />
          
          <div className="hidden md:flex flex-col gap-4 py-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
          </div>
          
          <FlipCard value={timeLeft.minutes} label="Phút" prevValue={prevTimeLeft.minutes} />
          
          <div className="hidden md:flex flex-col gap-4 py-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
          </div>
          
          <FlipCard value={timeLeft.seconds} label="Giây" prevValue={prevTimeLeft.seconds} />
        </div>

        {/* Calendar */}
        <div className="mt-16 flex justify-center">
          <WeddingCalendar />
        </div>

      </div>

      {/* Decorative Flower and Heart Patterns */}
      {/* Heart - top left */}
      <svg className="absolute top-16 left-10 w-24 h-24 opacity-18 rotate-12 animate-float" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="countdownHeart1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="url(#countdownHeart1)" />
        <circle cx="45" cy="35" r="2" fill="#FFD700" opacity="0.7" />
        <circle cx="55" cy="35" r="2" fill="#FFD700" opacity="0.7" />
      </svg>
      {/* Flower - bottom right */}
      <svg className="absolute bottom-16 right-10 w-28 h-28 opacity-15 -rotate-12 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="countdownFlower1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="30" r="12" fill="url(#countdownFlower1)" />
        <circle cx="50" cy="70" r="12" fill="url(#countdownFlower1)" />
        <circle cx="30" cy="50" r="12" fill="url(#countdownFlower1)" />
        <circle cx="70" cy="50" r="12" fill="url(#countdownFlower1)" />
        <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.6" />
        <circle cx="50" cy="50" r="4" fill="#D4AF37" />
      </svg>
      {/* Heart - center right */}
      <svg className="absolute top-1/3 right-20 w-20 h-20 opacity-12 rotate-45 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="countdownHeart1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="url(#countdownHeart1)" />
        <circle cx="45" cy="35" r="2" fill="#FFD700" opacity="0.7" />
        <circle cx="55" cy="35" r="2" fill="#FFD700" opacity="0.7" />
      </svg>
    </section>
  )
}
