import type { Metadata } from 'next';
import ColorPickerClient from './ColorPickerClient';

export const metadata: Metadata = {
  title: 'Free Image Color Picker – Pick Colors from Any Image | OpticShift Pro',
  description: 'Pick colors from any image online for free. Get HEX, RGB, and HSL values instantly. No upload required, 100% private & browser-based.',
  keywords: ['color picker', 'image color picker', 'pick color from image', 'hex color picker', 'rgb color picker', 'eyedropper tool online', 'color extractor'],
  openGraph: {
    title: 'Free Image Color Picker | OpticShift Pro',
    description: 'Pick colors from any image and get HEX, RGB, HSL values instantly. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/color-picker',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
};

export default function ColorPickerPage() {
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
            url: 'https://ok01.vercel.app/tools/color-picker',
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
      <ColorPickerClient />
    </>
  );
}
