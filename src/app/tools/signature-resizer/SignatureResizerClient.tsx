"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function SignatureResizerClient() {
  return (
    <DocumentPhotoClient
      toolTitle="Signature Resizer"
      toolDescription="Crop and resize your signature to the common 140×60 pixel size used by many exam and application forms. No upload, 100% private."
      widthMM={11.85}
      heightMM={5.08}
      dpi={300}
      maxSizeKB={20}
      minSizeKB={10}
      bgHint="Sign with black or dark blue ink on plain white paper, then photograph or scan it in good lighting. Signature size requirements vary by form — check your specific application's instructions."
      fileNamePrefix="signature"
    />
  );
}
