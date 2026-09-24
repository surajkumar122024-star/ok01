import TextRepeaterClient from './TextRepeaterClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Text Repeater Online — Repeat Text Free | OpticShift Pro',
  description: 'Repeat any word, sentence, or text any number of times with a custom separator. Free and instant.',
  keywords: 'text repeater online, repeat text free, duplicate text generator, copy paste text multiple times tool',
  alternates: { canonical: '/tools/text-repeater' },
}

export default function TextRepeaterPage() {
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
            url: 'https://ok01.vercel.app/tools/text-repeater',
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
      <TextRepeaterClient />
      <RelatedTools tools={getRelatedTools('text-repeater')} />
    </>
  );
}