"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Youtube, Image as ImageIcon } from "lucide-react";

export default function YoutubeThumbnailClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setPreviewSrc(null);
    };
    reader.readAsDataURL(file);
  };

  const convertToThumbnail = () => {
    if (!imageSrc) return;

    const img = new window.Image();
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

        // Center cropping logic to fit 16:9 ratio
        if (sourceAspect > targetAspect) {
          sourceWidth = img.height * targetAspect;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (sourceAspect < targetAspect) {
          sourceHeight = img.width / targetAspect;
          sourceY = (img.height - sourceHeight) / 2;
        }

        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setPreviewSrc(dataUrl);
      }
    };
  };

  const downloadThumbnail = () => {
    if (!previewSrc) return;
    const link = document.createElement("a");
    link.href = previewSrc;
    link.download = "youtube-thumbnail.jpg";
    link.click();
  };

  const reset = () => {
    setImageSrc(null);
    setPreviewSrc(null);
  };

  return (
    <ImageToolLayout
      title="YouTube Thumbnail Converter"
      description="Convert any image to the perfect 1280×720 (16:9) YouTube thumbnail ratio."
    >
      <div className="space-y-6">
        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ImageIcon size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your image here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="bg-muted/30 border rounded-xl p-4 flex flex-col items-center">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Original Image</p>
                <div className="w-full max-h-64 overflow-hidden rounded-lg flex items-center justify-center bg-muted/50">
                  <img src={imageSrc} alt="Original" className="max-w-full max-h-64 object-contain" />
                </div>
                <Button onClick={convertToThumbnail} className="w-full mt-4 shadow-lg shadow-primary/20">
                  <Youtube className="mr-2 h-4 w-4" />
                  Convert to 16:9 Ratio
                </Button>
              </div>

              {/* Preview */}
              {previewSrc && (
                <div className="bg-muted/30 border rounded-xl p-4 flex flex-col items-center">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                    ✓ YouTube Thumbnail Preview (1280×720)
                  </p>
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted/50 border border-green-500/30">
                    <img src={previewSrc} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                  </div>
                  <Button variant="secondary" onClick={downloadThumbnail} className="w-full mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Thumbnail
                  </Button>
                </div>
              )}
            </div>

            <Button variant="outline" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "📐", title: "Perfect 16:9", desc: "Standard 1280×720 YouTube size" },
              { icon: "📱", title: "Mobile Ready", desc: "Works on any device" },
              { icon: "🆓", title: "Completely Free", desc: "No limits, no payment" },
            ].map((f) => (
              <div key={f.title} className="bg-muted/30 border rounded-xl p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="font-semibold text-sm mb-1">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
