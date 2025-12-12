'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null)
  const ceremonyRef = useRef<HTMLDivElement>(null)
  const receptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([ceremonyRef.current, receptionRef.current],
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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
      className="relative py-28 md:py-36 overflow-hidden bg-cream"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl text-navy mb-6 font-light tracking-wide">
            Thông Tin Lễ Cưới
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Two columns grid - side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Lễ Vu Quy */}
          <div 
            ref={ceremonyRef} 
            className="relative rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 group"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors" />
            
            <div className="text-center">
              <h3 className="font-playfair text-3xl md:text-4xl text-navy mb-6 font-light">
                Lễ Vu Quy
              </h3>
              
              {/* Time */}
              <div className="mb-6">
                <p className="font-playfair text-5xl md:text-6xl text-[#D4AF37] font-light mb-2">
                  09:00
                </p>
                <p className="font-playfair text-lg text-navy/60 italic">
                  Thứ Bảy, 03.01.2026
                </p>
              </div>

              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />

              {/* Location */}
              <div>
                <p className="font-playfair text-2xl text-navy mb-3 font-medium">
                  Tư Gia Nhà Gái
                </p>
                <p className="font-montserrat text-sm text-navy/50 leading-relaxed">
                  Thôn 1 - Nghĩa Trung<br />
                  T. Đồng Nai
                </p>
              </div>
            </div>
          </div>

          {/* Tiệc Cưới */}
          <div 
            ref={receptionRef} 
            className="relative rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 group"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors" />
            
            <div className="text-center">
              <h3 className="font-playfair text-3xl md:text-4xl text-navy mb-6 font-light">
                Tiệc Cưới
              </h3>
              
              {/* Time */}
              <div className="mb-6">
                <p className="font-playfair text-5xl md:text-6xl text-[#D4AF37] font-light mb-2">
                  11:00
                </p>
                <p className="font-playfair text-lg text-navy/60 italic">
                  Thứ Bảy, 03.01.2026
                </p>
              </div>

              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />

              {/* Location */}
              <div>
                <p className="font-playfair text-2xl text-navy mb-3 font-medium">
                  Điểm Dừng Chân Hương Nhung
                </p>
                <p className="font-montserrat text-sm text-navy/50 leading-relaxed">
                  KM 20, QL 14 - Ấp 6<br />
                  Xã Đồng Nai - T. Đồng Nai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
