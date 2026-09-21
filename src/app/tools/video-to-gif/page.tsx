import { Metadata } from 'next';
import VideoToGifClient from './VideoToGifClient';

export const metadata: Metadata = {
  title: 'Video to GIF Converter — Free Online, No Upload | OpticShift Pro',
  description: 'Turn any video clip into an animated GIF for free. Trim the clip, pick quality, and export — 100% in your browser, nothing uploaded.',
  keywords: 'video to gif, convert video to gif, mp4 to gif, make a gif online free, gif maker from video',
  openGraph: {
    title: 'Video to GIF Converter — Free, No Upload',
    description: 'Turn a video clip into a high-quality animated GIF, right in your browser.',
    type: 'website',
  },
};

export default function VideoToGifPage() {
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
            url: 'https://ok01.vercel.app/tools/video-to-gif',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <VideoToGifClient />
    </>
  );
}
