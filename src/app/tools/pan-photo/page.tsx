import { Metadata } from 'next';
import PanPhotoClient from './PanPhotoClient';

export const metadata: Metadata = {
  title: 'PAN Card Photo Maker — Free & Private | OpticShift Pro',
  description: 'Create a PAN card size photo online for free. Crop and resize to the standard 2.5cm × 3.5cm size instantly in your browser. No upload, 100% private.',
  keywords: 'pan card photo size, pan card photo maker, pan photo online, pan application photo, 2.5x3.5 photo size',
  openGraph: {
    title: 'PAN Card Photo Maker — Free & Private',
    description: 'Create a PAN card size photo online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function PanPhotoPage() {
  return <PanPhotoClient />;
}
