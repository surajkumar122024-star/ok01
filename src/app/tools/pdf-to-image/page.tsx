import { Metadata } from 'next';
import PdfToImageClient from './PdfToImageClient';

export const metadata: Metadata = {
  title: 'PDF to Image Converter — Free & Private | OpticShift Pro',
  description: 'Convert each PDF page to high-quality PNG images instantly. 100% free, no upload, works entirely in your browser.',
  keywords: 'pdf to image, pdf to png, convert pdf to image online, free pdf to image converter, pdf page to png',
  openGraph: {
    title: 'PDF to Image Converter — Free & Private',
    description: 'Extract every PDF page as a PNG image instantly in your browser. No upload, no login.',
    type: 'website',
  },
};

export default function PdfToImagePage() {
  return <PdfToImageClient />;
}
