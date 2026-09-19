import JsonFormatterClient from './JsonFormatterClient'

export const metadata = {
  title: 'JSON Formatter & Validator Online — Free | OpticShift Pro',
  description: 'Format, validate, and minify JSON online for free. Instant JSON beautifier and pretty print, right in your browser.',
  keywords: 'json formatter online, json beautifier free, validate json online, minify json online, json pretty print tool',
}

export default function JsonFormatterPage() {
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
            url: 'https://ok01.vercel.app/tools/json-formatter',
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
      <JsonFormatterClient />
    </>
  );
}
