"use client";

import DocumentPhotoClient from "@/components/DocumentPhotoClient";

export default function ExamPhotoClient() {
  return (
    <DocumentPhotoClient
      toolTitle="Exam Photo Resizer"
      toolDescription="Crop and resize your photo to the common 200×230 pixel size used by many competitive exam application forms. No upload, 100% private."
      widthMM={16.93}
      heightMM={19.49}
      dpi={300}
      maxSizeKB={50}
      minSizeKB={20}
      bgHint="Exam photo requirements vary by exam (SSC, Railway, Banking, UPSC, etc.). This tool uses a common 200×230px, 20–50KB standard — always double-check your specific exam's official notification before submitting."
      fileNamePrefix="exam_photo"
      contentSlug="exam-photo"
      aboutText="Competitive exam application portals — SSC, IBPS, Railways, and many state-level boards — commonly ask for a photo around 200×230 pixels with a file size between 20KB and 50KB, small enough to keep upload forms fast. Because exact pixel dimensions and size limits vary by exam, treat the numbers here as a solid starting point and cross-check them against your specific exam notification before uploading."
      faqs={[
        { q: 'Why do exam forms have such strict file size limits?', a: 'Government exam portals are built to handle thousands of simultaneous applicants, so small, compressed photo files (typically 20-50KB) keep the upload servers from getting overloaded.' },
        { q: 'What if my exam asks for a different pixel size?', a: 'Use this tool to get close to the right proportions, then check the specific exam\'s notification PDF for exact width, height, and file size limits, since these differ between SSC, Railways, banking exams, and state boards.' },
        { q: 'Should the photo be recent?', a: 'Yes — most exam boards require a photo taken within the last few months so it matches your appearance at the exam center for identity verification.' },
      ]}
    />
  );
}
