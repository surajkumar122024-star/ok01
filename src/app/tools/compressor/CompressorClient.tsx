"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { formatBytes, loadImageFromFile, canvasToBlob } from '@/lib/image-processing';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

const MAX_PIXELS = 40_000_000; // beyond this, mobile canvases usually fail

export default function CompressorClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [debouncedQuality, setDebouncedQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  // Decoded image is kept here so moving the slider never re-reads/decodes the file.
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageReady, setImageReady] = useState(false);
  // Used to ignore results of older (slower) compressions.
  const runIdRef = useRef(0);

  // 1) Decode the image ONCE when a file is selected.
  useEffect(() => {
    imageRef.current = null;
    setImageReady(false);
    setProcessedBlob(null);
    if (!selectedFile) return;

    let cancelled = false;
    setIsProcessing(true);
    loadImageFromFile(selectedFile)
      .then((img) => {
        if (cancelled) return;
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) throw new Error('Could not read the image dimensions on this device.');
        if (w * h > MAX_PIXELS) throw new Error('This image is too large for your device. Try a smaller image.');
        imageRef.current = img;
        setImageReady(true);
      })
      .catch((error) => {
        if (cancelled) return;
        setIsProcessing(false);
        toast({
          title: "Could not open image",
          description: error instanceof Error ? error.message : "Try a different image.",
          variant: "destructive",
        });
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  // 2) Debounce the slider so we don't re-encode on every pixel of drag.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuality(quality), 300);
    return () => clearTimeout(t);
  }, [quality]);

  // 3) Compress using the already-decoded image.
  useEffect(() => {
    const img = imageRef.current;
    if (!selectedFile || !img || !imageReady) return;

    const runId = ++runIdRef.current;
    setIsProcessing(true);

    (async () => {
      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Your browser could not create an image canvas.');

        // JPEG has no transparency: fill white so transparent PNGs don't turn black.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const blob = await canvasToBlob(canvas, 'image/jpeg', debouncedQuality / 100);
        if (runId !== runIdRef.current) return; // a newer run exists, drop this result
        if (!blob || blob.size === 0) throw new Error('The browser could not create the compressed image.');
        setProcessedBlob(blob);
      } catch (error) {
        if (runId !== runIdRef.current) return;
        toast({
          title: "Compression failed",
          description: error instanceof Error
            ? error.message
            : "The image could not be compressed on this device. Try a smaller image.",
          variant: "destructive",
        });
      } finally {
        if (runId === runIdRef.current) setIsProcessing(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageReady, debouncedQuality, selectedFile]);

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const baseName = (selectedFile?.name || 'image').replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${baseName}.jpg`; // output is always JPEG
    document.body.appendChild(a); // needed for some mobile browsers
    a.click();
    document.body.removeChild(a);
    // Revoking immediately cancels the download on many mobile browsers.
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const reduction = processedBlob && selectedFile
    ? Math.round((1 - processedBlob.size / selectedFile.size) * 100)
    : null;

  return (
    <ImageToolLayout
      title="Image Compressor"
      description="Reduce image file size without losing quality. Completely browser-side processing."
      content={<ToolContentSection data={toolContent["compressor"]} />}
    >
      <div className="space-y-6">
        <ImageDropzone
          selectedImage={selectedFile}
          onImageSelect={setSelectedFile}
          onClear={() => setSelectedFile(null)}
        />

        {selectedFile && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3 bg-muted/50 p-4 sm:p-6 rounded-xl border">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <label className="text-sm font-medium">Compression Quality: {quality}%</label>
                <span className="text-xs text-muted-foreground">Lower quality = Smaller file size</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(vals) => setQuality(vals[0])}
                min={1}
                max={100}
                step={1}
                className="touch-none py-2"
              />
            </div>

            {/* Always 2 columns so both size cards + result fit on a phone screen */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 sm:p-4 rounded-lg bg-muted flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-xs text-muted-foreground mb-1 uppercase tracking-wider">Original Size</span>
                <span className="text-base sm:text-xl font-bold">{formatBytes(selectedFile.size)}</span>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-xs text-primary mb-1 uppercase tracking-wider">Compressed Size</span>
                <span className="text-base sm:text-xl font-bold text-primary">
                  {processedBlob ? formatBytes(processedBlob.size) : '...'}
                </span>
                {reduction !== null && (
                  <span className="text-[10px] text-primary/70 font-medium">
                    {reduction > 0 ? `${reduction}% Reduction` : 'Already well optimised'}
                  </span>
                )}
              </div>
            </div>

            <Button
              className="w-full h-12 text-base sm:text-lg shadow-lg shadow-primary/20"
              onClick={handleDownload}
              disabled={!processedBlob}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download Compressed Image
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
