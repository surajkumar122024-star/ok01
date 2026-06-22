import { Metadata } from 'next';
import CompressorClient from './CompressorClient';

export const metadata: Metadata = {
  title: 'Image Compressor — Reduce File Size Free | OpticShift Pro',
  description: 'Compress JPG and PNG images online for free. Reduce file size up to 90% without losing quality. 100% browser-based, no upload needed.',
  keywords: 'image compressor, compress image online, reduce image size, jpg compressor, png compressor, free image compressor',
  openGraph: {
    title: 'Image Compressor — Reduce File Size Free',
    description: 'Compress images up to 90% smaller without quality loss. Free, private, browser-based.',
    type: 'website',
  },
};

export default function CompressorPage() {
  return <CompressorClient />;
}
