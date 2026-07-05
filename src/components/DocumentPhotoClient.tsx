"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Image as ImageIcon, Crop } from "lucide-react";

export interface DocumentPhotoConfig {
  toolTitle: string;
  toolDescription: string;
  widthMM: number;
  heightMM: number;
  dpi?: number;
  maxSizeKB?: number;
  minSizeKB?: number;
  bgHint?: string;
  fileNamePrefix: string;
}

export default function DocumentPhotoClient(config: DocumentPhotoConfig) {
  const {
    toolTitle,
    toolDescription,
    widthMM,
    heightMM,
    dpi = 300,
    maxSizeKB,
    minSizeKB,
    bgHint,
    fileNamePrefix,
  } = config;

  const targetW = Math.round((widthMM / 25.4) * dpi);
  const targetH = Math.round((heightMM / 25.4) * dpi);
  const aspectRatio = targetW / targetH;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startBox, setStartBox] = useState<typeof cropBox | null>(null);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 });
  const [scale, setScale] = useState(1);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSizeKB, setResultSizeKB] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const HANDLE_SIZE = 10;

  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxW = container.clientWidth || 700;
      const maxH = 480;
      const s = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
      setScale(s);
      const dw = Math.round(img.naturalWidth * s);
      const dh = Math.round(img.naturalHeight * s);
      setImageSize({ w: dw, h: dh });

      const canvas = canvasRef.current!;
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, dw, dh);
      imgRef.current = img;

      // Initialize crop box to max size respecting the fixed aspect ratio, centered
      let bw = dw;
      let bh = bw / aspectRatio;
      if (bh > dh) {
        bh = dh;
        bw = bh * aspectRatio;
      }
      bw *= 0.9;
      bh *= 0.9;
      const bx = (dw - bw) / 2;
      const by = (dh - bh) / 2;
      setCropBox({ x: Math.round(bx), y: Math.round(by), w: Math.round(bw), h: Math.round(bh) });
      setResultUrl(null);
      setResultSizeKB(null);
    };
    img.src = imageSrc;
  }, [imageSrc, aspectRatio]);

  const getPos = (e: any) => {
    const rect = overlayRef.current!.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const hitTest = (pos: { x: number; y: number }, box: typeof cropBox) => {
    const { x, y, w, h } = box;
    const hs = HANDLE_SIZE;
    if (pos.x >= x + w - hs && pos.x <= x + w + hs && pos.y >= y + h - hs && pos.y <= y + h + hs) return "resize-se";
    if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) return "move";
    return null;
  };

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const onPointerDown = useCallback((e: any) => {
    if (!imageSrc) return;
    e.preventDefault();
    const pos = getPos(e);
    const hit = hitTest(pos, cropBox);
    if (!hit) return;
    setDragging(hit);
    setStartPos(pos);
    setStartBox({ ...cropBox });
  }, [imageSrc, cropBox]);

  const onPointerMove = useCallback((e: any) => {
    if (!dragging || !startBox) return;
    e.preventDefault();
    const pos = getPos(e);
    const dx = pos.x - startPos.x;
    const dy = pos.y - startPos.y;
    const { w: iw, h: ih } = imageSize;
    let { x, y, w, h } = startBox;
    const minSize = 40;

    if (dragging === "move") {
      x = clamp(x + dx, 0, iw - w);
      y = clamp(y + dy, 0, ih - h);
    } else if (dragging === "resize-se") {
      w = clamp(w + dx, minSize, iw - x);
      h = w / aspectRatio;
      if (y + h > ih) {
        h = ih - y;
        w = h * aspectRatio;
      }
    }

    setCropBox({ x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
  }, [dragging, startPos, startBox, imageSize, aspectRatio]);

  const onPointerUp = useCallback(() => {
    setDragging(null);
    setStartBox(null);
  }, []);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const compressToTarget = (canvas: HTMLCanvasElement, maxKB: number): string => {
    let quality = 0.92;
    let dataUrl = canvas.toDataURL("image/jpeg", quality);
    let sizeKB = (dataUrl.length * 0.75) / 1024;

    while (sizeKB > maxKB && quality > 0.3) {
      quality -= 0.05;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      sizeKB = (dataUrl.length * 0.75) / 1024;
    }
    return dataUrl;
  };

  const generatePhoto = () => {
    if (!imgRef.current) return;
    setProcessing(true);

    setTimeout(() => {
      const out = document.createElement("canvas");
      out.width = targetW;
      out.height = targetH;
      const ctx = out.getContext("2d")!;
      const { x, y, w, h } = cropBox;
      const s = scale;
      ctx.drawImage(imgRef.current!, x / s, y / s, w / s, h / s, 0, 0, targetW, targetH);

      let finalUrl: string;
      if (maxSizeKB) {
        finalUrl = compressToTarget(out, maxSizeKB);
      } else {
        finalUrl = out.toDataURL("image/jpeg", 0.92);
      }
      const sizeKB = Math.round((finalUrl.length * 0.75) / 1024);

      setResultUrl(finalUrl);
      setResultSizeKB(sizeKB);
      setProcessing(false);
    }, 50);
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileNamePrefix}_${targetW}x${targetH}.jpg`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setResultUrl(null);
    setResultSizeKB(null);
  };

  const getCursor = () => {
    if (!imageSrc) return "default";
    return dragging ? "grabbing" : "crosshair";
  };

  return (
    <ImageToolLayout title={toolTitle} description={toolDescription}>
      <div className="space-y-6">
        {/* Spec Summary */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-xs">
            📐 Size: <strong>{widthMM}mm × {heightMM}mm</strong>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-xs">
            🖥️ Pixels: <strong>{targetW} × {targetH}px</strong> @ {dpi} DPI
          </div>
          {maxSizeKB && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-xs">
              📦 Max size: <strong>{maxSizeKB}KB</strong>
            </div>
          )}
        </div>

        {bgHint && (
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            💡 {bgHint}
          </div>
        )}

        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ImageIcon size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your photo here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Crop size={16} />
              Drag to position, resize the corner handle to crop (ratio locked to {widthMM}:{heightMM})
            </div>

            {/* Canvas */}
            <div className="overflow-x-auto">
              <div className="relative inline-block max-w-full" ref={containerRef}>
                <canvas ref={canvasRef} className="block max-w-full rounded-lg border" />
                <div
                  ref={overlayRef}
                  className="absolute inset-0"
                  style={{ cursor: getCursor() }}
                  onMouseDown={onPointerDown}
                  onMouseMove={onPointerMove}
                  onMouseUp={onPointerUp}
                  onMouseLeave={onPointerUp}
                  onTouchStart={onPointerDown}
                  onTouchMove={onPointerMove}
                  onTouchEnd={onPointerUp}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <mask id="docCropMask">
                        <rect width="100%" height="100%" fill="white" />
                        <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="black" />
                      </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#docCropMask)" />
                    <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <rect
                      x={cropBox.x + cropBox.w - HANDLE_SIZE / 2}
                      y={cropBox.y + cropBox.h - HANDLE_SIZE / 2}
                      width={HANDLE_SIZE}
                      height={HANDLE_SIZE}
                      fill="hsl(var(--primary))"
                      rx={2}
                      style={{ pointerEvents: "all", cursor: "nwse-resize" }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button onClick={generatePhoto} disabled={processing} className="shadow-lg shadow-primary/20">
                {processing ? "Processing..." : `Generate ${widthMM}×${heightMM}mm Photo`}
              </Button>
              {resultUrl && (
                <Button variant="secondary" onClick={download}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Result */}
            {resultUrl && (
              <div className="bg-muted/30 border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                <img src={resultUrl} alt="Result" className="rounded-lg border max-h-[200px]" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-green-600 dark:text-green-400">✅ Ready to download</p>
                  <p className="text-muted-foreground">Dimensions: {targetW} × {targetH}px</p>
                  {resultSizeKB && <p className="text-muted-foreground">File size: {resultSizeKB} KB</p>}
                  {minSizeKB && resultSizeKB && resultSizeKB < minSizeKB && (
                    <p className="text-amber-600 dark:text-amber-400">⚠️ Below minimum recommended size ({minSizeKB}KB)</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "📏", title: "Exact Specs", desc: `${widthMM}×${heightMM}mm official size` },
              { icon: "📱", title: "Mobile Ready", desc: "Works on any device" },
              { icon: "🆓", title: "Completely Free", desc: "No limits, no payment" },
            ].map((f) => (
              <div key={f.title} className="bg-muted/30 border rounded-xl p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="font-semibold text-sm mb-1">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
