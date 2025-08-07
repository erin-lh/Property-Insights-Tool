import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Property Insights Tool',
  description: 'Advanced property analysis and insights platform',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
