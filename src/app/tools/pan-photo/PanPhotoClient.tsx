"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function PanPhotoClient() {
  return (
    <DocumentPhotoClient
      toolTitle="PAN Card Photo Maker"
      toolDescription="Crop and resize your photo to the standard 2.5cm × 3.5cm PAN application size. No upload, 100% private."
      widthMM={25}
      heightMM={35}
      dpi={300}
      maxSizeKB={20}
      bgHint="PAN application forms typically require a recent color photo with a plain white background and a neutral expression."
      fileNamePrefix="pan_photo"
      contentSlug="pan-photo"
      aboutText="The Income Tax Department's PAN application (Form 49A for Indian citizens, Form 49AA for foreign entities) asks for a 2.5cm × 3.5cm photograph attached to the physical form, or uploaded in the same proportions for e-KYC based online applications via NSDL or UTIITSL portals. Getting the crop ratio right the first time avoids a rejected or re-submitted application."
      faqs={[
        { q: 'Does this work for both new PAN and correction applications?', a: 'Yes, the 2.5×3.5cm size applies to Form 49A/49AA for new PAN cards as well as PAN correction/update requests.' },
        { q: 'Is a colour photo required?', a: 'Yes, PAN applications require a recent colour photograph; black-and-white photos are typically rejected.' },
        { q: 'Can I wear glasses in the photo?', a: 'Plain glasses without tinted lenses are usually accepted, but check the latest NSDL/UTIITSL guidelines since requirements can be updated.' },
      ]}
    />
  );
}
