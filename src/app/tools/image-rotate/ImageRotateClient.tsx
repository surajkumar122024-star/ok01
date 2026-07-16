"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, RefreshCcw, Image as ImageIcon } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function ImageRotateClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const updatePreview = (rot: number, fh: boolean, fv: boolean) => {
    const scaleX = fh ? -1 : 1;
    const scaleY = fv ? -1 : 1;
    setPreviewStyle({
      transform: `rotate(${rot}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
      transition: "transform 0.3s ease",
    });
  };

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setResultUrl(null);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setPreviewStyle({});
    };
    reader.readAsDataURL(file);
  };

  const rotate = (deg: number) => {
    const newRot = (rotation + deg + 360) % 360;
    setRotation(newRot);
    updatePreview(newRot, flipH, flipV);
    setResultUrl(null);
  };

  const toggleFlipH = () => {
    const newFlip = !flipH;
    setFlipH(newFlip);
    updatePreview(rotation, newFlip, flipV);
    setResultUrl(null);
  };

  const toggleFlipV = () => {
    const newFlip = !flipV;
    setFlipV(newFlip);
    updatePreview(rotation, flipH, newFlip);
    setResultUrl(null);
  };

  const applyAndExport = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const ow = img.naturalWidth;
    const oh = img.naturalHeight;
    const cw = Math.round(ow * cos + oh * sin);
    const ch = Math.round(ow * sin + oh * cos);

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d")!;

    ctx.translate(cw / 2, ch / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -ow / 2, -oh / 2);

    setResultUrl(canvas.toDataURL(outputFormat, 0.95));
  };

  const download = () => {
    if (!resultUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `rotated_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setFileName("");
    setResultUrl(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setPreviewStyle({});
  };

  return (
    <ImageToolLayout
      title="Image Rotate & Flip"
      description="Rotate or flip images instantly. No upload, 100% private."
      content={<ToolContentSection data={toolContent["image-rotate"]} />}
    >
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
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP, GIF</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Live Preview */}
            <div
              className="rounded-xl flex items-center justify-center min-h-[260px] overflow-hidden"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--background)) 0% 50%)",
                backgroundSize: "20px 20px",
              }}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Preview"
                style={previewStyle}
                crossOrigin="anonymous"
                className="max-w-[90%] max-h-[260px] object-contain rounded"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              <button
                onClick={() => rotate(-90)}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border min-w-[72px] text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
              >
                <RotateCcw size={22} /> Rotate Left
              </button>
              <button
                onClick={() => rotate(90)}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border min-w-[72px] text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
              >
                <RotateCw size={22} /> Rotate Right
              </button>
              <button
                onClick={() => rotate(180)}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border min-w-[72px] text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
              >
                <RefreshCcw size={22} /> 180°
              </button>
              <button
                onClick={toggleFlipH}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border min-w-[72px] text-xs font-semibold transition-colors ${
                  flipH ? "bg-primary border-primary text-primary-foreground" : "text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                <FlipHorizontal size={22} /> Flip H
              </button>
              <button
                onClick={toggleFlipV}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border min-w-[72px] text-xs font-semibold transition-colors ${
                  flipV ? "bg-primary border-primary text-primary-foreground" : "text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                <FlipVertical size={22} /> Flip V
              </button>
            </div>

            <hr className="border-border" />

            {/* Info */}
            <div className="flex gap-3 flex-wrap">
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Rotation: <strong className="text-foreground">{rotation}°</strong>
              </div>
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Flip H: <strong className="text-foreground">{flipH ? "Yes" : "No"}</strong>
              </div>
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Flip V: <strong className="text-foreground">{flipV ? "Yes" : "No"}</strong>
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
              <Button onClick={applyAndExport} className="shadow-lg shadow-primary/20">
                <RefreshCw className="mr-2 h-4 w-4" />
                Apply & Export
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

            {/* Result */}
            {resultUrl && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Result</p>
                <img src={resultUrl} alt="Result" className="max-w-full max-h-[400px] rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {!imageSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "🔄", title: "Rotate & Flip", desc: "90°, 180°, horizontal & vertical" },
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
