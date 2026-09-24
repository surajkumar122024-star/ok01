import { Metadata } from 'next';
import PngToJpgClient from './PngToJpgClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter — Free & Instant | OpticShift Pro',
  description: 'Convert PNG images to JPG format online for free. Reduce file size up to 80%. 100% browser-based, no upload needed.',
  keywords: 'png to jpg, png to jpeg, convert png to jpg online, free png to jpg converter',
  openGraph: {
    title: 'PNG to JPG Converter — Free & Instant',
    description: 'Convert PNG to JPG instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
  alternates: { canonical: '/tools/png-to-jpg' },
};

export default function PngToJpgPage() {
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
            url: 'https://ok01.vercel.app/tools/png-to-jpg',
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
      <PngToJpgClient />
      <RelatedTools tools={getRelatedTools('png-to-jpg')} />
    </>
  );
}