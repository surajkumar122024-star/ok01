import Base64Client from './Base64Client'

export const metadata = {
  title: 'Base64 Encoder/Decoder Online — Free & Instant | OpticShift Pro',
  description: 'Convert text to Base64 or decode Base64 back to text instantly in your browser. Free, private, no sign-up.',
  keywords: 'base64 encoder decoder online, convert text to base64 online, base64 to text converter free, encode string to base64 online',
}

export default function Base64Page() {
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
            url: 'https://ok01.vercel.app/tools/base64',
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
      <Base64Client />
    </>
  );
}
