import { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';

export const metadata: Metadata = {
  title: 'Image Format Converter — JPG, PNG, WebP, GIF, BMP, ICO | OpticShift Pro',
  description: 'Convert images between JPG, PNG, WebP, GIF, BMP, and ICO online for free, in your browser. No upload, 100% private and instant.',
  keywords: 'image format converter online, convert jpg to ico, convert png to gif online, convert image to bmp free, universal image converter',
  openGraph: {
    title: 'Image Format Converter — JPG, PNG, WebP, GIF, BMP, ICO',
    description: 'Convert between six image formats in one browser-based tool. Free, private, instant.',
    type: 'website',
  },
};

export default function ImageConverterPage() {
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
            url: 'https://ok01.vercel.app/tools/image-converter',
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
      <ImageConverterClient />
    </>
  );
}
