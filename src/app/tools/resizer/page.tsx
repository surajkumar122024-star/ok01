import { Metadata } from 'next';
import ResizerClient from './ResizerClient';

export const metadata: Metadata = {
  title: 'Image Resizer — Change Image Dimensions Free | OpticShift Pro',
  description: 'Resize images online for free. Change width and height with pixel-perfect accuracy. Maintain aspect ratio. 100% browser-based, no upload.',
  keywords: 'image resizer, resize image online, change image size, resize jpg, resize png, free image resizer',
  openGraph: {
    title: 'Image Resizer — Change Image Dimensions Free',
    description: 'Resize images to any dimension instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function ResizerPage() {
  return <ResizerClient />;
}
