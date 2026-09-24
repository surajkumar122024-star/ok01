import WordCounterClient from "./WordCounterClient";
import type { Metadata } from "next";
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata: Metadata = {
  title: "Word Counter Online Free — Count Words, Characters & Sentences | OpticShift Pro",
  description:
    "Count words, characters, sentences, paragraphs and estimate reading time online for free, instantly.",
  keywords:
    "word counter online free, count words in text online, essay word counter tool, character and word count checker",
  alternates: { canonical: '/tools/word-counter' },
};

export default function WordCounterPage() {
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
            url: 'https://ok01.vercel.app/tools/word-counter',
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
      <WordCounterClient />
      <RelatedTools tools={getRelatedTools('word-counter')} />
    </>
  );
}