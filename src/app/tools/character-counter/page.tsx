import CharacterCounterClient from './CharacterCounterClient'

export const metadata = {
  title: 'Character Counter Online — Twitter & Instagram Limits | OpticShift Pro',
  description: 'Count characters, words, sentences and reading time instantly. Check Twitter, Instagram bio and SMS character limits free.',
  keywords: 'character counter online, character count with limit, twitter character counter, instagram bio character counter, free character count checker',
}

export default function CharacterCounterPage() {
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
            url: 'https://ok01.vercel.app/tools/character-counter',
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
      <CharacterCounterClient />
    </>
  );
}
