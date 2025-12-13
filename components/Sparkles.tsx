'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  size: number
}

export default function Sparkles({ count = 20 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const newSparkles: Sparkle[] = []
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: 4 + Math.random() * 8
      })
    }
    setSparkles(newSparkles)
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: 'radial-gradient(circle, #FFD700 0%, #D4AF37 50%, transparent 100%)',
            boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

