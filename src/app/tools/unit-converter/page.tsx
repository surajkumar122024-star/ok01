import UnitConverterClient from './UnitConverterClient'

export const metadata = {
  title: 'Unit Converter Online — Length, Weight, Temperature & More | OpticShift Pro',
  description: 'Convert length, weight, temperature, area, volume, speed, data storage and time online for free. No uploads, instant results.',
  keywords: 'unit converter online free, metric to imperial converter, online measurement converter, convert length weight temperature online',
  alternates: { canonical: '/tools/unit-converter' },
}

export default function UnitConverterPage() {
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
            url: 'https://ok01.vercel.app/tools/unit-converter',
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
      <UnitConverterClient />
    </>
  );
}