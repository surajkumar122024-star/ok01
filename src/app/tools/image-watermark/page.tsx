import type { Metadata } from 'next';
import ImageWatermarkClient from './ImageWatermarkClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Free Online Image Watermark Tool – Add Text & Logo | OpticShift Pro',
  description: 'Add text or image watermarks to your photos online for free. No upload required, 100% private & browser-based. Supports JPG, PNG, WebP.',
  keywords: ['image watermark', 'add watermark online', 'free watermark tool', 'watermark photo online', 'text watermark', 'logo watermark', 'watermark image no upload'],
  openGraph: {
    title: 'Free Online Image Watermark Tool | OpticShift Pro',
    description: 'Add text or logo watermarks to images instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/image-watermark',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
  alternates: { canonical: '/tools/image-watermark' },
};

export default function ImageWatermarkPage() {
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
            url: 'https://ok01.vercel.app/tools/image-watermark',
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
      <ImageWatermarkClient />
      <RelatedTools tools={getRelatedTools('image-watermark')} />
    </>
  );
}