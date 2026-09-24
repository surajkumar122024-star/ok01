import GstCalculatorClient from './GstCalculatorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Free GST Calculator Online — Add or Remove GST — OpticShift Pro',
  description: 'Calculate GST amount, add GST to a price, or remove GST from a price — with CGST/SGST split. Free, instant, no sign-up.',
  keywords: 'gst calculator, gst calculator online, add gst, remove gst, cgst sgst calculator, gst amount calculator, reverse gst calculator',
  alternates: { canonical: '/tools/gst-calculator' },
}

export default function GstCalculatorPage() {
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
            url: 'https://ok01.vercel.app/tools/gst-calculator',
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
      <GstCalculatorClient />
      <RelatedTools tools={getRelatedTools('gst-calculator')} />
    </>
  );
}