"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Crop, Download, RefreshCw, Image as ImageIcon } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function ImageCropperClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, w: 200, h: 200 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startBox, setStartBox] = useState<typeof cropBox | null>(null);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 });
  const [aspectLock, setAspectLock] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [scale, setScale] = useState(1);

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
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const s = Math.min(1, maxW / w, maxH / h);
      setScale(s);
      const dw = Math.round(w * s);
      const dh = Math.round(h * s);
      setImageSize({ w: dw, h: dh });

      const canvas = canvasRef.current!;
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, dw, dh);
      imgRef.current = img;

      const bw = Math.round(dw * 0.6);
      const bh = Math.round(dh * 0.6);
      const bx = Math.round((dw - bw) / 2);
      const by = Math.round((dh - bh) / 2);
      setCropBox({ x: bx, y: by, w: bw, h: bh });
      setAspectRatio(bw / bh);
      setCroppedUrl(null);
    };
    img.src = imageSrc;
  }, [imageSrc]);

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
    if (pos.x >= x - hs && pos.x <= x + hs && pos.y >= y + h - hs && pos.y <= y + h + hs) return "resize-sw";
    if (pos.x >= x + w - hs && pos.x <= x + w + hs && pos.y >= y - hs && pos.y <= y + hs) return "resize-ne";
    if (pos.x >= x - hs && pos.x <= x + hs && pos.y >= y - hs && pos.y <= y + hs) return "resize-nw";
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
    const minSize = 20;

    if (dragging === "move") {
      x = clamp(x + dx, 0, iw - w);
      y = clamp(y + dy, 0, ih - h);
    } else if (dragging === "resize-se") {
      w = clamp(w + dx, minSize, iw - x);
      h = aspectLock ? w / aspectRatio : clamp(h + dy, minSize, ih - y);
      w = aspectLock ? h * aspectRatio : w;
    } else if (dragging === "resize-sw") {
      const newW = clamp(w - dx, minSize, x + w);
      x = x + w - newW;
      w = newW;
      h = aspectLock ? w / aspectRatio : clamp(h + dy, minSize, ih - y);
    } else if (dragging === "resize-ne") {
      w = clamp(w + dx, minSize, iw - x);
      const newH = clamp(h - dy, minSize, y + h);
      y = y + h - newH;
      h = aspectLock ? w / aspectRatio : newH;
    } else if (dragging === "resize-nw") {
      const newW = clamp(w - dx, minSize, x + w);
      x = x + w - newW;
      w = newW;
      const newH = clamp(h - dy, minSize, y + h);
      y = y + h - newH;
      h = aspectLock ? w / aspectRatio : newH;
    }

    setCropBox({ x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
  }, [dragging, startPos, startBox, imageSize, aspectLock, aspectRatio]);

  const onPointerUp = useCallback(() => {
    if (dragging) {
      setAspectRatio(cropBox.w / cropBox.h);
    }
    setDragging(null);
    setStartBox(null);
  }, [dragging, cropBox]);

  const getCursor = () => {
    if (!imageSrc) return "default";
    return dragging ? (dragging === "move" ? "grabbing" : "nwse-resize") : "crosshair";
  };

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
    setCroppedUrl(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const doCrop = () => {
    if (!imgRef.current) return;
    const out = document.createElement("canvas");
    const { x, y, w, h } = cropBox;
    const s = scale;
    out.width = Math.round(w / s);
    out.height = Math.round(h / s);
    const ctx = out.getContext("2d")!;
    ctx.drawImage(imgRef.current, x / s, y / s, w / s, h / s, 0, 0, out.width, out.height);
    setCroppedUrl(out.toDataURL(outputFormat, 0.95));
  };

  const downloadCrop = () => {
    if (!croppedUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = croppedUrl;
    a.download = `cropped_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setFileName("");
    setCroppedUrl(null);
    setDragging(null);
  };

  const presets = [
    { label: "Free", ratio: null as number | null },
    { label: "1:1", ratio: 1 },
    { label: "4:3", ratio: 4 / 3 },
    { label: "16:9", ratio: 16 / 9 },
    { label: "3:2", ratio: 3 / 2 },
    { label: "2:3", ratio: 2 / 3 },
  ];

  const applyPreset = (ratio: number | null) => {
    if (ratio === null) {
      setAspectLock(false);
      return;
    }
    setAspectLock(true);
    setAspectRatio(ratio);
    const { x, y, w } = cropBox;
    const newH = Math.round(w / ratio);
    setCropBox((b) => ({ ...b, h: Math.min(newH, imageSize.h - y) }));
  };

  return (
    <ImageToolLayout
      title="Image Cropper"
      description="Crop images instantly in your browser. No upload, 100% private."
      content={<ToolContentSection data={toolContent["image-cropper"]} />}
    >
      <div className="space-y-6">
        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
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
              <p className="text-lg font-semibold">Drop your image here</p>
              <p className="text-sm text-muted-foreground">or click to browse files to get started</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP, GIF</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aspect Ratio</span>
              <div className="flex gap-1.5 flex-wrap">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p.ratio)}
                    className={`px-3 py-1 rounded-md border text-xs font-semibold transition-colors ${
                      (!aspectLock && p.ratio === null) || (aspectLock && aspectRatio === p.ratio)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/20 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer ml-auto select-none">
                <input
                  type="checkbox"
                  checked={aspectLock}
                  onChange={(e) => setAspectLock(e.target.checked)}
                  className="accent-primary w-3.5 h-3.5"
                />
                Lock ratio
              </label>
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
                      <mask id="cropMask">
                        <rect width="100%" height="100%" fill="white" />
                        <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="black" />
                      </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#cropMask)" />
                    <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    {[1, 2].map((i) => (
                      <g key={i}>
                        <line x1={cropBox.x + (cropBox.w / 3) * i} y1={cropBox.y} x2={cropBox.x + (cropBox.w / 3) * i} y2={cropBox.y + cropBox.h} stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                        <line x1={cropBox.x} y1={cropBox.y + (cropBox.h / 3) * i} x2={cropBox.x + cropBox.w} y2={cropBox.y + (cropBox.h / 3) * i} stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                      </g>
                    ))}
                    {[
                      [cropBox.x, cropBox.y],
                      [cropBox.x + cropBox.w, cropBox.y],
                      [cropBox.x, cropBox.y + cropBox.h],
                      [cropBox.x + cropBox.w, cropBox.y + cropBox.h],
                    ].map(([hx, hy], i) => (
                      <rect key={i} x={hx - HANDLE_SIZE / 2} y={hy - HANDLE_SIZE / 2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="hsl(var(--primary))" rx={2} style={{ pointerEvents: "all", cursor: "nwse-resize" }} />
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex gap-3 flex-wrap">
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Crop: <strong className="text-foreground">{cropBox.w} × {cropBox.h} px</strong>
              </div>
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Output: <strong className="text-foreground">{Math.round(cropBox.w / scale)} × {Math.round(cropBox.h / scale)} px</strong>
              </div>
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Position: <strong className="text-foreground">{cropBox.x}, {cropBox.y}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap items-center">
              <select
                className="px-3 py-2 rounded-lg bg-background border text-sm outline-none cursor-pointer"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
              </select>
              <Button onClick={doCrop} className="shadow-lg shadow-primary/20">
                <Crop className="mr-2 h-4 w-4" />
                Crop Image
              </Button>
              {croppedUrl && (
                <Button variant="secondary" onClick={downloadCrop}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Preview */}
            {croppedUrl && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Cropped Preview</p>
                <img src={croppedUrl} alt="Cropped" className="max-w-full max-h-[300px] rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "✂️", title: "Precise Cropping", desc: "Drag handles, lock aspect ratio" },
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
