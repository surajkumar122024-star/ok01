import AgeCalculatorClient from './AgeCalculatorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Free Age Calculator Online — OpticShift Pro',
  description: 'Calculate your exact age in years, months, and days from your date of birth. Free, instant, no sign-up.',
  keywords: 'age calculator, date of birth calculator, calculate age online, how old am i, age in years months days',
  alternates: { canonical: '/tools/age-calculator' },
}

export default function AgeCalculatorPage() {
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
            url: 'https://ok01.vercel.app/tools/age-calculator',
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
      <AgeCalculatorClient />
      <RelatedTools tools={getRelatedTools('age-calculator')} />
    </>
  );
}