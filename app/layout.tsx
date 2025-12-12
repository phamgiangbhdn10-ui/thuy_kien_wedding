import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trung Kiên & Ngọc Thùy - Wedding',
  description: 'Thiệp cưới Ngô Trung Kiên & Phạm Ngọc Thùy - 03.01.2026',
  icons: {
    icon: '/favicon.ico',
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

