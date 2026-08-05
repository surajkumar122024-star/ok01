import { Metadata } from 'next';
import ImageCollageClient from './ImageCollageClient';

export const metadata: Metadata = {
  title: 'Image Collage Maker — Combine Photos Free Online | OpticShift Pro',
  description: 'Create a photo collage from multiple images online for free. Bulk upload, adjust grid layout, spacing and background. 100% browser-based, no upload needed.',
  keywords: 'image collage maker, photo collage online, bulk image collage, free collage maker, combine photos grid',
  openGraph: {
    title: 'Image Collage Maker — Combine Photos Free',
    description: 'Bulk-upload photos and arrange them into a grid collage instantly. Free, private, browser-based.',
    type: 'website',
  },
};

export default function ImageCollagePage() {
  return <ImageCollageClient />;
}
