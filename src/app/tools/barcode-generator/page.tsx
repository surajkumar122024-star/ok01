import BarcodeGeneratorClient from './BarcodeGeneratorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Free Barcode Generator Online — No Sign-Up — OpticShift Pro',
  description: 'Generate a scannable barcode (CODE128, EAN-13, UPC, and more) instantly in your browser. Free, no sign-up, no watermark — download as PNG or SVG.',
  keywords: 'barcode generator, free barcode generator, generate barcode online, code128 generator, ean13 barcode, upc barcode generator',
  alternates: { canonical: '/tools/barcode-generator' },
}

export default function BarcodeGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/barcode-generator',
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
      <BarcodeGeneratorClient />
      <RelatedTools tools={getRelatedTools('barcode-generator')} />
    </>
  );
}