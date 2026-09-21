import { Metadata } from 'next';
import TextToSpeechClient from './TextToSpeechClient';

export const metadata: Metadata = {
  title: 'Text to Speech — Free Online Voice Reader | OpticShift Pro',
  description: 'Convert text to speech instantly using your browser\'s built-in voices. Adjust speed and pitch, choose from available languages. Free & private.',
  keywords: 'text to speech, tts online, text to voice, read text aloud, free text to speech',
};

export default function TextToSpeechPage() {
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
            url: 'https://ok01.vercel.app/tools/text-to-speech',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <TextToSpeechClient />
    </>
  );
}
