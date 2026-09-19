import PdfSplitClient from './PdfSplitClient'

export const metadata = {
  title: 'Split PDF Pages Online Free — Extract Pages | OpticShift Pro',
  description: 'Extract or separate specific pages from a PDF online for free. No sign-up, 100% private and browser-based.',
  keywords: 'split pdf pages online free, extract pages from pdf online, pdf splitter no sign up, separate pdf pages online',
}

export default function PdfSplitPage() {
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
            url: 'https://ok01.vercel.app/tools/pdf-split',
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
      <PdfSplitClient />
    </>
  );
}
