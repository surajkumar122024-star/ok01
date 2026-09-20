"use client";

import React, { useState } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { VideoDropzone } from '@/components/VideoDropzone';
import { compressVideo, formatBytes, isLikelyTooLargeForMobile, VideoProcessingError } from '@/lib/video-processing';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function VideoCompressorClient() {
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

  const handleCompress = async () => {
    if (!selectedFile) return;

    if (isLikelyTooLargeForMobile(selectedFile)) {
      toast({
        title: "Large file on mobile",
        description: "This file is quite large for a mobile browser — compression may be slow or run out of memory. A desktop browser handles large files more reliably.",
      });
    }

    setIsProcessing(true);
    setProgress(0);
    try {
      const blob = await compressVideo(selectedFile, {
        onProgress: (ratio) => setProgress(Math.round(ratio * 100)),
      });
      setProcessedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof VideoProcessingError ? err.message : "Failed to compress video.",
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
    a.download = `compressed_${baseName}.mp4`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="Video Compressor"
      description="Reduce video file size right in your browser. Nothing is uploaded — your video never leaves your device."
      content={<ToolContentSection data={toolContent["video-compressor"]} />}
    >
      <div className="space-y-8">
        <VideoDropzone
          selectedVideo={selectedFile}
          onVideoSelect={handleSelect}
          onClear={handleClear}
        />

        {selectedFile && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Compressing…</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle size={12} />
                  Keep this tab open — processing happens on your device and pauses if the tab is backgrounded on some browsers.
                </p>
              </div>
            )}

            {previewUrl && !isProcessing && (
              <div className="rounded-xl overflow-hidden border bg-black">
                <video src={previewUrl} controls className="w-full max-h-80" />
              </div>
            )}

            {!processedBlob ? (
              <Button
                className="w-full h-12 text-lg shadow-lg shadow-primary/20"
                onClick={handleCompress}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  "Compress Video"
                )}
              </Button>
            ) : (
              <Button
                className="w-full h-12 text-lg shadow-lg shadow-primary/20"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Compressed Video
              </Button>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
