"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, FileWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
  accept?: string;
}

export const ImageDropzone = ({ onImageSelect, selectedImage, onClear, accept = "image/png, image/jpeg, image/jpg" }: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (files && files[0] && files[0].type.startsWith('image/')) {
      onImageSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageSelect(files[0]);
    }
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
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
            <p className="text-lg font-semibold">Drop your image here</p>
            <p className="text-sm text-muted-foreground">or click to browse your files</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Supports JPG, PNG (Max 10MB recommended)
          </p>
        </div>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border bg-muted/20">
          <div className="p-4 flex items-center justify-between border-b glass">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ImageIcon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{selectedImage.name}</span>
                <span className="text-xs text-muted-foreground">{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground">
              <X size={16} />
            </Button>
          </div>
          <div className="aspect-video w-full flex items-center justify-center bg-checkered p-8">
             <img 
               src={URL.createObjectURL(selectedImage)} 
               alt="Preview" 
               className="max-w-full max-h-full object-contain rounded-md shadow-lg"
               onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
             />
          </div>
        </div>
      )}
    </div>
  );
};