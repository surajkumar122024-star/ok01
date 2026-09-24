import { Metadata } from 'next';
import MovToMp4Client from './MovToMp4Client';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'MOV to MP4 Converter — Free Online, No Upload | OpticShift Pro',
  description: 'Convert MOV (QuickTime/iPhone) videos to MP4 for free. Works on any device, plays everywhere. 100% browser-based — your video never leaves your device.',
  keywords: 'mov to mp4, convert mov to mp4, quicktime to mp4, iphone video to mp4, free mov converter online',
  openGraph: {
    title: 'MOV to MP4 Converter — Free, No Upload',
    description: 'Convert MOV videos to universally-playable MP4. Free, private, browser-based.',
    type: 'website',
  },
  alternates: { canonical: '/tools/mov-to-mp4' },
};

export default function MovToMp4Page() {
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
            url: 'https://ok01.vercel.app/tools/mov-to-mp4',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <MovToMp4Client />
      <RelatedTools tools={getRelatedTools('mov-to-mp4')} />
    </>
  );
}