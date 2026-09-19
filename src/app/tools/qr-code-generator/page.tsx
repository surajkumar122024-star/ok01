import QrCodeGeneratorClient from './QrCodeGeneratorClient'

export const metadata = {
  title: 'Free QR Code Generator Online — No Sign-Up — OpticShift Pro',
  description: 'Create a free QR code for a URL, text, Wi-Fi, or contact info instantly in your browser. No sign-up, no watermark, no expiry — download as PNG or SVG.',
  keywords: 'qr code generator, free qr code generator, qr code maker, generate qr code online, wifi qr code generator, url qr code',
}

export default function QrCodeGeneratorPage() {
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
            url: 'https://ok01.vercel.app/tools/qr-code-generator',
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
      <QrCodeGeneratorClient />
    </>
  );
}
