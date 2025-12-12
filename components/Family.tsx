'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Family() {
  const sectionRef = useRef<HTMLElement>(null)

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
      {/* Subtle pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="family-content max-w-4xl mx-auto">
          {/* Card */}
          <div 
            className="rounded-3xl p-8 md:p-12 border-2 border-[#D4AF37]/30"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F3 50%, #FAF6EE 100%)'
            }}
          >
            {/* Title */}
            <div className="text-center mb-10">
              <h2 className="font-playfair text-4xl md:text-5xl text-navy font-light tracking-[0.2em] uppercase">
                Wedding
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>

            {/* Two columns - Always side by side */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10">
              {/* Nhà Trai */}
              <div className="text-center">
                <h3 className="font-playfair text-lg md:text-3xl text-navy mb-3 md:mb-6 font-medium">
                  Nhà Trai
                </h3>
                
                <div className="space-y-0.5 md:space-y-1 mb-3 md:mb-6">
                  <p className="font-montserrat text-xs md:text-base text-navy/70">
                    Ông: <span className="font-medium text-navy">Ngô Đăng Chính</span>
                  </p>
                  <p className="font-montserrat text-xs md:text-base text-navy/70">
                    Bà: <span className="font-medium text-navy">Bùi Thị Hà</span>
                  </p>
                </div>

                <p className="font-montserrat text-[10px] md:text-sm text-navy/50 mb-4 md:mb-8">
                  Ấp 6 - Đông Tân<br className="md:hidden" /> T. Đồng Nai
                </p>

                {/* Groom name - Script font */}
                <p className="font-script text-2xl md:text-5xl text-[#D4AF37]">
                  Trung Kiên
                </p>
              </div>


              {/* Nhà Gái */}
              <div className="text-center">
                <h3 className="font-playfair text-lg md:text-3xl text-navy mb-3 md:mb-6 font-medium">
                  Nhà Gái
                </h3>
                
                <div className="space-y-0.5 md:space-y-1 mb-3 md:mb-6">
                  <p className="font-montserrat text-xs md:text-base text-navy/70">
                    Ông: <span className="font-medium text-navy">Phạm Thanh Tâm</span>
                  </p>
                  <p className="font-montserrat text-xs md:text-base text-navy/70 invisible">
                    &nbsp;
                  </p>
                </div>

                <p className="font-montserrat text-[10px] md:text-sm text-navy/50 mb-4 md:mb-8">
                  Thôn 1 - Nghĩa Trung<br className="md:hidden" /> T. Đồng Nai
                </p>

                {/* Bride name - Script font */}
                <p className="font-script text-2xl md:text-5xl text-[#D4AF37]">
                  Ngọc Thùy
                </p>
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
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/15x21/DSC01337.jpg"
                  alt="Wedding couple"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

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
