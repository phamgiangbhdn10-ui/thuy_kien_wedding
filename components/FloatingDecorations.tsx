'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  type: 'heart' | 'sparkle' | 'flower' | 'star'
}

export default function FloatingDecorations() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = []
    const types: ('heart' | 'sparkle' | 'flower' | 'star')[] = ['heart', 'sparkle', 'flower', 'star']
    
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        type: types[Math.floor(Math.random() * types.length)]
      })
    }
    setElements(newElements)
  }, [])

  const renderElement = (element: FloatingElement) => {
    const baseProps = {
      initial: { opacity: 0, scale: 0, y: 0 },
      animate: {
        opacity: [0, 0.6, 0.8, 0.6, 0],
        scale: [0, 1, 1.2, 1, 0],
        y: [-20, -100],
        x: [0, element.id % 2 === 0 ? 25 : -25],
        rotate: [0, 360]
      },
      transition: {
        duration: element.duration,
        delay: element.delay,
        repeat: Infinity,
        ease: 'easeOut'
      },
      style: {
        left: `${element.x}%`,
        top: `${element.y}%`,
        position: 'absolute' as const,
        pointerEvents: 'none' as const
      }
    }

    switch (element.type) {
      case 'heart':
        return (
          <motion.div key={element.id} {...baseProps}>
            <svg className="w-6 h-6 text-[#D4AF37]/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        )
      case 'sparkle':
        return (
          <motion.div key={element.id} {...baseProps}>
            <svg className="w-4 h-4 text-[#FFD700]/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
        )
      case 'flower':
        return (
          <motion.div key={element.id} {...baseProps}>
            <svg className="w-8 h-8 text-[#D4AF37]/30" viewBox="0 0 100 100">
              <circle cx="50" cy="30" r="12" fill="currentColor" />
              <circle cx="50" cy="70" r="12" fill="currentColor" />
              <circle cx="30" cy="50" r="12" fill="currentColor" />
              <circle cx="70" cy="50" r="12" fill="currentColor" />
              <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.6" />
            </svg>
          </motion.div>
        )
      case 'star':
        return (
          <motion.div key={element.id} {...baseProps}>
            <svg className="w-5 h-5 text-[#E8C547]/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 15.6l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
            </svg>
          </motion.div>
        )
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(renderElement)}
    </div>
  )
}

