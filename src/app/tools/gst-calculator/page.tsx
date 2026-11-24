import GstCalculatorClient from './GstCalculatorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'GST Calculator – Add or Remove GST Online | OLD TOOLS',
  description: 'Free GST calculator for India. Add GST to a price or remove GST from a GST-inclusive amount. Calculate the total GST and CGST/SGST split instantly.',
  keywords: 'gst calculator, gst calculator online, add gst calculator, remove gst calculator, gst inclusive calculator, reverse gst calculator, cgst sgst calculator',
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
            url: 'https://oldtools.online/tools/gst-calculator',
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