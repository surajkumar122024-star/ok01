"use client";

import React, { useState, useEffect } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { processImage } from '@/lib/image-processing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Loader2, Link as LinkIcon, Unlink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ResizerClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    } else {
      setProcessedBlob(null);
    }
  }, [selectedFile]);

  const handleWidthChange = (val: string) => {
    const newWidth = parseInt(val) || 0;
    setWidth(newWidth);
    if (lockAspectRatio) setHeight(Math.round(newWidth / aspectRatio));
  };

  const handleHeightChange = (val: string) => {
    const newHeight = parseInt(val) || 0;
    setHeight(newHeight);
    if (lockAspectRatio) setWidth(Math.round(newHeight * aspectRatio));
  };

  const handleResize = async () => {
    if (!selectedFile) return;
    if (!width || !height || width <= 0 || height <= 0) {
      toast({ title: "Error", description: "Please enter a valid width and height before resizing.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    try {
      const blob = await processImage(selectedFile, { width, height });
      setProcessedBlob(blob);
      toast({ title: "Success", description: "Image resized successfully." });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Failed to resize image.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized_${selectedFile?.name || 'image'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="Image Resizer"
      description="Change the dimensions of your images quickly. Maintain aspect ratio or set custom sizes."
      content={
        <div className="space-y-8">
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Resize images without stretching or distortion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uploading a photo to a website, contest, or social platform often fails silently because
              the file is larger than the platform's pixel limit. This resizer reads your image's exact
              width and height, then lets you type a new size while the aspect-ratio lock keeps the
              proportions correct — so a resized photo never comes out squashed or stretched. Unlock the
              ratio if you deliberately need a non-proportional size, like a banner or thumbnail crop.
            </p>
          </div>

          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Typical resize targets</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="bg-muted/50 rounded-lg p-3"><span className="font-medium text-foreground">1080 × 1080px</span> — Instagram square post</li>
              <li className="bg-muted/50 rounded-lg p-3"><span className="font-medium text-foreground">1200 × 630px</span> — Website link preview / Open Graph image</li>
              <li className="bg-muted/50 rounded-lg p-3"><span className="font-medium text-foreground">1920 × 1080px</span> — Desktop wallpaper or presentation slide</li>
              <li className="bg-muted/50 rounded-lg p-3"><span className="font-medium text-foreground">800 × 800px</span> — E-commerce product listing</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Will resizing reduce my image quality?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Reducing size (downscaling) rarely causes visible quality loss. Enlarging a small image
                  significantly can make it look soft or blurry, since no new detail is created.
                </p>
              </div>
              <div>
                <p className="font-medium">What happens if I turn off the aspect ratio lock?</p>
                <p className="text-muted-foreground leading-relaxed">
                  You can set width and height independently, but the image may look stretched or
                  squeezed if the new ratio is very different from the original.
                </p>
              </div>
              <div>
                <p className="font-medium">Does this tool upload my photo anywhere?</p>
                <p className="text-muted-foreground leading-relaxed">
                  No — resizing happens locally in your browser, so the original file never leaves your device.
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
          onImageSelect={setSelectedFile}
          onClear={() => setSelectedFile(null)}
        />
        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border">
              <div className="space-y-2">
                <label className="text-sm font-medium">Width (px)</label>
                <Input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (px)</label>
                <div className="flex items-center gap-2">
                  <Input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} />
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className={lockAspectRatio ? "text-primary" : "text-muted-foreground"}
                  >
                    {lockAspectRatio ? <LinkIcon size={20} /> : <Unlink size={20} />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleResize} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Preview Resize"}
              </Button>
              <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleDownload} disabled={!processedBlob || isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                Download Resized Image
              </Button>
            </div>
            {processedBlob && (
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  Image ready at {width}x{height} pixels.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
