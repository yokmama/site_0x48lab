import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/site_0x48lab',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
