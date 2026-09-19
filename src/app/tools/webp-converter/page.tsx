import { Metadata } from 'next';
import WebPConverterClient from './WebPConverterClient';

export const metadata: Metadata = {
  title: 'WebP Converter — Convert JPG & PNG to WebP Free | OpticShift Pro',
  description: 'Convert JPG and PNG images to WebP format online for free. Smaller file sizes with better quality. 100% browser-based, no upload needed.',
  keywords: 'webp converter, webp conversion, jpg to webp, png to webp, convert to webp online, free webp converter',
  openGraph: {
    title: 'WebP Converter — Convert Images to WebP Free',
    description: 'Convert JPG & PNG to WebP instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function WebPConverterPage() {
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
            url: 'https://ok01.vercel.app/tools/webp-converter',
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
      <WebPConverterClient />
    </>
  );
}
