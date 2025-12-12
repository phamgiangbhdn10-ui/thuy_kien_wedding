'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Announcement() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Fade out effect on scroll
      gsap.to([titleRef.current, namesRef.current, dateRef.current], {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true
        }
      })

      // Initial animations
      const tl = gsap.timeline({ delay: 0.3 })
      
      tl.fromTo(namesRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      
      tl.fromTo(dateRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end justify-center overflow-hidden"
    >
      {/* Background Image - No overlay on main area */}
      <div ref={bgRef} className="absolute inset-0 -top-20">
        <div 
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/15x21/DSC01337.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Gradient overlay at bottom only - for text readability */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Content - Positioned at bottom */}
      <div className="relative z-10 text-center px-4 pb-12 md:pb-16 w-full max-w-4xl mx-auto">
        {/* Names - Diagonal style */}
        <div ref={namesRef} className="mb-6 relative">
          <div className="flex flex-col items-center gap-0">
            {/* Groom name - left aligned, rotated */}
            <p 
              className="font-script text-5xl md:text-6xl lg:text-7xl text-white self-start ml-4 md:ml-12 -rotate-3"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Trung Kiên
            </p>
            
            {/* & symbol - stylized */}
            <p 
              className="font-script text-6xl md:text-7xl lg:text-8xl text-[#FFD700] my-1"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              &
            </p>
            
            {/* Bride name - right aligned, rotated opposite */}
            <p 
              className="font-script text-5xl md:text-6xl lg:text-7xl text-white self-end mr-4 md:mr-12 rotate-3"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Ngọc Thùy
            </p>
          </div>
        </div>

        {/* Wedding Title */}
        <div ref={titleRef} className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#FFD700]" style={{ boxShadow: '0 0 10px rgba(255,215,0,0.5)' }} />
            <svg className="w-6 h-6 text-[#FFD700]" viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#FFD700]" style={{ boxShadow: '0 0 10px rgba(255,215,0,0.5)' }} />
          </div>
          <p className="font-montserrat text-sm md:text-base text-white uppercase tracking-[0.3em] font-medium" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
            Lễ Thành Hôn
          </p>
        </div>

        {/* Date Section */}
        <div ref={dateRef} className="flex flex-col items-center gap-3">
          {/* Day of week */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]/50" />
            <p className="font-montserrat text-[#FFD700] text-sm md:text-base font-semibold tracking-[0.2em] uppercase" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
              Thứ Bảy
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]/50" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-4 md:gap-6">
            <p className="font-playfair text-4xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>03</p>
            <div className="w-px h-10 md:h-12 bg-[#FFD700]/50" />
            <p className="font-playfair text-4xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>01</p>
            <div className="w-px h-10 md:h-12 bg-[#FFD700]/50" />
            <p className="font-playfair text-4xl md:text-5xl text-white font-light" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>2026</p>
          </div>

          {/* Lunar date */}
          <p className="font-playfair text-lg md:text-xl text-white/90 italic" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 25px rgba(0,0,0,0.6)' }}>
            Nhằm ngày 15 tháng 11 năm Ất Tỵ
          </p>
        </div>
      </div>
    </section>
  )
}
