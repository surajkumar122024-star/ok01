import EmiCalculatorClient from './EmiCalculatorClient'

export const metadata = {
  title: 'Free EMI Calculator Online — Home, Car & Personal Loan — OpticShift Pro',
  description: 'Calculate your monthly EMI, total interest, and total payment for a home, car, or personal loan. Free, instant, no sign-up.',
  keywords: 'emi calculator, loan emi calculator, home loan emi calculator, car loan emi calculator, personal loan emi, monthly installment calculator',
}

export default function EmiCalculatorPage() {
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
            url: 'https://ok01.vercel.app/tools/emi-calculator',
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
      <EmiCalculatorClient />
    </>
  );
}
