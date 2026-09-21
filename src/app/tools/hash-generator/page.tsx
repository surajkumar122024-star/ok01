import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';

export const metadata: Metadata = {
  title: 'Hash Generator — SHA-1, SHA-256, SHA-512 Online | OpticShift Pro',
  description: 'Generate SHA-1, SHA-256, and SHA-512 hashes from text or files, instantly. 100% browser-based using the Web Crypto API — nothing is uploaded.',
  keywords: 'hash generator, sha256 online, sha1 generator, sha512 checksum, file hash calculator',
};

export default function HashGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/hash-generator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <HashGeneratorClient />
    </>
  );
}
