import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FAF9F6',
        'cream-dark': '#F0EDE6',
        'navy': '#192F4A',
        'navy-light': '#2A4A6B',
        'accent': '#6B8E23',
        'accent-light': '#8AB52D',
        'accent-dark': '#556B1E',
        'gold': '#D4AF37',
        'gold-light': '#E8C547',
      },
      fontFamily: {
        'playfair': ['Cormorant Garamond', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'float-heart': 'float-heart 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(2deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #6B8E23, 0 0 10px #6B8E23, 0 0 15px #6B8E23' },
          '50%': { boxShadow: '0 0 10px #6B8E23, 0 0 20px #6B8E23, 0 0 30px #6B8E23' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        'float-heart': {
          '0%, 100%': { transform: 'translateY(0) rotate(-5deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'luxury': '0 20px 40px rgba(25, 47, 74, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.3)',
        'gold': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
