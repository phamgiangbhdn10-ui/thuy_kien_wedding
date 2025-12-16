'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lehoiImages = [
  { src: '/lehoi/NO1_6287.JPG', alt: 'Lễ hội 1' },
  { src: '/lehoi/NO1_6310.JPG', alt: 'Lễ hội 2' },
  { src: '/lehoi/NO1_6326.JPG', alt: 'Lễ hội 3' },
  { src: '/lehoi/NO1_6340.JPG', alt: 'Lễ hội 4' },
  { src: '/lehoi/NO1_6348.JPG', alt: 'Lễ hội 5' },
  { src: '/lehoi/NO1_6357.JPG', alt: 'Lễ hội 6' },
  { src: '/lehoi/NO1_6360.JPG', alt: 'Lễ hội 7' },
  { src: '/lehoi/NO1_6390.JPG', alt: 'Lễ hội 8' },
  { src: '/lehoi/NO1_6399.JPG', alt: 'Lễ hội 9' },
  { src: '/lehoi/NOO_0041.JPG', alt: 'Lễ hội 10' },
  { src: '/lehoi/NOO_0043.JPG', alt: 'Lễ hội 11' },
  { src: '/lehoi/NOO_0046.JPG', alt: 'Lễ hội 12' },
  { src: '/lehoi/NOO_0163.JPG', alt: 'Lễ hội 13' },
  { src: '/lehoi/NOO_0319.JPG', alt: 'Lễ hội 14' },
  { src: '/lehoi/NOO_0323.JPG', alt: 'Lễ hội 15' },
  { src: '/lehoi/NOO_0329.JPG', alt: 'Lễ hội 16' },
  { src: '/lehoi/NOO_0544.JPG', alt: 'Lễ hội 17' },
  { src: '/lehoi/NOO_0846.JPG', alt: 'Lễ hội 18' },
  { src: '/lehoi/NOO_0871.JPG', alt: 'Lễ hội 19' },
  { src: '/lehoi/NOO_0952.JPG', alt: 'Lễ hội 20' },
  { src: '/lehoi/NOO_0994.JPG', alt: 'Lễ hội 21' },
  { src: '/lehoi/NOO_1024.JPG', alt: 'Lễ hội 22' },
  { src: '/lehoi/NOO_1051.JPG', alt: 'Lễ hội 23' },
  { src: '/lehoi/NOO_1054.JPG', alt: 'Lễ hội 24' },
  { src: '/lehoi/NOO_1135.JPG', alt: 'Lễ hội 25' },
  { src: '/lehoi/NOO_1152.JPG', alt: 'Lễ hội 26' },
  { src: '/lehoi/NOO_1175.JPG', alt: 'Lễ hội 27' },
  { src: '/lehoi/NOO_1227.JPG', alt: 'Lễ hội 28' },
  { src: '/lehoi/NOO_1249.JPG', alt: 'Lễ hội 29' },
  { src: '/lehoi/NOO_1252.JPG', alt: 'Lễ hội 30' },
  { src: '/lehoi/NOO_1261.JPG', alt: 'Lễ hội 31' },
  { src: '/lehoi/NOO_1305.JPG', alt: 'Lễ hội 32' },
  { src: '/lehoi/NOO_1469.JPG', alt: 'Lễ hội 33' },
  { src: '/lehoi/NOO_1486.JPG', alt: 'Lễ hội 34' },
  { src: '/lehoi/NOO_1507 (1).JPG', alt: 'Lễ hội 35' },
  { src: '/lehoi/NOO_1507.JPG', alt: 'Lễ hội 36' },
  { src: '/lehoi/NOO_1546.JPG', alt: 'Lễ hội 37' },
  { src: '/lehoi/NOO_1563.JPG', alt: 'Lễ hội 38' },
]

export default function LeHoiSlider() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play slider
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % lehoiImages.length)
      }, 4000) // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  // Preload all images when section is about to be visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add preload link tags to head for first few images
            lehoiImages.slice(0, 3).forEach((image) => {
              const link = document.createElement('link')
              link.rel = 'preload'
              link.as = 'image'
              link.href = image.src
              document.head.appendChild(link)
            })

            // Preload all images progressively
            lehoiImages.forEach((image, index) => {
              setTimeout(() => {
                const img = new window.Image()
                img.onload = () => {
                  setImagesLoaded((prev) => new Set([...prev, index]))
                }
                img.onerror = () => {
                  // Still mark as loaded to avoid infinite loading
                  setImagesLoaded((prev) => new Set([...prev, index]))
                }
                img.src = image.src
              }, index * 100) // Stagger loading to avoid blocking
            })
            observer.disconnect()
          }
        })
      },
      { rootMargin: '500px' } // Start loading 500px before visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Preload next and previous images for smooth transitions
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % lehoiImages.length
    const prevIndex = (currentIndex - 1 + lehoiImages.length) % lehoiImages.length

    // Preload next image
    if (!imagesLoaded.has(nextIndex)) {
      const nextImg = new window.Image()
      nextImg.onload = () => {
        setImagesLoaded((prev) => new Set([...prev, nextIndex]))
      }
      nextImg.src = lehoiImages[nextIndex].src
    }

    // Preload previous image
    if (!imagesLoaded.has(prevIndex)) {
      const prevImg = new window.Image()
      prevImg.onload = () => {
        setImagesLoaded((prev) => new Set([...prev, prevIndex]))
      }
      prevImg.src = lehoiImages[prevIndex].src
    }
  }, [currentIndex, imagesLoaded])

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

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % lehoiImages.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + lehoiImages.length) % lehoiImages.length)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50 // Minimum drag distance to trigger slide change

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
  }

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
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Wrapper */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
            {/* Loading indicator - only show if first 3 images not loaded */}
            {imagesLoaded.size < 3 && (
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: imagesLoaded.size >= 3 ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-cream/90 backdrop-blur-sm z-20"
              >
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-[#D4AF37] text-sm font-montserrat">
                    Đang tải hình ảnh... {imagesLoaded.size}/{lehoiImages.length}
                  </p>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={lehoiImages[currentIndex].src}
                  alt={lehoiImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={currentIndex === 0 || currentIndex === 1}
                  quality={90}
                  loading={currentIndex <= 2 ? 'eager' : 'lazy'}
                />
                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all z-10 shadow-lg hover:scale-110"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all z-10 shadow-lg hover:scale-110"
              onClick={goToNext}
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
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {lehoiImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-[#D4AF37]'
                    : 'w-2 h-2 bg-[#D4AF37]/40 hover:bg-[#D4AF37]/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

