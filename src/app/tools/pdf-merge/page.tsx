import PdfMergeClient from './PdfMergeClient'

export const metadata = {
  title: 'Merge PDF Files Online Free — No Sign-Up | OpticShift Pro',
  description: 'Combine multiple PDF files into one document online for free. No sign-up, no watermark, 100% private and browser-based.',
  keywords: 'merge pdf files online free, combine pdf files online, pdf merger no sign up, join multiple pdf into one online',
}

export default function PdfMergePage() {
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
            url: 'https://ok01.vercel.app/tools/pdf-merge',
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
      <PdfMergeClient />
    </>
  );
}
