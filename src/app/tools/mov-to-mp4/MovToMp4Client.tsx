"use client";

import React, { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { VideoDropzone } from '@/components/VideoDropzone';
import { convertToMp4, formatBytes, isLikelyTooLargeForMobile, VideoProcessingError } from '@/lib/video-processing';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function MovToMp4Client() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedBlob(null);
    setPreviewUrl(null);
    setProgress(0);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setProcessedBlob(null);
    setPreviewUrl(null);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    if (isLikelyTooLargeForMobile(selectedFile)) {
      toast({
        title: "Large file on mobile",
        description: "This file is quite large for a mobile browser — conversion may be slow or run out of memory. A desktop browser handles large files more reliably.",
      });
    }

    setIsProcessing(true);
    setProgress(0);
    try {
      const blob = await convertToMp4(selectedFile, {
        onProgress: (ratio) => setProgress(Math.round(ratio * 100)),
      });
      setProcessedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof VideoProcessingError ? err.message : "Failed to convert video.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob || !selectedFile) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}.mp4`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="MOV to MP4 Converter"
      description="Convert MOV videos to universally-playable MP4, right in your browser. Nothing is uploaded."
      content={<ToolContentSection data={toolContent["mov-to-mp4"]} />}
    >
      <div className="space-y-8">
        <VideoDropzone
          selectedVideo={selectedFile}
          onVideoSelect={handleSelect}
          onClear={handleClear}
          accept="video/quicktime, .mov, video/*"
        />

        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Original Size</span>
                <span className="text-xl font-bold">{formatBytes(selectedFile.size)}</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">MP4 Size</span>
                <span className="text-xl font-bold text-primary">
                  {processedBlob ? formatBytes(processedBlob.size) : '...'}
                </span>
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Converting…</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle size={12} />
                  Keep this tab open — processing happens on your device.
                </p>
              </div>
            )}

            {previewUrl && !isProcessing && (
              <div className="rounded-xl overflow-hidden border bg-black">
                <video src={previewUrl} controls className="w-full max-h-80" />
              </div>
            )}

            {!processedBlob ? (
              <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Converting...</>) : ("Convert to MP4")}
              </Button>
            ) : (
              <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download MP4
              </Button>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
