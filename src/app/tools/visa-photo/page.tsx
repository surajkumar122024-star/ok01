import { Metadata } from 'next';
import VisaPhotoClient from './VisaPhotoClient';

export const metadata: Metadata = {
  title: 'Visa Photo Maker (2x2 inch) — Free & Private | OpticShift Pro',
  description: 'Create a visa photo online for free. Crop and resize to the standard 2x2 inch (51mm × 51mm) visa photo size instantly in your browser. No upload, 100% private.',
  keywords: 'visa photo maker, visa photo online, 2x2 visa photo, US visa photo size, visa photo online free',
  openGraph: {
    title: 'Visa Photo Maker (2x2 inch) — Free & Private',
    description: 'Create a visa photo online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function VisaPhotoPage() {
  return <VisaPhotoClient />;
}
