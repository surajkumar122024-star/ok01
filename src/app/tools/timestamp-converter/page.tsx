import { Metadata } from 'next';
import TimestampConverterClient from './TimestampConverterClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Epoch to Date & Back | OpticShift Pro',
  description: 'Convert Unix timestamps to human-readable dates and back, instantly. See the current timestamp live. 100% browser-based, free & private.',
  keywords: 'unix timestamp converter, epoch converter, timestamp to date, date to timestamp, current unix time',
  alternates: { canonical: '/tools/timestamp-converter' },
};

export default function TimestampConverterPage() {
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
            url: 'https://ok01.vercel.app/tools/timestamp-converter',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <TimestampConverterClient />
      <RelatedTools tools={getRelatedTools('timestamp-converter')} />
    </>
  );
}