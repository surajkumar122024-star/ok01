import { Metadata } from 'next';
import UuidGeneratorClient from './UuidGeneratorClient';

export const metadata: Metadata = {
  title: 'UUID Generator — Free Online UUID v4 Generator | OpticShift Pro',
  description: 'Generate random UUID v4 (GUID) values instantly. Bulk generate up to 50 at once, one-click copy. 100% browser-based, free & private.',
  keywords: 'uuid generator, guid generator, uuid v4, random uuid online, generate uuid',
};

export default function UuidGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/uuid-generator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <UuidGeneratorClient />
    </>
  );
}
