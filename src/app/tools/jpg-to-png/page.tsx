import { Metadata } from 'next';
import JpgToPngClient from './JpgToPngClient';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free & Instant | OpticShift Pro',
  description: 'Convert JPG images to PNG format online for free. Lossless quality, supports transparency. 100% browser-based, no upload needed.',
  keywords: 'jpg to png, jpeg to png, convert jpg to png online, free jpg to png converter',
  openGraph: {
    title: 'JPG to PNG Converter — Free & Instant',
    description: 'Convert JPG to PNG instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function JpgToPngPage() {
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
            url: 'https://ok01.vercel.app/tools/jpg-to-png',
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
      <JpgToPngClient />
    </>
  );
}
