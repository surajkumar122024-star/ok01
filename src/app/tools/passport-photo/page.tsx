import { Metadata } from 'next';
import PassportPhotoClient from './PassportPhotoClient';

export const metadata: Metadata = {
  title: 'Passport Size Photo Maker — Free & Private | OpticShift Pro',
  description: 'Create a passport-size photo online for free. Crop and resize to the official 35mm × 45mm standard instantly in your browser. No upload, 100% private.',
  keywords: 'passport photo maker, passport size photo online, passport photo online free, 35x45mm photo, passport photo crop',
  openGraph: {
    title: 'Passport Size Photo Maker — Free & Private',
    description: 'Create a passport-size photo online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function PassportPhotoPage() {
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
            url: 'https://ok01.vercel.app/tools/passport-photo',
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
      <PassportPhotoClient />
    </>
  );
}
