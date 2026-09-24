import type { Metadata } from 'next';
import ImageRotateClient from './ImageRotateClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Free Image Rotate & Flip Tool – Rotate Images Online | OpticShift Pro',
  description: 'Rotate and flip images online for free. No upload required, 100% private & browser-based. Supports JPG, PNG, WebP. Rotate 90°, 180°, 270° or flip horizontally/vertically.',
  keywords: ['image rotate', 'rotate image online', 'flip image online', 'free image rotate', 'rotate jpg online', 'flip photo online', 'image rotate no upload'],
  openGraph: {
    title: 'Free Image Rotate & Flip Tool | OpticShift Pro',
    description: 'Rotate and flip images instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/image-rotate',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
  alternates: { canonical: '/tools/image-rotate' },
};

export default function ImageRotatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: metadata.title,
            description: metadata.description,
            url: 'https://ok01.vercel.app/tools/image-rotate',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <ImageRotateClient />
      <RelatedTools tools={getRelatedTools('image-rotate')} />
    </>
  );
}