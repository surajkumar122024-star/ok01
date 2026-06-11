"use client";

import React, { useState, useEffect } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { ImageDropzone } from '@/components/ImageDropzone';
import { processImage } from '@/lib/image-processing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Loader2, Link as LinkIcon, Unlink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ResizerPage() {
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
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
      img.src = URL.createObjectURL(selectedFile);
    } else {
      setProcessedBlob(null);
    }
  }, [selectedFile]);

  const handleWidthChange = (val: string) => {
    const newWidth = parseInt(val) || 0;
    setWidth(newWidth);
    if (lockAspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (val: string) => {
    const newHeight = parseInt(val) || 0;
    setHeight(newHeight);
    if (lockAspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handleResize = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const blob = await processImage(selectedFile, { width, height });
      setProcessedBlob(blob);
      toast({
        title: "Success",
        description: "Image resized successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resize image.",
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
    a.download = `resized_${selectedFile?.name || 'image'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout 
      title="Image Resizer" 
      description="Change the dimensions of your images quickly. Maintain aspect ratio or set custom sizes."
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
                <Input 
                  type="number" 
                  value={width} 
                  onChange={(e) => handleWidthChange(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (px)</label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    value={height} 
                    onChange={(e) => handleHeightChange(e.target.value)} 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className={lockAspectRatio ? "text-primary" : "text-muted-foreground"}
                    title={lockAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
                  >
                    {lockAspectRatio ? <LinkIcon size={20} /> : <Unlink size={20} />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleResize}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Preview Resize"
                )}
              </Button>
              <Button 
                className="flex-1 shadow-lg shadow-primary/20" 
                onClick={handleDownload} 
                disabled={!processedBlob || isProcessing}
              >
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