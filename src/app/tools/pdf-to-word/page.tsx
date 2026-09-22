import { Metadata } from 'next';
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = {
  title: 'PDF to Word Converter — Free Text Extraction | OpticShift Pro',
  description: 'Extract text from a PDF into an editable Word (.docx) document, free. Best for simple, text-based PDFs. No upload — processed in your browser.',
  keywords: 'pdf to word, pdf to docx, convert pdf to word online, pdf text extractor, free pdf to word converter',
};

export default function PdfToWordPage() {
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
            url: 'https://ok01.vercel.app/tools/pdf-to-word',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <PdfToWordClient />
    </>
  );
}
