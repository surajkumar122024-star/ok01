import { Metadata } from 'next';
import VideoCompressorClient from './VideoCompressorClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Video Compressor — Reduce Video File Size Free | OpticShift Pro',
  description: 'Compress MP4, MOV, WebM and other video files online for free. Reduce file size while keeping good quality. 100% browser-based, no upload — your video never leaves your device.',
  keywords: 'video compressor, compress video online, reduce video size, mp4 compressor, free video compressor, compress video without losing quality',
  openGraph: {
    title: 'Video Compressor — Reduce File Size Free',
    description: 'Compress videos smaller without a big quality hit. Free, private, browser-based — no upload required.',
    type: 'website',
  },
  alternates: { canonical: '/tools/video-compressor' },
};

export default function VideoCompressorPage() {
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
            url: 'https://ok01.vercel.app/tools/video-compressor',
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
      <VideoCompressorClient />
      <RelatedTools tools={getRelatedTools('video-compressor')} />
    </>
  );
}