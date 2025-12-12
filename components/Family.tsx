'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Family() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sequential slide-up and fade animation
      const cards = sectionRef.current?.querySelectorAll('.family-card')
      
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream overflow-hidden"
    >
      {/* Leaf Pattern Background */}
      <div className="absolute inset-0 leaf-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-4">
            Gia Đình Hai Bên
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>

        {/* Family Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Groom's Family - Nhà Trai */}
          <div className="family-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-navy/10">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-navy text-cream font-montserrat text-sm uppercase tracking-wider rounded-full">
                Nhà Trai
              </span>
            </div>

            <div className="space-y-6">
              {/* Parents */}
              <div className="text-center">
                <p className="font-montserrat text-sm text-accent uppercase tracking-wider mb-3">
                  Thân Sinh
                </p>
                <div className="space-y-2">
                  <p className="font-playfair text-xl text-navy">
                    Ông <span className="font-semibold">Ngô Đăng Chính</span>
                  </p>
                  <p className="font-playfair text-xl text-navy">
                    Bà <span className="font-semibold">Bùi Thị Hà</span>
                  </p>
                </div>
              </div>

              <div className="h-px w-24 mx-auto bg-accent/30" />

              {/* Address */}
              <div className="text-center">
                <p className="font-montserrat text-sm text-navy/60">
                  Ấp 6 - Đông Tân - T. Đồng Nai
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              {/* Groom */}
              <div className="text-center pt-4">
                <p className="font-montserrat text-xs text-accent uppercase tracking-wider mb-2">
                  Chú Rể
                </p>
                <p className="font-playfair text-3xl text-navy font-semibold">
                  Ngô Trung Kiên
                </p>
                <p className="font-playfair text-sm text-navy/60 italic mt-1">
                  (Út Nam)
                </p>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/20 rounded-bl-lg" />
          </div>

          {/* Bride's Family - Nhà Gái */}
          <div className="family-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-accent/20 relative">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-accent text-cream font-montserrat text-sm uppercase tracking-wider rounded-full">
                Nhà Gái
              </span>
            </div>

            <div className="space-y-6">
              {/* Parents */}
              <div className="text-center">
                <p className="font-montserrat text-sm text-accent uppercase tracking-wider mb-3">
                  Thân Sinh
                </p>
                <div className="space-y-2">
                  <p className="font-playfair text-xl text-navy">
                    Ông <span className="font-semibold">Phạm Thanh Tâm</span>
                  </p>
                </div>
              </div>

              <div className="h-px w-24 mx-auto bg-accent/30" />

              {/* Address */}
              <div className="text-center">
                <p className="font-montserrat text-sm text-navy/60">
                  Thôn 1 - Nghĩa Trung - T. Đồng Nai
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              {/* Bride */}
              <div className="text-center pt-4">
                <p className="font-montserrat text-xs text-accent uppercase tracking-wider mb-2">
                  Cô Dâu
                </p>
                <p className="font-playfair text-3xl text-navy font-semibold">
                  Phạm Ngọc Thuỷ
                </p>
                <p className="font-playfair text-sm text-navy/60 italic mt-1">
                  (Ú Nữ)
                </p>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/20 rounded-bl-lg" />
          </div>
        </div>

        {/* Additional Message */}
        <div className="text-center mt-12">
          <p className="font-playfair text-lg text-navy/80 italic max-w-2xl mx-auto">
            &ldquo;Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi&rdquo;
          </p>
          <div className="mt-4 flex justify-center">
            <span className="font-playfair text-accent">
              Gia Đình Chính - Hà & Gia Đình Tâm
            </span>
          </div>
        </div>
      </div>

      {/* Floating Leaf Decorations */}
      <svg className="absolute top-20 left-10 w-16 h-24 opacity-15 rotate-12" viewBox="0 0 40 60">
        <path d="M20 5 Q30 20 20 55 Q10 20 20 5" fill="#6B8E23" />
      </svg>
      <svg className="absolute top-1/3 right-10 w-12 h-18 opacity-10 -rotate-12" viewBox="0 0 40 60">
        <path d="M20 5 Q30 20 20 55 Q10 20 20 5" fill="#6B8E23" />
      </svg>
      <svg className="absolute bottom-20 left-1/4 w-10 h-16 opacity-10 rotate-45" viewBox="0 0 40 60">
        <path d="M20 5 Q30 20 20 55 Q10 20 20 5" fill="#6B8E23" />
      </svg>
      <svg className="absolute bottom-32 right-1/4 w-14 h-22 opacity-15 -rotate-30" viewBox="0 0 40 60">
        <path d="M20 5 Q30 20 20 55 Q10 20 20 5" fill="#6B8E23" />
      </svg>
    </section>
  )
}

