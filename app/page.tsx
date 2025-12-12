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
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-cream/80 backdrop-blur-md border-b border-navy/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="font-playfair text-2xl text-navy">K</span>
                <div className="w-px h-5 bg-accent" />
                <span className="font-playfair text-2xl text-navy">T</span>
              </div>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#home" className="font-montserrat text-sm text-navy hover:text-accent transition-colors">
                  Trang Chủ
                </a>
                <a href="#details" className="font-montserrat text-sm text-navy hover:text-accent transition-colors">
                  Thông Tin
                </a>
                <a href="#family" className="font-montserrat text-sm text-navy hover:text-accent transition-colors">
                  Gia Đình
                </a>
                <a href="#gallery" className="font-montserrat text-sm text-navy hover:text-accent transition-colors">
                  Hình Ảnh
                </a>
                <a href="#rsvp" className="font-montserrat text-sm text-cream bg-accent hover:bg-accent-dark px-4 py-2 rounded-full transition-colors">
                  RSVP
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

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

