'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sections = ['home', 'countdown', 'details', 'family', 'quotes', 'gallery', 'rsvp']

export default function ScrollButton() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const documentHeight = document.documentElement.scrollHeight

      // Check if at bottom
      if (window.innerHeight + window.scrollY >= documentHeight - 100) {
        setIsVisible(false)
        return
      }

      setIsVisible(true)

      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition + 100) {
          setCurrentSectionIndex(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNext = () => {
    const nextIndex = currentSectionIndex + 1
    
    if (nextIndex < sections.length) {
      const nextSection = document.getElementById(sections[nextIndex])
      if (nextSection) {
        const offset = 80
        const elementPosition = nextSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-2 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none">
      <motion.button
        onClick={scrollToNext}
        className="flex flex-col items-center justify-center gap-1 text-white/50 hover:text-white/70 transition-colors pointer-events-auto cursor-pointer bg-transparent border-none outline-none focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 0.5 }}
      >
      {/* Mouse icon with scroll indicator */}
      <motion.div
        className="flex flex-col items-center gap-1"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Mouse body */}
          <rect x="5" y="2" width="14" height="20" rx="7" />
          {/* Scroll wheel */}
          <line x1="12" y1="6" x2="12" y2="10" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>
        
        {/* Text hint */}
        <motion.span
          className="text-[10px] font-montserrat text-white/50 whitespace-nowrap"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Kéo xuống
        </motion.span>
      </motion.div>
    </motion.button>
    </div>
  )
}

