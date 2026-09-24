import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Image Cropper — Free & Private | OpticShift Pro',
  description: 'Crop images instantly in your browser with precision. Free aspect ratio presets, no upload required, 100% private.',
  keywords: 'image cropper, crop image online, free image cropper, crop photo, aspect ratio cropper',
  openGraph: {
    title: 'Image Cropper — Free & Private',
    description: 'Crop images instantly in your browser. No upload, 100% private.',
    type: 'website',
  },
  alternates: { canonical: '/tools/image-cropper' },
};

export default function ImageCropperPage() {
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
            url: 'https://ok01.vercel.app/tools/image-cropper',
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
      <ImageCropperClient />
      <RelatedTools tools={getRelatedTools('image-cropper')} />
    </>
  );
}