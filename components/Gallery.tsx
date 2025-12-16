'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Sparkles from './Sparkles'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/15x21/DSC00869.jpg', alt: 'Wedding Photo 1' },
  { src: '/images/15x21/DSC01111.jpg', alt: 'Wedding Photo 2' },
  { src: '/images/15x21/DSC01337.jpg', alt: 'Wedding Photo 3' },
  { src: '/images/15x21/DSC01342.jpg', alt: 'Wedding Photo 4' },
  { src: '/images/15x21/DSC01468.jpg', alt: 'Wedding Photo 5' },
  { src: '/images/15x21/DSC01513.jpg', alt: 'Wedding Photo 6' },
  { src: '/images/15x21/DSC01639.jpg', alt: 'Wedding Photo 7' },
  { src: '/images/15x21/DSC01660.jpg', alt: 'Wedding Photo 8' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Lazy load gallery images only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load images progressively when section is visible
            galleryImages.forEach((image, index) => {
              setTimeout(() => {
                const img = new window.Image()
                img.src = image.src
              }, index * 100) // Stagger loading
            })
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-title',
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

  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null)
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null)
      } else if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
    document.body.style.overflow = 'auto'
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)
    }
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-cream overflow-hidden"
    >
      {/* Sparkles background */}
      <Sparkles count={20} />

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="gallery-title text-center mb-16">
          <motion.h2 
            className="font-script text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Khoảnh Khắc Đẹp
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

        {/* Gallery Grid - Masonry style */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 2, 0]
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.1 },
                  y: { duration: 0.6, delay: 0.1 },
                  rotateX: { duration: 0.6, delay: 0.1 },
                  rotateY: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{ perspective: '1000px' }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  quality={85}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotateY: -5, z: 50 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(1)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(2)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotateY: -5, z: 50 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(3)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(4)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: -5, z: 50 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(5)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(6)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[6].src}
                  alt={galleryImages[6].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotateY: -5, z: 50 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(7)}
                style={{ perspective: '1000px' }}
              >
                <Image
                  src={galleryImages[7].src}
                  alt={galleryImages[7].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-montserrat text-sm font-medium">Xem chi tiết</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full z-10">
            <span className="text-white text-sm font-montserrat">
              {selectedImageIndex + 1} / {galleryImages.length}
            </span>
          </div>
          
          {/* Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
