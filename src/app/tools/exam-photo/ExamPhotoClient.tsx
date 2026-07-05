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
    />
  );
}
