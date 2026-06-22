import { Metadata } from 'next';
import JpgToPngClient from './JpgToPngClient';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free & Instant | OpticShift Pro',
  description: 'Convert JPG images to PNG format online for free. Lossless quality, supports transparency. 100% browser-based, no upload needed.',
  keywords: 'jpg to png, jpeg to png, convert jpg to png online, free jpg to png converter',
  openGraph: {
    title: 'JPG to PNG Converter — Free & Instant',
    description: 'Convert JPG to PNG instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}
