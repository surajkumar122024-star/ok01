import type { Metadata } from 'next';
import SvgToPngClient from './SvgToPngClient';

export const metadata: Metadata = {
  title: 'Free SVG to PNG Converter – Convert SVG Online | OpticShift Pro',
  description: 'Convert SVG files to PNG instantly in your browser. No upload required, 100% private. Choose custom size and scale.',
  keywords: ['svg to png', 'convert svg to png', 'svg converter online', 'free svg to png', 'svg to image', 'svg to png no upload'],
  openGraph: {
    title: 'Free SVG to PNG Converter | OpticShift Pro',
    description: 'Convert SVG to PNG instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/svg-to-png',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
};

export default function SvgToPngPage() {
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
            url: 'https://ok01.vercel.app/tools/svg-to-png',
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
      <SvgToPngClient />
    </>
  );
}
