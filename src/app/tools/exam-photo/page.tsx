import { Metadata } from 'next';
import ExamPhotoClient from './ExamPhotoClient';

export const metadata: Metadata = {
  title: 'Exam Photo Resizer (200x230px) — Free & Private | OpticShift Pro',
  description: 'Resize your photo for exam application forms online for free. Crop and resize to the common 200×230 pixel standard instantly in your browser. No upload, 100% private.',
  keywords: 'exam photo resizer, exam application photo size, 200x230 photo, ssc photo size, competitive exam photo online',
  openGraph: {
    title: 'Exam Photo Resizer (200x230px) — Free & Private',
    description: 'Resize your photo for exam application forms online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function ExamPhotoPage() {
  return <ExamPhotoClient />;
}
