import PasswordGeneratorClient from './PasswordGeneratorClient'
import { RelatedTools } from '@/components/RelatedTools';
import { getRelatedTools } from '@/lib/related-tools';

export const metadata = {
  title: 'Strong Password Generator Online — Free & Secure | OpticShift Pro',
  description: 'Generate a strong, random password online for free. Customize length and characters. Nothing is stored, 100% private.',
  keywords: 'strong password generator online, random password generator free, secure password generator no sign up, generate password online free',
  alternates: { canonical: '/tools/password-generator' },
}

export default function PasswordGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/password-generator',
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
      <PasswordGeneratorClient />
      <RelatedTools tools={getRelatedTools('password-generator')} />
    </>
  );
}