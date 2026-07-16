"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function PassportPhotoClient() {
  return (
    <DocumentPhotoClient
      toolTitle="Passport Size Photo Maker"
      toolDescription="Crop and resize your photo to the official 35mm × 45mm passport standard. No upload, 100% private."
      widthMM={35}
      heightMM={45}
      dpi={300}
      maxSizeKB={50}
      bgHint="Use a photo with a plain white or light-colored background, facing the camera directly, for best results."
      fileNamePrefix="passport_photo"
      contentSlug="passport-photo"
      aboutText="Indian passport applications through Passport Seva require a 35mm × 45mm photograph with the face covering roughly 70–80% of the frame, taken against a plain light background. Many countries use this same 35×45mm standard for passports and long-stay visas, so this crop also works for several international applications — always confirm your destination country's exact requirement first."
      faqs={[
        { q: 'Can I smile in a passport photo?', a: 'Most passport authorities, including Passport Seva, ask for a neutral expression with both eyes open and mouth closed, rather than a smile.' },
        { q: 'What if I wear glasses daily?', a: 'Many passport guidelines now discourage glasses in the photo entirely to avoid glare and reflection issues; check your local passport office\'s current rule.' },
        { q: 'How recent should the photo be?', a: 'Passport photos should typically be taken within the last 6 months and should closely resemble your current appearance.' },
      ]}
    />
  );
}
