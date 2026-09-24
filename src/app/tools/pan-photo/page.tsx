import { Metadata } from 'next';
import PanPhotoClient from './PanPhotoClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'PAN Card Photo Maker — Free & Private | OpticShift Pro',
  description: 'Create a PAN card size photo online for free. Crop and resize to the standard 2.5cm × 3.5cm size instantly in your browser. No upload, 100% private.',
  keywords: 'pan card photo size, pan card photo maker, pan photo online, pan application photo, 2.5x3.5 photo size',
  openGraph: {
    title: 'PAN Card Photo Maker — Free & Private',
    description: 'Create a PAN card size photo online for free, instantly in your browser.',
    type: 'website',
  },
  alternates: { canonical: '/tools/pan-photo' },
};

export default function PanPhotoPage() {
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
            url: 'https://ok01.vercel.app/tools/pan-photo',
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
      <PanPhotoClient />
      <RelatedTools tools={getRelatedTools('pan-photo')} />
    </>
  );
}