/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output mode for Railway (standalone is more efficient)
  // Only use standalone in production builds, not during development
  ...(process.env.NODE_ENV === 'production' ? { output: 'standalone' } : {}),
  
  // Image optimization - Disabled for Railway deployment
  // Images will be served as-is without optimization to avoid sharp issues
  images: {
    unoptimized: true,
  },
  
  // Compression
  compress: true,
  
  // Production optimizations
  swcMinify: true,
  
  // Experimental features for performance
  // Disabled optimizeCss due to missing critters dependency
  // experimental: {
  //   optimizeCss: true,
  // },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
