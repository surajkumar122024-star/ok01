import { Metadata } from 'next';
import ImageToBase64Client from './ImageToBase64Client';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter — Free, No Upload | OpticShift Pro',
  description: 'Convert images to Base64 strings for CSS/HTML embedding, and decode Base64 back to images. 100% browser-based — nothing is uploaded.',
  keywords: 'image to base64, base64 to image, base64 image converter, encode image base64, css data uri generator',
};

export default function ImageToBase64Page() {
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
            url: 'https://ok01.vercel.app/tools/image-to-base64',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ImageToBase64Client />
    </>
  );
}
