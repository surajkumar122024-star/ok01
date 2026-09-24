import { Metadata } from 'next';
import ResizerClient from './ResizerClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Image Resizer — Change Image Dimensions Free | OpticShift Pro',
  description: 'Resize images online for free. Change width and height with pixel-perfect accuracy. Maintain aspect ratio. 100% browser-based, no upload.',
  keywords: 'image resizer, resize image online, change image size, resize jpg, resize png, free image resizer',
  openGraph: {
    title: 'Image Resizer — Change Image Dimensions Free',
    description: 'Resize images to any dimension instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
  alternates: { canonical: '/tools/resizer' },
};

export default function ResizerPage() {
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
            url: 'https://ok01.vercel.app/tools/resizer',
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
      <ResizerClient />
      <RelatedTools tools={getRelatedTools('resizer')} />
    </>
  );
}