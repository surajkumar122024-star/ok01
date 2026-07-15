"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function VisaPhotoClient() {
  return (
    <DocumentPhotoClient
      toolTitle="Visa Photo Maker"
      toolDescription="Crop and resize your photo to the standard 2×2 inch (51mm × 51mm) visa photo size. No upload, 100% private."
      widthMM={51}
      heightMM={51}
      dpi={300}
      maxSizeKB={240}
      bgHint="Most visa applications require a plain white background, neutral expression, and no glasses or headwear (unless for religious reasons)."
      fileNamePrefix="visa_photo"
      aboutText="The 2×2 inch (51mm × 51mm) square photo format is best known as the US visa and passport photo standard, but several other countries' visa applications use the same square ratio. The requirement is stricter than most ID photos: full face forward, both ears typically visible, and a plain white or off-white background with no shadows."
      faqs={[
        { q: 'Does this match the US visa photo requirement exactly?', a: 'The 2×2 inch square crop matches the US Department of State format; head size and background rules should still be checked against the current official guidance before submitting.' },
        { q: 'Can I use a photo taken on my phone?', a: 'Yes, as long as the lighting is even, the background is plain, and the phone camera resolution is high enough that the cropped square photo doesn\'t look blurry or pixelated.' },
        { q: 'What if my visa country isn\'t the US?', a: 'Some countries use different visa photo dimensions (e.g. 35×45mm), so double-check your destination country\'s embassy website before using this square format.' },
      ]}
    />
  );
}
