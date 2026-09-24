import PercentageCalculatorClient from './PercentageCalculatorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Free Percentage Calculator Online — OpticShift Pro',
  description: 'Calculate percentages, percentage increase/decrease, and what percent one number is of another — free, instant, no sign-up.',
  keywords: 'percentage calculator, percent calculator, percentage increase calculator, percentage decrease calculator, discount calculator, what percent of',
  alternates: { canonical: '/tools/percentage-calculator' },
}

export default function PercentageCalculatorPage() {
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
            url: 'https://ok01.vercel.app/tools/percentage-calculator',
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
      <PercentageCalculatorClient />
      <RelatedTools tools={getRelatedTools('percentage-calculator')} />
    </>
  );
}