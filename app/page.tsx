'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import EnvelopeIntro from '@/components/EnvelopeIntro'
import Announcement from '@/components/Announcement'
import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import Family from '@/components/Family'
import Quotes from '@/components/Quotes'
import Gallery from '@/components/Gallery'
import LeHoiSlider from '@/components/LeHoiSlider'
import RSVP from '@/components/RSVP'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'
import FloatingDecorations from '@/components/FloatingDecorations'
import Sparkles from '@/components/Sparkles'
import MusicPlayer from '@/components/MusicPlayer'
import ScrollButton from '@/components/ScrollButton'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Only preload critical image (thư mời)
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = '/images/60x120/c2.jpg'
    document.head.appendChild(link)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-playfair text-5xl text-navy font-light">T</span>
            <div className="w-px h-12 bg-accent" />
            <span className="font-playfair text-5xl text-navy font-light">K</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.svg
                key={i}
                className="w-6 h-6 text-[#D4AF37]"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </motion.svg>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream relative overflow-hidden">
      {/* Particles Background */}
      {!showIntro && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>
      )}

      {/* Floating Decorations */}
      {!showIntro && <FloatingDecorations />}

      {/* Envelope Intro Animation */}
      {showIntro && <EnvelopeIntro onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Sections */}
        <section id="home">
          <Announcement />
        </section>

        <section id="countdown">
          <Countdown />
        </section>

        <section id="details">
          <Details />
        </section>

        <section id="family">
          <Family />
        </section>

        <section id="quotes">
          <Quotes />
        </section>

        <section id="lehoi">
          <LeHoiSlider />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="rsvp">
          <RSVP />
        </section>

        <Footer />
      </motion.div>

      {/* Music Player */}
      <MusicPlayer />

      {/* Scroll Button */}
      {!showIntro && <ScrollButton />}
    </main>
  )
}

