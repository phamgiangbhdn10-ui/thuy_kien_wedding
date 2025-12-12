'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: '',
    attending: 'yes'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        phone: '',
        guests: '1',
        message: '',
        attending: 'yes'
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="leaf-pattern w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-4">
            Xác Nhận Tham Dự
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
          <p className="font-montserrat text-sm text-navy/60 max-w-md mx-auto">
            Vui lòng xác nhận sự tham dự của quý khách để chúng tôi chuẩn bị chu đáo nhất
          </p>
        </div>

        {/* RSVP Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-navy/10"
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl text-navy mb-2">Cảm Ơn!</h3>
              <p className="font-montserrat text-navy/60">
                Chúng tôi đã nhận được xác nhận của bạn
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-montserrat text-sm text-navy mb-2">
                  Họ và Tên <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block font-montserrat text-sm text-navy mb-2">
                  Số Điện Thoại <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              {/* Attending Radio */}
              <div>
                <label className="block font-montserrat text-sm text-navy mb-3">
                  Bạn sẽ tham dự? <span className="text-accent">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="font-montserrat text-navy">Có, tôi sẽ đến</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="font-montserrat text-navy">Xin lỗi, tôi không thể</span>
                  </label>
                </div>
              </div>

              {/* Number of Guests */}
              {formData.attending === 'yes' && (
                <div>
                  <label htmlFor="guests" className="block font-montserrat text-sm text-navy mb-2">
                    Số Người Tham Dự
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} người</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-montserrat text-sm text-navy mb-2">
                  Lời Chúc
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-montserrat text-navy bg-white resize-none"
                  placeholder="Gửi lời chúc đến cô dâu chú rể..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="glow-button w-full py-4 bg-accent text-cream font-montserrat font-medium uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang Gửi...
                  </span>
                ) : (
                  'Gửi Xác Nhận'
                )}
              </button>
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="font-montserrat text-sm text-navy/60 mb-2">
            Nếu có thắc mắc, vui lòng liên hệ:
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <a href="tel:0909000000" className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-montserrat">Chú Rể: 0909 000 000</span>
            </a>
            <a href="tel:0909111111" className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-montserrat">Cô Dâu: 0909 111 111</span>
            </a>
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

