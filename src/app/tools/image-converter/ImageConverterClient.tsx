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

async function drawToCanvas(source: CanvasImageSource, width: number, height: number): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas isn't supported on this device.");
  ctx.drawImage(source, 0, 0, width, height);
  return canvas;
}

/**
 * Load a File into a canvas, trying several methods in order so that one
 * method failing (which happens intermittently on some mobile browsers —
 * Data Saver modes, certain Android WebViews, memory pressure) doesn't
 * break the whole tool:
 *   1. createImageBitmap(file) — the modern, direct way to decode an
 *      image file without FileReader or object URLs at all.
 *   2. FileReader → data URL → <img> — works almost everywhere.
 *   3. URL.createObjectURL(file) → <img> — last resort.
 */
async function loadCanvasFromFile(file: File): Promise<HTMLCanvasElement> {
  const errors: string[] = [];

  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      const canvas = await drawToCanvas(bitmap, bitmap.width, bitmap.height);
      bitmap.close();
      return canvas;
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "createImageBitmap failed");
    }
  }

  try {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(file);
    });
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image failed to load from data URL"));
      img.src = dataUrl;
    });
    return await drawToCanvas(img, img.naturalWidth || img.width, img.naturalHeight || img.height);
  } catch (e) {
    errors.push(e instanceof Error ? e.message : "FileReader path failed");
  }

  try {
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image failed to load from object URL"));
        img.src = objectUrl;
      });
      return await drawToCanvas(img, img.naturalWidth || img.width, img.naturalHeight || img.height);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch (e) {
    errors.push(e instanceof Error ? e.message : "Object URL path failed");
  }

  throw new Error(
    `Couldn't read this image on your device. Please try a different photo or browser. (${errors.join("; ")})`
  );
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
      const canvas = await loadCanvasFromFile(selectedFile);
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
