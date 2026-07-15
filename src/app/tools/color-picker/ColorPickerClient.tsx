"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Palette, X, Check } from "lucide-react";

interface PickedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPickerClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickedColor, setPickedColor] = useState<PickedColor | null>(null);
  const [palette, setPalette] = useState<PickedColor[]>([]);
  const [zoom, setZoom] = useState<{ x: number; y: number; pixels: Uint8ClampedArray | null }>({ x: 0, y: 0, pixels: null });
  const [copied, setCopied] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const drawImage = useCallback((src: string) => {
    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current!;
      const container = canvas.parentElement!;
      const maxW = container.clientWidth || 700;
      const maxH = 480;
      const s = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
      canvas.width = Math.round(img.naturalWidth * s);
      canvas.height = Math.round(img.naturalHeight * s);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = src;
  }, []);

  useEffect(() => { if (imageSrc) drawImage(imageSrc); }, [imageSrc, drawImage]);

  const getColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d")!;
    const px = ctx.getImageData(x, y, 1, 1).data;
    return { x, y, r: px[0], g: px[1], b: px[2] };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y, r, g, b } = getColor(e);
    const rect = canvasRef.current!.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const ctx = canvasRef.current!.getContext("2d")!;
    const zoomData = ctx.getImageData(Math.max(0, x - 4), Math.max(0, y - 4), 9, 9).data;
    setZoom({ x, y, pixels: zoomData });
    setPickedColor({
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
    });
  };

  const onMouseLeave = () => {
    setCursor(null);
    setZoom({ x: 0, y: 0, pixels: null });
  };

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { r, g, b } = getColor(e);
    const color: PickedColor = {
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
    };
    setPalette((prev) => [color, ...prev.slice(0, 11)]);
    setPickedColor(color);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => { setImageSrc(null); setPickedColor(null); setPalette([]); };

  return (
    <ImageToolLayout
      title="Image Color Picker"
      description="Hover to preview, click to pick. Get HEX, RGB & HSL instantly."
      content={
        <div className="space-y-8">
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Match colors from any photo exactly</h2>
            <p className="text-muted-foreground leading-relaxed">
              Designers and developers often need to pull an exact color from a reference image — a
              brand logo, a product photo, a screenshot of a design mockup — rather than guess at a
              close match. This picker samples the precise pixel value under your cursor and outputs it
              in HEX, RGB, and HSL simultaneously, since different tools (CSS, design software, print
              software) each expect a different color format.
            </p>
          </div>
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Why does the same color look slightly different on another screen?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor calibration varies between devices, so the HEX/RGB values are accurate to the
                  image file, but the visual appearance can shift slightly depending on the display.
                </p>
              </div>
              <div>
                <p className="font-medium">Which format should I use for CSS?</p>
                <p className="text-muted-foreground leading-relaxed">
                  HEX (e.g. #3B82F6) is the most common in CSS and design tools, while HSL is often
                  easier to work with when you need to adjust lightness or saturation programmatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
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
              <Palette size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your image here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP, GIF</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Canvas */}
            <div className="overflow-auto">
              <div className="relative inline-block max-w-full cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  className="block max-w-full rounded-lg border"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  onClick={onClick}
                />
                {cursor && zoom.pixels && (
                  <div
                    className="absolute pointer-events-none w-[100px] h-[100px] rounded-full border-4 border-primary shadow-xl overflow-hidden -translate-x-1/2 -translate-y-[110%] bg-black z-10"
                    style={{ left: cursor.x, top: cursor.y }}
                  >
                    <MagnifierCanvas pixels={zoom.pixels} />
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">🖱 Hover to preview color · Click to save to palette</p>

            {/* Color Info */}
            {pickedColor && (
              <div className="flex gap-4 flex-wrap items-start bg-muted/30 border rounded-xl p-4">
                <div
                  className="w-20 h-20 rounded-xl border-2 flex-shrink-0"
                  style={{ background: pickedColor.hex }}
                />
                <div className="flex-1 flex flex-col gap-2 min-w-[240px]">
                  {[
                    { label: "HEX", value: pickedColor.hex },
                    { label: "RGB", value: `rgb(${pickedColor.rgb.r}, ${pickedColor.rgb.g}, ${pickedColor.rgb.b})` },
                    { label: "HSL", value: `hsl(${pickedColor.hsl.h}, ${pickedColor.hsl.s}%, ${pickedColor.hsl.l}%)` },
                  ].map(({ label, value }) => (
                    <div className="flex items-center gap-3" key={label}>
                      <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider w-8">{label}</span>
                      <span className="text-sm font-mono flex-1">{value}</span>
                      <Button size="sm" variant="outline" onClick={() => copy(value)}>
                        {copied === value ? <><Check className="mr-1 h-3 w-3" />Copied</> : "Copy"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Palette */}
            {palette.length > 0 && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Saved Colors ({palette.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {palette.map((c, i) => (
                    <div
                      key={i}
                      className="group relative w-11 h-11 rounded-lg border-2 cursor-pointer transition-transform hover:scale-110 hover:border-primary"
                      style={{ background: c.hex }}
                      onClick={() => copy(c.hex)}
                      title={c.hex}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-popover border rounded-md px-2 py-1 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {c.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={reset}>
                <X className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "⚡", title: "Instant Preview", desc: "Hover to see colors live" },
              { icon: "🎨", title: "HEX / RGB / HSL", desc: "All formats, one click copy" },
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

// Magnifier sub-component
function MagnifierCanvas({ pixels }: { pixels: Uint8ClampedArray }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    canvas.width = 9;
    canvas.height = 9;
    const ctx = canvas.getContext("2d")!;
    const id = ctx.createImageData(9, 9);
    id.data.set(pixels.slice(0, 9 * 9 * 4));
    ctx.putImageData(id, 0, 0);
  }, [pixels]);
  return <canvas ref={ref} style={{ width: "100px", height: "100px", imageRendering: "pixelated" }} />;
}
