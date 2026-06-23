import { Metadata } from 'next';
import WebPConverterClient from './WebPConverterClient';

export const metadata: Metadata = {
  title: 'WebP Converter — Convert JPG & PNG to WebP Free | OpticShift Pro',
  description: 'Convert JPG and PNG images to WebP format online for free. Smaller file sizes with better quality. 100% browser-based, no upload needed.',
  keywords: 'webp converter, jpg to webp, png to webp, convert to webp online, free webp converter',
  openGraph: {
    title: 'WebP Converter — Convert Images to WebP Free',
    description: 'Convert JPG & PNG to WebP instantly in your browser. Free, private, no upload.',
    type: 'website',
  },
};

export default function WebPConverterPage() {
  return <WebPConverterClient />;
}
