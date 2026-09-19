"use client";

import { useState } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { canvasToBmpBlob, canvasToIcoBlob, canvasToGifBlob } from "@/lib/image-format-encoders";

type TargetFormat = "jpg" | "png" | "webp" | "gif" | "bmp" | "ico";

const FORMATS: { id: TargetFormat; label: string }[] = [
  { id: "jpg", label: "JPG" },
  { id: "png", label: "PNG" },
  { id: "webp", label: "WebP" },
  { id: "gif", label: "GIF" },
  { id: "bmp", label: "BMP" },
  { id: "ico", label: "ICO" },
];

const ACCEPT = "image/png, image/jpeg, image/jpg, image/webp, image/gif, image/bmp";

function detectInputLabel(file: File): string {
  const type = file.type.split("/")[1];
  if (type) return type.toUpperCase();
  const ext = file.name.split(".").pop();
  return ext ? ext.toUpperCase() : "IMAGE";
}

async function convertToFormat(canvas: HTMLCanvasElement, format: TargetFormat): Promise<Blob> {
  switch (format) {
    case "jpg":
      return new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("JPG encode failed"))), "image/jpeg", 0.92);
      });
    case "png":
      return new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))), "image/png");
      });
    case "webp":
      return new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("WebP encode failed — your browser may not support WebP export"))), "image/webp", 0.92);
      });
    case "bmp":
      return canvasToBmpBlob(canvas);
    case "ico":
      return canvasToIcoBlob(canvas);
    case "gif":
      return canvasToGifBlob(canvas);
  }
}

export default function ImageConverterClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProcessedBlob(null);

    try {
      // FileReader (data URL) rather than URL.createObjectURL — blob: URLs
      // don't load reliably on some mobile browsers (Data Saver / certain
      // Android WebViews), which silently breaks image loading.
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read the selected file."));
        reader.readAsDataURL(selectedFile);
      });

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load the selected image. The file may be corrupted or in an unsupported format."));
        img.src = dataUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas isn't supported on this device.");
      ctx.drawImage(img, 0, 0);

      const blob = await convertToFormat(canvas, targetFormat);
      setProcessedBlob(blob);
      toast({ title: "Converted!", description: `Your image is ready as ${targetFormat.toUpperCase()}.` });
    } catch (err) {
      toast({
        title: "Conversion failed",
        description: err instanceof Error ? err.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement("a");
    a.href = url;
    const originalName = selectedFile?.name.replace(/\.[^/.]+$/, "") || "image";
    a.download = `${originalName}.${targetFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="Image Format Converter"
      description="Convert between JPG, PNG, WebP, GIF, BMP, and ICO — all in your browser, no upload."
    >
      <div className="space-y-8">
        <ImageDropzone
          selectedImage={selectedFile}
          onImageSelect={(file) => {
            setSelectedFile(file);
            setProcessedBlob(null);
          }}
          onClear={() => {
            setSelectedFile(null);
            setProcessedBlob(null);
          }}
          accept={ACCEPT}
        />

        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-muted text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">From</div>
                <div className="font-bold">{detectInputLabel(selectedFile)}</div>
              </div>
              <ArrowRight className="text-muted-foreground shrink-0" size={20} />
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <div className="text-xs text-primary uppercase tracking-wider mb-0.5">To</div>
                <div className="font-bold text-primary">{targetFormat.toUpperCase()}</div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 text-center">Convert to:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setTargetFormat(f.id);
                      setProcessedBlob(null);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                      targetFormat === f.id
                        ? "border-primary bg-primary text-primary-foreground scale-105"
                        : "border-primary/20 bg-muted/40 hover:border-primary/50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  `Convert to ${targetFormat.toUpperCase()}`
                )}
              </Button>
              <Button
                className="flex-1 shadow-lg shadow-primary/20"
                onClick={handleDownload}
                disabled={!processedBlob || isProcessing}
              >
                <Download className="mr-2 h-4 w-4" />
                Download {targetFormat.toUpperCase()}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
