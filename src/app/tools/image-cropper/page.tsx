import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';

export const metadata: Metadata = {
  title: 'Image Cropper — Free & Private | OpticShift Pro',
  description: 'Crop images instantly in your browser with precision. Free aspect ratio presets, no upload required, 100% private.',
  keywords: 'image cropper, crop image online, free image cropper, crop photo, aspect ratio cropper',
  openGraph: {
    title: 'Image Cropper — Free & Private',
    description: 'Crop images instantly in your browser. No upload, 100% private.',
    type: 'website',
  },
};

export default function ImageCropperPage() {
  return <ImageCropperClient />;
}
