import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LH Property Data",
  description: "Advanced property analysis and insights platform",
  generator: "v0.dev",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LH%20Logo%20%282%29-l2HILZUZp6XWTjS8BbpZQT0soeMlqz.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LH%20Logo%20%282%29-l2HILZUZp6XWTjS8BbpZQT0soeMlqz.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LH%20Logo%20%282%29-l2HILZUZp6XWTjS8BbpZQT0soeMlqz.png",
  },
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
