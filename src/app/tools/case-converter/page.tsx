import CaseConverterClient from './CaseConverterClient'

export const metadata = {
  title: 'Case Converter Online — UPPERCASE, lowercase, Title Case | OpticShift Pro',
  description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more, instantly and free.',
  keywords: 'case converter online, text case converter, convert text to title case online, camelcase to snake_case converter, uppercase to lowercase converter free',
}

export default function CaseConverterPage() {
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
            url: 'https://ok01.vercel.app/tools/case-converter',
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
      <CaseConverterClient />
    </>
  );
}
