import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
  title: 'Image to PDF Converter — Free & Private | OpticShift Pro',
  description: 'Convert multiple JPG or PNG images into a single PDF file instantly in your browser. No upload required, 100% private, completely free.',
  keywords: 'image to pdf, jpg to pdf, png to pdf, convert images to pdf, free image to pdf converter',
  openGraph: {
    title: 'Image to PDF Converter — Free & Private',
    description: 'Convert images to PDF instantly in your browser. No upload, 100% private.',
    type: 'website',
  },
};

export default function ImageToPdfPage() {
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
            url: 'https://ok01.vercel.app/tools/image-to-pdf',
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
      <ImageToPdfClient />
    </>
  );
}
