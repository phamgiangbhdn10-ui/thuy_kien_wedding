'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css/bundle'

gsap.registerPlugin(ScrollTrigger)

const lehoiImages = [
  { src: '/lehoi/i_1.JPG', alt: 'Đám hỏi 1' },
  { src: '/lehoi/i_2.JPG', alt: 'Đám hỏi 2' },
  { src: '/lehoi/i_3.JPG', alt: 'Đám hỏi 3' },
  { src: '/lehoi/i_4.JPG', alt: 'Đám hỏi 4' },
  { src: '/lehoi/i_5.JPG', alt: 'Đám hỏi 5' },
  { src: '/lehoi/i_6.JPG', alt: 'Đám hỏi 6' },
  { src: '/lehoi/i_7.JPG', alt: 'Đám hỏi 7' },
  { src: '/lehoi/i_8.JPG', alt: 'Đám hỏi 8' },
  { src: '/lehoi/i_9.JPG', alt: 'Đám hỏi 9' },
]

export default function LeHoiSlider() {
  const sectionRef = useRef<HTMLElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // GSAP animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lehoi-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      className="relative py-28 md:py-36 bg-gradient-to-b from-cream to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="lehoi-title text-center mb-12 md:mb-16">
          <motion.h2 
            className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Đám Hỏi
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

        {/* Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
              renderBullet: (index: number, className: string) => {
                return `<span class="${className}" style="width: ${index === currentIndex ? '32px' : '8px'}; height: 8px; border-radius: 4px; background: ${index === currentIndex ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)'}; transition: all 0.3s;"></span>`
              },
            }}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper: SwiperType) => {
              setCurrentIndex(swiper.activeIndex)
            }}
            className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
          >
            {lehoiImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={index === 0 || index === 1}
                    quality={75}
                    loading={index <= 2 ? 'eager' : 'lazy'}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all z-10 shadow-lg hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all z-10 shadow-lg hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full z-10 shadow-lg">
            <span className="text-[#D4AF37] text-sm font-montserrat font-medium">
              {currentIndex + 1} / {lehoiImages.length}
            </span>
          </div>

          {/* Custom Pagination Dots */}
          <div className="swiper-pagination-custom flex justify-center gap-2 mt-6"></div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}
