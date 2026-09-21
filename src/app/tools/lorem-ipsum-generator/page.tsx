import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Free Placeholder Text | OpticShift Pro',
  description: 'Generate Lorem Ipsum placeholder text — words, sentences, or paragraphs. Instant, free, and customizable for design and development mockups.',
  keywords: 'lorem ipsum generator, placeholder text generator, dummy text generator, filler text',
};

export default function LoremIpsumPage() {
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
            url: 'https://ok01.vercel.app/tools/lorem-ipsum-generator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <LoremIpsumClient />
    </>
  );
}
