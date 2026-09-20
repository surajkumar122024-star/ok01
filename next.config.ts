import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.googlesyndication.com *.googletagmanager.com *.google-analytics.com *.doubleclick.net *.adtrafficquality.google",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: *.google.com *.googlesyndication.com *.doubleclick.net *.gstatic.com images.unsplash.com picsum.photos placehold.co",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
              "connect-src 'self' blob: *.google.com *.googlesyndication.com *.google-analytics.com *.doubleclick.net *.adtrafficquality.google *.googletagmanager.com",
              "frame-src 'self' *.google.com *.googlesyndication.com *.doubleclick.net *.adtrafficquality.google",
            ].join('; '),
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // The FFmpeg wasm core never changes unless we upgrade the
        // @ffmpeg/core package, so it's safe to cache aggressively —
        // return visitors using the video compressor again won't
        // re-download this ~31MB file.
        source: '/ffmpeg/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Same reasoning as /ffmpeg above — the self-hosted Tesseract.js
        // worker script, wasm cores, and language data files are static
        // and versioned by our own deploys, so they're safe to cache
        // for a long time.
        source: '/tesseract/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
