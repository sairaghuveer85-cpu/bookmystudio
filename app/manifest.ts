import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BookMyStudio — Production Spaces & Crew',
    short_name: 'BookMyStudio',
    description: 'The architectural production marketplace for verified cycloramas, soundstages, filming locations, and crew.',
    start_url: '/',
    display: 'standalone',
    background_color: '#101010',
    theme_color: '#101010',
    icons: [
      {
        src: '/images/studios/greenpoint-cove.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

