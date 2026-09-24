import UrlEncoderClient from './UrlEncoderClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'URL Encoder/Decoder Online — Free & Instant | OpticShift Pro',
  description: 'Encode or decode a URL online for free, instantly in your browser. Percent-encoding made simple and private.',
  keywords: 'url encoder decoder online, encode url online free, percent encoding tool online, convert url to encoded string',
  alternates: { canonical: '/tools/url-encoder' },
}

export default function UrlEncoderPage() {
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
            url: 'https://ok01.vercel.app/tools/url-encoder',
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
      <UrlEncoderClient />
      <RelatedTools tools={getRelatedTools('url-encoder')} />
    </>
  );
}