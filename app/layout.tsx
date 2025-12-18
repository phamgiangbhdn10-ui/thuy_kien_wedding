import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://thuy-kien-wedding.vercel.app'),
  title: 'Ngọc Thuỳ & Trung Kiên - Wedding',
  description: 'Phạm Ngọc Thuỳ & Ngô Trung Kiên - 02.01.2026',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Ngọc Thuỳ & Trung Kiên - Wedding',
    description: 'Phạm Ngọc Thuỳ & Ngô Trung Kiên - 02.01.2026',
    url: 'https://thuy-kien-wedding.vercel.app',
    siteName: 'Thiệp Cưới Ngọc Thuỳ & Trung Kiên',
    images: [
      {
        url: 'https://thuy-kien-wedding.vercel.app/images/1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp cưới Ngọc Thuỳ & Trung Kiên',
        type: 'image/jpeg',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ngọc Thuỳ & Trung Kiên - Wedding',
    description: 'Phạm Ngọc Thuỳ & Ngô Trung Kiên - 02.01.2026',
    images: ['https://thuy-kien-wedding.vercel.app/images/1200x630.jpg'],
  },
  alternates: {
    canonical: 'https://thuy-kien-wedding.vercel.app',
  },
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

