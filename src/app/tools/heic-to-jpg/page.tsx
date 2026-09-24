import type { Metadata } from 'next';
import HeicToJpgClient from './HeicToJpgClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Free HEIC to JPG Converter – Convert iPhone Photos Online | OpticShift Pro',
  description: 'Convert HEIC/HEIF photos to JPG, PNG, or PDF online for free. No upload required, 100% private & browser-based. Supports bulk conversion. Perfect for iPhone photos.',
  keywords: ['heic to jpg', 'heic converter', 'convert heic to jpg', 'how to change heic to jpg', 'converting heic to jpg', 'heif to jpg', 'iphone photo converter', 'heic to jpeg online', 'free heic converter', 'heic to jpg no upload', 'heic to pdf', 'heic to png'],
  openGraph: {
    title: 'Free HEIC to JPG Converter | OpticShift Pro',
    description: 'Convert HEIC iPhone photos to JPG instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/heic-to-jpg',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
  alternates: { canonical: '/tools/heic-to-jpg' },
};

export default function HeicToJpgPage() {
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
            url: 'https://ok01.vercel.app/tools/heic-to-jpg',
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
      <HeicToJpgClient />
      <RelatedTools tools={getRelatedTools('heic-to-jpg')} />
    </>
  );
}