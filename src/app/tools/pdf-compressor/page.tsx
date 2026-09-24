import { Metadata } from 'next';
import PdfCompressorClient from './PdfCompressorClient';
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: 'PDF Compressor — Reduce PDF File Size Free | OpticShift Pro',
  description: 'Compress PDF file size for free, right in your browser. Best for image-heavy and scanned PDFs. No upload — your file never leaves your device.',
  keywords: 'pdf compressor, compress pdf online, reduce pdf size, shrink pdf file size, free pdf compressor',
  alternates: { canonical: '/tools/pdf-compressor' },
};

export default function PdfCompressorPage() {
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
            url: 'https://ok01.vercel.app/tools/pdf-compressor',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <PdfCompressorClient />
      <RelatedTools tools={getRelatedTools('pdf-compressor')} />
    </>
  );
}