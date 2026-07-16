"use client";

import React, { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function PngToJpgClient() {
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
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setProcessedBlob(blob);
            toast({ title: "Success", description: "Image converted to JPG!" });
          }
          setIsProcessing(false);
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.92);
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
    a.download = `${originalName}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG format instantly. Reduce file size significantly. 100% browser-based."
      content={<ToolContentSection data={toolContent["png-to-jpg"]} />}
    >
      <div className="space-y-8">
        <ImageDropzone
          selectedImage={selectedFile}
          onImageSelect={(file) => { setSelectedFile(file); setProcessedBlob(null); }}
          onClear={() => { setSelectedFile(null); setProcessedBlob(null); }}
          accept="image/png"
        />
        {selectedFile && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Input Format</span>
                <span className="text-xl font-bold">PNG</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">Output Format</span>
                <span className="text-xl font-bold text-primary">JPG</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</> : "Convert to JPG"}
              </Button>
              <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleDownload} disabled={!processedBlob || isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                Download JPG
              </Button>
            </div>
            {processedBlob && (
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  ✅ Converted! {(processedBlob.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
