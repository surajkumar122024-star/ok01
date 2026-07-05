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
    />
  );
}
