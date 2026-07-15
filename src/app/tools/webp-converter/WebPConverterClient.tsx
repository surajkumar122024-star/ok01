'use client';

import { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function WebPConverterClient() {
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
            toast({ title: "Success", description: "Image converted to WebP!" });
          }
          setIsProcessing(false);
          URL.revokeObjectURL(url);
        }, 'image/webp', 0.9);
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
    a.download = `${originalName}.webp`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="WebP Converter"
      description="Convert JPG & PNG images to WebP format. Smaller file sizes with better quality."
      content={
        <div className="space-y-8">
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Why websites are switching to WebP</h2>
            <p className="text-muted-foreground leading-relaxed">
              WebP is a modern image format built by Google that typically produces 25–35% smaller
              files than JPG or PNG at similar visual quality, which is one of the reasons Google
              PageSpeed Insights and Core Web Vitals reports often flag JPG/PNG images with a
              "serve images in next-gen formats" suggestion. Converting your images to WebP before
              uploading them to a website can noticeably improve page load speed, especially on mobile.
            </p>
          </div>
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Do all browsers support WebP?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, all major modern browsers (Chrome, Firefox, Safari, Edge) support WebP, so it's
                  safe to use on most public-facing websites today.
                </p>
              </div>
              <div>
                <p className="font-medium">Does WebP support transparency like PNG?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, WebP supports transparency (alpha channel), so images with transparent
                  backgrounds convert without losing that transparency.
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
          accept="image/png, image/jpeg, image/jpg"
        />
        {selectedFile && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Input Format</span>
                <span className="text-xl font-bold">{selectedFile.type.split('/')[1].toUpperCase()}</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">Output Format</span>
                <span className="text-xl font-bold text-primary">WEBP</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</> : "Convert to WebP"}
              </Button>
              <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleDownload} disabled={!processedBlob || isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                Download WebP
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
