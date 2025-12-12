'use client'

import { useState, useEffect } from 'react'
import EnvelopeIntro from '@/components/EnvelopeIntro'
import Announcement from '@/components/Announcement'
import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import Family from '@/components/Family'
import Gallery from '@/components/Gallery'
import RSVP from '@/components/RSVP'
import Footer from '@/components/Footer'

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-playfair text-5xl text-navy font-light">K</span>
            <div className="w-px h-12 bg-accent" />
            <span className="font-playfair text-5xl text-navy font-light">T</span>
          </div>
          <div className="animate-pulse">
            <p className="font-montserrat text-sm text-navy/60 tracking-wider">
              Đang tải...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Envelope Intro Animation */}
      {showIntro && <EnvelopeIntro onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
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

        <section id="gallery">
          <Gallery />
        </section>

        <section id="rsvp">
          <RSVP />
        </section>

        <Footer />
      </div>

      {/* Floating Music Button */}
      <button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent text-cream shadow-lg hover:bg-accent-dark transition-colors flex items-center justify-center"
        aria-label="Toggle Music"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </button>
    </main>
  )
}

