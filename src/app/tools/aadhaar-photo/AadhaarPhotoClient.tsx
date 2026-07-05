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
    />
  );
}
