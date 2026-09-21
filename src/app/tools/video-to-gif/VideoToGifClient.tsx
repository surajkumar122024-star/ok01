"use client";

import React, { useState, useEffect } from 'react';
import { ImageToolLayout } from '@/components/ImageToolLayout';
import { VideoDropzone } from '@/components/VideoDropzone';
import { convertVideoToGif, getVideoDuration, formatBytes, isLikelyTooLargeForMobile, VideoProcessingError } from '@/lib/video-processing';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

const MAX_CLIP_SECONDS = 15; // keep GIF file sizes sane

const QUALITY_PRESETS = [
  { label: 'Small (320px, 8 fps)', width: 320, fps: 8 },
  { label: 'Medium (480px, 10 fps)', width: 480, fps: 10 },
  { label: 'Large (640px, 12 fps)', width: 640, fps: 12 },
];

export default function VideoToGifClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [clipLength, setClipLength] = useState(3);
  const [qualityIndex, setQualityIndex] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedFile) {
      setVideoDuration(null);
      return;
    }
    let cancelled = false;
    getVideoDuration(selectedFile)
      .then((d) => {
        if (cancelled) return;
        setVideoDuration(d);
        setStartTime(0);
        setClipLength(Math.min(MAX_CLIP_SECONDS, d));
      })
      .catch(() => {
        if (!cancelled) {
          toast({ title: "Error", description: "Couldn't read this video's length.", variant: "destructive" });
        }
      });
    return () => { cancelled = true; };
  }, [selectedFile, toast]);

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

  const maxClipLength = videoDuration ? Math.min(MAX_CLIP_SECONDS, videoDuration - startTime) : MAX_CLIP_SECONDS;

  const handleConvert = async () => {
    if (!selectedFile) return;

    if (isLikelyTooLargeForMobile(selectedFile)) {
      toast({
        title: "Large file on mobile",
        description: "This file is quite large for a mobile browser — conversion may be slow. A desktop browser handles large files more reliably.",
      });
    }

    setIsProcessing(true);
    setProgress(0);
    try {
      const preset = QUALITY_PRESETS[qualityIndex];
      const blob = await convertVideoToGif(selectedFile, {
        startTime,
        duration: clipLength,
        width: preset.width,
        fps: preset.fps,
        onProgress: (ratio) => setProgress(Math.round(ratio * 100)),
      });
      setProcessedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof VideoProcessingError ? err.message : "Failed to create GIF.",
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
    a.download = `${baseName}.gif`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ImageToolLayout
      title="Video to GIF Converter"
      description="Turn a clip from your video into an animated GIF, right in your browser. Nothing is uploaded."
      content={<ToolContentSection data={toolContent["video-to-gif"]} />}
    >
      <div className="space-y-8">
        <VideoDropzone selectedVideo={selectedFile} onVideoSelect={handleSelect} onClear={handleClear} />

        {selectedFile && videoDuration !== null && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4 p-4 rounded-lg bg-muted/40 border">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Start time</Label>
                  <span className="text-muted-foreground">{startTime.toFixed(1)}s</span>
                </div>
                <Slider
                  value={[startTime]}
                  min={0}
                  max={Math.max(0, videoDuration - 1)}
                  step={0.1}
                  onValueChange={([v]) => {
                    setStartTime(v);
                    setClipLength((len) => Math.min(len, Math.min(MAX_CLIP_SECONDS, videoDuration - v)));
                  }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Clip length</Label>
                  <span className="text-muted-foreground">{clipLength.toFixed(1)}s (max {MAX_CLIP_SECONDS}s)</span>
                </div>
                <Slider
                  value={[clipLength]}
                  min={0.5}
                  max={Math.max(0.5, maxClipLength)}
                  step={0.1}
                  onValueChange={([v]) => setClipLength(v)}
                />
              </div>
              <div className="space-y-2">
                <Label>Quality</Label>
                <Select value={String(qualityIndex)} onValueChange={(v) => setQualityIndex(Number(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {QUALITY_PRESETS.map((p, i) => (
                      <SelectItem key={i} value={String(i)}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {processedBlob && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-xs text-primary mb-1 uppercase tracking-wider">GIF Size</span>
                <span className="text-xl font-bold text-primary">{formatBytes(processedBlob.size)}</span>
              </div>
            )}

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Creating GIF…</span>
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
              <div className="rounded-xl overflow-hidden border bg-black flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="GIF preview" className="max-w-full max-h-80" />
              </div>
            )}

            {!processedBlob ? (
              <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={handleConvert} disabled={isProcessing}>
                {isProcessing ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating GIF...</>) : ("Create GIF")}
              </Button>
            ) : (
              <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download GIF
              </Button>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
