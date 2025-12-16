'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Confetti from 'react-confetti'
import Sparkles from './Sparkles'

gsap.registerPlugin(ScrollTrigger)

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
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
      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Show confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    
    // Format message for Messenger
    const messengerMessage = formData.name 
      ? `Xin chào! Tôi là ${formData.name}.\n\n${formData.message || 'Chúc mừng cô dâu chú rể!'}`
      : formData.message || 'Chúc mừng cô dâu chú rể!'
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(messengerMessage)
    
    // Open Messenger with pre-filled message
    const messengerUrl = `https://www.facebook.com/messages/t/7183761618419290?text=${encodedMessage}`
    window.open(messengerUrl, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream overflow-hidden"
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#D4AF37', '#E8C547', '#FFD700', '#6B8E23', '#8AB52D']}
        />
      )}


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

      <div className="container mx-auto px-4 relative z-10">
        {/* Elegant Card Container */}
        <div className="max-w-4xl mx-auto">
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
            </div>

            {/* Section Title */}
            <div className="text-center mb-12">
              <motion.h2 
                className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Gửi Lời Chúc
              </motion.h2>
              <div className="flex items-center justify-center gap-3 mb-4">
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
              <motion.p 
                className="font-montserrat text-sm text-navy/60 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Gửi lời chúc đến cô dâu chú rể qua Messenger
              </motion.p>
            </div>

            {/* Message Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-montserrat text-sm text-navy mb-2">
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white"
                placeholder="Nhập họ tên của bạn (tùy chọn)"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block font-montserrat text-sm text-navy mb-2">
                Lời Chúc <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white resize-none"
                placeholder="Gửi lời chúc đến cô dâu chú rể..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-4 bg-gradient-to-r from-[#0084FF] via-[#0084FF] to-[#0066CC] text-white font-montserrat font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl overflow-hidden group"
              style={{
                boxShadow: '0 10px 30px rgba(0, 132, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Messenger Icon */}
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 4.925 0 11c0 2.133.713 4.117 1.945 5.742L0 24l7.84-2.138c1.05.29 2.16.448 3.16.448 6.627 0 12-4.925 12-11S18.627 0 12 0zm0 19.077c-1.126 0-2.23-.178-3.298-.52L4.5 20.5l1.72-4.842C5.2 14.172 4.5 12.66 4.5 11c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
              </svg>
              
              {/* Text */}
              <span className="relative z-10">Gửi Lời Chúc qua Messenger</span>
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: [0.5, 0] }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </div>
        </motion.form>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 my-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
              <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className="font-montserrat text-sm text-navy/60 mb-4">
                Nếu có thắc mắc, vui lòng liên hệ:
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <a href="tel:0397813774" className="flex items-center gap-2 text-[#D4AF37] hover:text-[#C4A030] transition-colors font-montserrat">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Chú Rể: 0397 813 774</span>
                </a>
                <a href="tel:0965542727" className="flex items-center gap-2 text-[#D4AF37] hover:text-[#C4A030] transition-colors font-montserrat">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Cô Dâu: 0965 542 707</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Flower and Heart Elements */}
      {/* Flower - top left */}
      <svg className="absolute top-20 left-10 w-24 h-24 opacity-12 rotate-12 animate-float" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="rsvpFlower1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="30" r="10" fill="url(#rsvpFlower1)" />
        <circle cx="50" cy="70" r="10" fill="url(#rsvpFlower1)" />
        <circle cx="30" cy="50" r="10" fill="url(#rsvpFlower1)" />
        <circle cx="70" cy="50" r="10" fill="url(#rsvpFlower1)" />
        <circle cx="50" cy="50" r="7" fill="#FFD700" opacity="0.5" />
        <circle cx="50" cy="50" r="3" fill="#D4AF37" />
      </svg>
      {/* Heart - bottom right */}
      <svg className="absolute bottom-20 right-10 w-28 h-28 opacity-10 -rotate-12 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="rsvpHeart1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <path d="M50 30 Q60 20 70 30 Q70 40 60 50 Q50 60 50 70 Q50 60 40 50 Q30 40 30 30 Q40 20 50 30" fill="url(#rsvpHeart1)" />
        <circle cx="45" cy="35" r="2.5" fill="#FFD700" opacity="0.6" />
        <circle cx="55" cy="35" r="2.5" fill="#FFD700" opacity="0.6" />
      </svg>
    </section>
  )
}

