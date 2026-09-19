import { Metadata } from 'next';
import SignatureResizerClient from './SignatureResizerClient';

export const metadata: Metadata = {
  title: 'Signature Resizer (140x60px) — Free & Private | OpticShift Pro',
  description: 'Resize your signature for exam or application forms online for free. Crop and resize to the common 140×60 pixel standard instantly in your browser. No upload, 100% private.',
  keywords: 'signature resizer, signature size for exam, 140x60 signature, signature scan resize, signature photo size online',
  openGraph: {
    title: 'Signature Resizer (140x60px) — Free & Private',
    description: 'Resize your signature for exam or application forms online for free, instantly in your browser.',
    type: 'website',
  },
};

export default function SignatureResizerPage() {
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
            url: 'https://ok01.vercel.app/tools/signature-resizer',
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
      <SignatureResizerClient />
    </>
  );
}
