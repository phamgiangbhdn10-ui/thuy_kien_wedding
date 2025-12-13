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
import RSVP from '@/components/RSVP'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'
import FloatingDecorations from '@/components/FloatingDecorations'
import Sparkles from '@/components/Sparkles'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-playfair text-5xl text-navy font-light">K</span>
            <div className="w-px h-12 bg-accent" />
            <span className="font-playfair text-5xl text-navy font-light">T</span>
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

        <Countdown />

        <section id="details">
          <Details />
        </section>

        <section id="family">
          <Family />
        </section>

        <Quotes />

        <section id="gallery">
          <Gallery />
        </section>

        <section id="rsvp">
          <RSVP />
        </section>

        <Footer />
      </motion.div>

      {/* Floating Music Button with animation */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-accent text-white shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center"
        aria-label="Toggle Music"
      >
        <motion.svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </motion.svg>
      </motion.button>
    </main>
  )
}

