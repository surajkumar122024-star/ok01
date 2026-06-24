"use client";

import React, { useState, useRef } from "react";

export default function ThumbnailConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. File Upload Handle karein
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setPreviewSrc(null); // Purana preview clear karein
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Image ko 16:9 (YouTube Thumbnail) me Convert aur Crop karein
  const convertToThumbnail = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // YouTube Thumbnail Standard Resolution: 1280x720 (16:9)
      const targetWidth = 1280;
      const targetHeight = 720;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (ctx) {
        const sourceAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = img.width;
        let sourceHeight = img.height;

        // Center cropping logic (16:9 ratio fit karne ke liye)
        if (sourceAspect > targetAspect) {
          // Image zyada wide hai, sides crop karein
          sourceWidth = img.height * targetAspect;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (sourceAspect < targetAspect) {
          // Image zyada tall hai, top/bottom crop karein
          sourceHeight = img.width / targetAspect;
          sourceY = (img.height - sourceHeight) / 2;
        }

        // Canvas par draw karein
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // Preview generate karein
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setPreviewSrc(dataUrl);
      }
    };
  };

  // 3. Converted Image ko Download karein
  const downloadThumbnail = () => {
    if (!previewSrc) return;
    const link = document.createElement("a");
    link.href = previewSrc;
    link.download = "youtube-thumbnail.jpg";
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-md my-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-amber-500">
        YouTube Thumbnail Ratio Converter (16:9)
      </h1>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-6 bg-slate-800 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition mb-2"
        >
          Choose Image
        </button>
        <p className="text-sm text-slate-400">PNG, JPG, WEBP up to 10MB</p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image Preview */}
        {imageSrc && (
          <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-md font-semibold mb-2 text-slate-300">Original Image</h3>
            <div className="w-full max-h-64 overflow-hidden rounded flex items-center justify-center bg-slate-950">
              <img src={imageSrc} alt="Original" className="max-w-full max-h-64 object-contain" />
            </div>
            <button
              onClick={convertToThumbnail}
              className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded transition"
            >
              Convert to 16:9 Ratio
            </button>
          </div>
        )}

        {/* Converted YT Thumbnail Preview */}
        {previewSrc && (
          <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-md font-semibold mb-2 text-green-400">✓ YT Thumbnail Preview (1280x720)</h3>
            <div className="w-full aspect-video rounded overflow-hidden bg-slate-950 border border-green-500/30">
              <img src={previewSrc} alt="Thumbnail Preview" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={downloadThumbnail}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Download Thumbnail
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
