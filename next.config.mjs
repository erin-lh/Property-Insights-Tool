/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Vercel optimizations - Updated for Next.js 15
  serverExternalPackages: ['google-auth-library'],
  // Ensure API routes work correctly on Vercel
  async rewrites() {
    return [
      {
        source: '/api/sheets/:path*',
        destination: '/api/sheets/:path*',
      },
    ]
  },
}

export default nextConfig
