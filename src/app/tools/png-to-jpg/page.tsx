"use client";

import React, { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { processImage } from '@/lib/image-processing';
import { Button } from '@/components/ui/button';
import { Download, Loader2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PngToJpgPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const blob = await processImage(selectedFile, { format: 'image/jpeg', quality: 0.9 });
      setProcessedBlob(blob);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to convert image.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFile?.name.split('.')[0] || 'image'}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout 
      title="PNG to JPG Converter" 
      description="Convert your PNG files to JPG format. Reduce file size and improve compatibility across all devices."
    >
      <div className="space-y-8">
        <ImageDropzone 
          selectedImage={selectedFile} 
          onImageSelect={setSelectedFile} 
          onClear={() => {
            setSelectedFile(null);
            setProcessedBlob(null);
          }} 
          accept="image/png"
        />

        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center gap-8 py-8 px-4 bg-muted/30 rounded-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground mb-1">PNG</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground/50">Source</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ArrowRightLeft size={32} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">JPG</div>
                <div className="text-xs uppercase tracking-widest text-primary/50">Target</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                className="flex-1 h-12"
                onClick={handleConvert}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Start Conversion"
                )}
              </Button>
              <Button 
                className="flex-1 h-12 shadow-lg shadow-primary/20" 
                onClick={handleDownload} 
                disabled={!processedBlob || isProcessing}
              >
                <Download className="mr-2 h-5 w-5" />
                Download JPG
              </Button>
            </div>

            {processedBlob && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <p className="text-sm text-primary font-medium">
                  Conversion complete. JPG optimization is applied at 90% quality.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}