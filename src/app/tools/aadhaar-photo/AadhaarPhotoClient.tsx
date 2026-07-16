"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function AadhaarPhotoClient() {
  return (
    <DocumentPhotoClient
      toolTitle="Aadhaar Card Photo Maker"
      toolDescription="Crop and resize your photo to the standard 3.5cm × 4.5cm Aadhaar enrollment/update size. No upload, 100% private."
      widthMM={35}
      heightMM={45}
      dpi={300}
      maxSizeKB={100}
      bgHint="Use a recent, clear frontal photo with a plain background for Aadhaar enrollment or update forms."
      fileNamePrefix="aadhaar_photo"
      contentSlug="aadhaar-photo"
      aboutText="UIDAI's Aadhaar enrollment and correction forms specify a 3.5cm × 4.5cm colour photograph with a plain light background and a clear, forward-facing view of the applicant's face. Photo studios often charge for a single print in this exact size, but you can crop your own photo to the correct proportions here and download a print-ready file in seconds."
      faqs={[
        { q: 'Can I use this photo for both new enrollment and Aadhaar update?', a: 'Yes, the same 3.5×4.5cm specification applies to both new Aadhaar enrollment and to update/correction forms submitted at an Aadhaar Seva Kendra.' },
        { q: 'What background works best?', a: 'A plain white or light-coloured wall works best. Avoid patterns, shadows, or other people in the frame, since enrollment centres may reject photos with a busy background.' },
        { q: 'Can I print this at home?', a: 'Yes — download the photo and print it at any photo printing shop or home printer capable of passport-size photo paper; just confirm the output size matches 3.5×4.5cm before cutting.' },
      ]}
    />
  );
}
