import { Metadata } from 'next';
import AadhaarPhotoClient from './AadhaarPhotoClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Aadhaar Card Photo Maker — Free & Private | OpticShift Pro',
  description: 'Create an Aadhaar card size photo online for free. Crop and resize to the standard 3.5cm × 4.5cm size instantly in your browser. No upload, 100% private.',
  keywords: 'aadhaar photo size, aadhaar card photo maker, aadhaar photo online, aadhaar enrollment photo, 3.5x4.5 photo size',
  openGraph: {
    title: 'Aadhaar Card Photo Maker — Free & Private',
    description: 'Create an Aadhaar card size photo online for free, instantly in your browser.',
    type: 'website',
  },
  alternates: { canonical: '/tools/aadhaar-photo' },
};

export default function AadhaarPhotoPage() {
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
            url: 'https://ok01.vercel.app/tools/aadhaar-photo',
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
      <AadhaarPhotoClient />
      <RelatedTools tools={getRelatedTools('aadhaar-photo')} />
    </>
  );
}