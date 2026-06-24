import type { Metadata } from 'next';
import HeicToJpgClient from './HeicToJpgClient';

export const metadata: Metadata = {
  title: 'Free HEIC to JPG Converter – Convert iPhone Photos Online | OpticShift Pro',
  description: 'Convert HEIC/HEIF photos to JPG online for free. No upload required, 100% private & browser-based. Supports bulk conversion. Perfect for iPhone photos.',
  keywords: ['heic to jpg', 'heic converter', 'convert heic to jpg', 'heif to jpg', 'iphone photo converter', 'heic to jpeg online', 'free heic converter', 'heic to jpg no upload'],
  openGraph: {
    title: 'Free HEIC to JPG Converter | OpticShift Pro',
    description: 'Convert HEIC iPhone photos to JPG instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/heic-to-jpg',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
};

export default function HeicToJpgPage() {
  return <HeicToJpgClient />;
}
