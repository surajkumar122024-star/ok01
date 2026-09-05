import type { Metadata } from 'next';
import ImageToTextClient from './ImageToTextClient';

export const metadata: Metadata = {
  title: 'Free Image to Text Converter (OCR) Online — OpticShift Pro',
  description: 'Extract text from any image or screenshot online for free. No upload required, 100% private & browser-based. Supports 100+ languages.',
  keywords: ['image to text', 'ocr online', 'extract text from image', 'photo to text', 'jpg to text', 'png to text', 'screenshot to text', 'free ocr tool'],
  openGraph: {
    title: 'Free Image to Text Converter (OCR) | OpticShift Pro',
    description: 'Extract text from any image instantly in your browser. No upload, 100% private.',
    url: 'https://ok01.vercel.app/tools/image-to-text',
    siteName: 'OpticShift Pro',
    type: 'website',
  },
};

export default function ImageToTextPage() {
  return <ImageToTextClient />;
}
