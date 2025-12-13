import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trung Kiên & Ngọc Thùy - Wedding',
  description: 'Thiệp cưới Ngô Trung Kiên & Phạm Ngọc Thùy - 03.01.2026',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Trung Kiên & Ngọc Thùy - Wedding',
    description: 'Thiệp cưới Ngô Trung Kiên & Phạm Ngọc Thùy - 03.01.2026',
    url: 'https://wedding-kien-thuy.vercel.app',
    siteName: 'Thiệp Cưới Trung Kiên & Ngọc Thùy',
    images: [
      {
        url: '/images/60x120/c1.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp cưới Trung Kiên & Ngọc Thùy',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trung Kiên & Ngọc Thùy - Wedding',
    description: 'Thiệp cưới Ngô Trung Kiên & Phạm Ngọc Thùy - 03.01.2026',
    images: ['/images/60x120/c1.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

