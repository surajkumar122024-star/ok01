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
    />
  );
}
