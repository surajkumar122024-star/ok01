import { Metadata } from 'next';
import AadhaarPhotoClient from './AadhaarPhotoClient';

export const metadata: Metadata = {
  title: 'Aadhaar Card Photo Maker — Free & Private | OpticShift Pro',
  description: 'Create an Aadhaar card size photo online for free. Crop and resize to the standard 3.5cm × 4.5cm size instantly in your browser. No upload, 100% private.',
  keywords: 'aadhaar photo size, aadhaar card photo maker, aadhaar photo online, aadhaar enrollment photo, 3.5x4.5 photo size',
  openGraph: {
    title: 'Aadhaar Card Photo Maker — Free & Private',
    description: 'Create an Aadhaar card size photo online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function AadhaarPhotoPage() {
  return <AadhaarPhotoClient />;
}
