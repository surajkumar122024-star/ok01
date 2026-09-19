import InterestCalculatorClient from './InterestCalculatorClient'

export const metadata = {
  title: 'Free Simple & Compound Interest Calculator — OpticShift Pro',
  description: 'Calculate simple or compound interest on savings or a loan. See total interest and final amount instantly. Free, no sign-up.',
  keywords: 'interest calculator, simple interest calculator, compound interest calculator, savings interest calculator, interest rate calculator',
}

export default function InterestCalculatorPage() {
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
            url: 'https://ok01.vercel.app/tools/interest-calculator',
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
      <InterestCalculatorClient />
    </>
  );
}
