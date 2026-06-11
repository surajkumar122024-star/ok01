"use client";

import React, { useState, useEffect } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { processImage, formatBytes } from '@/lib/image-processing';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CompressorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const blob = await processImage(selectedFile, { quality: quality / 100 });
      setProcessedBlob(blob);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to compress image.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleProcess();
    } else {
      setProcessedBlob(null);
    }
  }, [selectedFile, quality]);

  const handleDownload = () => {
    if (!processedBlob) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${selectedFile?.name || 'image'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout 
      title="Image Compressor" 
      description="Reduce image file size without losing quality. Completely browser-side processing."
    >
      <div className="space-y-8">
        <ImageDropzone 
          selectedImage={selectedFile} 
          onImageSelect={setSelectedFile} 
          onClear={() => setSelectedFile(null)} 
        />

        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4 bg-muted/50 p-6 rounded-xl border">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Compression Quality: {quality}%</label>
                <span className="text-xs text-muted-foreground">Lower quality = Smaller file size</span>
              </div>
              <Slider 
                value={[quality]} 
                onValueChange={(vals) => setQuality(vals[0])} 
                min={1} 
                max={100} 
                step={1} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Original Size</span>
                <span className="text-xl font-bold">{formatBytes(selectedFile.size)}</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">Compressed Size</span>
                <span className="text-xl font-bold text-primary">
                  {processedBlob ? formatBytes(processedBlob.size) : '...'}
                </span>
                {processedBlob && (
                  <span className="text-[10px] text-primary/70 font-medium">
                    {Math.round((1 - processedBlob.size / selectedFile.size) * 100)}% Reduction
                  </span>
                )}
              </div>
            </div>

            <Button 
              className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
              onClick={handleDownload} 
              disabled={!processedBlob || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
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