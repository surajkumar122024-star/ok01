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
    />
  );
}
