import InvoiceGeneratorClient from './InvoiceGeneratorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Free Invoice Generator Online — Download as PDF — OpticShift Pro',
  description: 'Create a professional invoice with your business details, line items, and tax, and download it as a PDF. Free, no sign-up, no watermark.',
  keywords: 'invoice generator, free invoice generator, create invoice online, invoice maker, invoice template free, download invoice pdf',
  alternates: { canonical: '/tools/invoice-generator' },
}

export default function InvoiceGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/invoice-generator',
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
      <InvoiceGeneratorClient />
      <RelatedTools tools={getRelatedTools('invoice-generator')} />
    </>
  );
}