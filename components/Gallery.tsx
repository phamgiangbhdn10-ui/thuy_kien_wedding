'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

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
  { src: '/images/15x21/DSC01710.jpg', alt: 'Wedding Photo 9' },
  { src: '/images/15x21/DSC01739.jpg', alt: 'Wedding Photo 10' },
]

const bannerImages = [
  { src: '/images/60x120/60x120 (1).jpg', alt: 'Banner 1' },
  { src: '/images/60x120/60x120 (2).jpg', alt: 'Banner 2' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animation for gallery items
      gsap.fromTo('.gallery-item',
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const openLightbox = (src: string) => {
    setSelectedImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream-dark overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-4">
            Khoảnh Khắc Đẹp
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
          <p className="font-montserrat text-sm text-navy/60">
            Những kỷ niệm đáng nhớ của chúng tôi
          </p>
        </div>

        {/* Banner Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item relative aspect-[2/1] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-accent transition-colors duration-300 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300" />
              
              {/* Accent Border on Hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-accent transition-colors duration-300 rounded-xl" />
              
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-cream/90 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Selected photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-accent/10 rotate-45" />
      <div className="absolute bottom-10 right-10 w-28 h-28 border border-accent/10 rotate-12" />
    </section>
  )
}

