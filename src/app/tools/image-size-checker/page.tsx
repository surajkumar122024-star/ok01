import ImageSizeCheckerClient from './ImageSizeCheckerClient'

export const metadata = {
  title: 'Image Size Checker Online — Dimensions & File Size | OpticShift Pro',
  description: 'Check an image\'s dimensions, file size, aspect ratio and social media compatibility online for free, instantly.',
  keywords: 'check image dimensions online, image file size checker free, image resolution checker online, check image aspect ratio online',
}

export default function ImageSizeCheckerPage() {
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
            url: 'https://ok01.vercel.app/tools/image-size-checker',
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
      <ImageSizeCheckerClient />
    </>
  );
}
