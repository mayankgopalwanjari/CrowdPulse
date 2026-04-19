import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CrowdPulse Live Command',
  description: 'Admin dashboard for venue crowd intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0F1115" />
      </head>
      <body>{children}</body>
    </html>
  )
}
