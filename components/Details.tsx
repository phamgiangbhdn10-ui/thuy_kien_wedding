'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Symmetrical reveal animation
      gsap.fromTo(leftCardRef.current,
        { x: -100, opacity: 0, rotateY: -15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(rightCardRef.current,
        { x: 100, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
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
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0EDE6 0%, #FAF9F6 50%, #F0EDE6 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="leaf-pattern w-full h-full opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-5 heading-shadow">
            Thông Tin Lễ Cưới
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent shadow-lg" />
            <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Lót 1 - Ceremony */}
          <div
            ref={leftCardRef}
            className="card-hover rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDFCFA 100%)',
              boxShadow: '0 20px 40px rgba(25, 47, 74, 0.12), 0 0 0 1px rgba(25, 47, 74, 0.1)'
            }}
          >
            <div 
              className="py-5 px-6"
              style={{
                background: 'linear-gradient(135deg, #192F4A 0%, #2A4A6B 100%)'
              }}
            >
              <h3 className="font-playfair text-2xl text-cream text-center drop-shadow-sm">
                ✨ Lễ Vu Quy ✨
              </h3>
            </div>
            
            <div className="p-8">
              {/* Heart Tree Icon */}
              <div className="flex justify-center mb-6">
                <svg className="w-20 h-24" viewBox="0 0 60 80">
                  <defs>
                    <linearGradient id="treeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6B8E23" />
                      <stop offset="100%" stopColor="#8AB52D" />
                    </linearGradient>
                  </defs>
                  <path d="M30 75 L30 40" stroke="url(#treeGrad1)" strokeWidth="4" fill="none" />
                  <path d="M30 20 Q45 5 45 18 Q45 28 30 40 Q15 28 15 18 Q15 5 30 20" fill="url(#treeGrad1)" />
                  <path d="M30 45 Q18 42 16 50 Q14 58 26 60" fill="url(#treeGrad1)" opacity="0.6" />
                  <path d="M30 45 Q42 42 44 50 Q46 58 34 60" fill="url(#treeGrad1)" opacity="0.6" />
                </svg>
              </div>

              <div className="text-center space-y-5">
                <div className="inline-block px-6 py-3 bg-cream rounded-xl border border-[#D4AF37]/30">
                  <p className="font-montserrat text-sm text-[#D4AF37] uppercase tracking-wider mb-1 font-semibold">
                    Thời Gian
                  </p>
                  <p className="font-playfair text-xl text-navy">
                    09:00 - Thứ Bảy
                  </p>
                  <p className="font-playfair text-2xl text-navy font-bold">
                    03.01.2026
                  </p>
                </div>

                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div>
                  <p className="font-montserrat text-sm text-[#D4AF37] uppercase tracking-wider mb-2 font-semibold">
                    Địa Điểm
                  </p>
                  <p className="font-playfair text-xl text-navy font-semibold">
                    Tư Gia Nhà Gái
                  </p>
                  <p className="font-montserrat text-sm text-navy/70 mt-2 leading-relaxed">
                    Thôn 1 - Nghĩa Trung<br />
                    T. Đồng Nai
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-16 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40" />
            <div className="absolute top-16 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/40" />
          </div>

          {/* Lót 2 - Reception */}
          <div
            ref={rightCardRef}
            className="card-hover rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDFCFA 100%)',
              boxShadow: '0 20px 40px rgba(107, 142, 35, 0.15), 0 0 0 2px rgba(107, 142, 35, 0.3)'
            }}
          >
            <div 
              className="py-5 px-6"
              style={{
                background: 'linear-gradient(135deg, #6B8E23 0%, #8AB52D 100%)'
              }}
            >
              <h3 className="font-playfair text-2xl text-cream text-center drop-shadow-sm">
                🎊 Tiệc Cưới 🎊
              </h3>
            </div>
            
            <div className="p-8">
              {/* Monogram */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-cream rounded-xl border border-[#D4AF37]/30">
                  <span className="font-playfair text-4xl text-navy font-light">K</span>
                  <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] via-accent to-[#D4AF37]" />
                  <span className="font-playfair text-4xl text-navy font-light">T</span>
                </div>
              </div>

              <div className="text-center space-y-5">
                <div className="inline-block px-6 py-3 bg-cream rounded-xl border border-accent/30">
                  <p className="font-montserrat text-sm text-accent uppercase tracking-wider mb-1 font-semibold">
                    Thời Gian
                  </p>
                  <p className="font-playfair text-xl text-navy">
                    11:00 - Thứ Bảy
                  </p>
                  <p className="font-playfair text-2xl text-navy font-bold">
                    03.01.2026
                  </p>
                </div>

                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />

                <div>
                  <p className="font-montserrat text-sm text-accent uppercase tracking-wider mb-2 font-semibold">
                    Địa Điểm
                  </p>
                  <p className="font-playfair text-xl text-navy font-semibold">
                    Điểm Dừng Chân Hương Nhung
                  </p>
                  <p className="font-montserrat text-sm text-navy/70 mt-2 leading-relaxed">
                    KM 20, QL 14 - Ấp 6<br />
                    Xã Đồng Nai - T. Đồng Nai
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-16 left-3 w-6 h-6 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-16 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/40" />
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl md:text-3xl text-navy mb-2">
              📍 Bản Đồ Địa Điểm Tiệc Cưới
            </h3>
            <p className="font-montserrat text-sm text-navy/60">
              Điểm Dừng Chân Hương Nhung
            </p>
          </div>
          
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 20px 40px rgba(107, 142, 35, 0.2), 0 0 0 4px #6B8E23'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.5!2d106.9!3d10.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU0JzAwLjAiTiAxMDbCsDU0JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            
            {/* Map Overlay Button */}
            <a
              href="https://maps.google.com/maps?q=Diem+Dung+Chan+Huong+Nhung+Dong+Nai"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-gradient-to-r from-accent to-accent-light text-cream px-6 py-3 rounded-xl font-montserrat text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mở Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-[#D4AF37]/20 rotate-45 rounded-lg" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border border-accent/20 rotate-12 rounded-lg" />
    </section>
  )
}
