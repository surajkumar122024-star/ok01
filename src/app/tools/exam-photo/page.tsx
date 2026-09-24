import { Metadata } from 'next';
import ExamPhotoClient from './ExamPhotoClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'Exam Photo Resizer (200x230px) — Free & Private | OpticShift Pro',
  description: 'Resize your photo for exam application forms online for free. Crop and resize to the common 200×230 pixel standard instantly in your browser. No upload, 100% private.',
  keywords: 'exam photo resizer, exam application photo size, 200x230 photo, ssc photo size, competitive exam photo online',
  openGraph: {
    title: 'Exam Photo Resizer (200x230px) — Free & Private',
    description: 'Resize your photo for exam application forms online for free, instantly in your browser.',
    type: 'website',
  },
  alternates: { canonical: '/tools/exam-photo' },
};

export default function ExamPhotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: metadata.title,
            description: metadata.description,
            url: 'https://ok01.vercel.app/tools/exam-photo',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <ExamPhotoClient />
      <RelatedTools tools={getRelatedTools('exam-photo')} />
    </>
  );
}