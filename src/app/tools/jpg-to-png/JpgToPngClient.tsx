"use client";

import React, { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function JpgToPngClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const url = URL.createObjectURL(selectedFile);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setProcessedBlob(blob);
            toast({ title: "Success", description: "Image converted to PNG!" });
          }
          setIsProcessing(false);
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      img.onerror = () => { setIsProcessing(false); URL.revokeObjectURL(url); };
      img.src = url;
    } catch (err) {
      toast({ title: "Error", description: "Failed to convert image.", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    const originalName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image';
    a.download = `${originalName}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="JPG to PNG Converter"
      description="Convert JPG images to lossless PNG format instantly. 100% browser-based, no upload."
      content={
        <div className="space-y-8">
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">When you actually need PNG instead of JPG</h2>
            <p className="text-muted-foreground leading-relaxed">
              JPG compresses photos well but discards fine detail every time the file is re-saved, and
              it can't handle transparent backgrounds. Converting to PNG is useful before editing an
              image multiple times (PNG doesn't lose quality on re-save), before placing a logo or
              graphic over a colored background, or when a design tool specifically requires a PNG
              upload. The conversion below simply repaints your JPG pixel-for-pixel into the PNG format
              without any recompression artifacts.
            </p>
          </div>

          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Will converting JPG to PNG add transparency?</p>
                <p className="text-muted-foreground leading-relaxed">
                  No — a JPG has no transparency data to begin with, so the PNG output will still have
                  a solid background. To remove a background you'd need a dedicated background-removal step.
                </p>
              </div>
              <div>
                <p className="font-medium">Why is my PNG file bigger than the original JPG?</p>
                <p className="text-muted-foreground leading-relaxed">
                  PNG uses lossless compression, which typically produces larger files than JPG's lossy
                  compression, especially for photos with lots of color detail. This is expected and
                  not a bug.
                </p>
              </div>
              <div>
                <p className="font-medium">Is any image quality lost in this conversion?</p>
                <p className="text-muted-foreground leading-relaxed">
                  No additional quality is lost during the JPG-to-PNG conversion itself — the tool
                  copies the existing pixel data into the new format as-is.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <ImageDropzone
          selectedImage={selectedFile}
          onImageSelect={(file) => { setSelectedFile(file); setProcessedBlob(null); }}
          onClear={() => { setSelectedFile(null); setProcessedBlob(null); }}
          accept="image/jpeg, image/jpg"
        />
        {selectedFile && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Input Format</span>
                <span className="text-xl font-bold">JPG</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">Output Format</span>
                <span className="text-xl font-bold text-primary">PNG</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</> : "Convert to PNG"}
              </Button>
              <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleDownload} disabled={!processedBlob || isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
            </div>
            {processedBlob && (
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">✅ Converted successfully!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
