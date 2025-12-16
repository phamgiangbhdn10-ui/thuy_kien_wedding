'use client'

import { motion } from 'framer-motion'

interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedBorder({ children, className = '' }: AnimatedBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute -inset-0.5 rounded-3xl opacity-75"
        style={{
          background: 'linear-gradient(45deg, #D4AF37, #E8C547, #FFD700, #E8C547, #D4AF37)',
          backgroundSize: '200% 200%',
          filter: 'blur(8px)'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Content */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl">
        {children}
      </div>
    </div>
  )
}





