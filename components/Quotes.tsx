'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Quotes() {
  const sectionRef = useRef<HTMLElement>(null)
  const groomRef = useRef<HTMLDivElement>(null)
  const brideRef = useRef<HTMLDivElement>(null)

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
      {/* Subtle pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-6 font-light tracking-wide">
            Lời Của Chúng Tôi
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Two Quotes - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Groom's Quote */}
          <div ref={groomRef}>
            <div 
              className="rounded-3xl p-10 md:p-12 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 h-full"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
              }}
            >
              {/* Groom name - Script font */}
              <div className="text-center mb-8">
                <p className="font-script text-4xl md:text-5xl text-[#D4AF37] mb-2">
                  Trung Kiên
                </p>
                <p className="font-montserrat text-xs text-navy/50 uppercase tracking-widest">
                  Chú Rể
                </p>
              </div>

              <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8" />

              {/* Quote - Elegant script style */}
              <p className="font-playfair text-xl md:text-2xl text-navy/80 italic leading-relaxed text-center font-light">
                "Em là ánh sáng của cuộc đời anh, là lý do anh thức dậy mỗi sáng với nụ cười trên môi. Cảm ơn em đã chọn anh."
              </p>
            </div>
          </div>

          {/* Bride's Quote */}
          <div ref={brideRef}>
            <div 
              className="rounded-3xl p-10 md:p-12 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 h-full"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
              }}
            >
              {/* Bride name - Script font */}
              <div className="text-center mb-8">
                <p className="font-script text-4xl md:text-5xl text-[#D4AF37] mb-2">
                  Ngọc Thùy
                </p>
                <p className="font-montserrat text-xs text-navy/50 uppercase tracking-widest">
                  Cô Dâu
                </p>
              </div>

              <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8" />

              {/* Quote - Elegant script style */}
              <p className="font-playfair text-xl md:text-2xl text-navy/80 italic leading-relaxed text-center font-light">
                "Anh là người khiến em tin vào tình yêu đích thực. Cảm ơn anh đã đến và làm cho cuộc sống của em trở nên hoàn hảo."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
