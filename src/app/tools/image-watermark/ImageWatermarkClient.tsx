"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, Droplets, Image as ImageIcon } from "lucide-react";

const POSITIONS = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Center", value: "top-center" },
  { label: "Top Right", value: "top-right" },
  { label: "Center", value: "center" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Tile", value: "tile" },
];

export default function ImageWatermarkClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"text" | "logo">("text");
  const [watermarkText, setWatermarkText] = useState("© My Brand");
  const [fontSize, setFontSize] = useState(36);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(70);
  const [position, setPosition] = useState("bottom-right");
  const [padding, setPadding] = useState(20);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(120);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => { setImageSrc(e.target?.result as string); setResultUrl(null); };
    reader.readAsDataURL(file);
  };

  const handleLogo = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogoSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const getXY = (pos: string, iw: number, ih: number, ww: number, wh: number, pad: number) => {
    switch (pos) {
      case "top-left": return [pad, pad];
      case "top-center": return [(iw - ww) / 2, pad];
      case "top-right": return [iw - ww - pad, pad];
      case "center": return [(iw - ww) / 2, (ih - wh) / 2];
      case "bottom-left": return [pad, ih - wh - pad];
      case "bottom-center": return [(iw - ww) / 2, ih - wh - pad];
      case "bottom-right": return [iw - ww - pad, ih - wh - pad];
      default: return [pad, pad];
    }
  };

  const applyWatermark = () => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;

      if (mode === "text") {
        ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
        ctx.fillStyle = fontColor;
        const metrics = ctx.measureText(watermarkText);
        const tw = metrics.width;
        const th = fontSize;

        if (position === "tile") {
          for (let y = padding; y < img.naturalHeight; y += th * 3) {
            for (let x = padding; x < img.naturalWidth; x += tw + 60) {
              ctx.fillText(watermarkText, x, y + th);
            }
          }
        } else {
          const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, tw, th, padding);
          ctx.fillText(watermarkText, x, y + th);
        }
      } else if (mode === "logo" && logoSrc) {
        const logo = new window.Image();
        logo.onload = () => {
          const ratio = logo.naturalWidth / logo.naturalHeight;
          const lw = logoSize;
          const lh = logoSize / ratio;

          if (position === "tile") {
            for (let y = padding; y < img.naturalHeight; y += lh * 2) {
              for (let x = padding; x < img.naturalWidth; x += lw * 2) {
                ctx.drawImage(logo, x, y, lw, lh);
              }
            }
          } else {
            const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, lw, lh, padding);
            ctx.drawImage(logo, x, y, lw, lh);
          }
          ctx.globalAlpha = 1;
          setResultUrl(canvas.toDataURL(outputFormat, 0.95));
        };
        logo.src = logoSrc;
        return;
      }

      ctx.globalAlpha = 1;
      setResultUrl(canvas.toDataURL(outputFormat, 0.95));
    };
    img.src = imageSrc;
  };

  const download = () => {
    if (!resultUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `watermarked_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setLogoSrc(null);
    setFileName("");
    setResultUrl(null);
  };

  return (
    <ImageToolLayout
      title="Image Watermark"
      description="Add text or logo watermarks instantly. No upload, 100% private."
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="space-y-6">
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
              <p className="text-lg font-semibold">Drop your image here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Mode Tabs */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Watermark Type</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("text")}
                  className={`px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    mode === "text" ? "bg-primary border-primary text-primary-foreground" : "text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  ✏️ Text
                </button>
                <button
                  onClick={() => setMode("logo")}
                  className={`px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    mode === "logo" ? "bg-primary border-primary text-primary-foreground" : "text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  🖼 Logo / Image
                </button>
              </div>
            </div>

            {/* Text Options */}
            {mode === "text" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Watermark Text</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-background border text-sm outline-none focus:border-primary"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="© Your Brand"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Font Size: {fontSize}px</label>
                  <input type="range" min="12" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="accent-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Text Color</label>
                  <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="h-10 rounded-lg cursor-pointer border" />
                </div>
              </div>
            )}

            {/* Logo Options */}
            {mode === "logo" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Logo Image</label>
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-5 text-center cursor-pointer text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {logoSrc ? (
                      <img src={logoSrc} alt="Logo" className="max-h-[60px] max-w-[120px] mx-auto rounded" />
                    ) : (
                      "Click to upload logo (PNG recommended)"
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleLogo(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Logo Size: {logoSize}px</label>
                  <input type="range" min="20" max="400" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="accent-primary" />
                </div>
              </div>
            )}

            {/* Common Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Position</label>
                <select
                  className="px-3 py-2 rounded-lg bg-background border text-sm outline-none cursor-pointer"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Opacity: {opacity}%</label>
                <input type="range" min="5" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="accent-primary mt-2" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Padding: {padding}px</label>
                <input type="range" min="0" max="100" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="accent-primary mt-2" />
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
              <Button onClick={applyWatermark} className="shadow-lg shadow-primary/20">
                <Droplets className="mr-2 h-4 w-4" />
                Apply Watermark
              </Button>
              {resultUrl && (
                <Button variant="secondary" onClick={download}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>

            {/* Preview */}
            {resultUrl && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Preview</p>
                <img src={resultUrl} alt="Watermarked" className="max-w-full max-h-[400px] rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "💧", title: "Text or Logo", desc: "Full control over style & position" },
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
