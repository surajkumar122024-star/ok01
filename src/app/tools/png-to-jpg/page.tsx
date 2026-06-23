import { Metadata } from 'next';
import PngToJpgClient from './PngToJpgClient';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter — Free & Instant | OpticShift Pro',
  description: 'Convert PNG images to JPG format online for free. Reduce file size up to 80%. 100% browser-based, no upload needed.',
  keywords: 'png to jpg, png to jpeg, convert png to jpg online, free png to jpg converter',
  openGraph: {
    title: 'PNG to JPG Converter — Free & Instant',
    description: 'Convert PNG to JPG instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function PngToJpgPage() {
  return <PngToJpgClient />;
}
