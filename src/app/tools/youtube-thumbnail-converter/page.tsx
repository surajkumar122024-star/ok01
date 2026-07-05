import { Metadata } from 'next';
import YoutubeThumbnailClient from './YoutubeThumbnailClient';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Converter (16:9) — Free & Private | OpticShift Pro',
  description: 'Convert any image to the perfect 1280×720 YouTube thumbnail ratio instantly in your browser. No upload required, 100% private, completely free.',
  keywords: 'youtube thumbnail converter, youtube thumbnail size, 16:9 image converter, youtube thumbnail maker, resize image for youtube',
  openGraph: {
    title: 'YouTube Thumbnail Converter (16:9) — Free & Private',
    description: 'Convert any image to the perfect YouTube thumbnail ratio instantly. No upload, 100% private.',
    type: 'website',
  },
};

export default function YoutubeThumbnailPage() {
  return <YoutubeThumbnailClient />;
}
