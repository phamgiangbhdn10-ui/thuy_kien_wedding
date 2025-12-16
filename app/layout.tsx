import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-thuy-kien.vercel.app'),
  title: 'Trung Kiên & Ngọc Thùy - Wedding',
  description: 'Ngô Trung Kiên & Phạm Ngọc Thùy - 02.01.2026',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Trung Kiên & Ngọc Thùy - Wedding',
    description: 'Ngô Trung Kiên & Phạm Ngọc Thùy - 02.01.2026',
    url: 'https://wedding-thuy-kien.vercel.app',
    siteName: 'Thiệp Cưới Trung Kiên & Ngọc Thùy',
    images: [
      {
        url: 'https://wedding-thuy-kien.vercel.app/images/1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp cưới Trung Kiên & Ngọc Thùy',
        type: 'image/jpeg',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trung Kiên & Ngọc Thùy - Wedding',
    description: 'Ngô Trung Kiên & Phạm Ngọc Thùy - 02.01.2026',
    images: ['https://wedding-thuy-kien.vercel.app/images/1200x630.jpg'],
  },
  alternates: {
    canonical: 'https://wedding-thuy-kien.vercel.app',
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
      <body>{children}</body>
    </html>
  )
}

