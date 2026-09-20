"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface VideoDropzoneProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
  onClear: () => void;
  accept?: string;
}

export const VideoDropzone = ({
  onVideoSelect,
  selectedVideo,
  onClear,
  accept = "video/mp4, video/quicktime, video/webm, video/x-matroska, video/*",
}: VideoDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedVideo) {
      // Object URLs are fine here (unlike the image tools' mobile blob:
      // bug) because <video src> playback of blob: URLs is broadly
      // supported — the earlier issue was specifically with canvas
      // reading blob: URLs on some mobile browsers.
      const url = URL.createObjectURL(selectedVideo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedVideo]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('video/')) {
      onVideoSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onVideoSelect(files[0]);
    }
  };

  return (
    <div className="w-full">
      {!selectedVideo ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300",
            isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={accept}
            className="hidden"
          />
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Drop your video here</p>
            <p className="text-sm text-muted-foreground">or click to browse your files</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Supports MP4, MOV, WebM, MKV — processed entirely on your device
          </p>
        </div>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border bg-muted/20">
          <div className="p-4 flex items-center justify-between border-b glass">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileVideo size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{selectedVideo.name}</span>
                <span className="text-xs text-muted-foreground">{(selectedVideo.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClear} aria-label="Remove video" className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground">
              <X size={16} />
            </Button>
          </div>
          <div className="aspect-video w-full flex items-center justify-center bg-black">
            {previewUrl && (
              <video
                src={previewUrl}
                controls
                className="max-w-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
