import AiContentDetectorClient from './AiContentDetectorClient'

export const metadata = {
  title: 'Free AI Content Detector Online — OpticShift Pro',
  description: 'Check text for common signs of AI-generated writing — sentence uniformity, repetitive phrasing, and typical AI transition words. Free, instant, no sign-up.',
  keywords: 'ai content detector, ai text detector, detect ai writing, chatgpt detector, ai generated text checker',
}

export default function AiContentDetectorPage() {
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
            url: 'https://ok01.vercel.app/tools/ai-content-detector',
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
      <AiContentDetectorClient />
    </>
  );
}
