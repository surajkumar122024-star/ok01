"use client";

import { useState, useRef, useCallback } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw, X, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

interface PickedImage {
  url: string;
  name: string;
}

const SPACING_OPTIONS = [
  { label: "None", value: 0 },
  { label: "Small", value: 8 },
  { label: "Medium", value: 20 },
  { label: "Large", value: 36 },
];

const BG_COLORS = ["#ffffff", "#000000", "#f3f4f6", "#1e293b"];

// Picks a reasonable column count for a given number of images
function autoColumns(count: number): number {
  if (count <= 1) return 1;
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function ImageCollageClient() {
  const [images, setImages] = useState<PickedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [columns, setColumns] = useState<number | null>(null); // null = auto
  const [spacing, setSpacing] = useState(20);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [rendering, setRendering] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, { url: ev.target?.result as string, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
    setResultUrl(null);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setResultUrl(null);
  };

  const moveImage = (i: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setResultUrl(null);
  };

  const effectiveColumns = columns ?? autoColumns(images.length);

  const generateCollage = useCallback(async () => {
    if (!images.length) return;
    setRendering(true);

    const cols = effectiveColumns;
    const rows = Math.ceil(images.length / cols);
    const cellSize = 500; // px per cell before spacing
    const canvasWidth = cols * cellSize + (cols + 1) * spacing;
    const canvasHeight = rows * cellSize + (rows + 1) * spacing;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setRendering(false);
      return;
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    for (let i = 0; i < images.length; i++) {
      const img = await loadImage(images[i].url);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = spacing + col * (cellSize + spacing);
      const y = spacing + row * (cellSize + spacing);

      // object-fit: cover math — scale to fill the cell, crop overflow
      const scale = Math.max(cellSize / img.width, cellSize / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const offsetX = x - (drawW - cellSize) / 2;
      const offsetY = y - (drawH - cellSize) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cellSize, cellSize);
      ctx.clip();
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    }

    canvas.toBlob((blob) => {
      if (blob) {
        setResultUrl(URL.createObjectURL(blob));
      }
      setRendering(false);
    }, "image/png");
  }, [images, effectiveColumns, spacing, bgColor]);

  const downloadCollage = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "collage.png";
    a.click();
  };

  const reset = () => {
    setImages([]);
    setResultUrl(null);
    setColumns(null);
  };

  return (
    <ImageToolLayout
      title="Image Collage Maker"
      description="Combine multiple photos into one grid collage. Bulk upload, adjust layout, download instantly. No upload, 100% private."
      content={<ToolContentSection data={toolContent["image-collage"]} />}
    >
      <div className="space-y-6">
        {images.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <LayoutGrid size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your photos here</p>
              <p className="text-sm text-muted-foreground">or click to browse — select multiple images at once</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP — 2 or more images</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm font-semibold">
              {images.length} image{images.length > 1 ? "s" : ""} selected — arranged in upload order
            </p>

            {/* Thumbnails with reorder/remove */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img.url} alt={img.name} className="rounded-lg w-full h-32 object-cover border" />
                  <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[11px] font-bold rounded px-1.5 py-0.5">
                    {i + 1}
                  </div>
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveImage(i, -1)}
                      disabled={i === 0}
                      className="bg-black/60 hover:bg-primary text-white rounded px-1.5 text-xs disabled:opacity-30"
                      aria-label="Move earlier"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => moveImage(i, 1)}
                      disabled={i === images.length - 1}
                      className="bg-black/60 hover:bg-primary text-white rounded px-1.5 text-xs disabled:opacity-30"
                      aria-label="Move later"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 flex items-center justify-center h-32 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                + Add more
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </div>

            {/* Layout controls */}
            <div className="grid sm:grid-cols-3 gap-4 bg-muted/30 border rounded-xl p-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Columns</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setColumns(null)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      columns === null ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"
                    }`}
                  >
                    Auto
                  </button>
                  {[2, 3, 4].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColumns(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        columns === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Spacing</p>
                <div className="flex gap-2 flex-wrap">
                  {SPACING_OPTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSpacing(s.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        spacing === s.value ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Background</p>
                <div className="flex gap-2">
                  {BG_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBgColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        bgColor === c ? "border-primary scale-110" : "border-muted-foreground/20"
                      }`}
                      aria-label={`Background ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button onClick={generateCollage} disabled={rendering || images.length < 2} className="shadow-lg shadow-primary/20">
                {rendering ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                {rendering ? "Generating..." : "Generate Collage"}
              </Button>
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            {images.length < 2 && (
              <p className="text-xs text-muted-foreground">Add at least 2 images to generate a collage.</p>
            )}

            {resultUrl && (
              <div className="space-y-4 bg-muted/30 border rounded-xl p-4">
                <p className="text-sm font-semibold">Preview</p>
                <img src={resultUrl} alt="Collage result" className="rounded-lg w-full border" />
                <Button onClick={downloadCollage} className="shadow-lg shadow-primary/20">
                  <Download className="mr-2 h-4 w-4" />
                  Download Collage
                </Button>
              </div>
            )}
          </div>
        )}

        {images.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "⚡", title: "Bulk Upload", desc: "Combine many photos at once" },
              { icon: "🎨", title: "Custom Layout", desc: "Columns, spacing, background" },
              { icon: "🆓", title: "Completely Free", desc: "No limits, no watermark" },
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
