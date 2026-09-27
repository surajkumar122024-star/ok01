import SlugGeneratorClient from './SlugGeneratorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'URL Slug Generator Online — SEO Friendly | OLD TOOLS',
  description: 'Convert any text or title into a clean, SEO-friendly URL slug instantly. Free and private.',
  keywords: 'url slug generator online, convert text to slug, seo friendly url generator, generate slug from title free',
  alternates: { canonical: '/tools/slug-generator' },
}

export default function SlugGeneratorPage() {
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
            url: 'https://oldtools.online/tools/slug-generator',
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
      <SlugGeneratorClient />
      <RelatedTools tools={getRelatedTools('slug-generator')} />
    </>
  );
}