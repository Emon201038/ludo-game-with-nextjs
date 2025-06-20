import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/web/icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/web/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}