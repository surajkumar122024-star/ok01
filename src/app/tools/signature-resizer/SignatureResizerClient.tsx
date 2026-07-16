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
      contentSlug="signature-resizer"
      aboutText="Online forms — bank KYC, exam applications, government portals — often ask for a scanned signature under a strict file size limit, typically 10-20KB, uploaded at a small fixed pixel size. A signature photographed on a phone is usually many times too large and needs cropping plus compression before it will pass an upload check."
      faqs={[
        { q: 'What ink color works best for scanning?', a: 'Black or dark blue ink on plain white paper gives the cleanest contrast, which helps the signature stay legible even after compression to a small file size.' },
        { q: 'Why does my form reject the signature file?', a: 'Most rejections happen because the file exceeds the maximum size limit (often 10-20KB) or doesn\'t match the required pixel dimensions — cropping tightly around the signature and downloading here usually resolves both.' },
      ]}
    />
  );
}
