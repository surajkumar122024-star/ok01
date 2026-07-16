"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Shapes } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

export default function SvgToPngClient() {
  const [svgSrc, setSvgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(2);
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");
  const [bgColor, setBgColor] = useState("transparent");
  const [bgHex, setBgHex] = useState("#ffffff");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      setError("Please upload a valid SVG file.");
      return;
    }
    setError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setSvgSrc(text);
      setResultUrl(null);

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "image/svg+xml");
      const svg = doc.querySelector("svg");
      let w = parseFloat(svg?.getAttribute("width") || "") || 0;
      let h = parseFloat(svg?.getAttribute("height") || "") || 0;
      if (!w || !h) {
        const vb = svg?.getAttribute("viewBox")?.split(/[\s,]+/);
        if (vb && vb.length === 4) { w = parseFloat(vb[2]); h = parseFloat(vb[3]); }
      }
      setSvgSize({ w: w || 300, h: h || 300 });

      const blob = new Blob([text], { type: "image/svg+xml" });
      setPreview(URL.createObjectURL(blob));
    };
    reader.readAsText(file);
  };

  const convert = () => {
    if (!svgSrc) return;
    const outW = customW ? parseInt(customW) : Math.round(svgSize.w * scale);
    const outH = customH ? parseInt(customH) : Math.round(svgSize.h * scale);

    const canvas = canvasRef.current!;
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;

    if (bgColor !== "transparent") {
      ctx.fillStyle = bgHex;
      ctx.fillRect(0, 0, outW, outH);
    }

    const blob = new Blob([svgSrc], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, outW, outH);
      URL.revokeObjectURL(url);
      setResultUrl(canvas.toDataURL("image/png"));
    };
    img.onerror = () => { setError("SVG could not be rendered. Try a simpler SVG."); };
    img.src = url;
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = fileName.replace(/\.svg$/i, "") + ".png";
    a.click();
  };

  const reset = () => {
    setSvgSrc(null);
    setFileName("");
    setResultUrl(null);
    setPreview(null);
    setError("");
    setSvgSize({ w: 0, h: 0 });
  };

  const outW = customW ? parseInt(customW) : Math.round(svgSize.w * scale);
  const outH = customH ? parseInt(customH) : Math.round(svgSize.h * scale);

  return (
    <ImageToolLayout
      title="SVG to PNG"
      description="Convert SVG files to PNG instantly. No upload, 100% private."
      content={<ToolContentSection data={toolContent["svg-to-png"]} />}
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="space-y-6">
        {!svgSrc ? (
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
              accept=".svg,image/svg+xml"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Shapes size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your SVG here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground">Only .svg files supported</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* SVG Preview */}
            {preview && (
              <img
                src={preview}
                alt="SVG Preview"
                className="max-w-full max-h-[200px] block mx-auto rounded-lg border"
                style={{
                  backgroundImage: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--background)) 0% 50%)",
                  backgroundSize: "16px 16px",
                }}
              />
            )}

            <hr className="border-border" />

            {/* Settings */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Output Settings</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Scale: {scale}x</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={scale}
                    onChange={(e) => { setScale(parseFloat(e.target.value)); setCustomW(""); setCustomH(""); }}
                    className="accent-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Background</label>
                  <select
                    className="px-3 py-2 rounded-lg bg-background border text-sm outline-none cursor-pointer"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  >
                    <option value="transparent">Transparent</option>
                    <option value="color">Custom Color</option>
                  </select>
                </div>
                {bgColor === "color" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Background Color</label>
                    <input type="color" value={bgHex} onChange={(e) => setBgHex(e.target.value)} className="h-10 rounded-lg cursor-pointer border" />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Custom Width (px)</label>
                  <input
                    type="number"
                    placeholder={`Auto (${outW}px)`}
                    value={customW}
                    onChange={(e) => setCustomW(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-background border text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Custom Height (px)</label>
                  <input
                    type="number"
                    placeholder={`Auto (${outH}px)`}
                    value={customH}
                    onChange={(e) => setCustomH(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-background border text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex gap-3 flex-wrap">
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                SVG Size: <strong className="text-foreground">{svgSize.w} × {svgSize.h}</strong>
              </div>
              <div className="bg-muted/30 border rounded-md px-3 py-1 text-xs text-muted-foreground">
                Output: <strong className="text-foreground">{outW} × {outH} px</strong>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button onClick={convert} className="shadow-lg shadow-primary/20">
                Convert to PNG
              </Button>
              {resultUrl && (
                <Button variant="secondary" onClick={download}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
              )}
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Result Preview */}
            {resultUrl && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">PNG Output</p>
                <img src={resultUrl} alt="PNG Output" className="max-w-full max-h-[400px] rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {!svgSrc && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "🔷", title: "Scale up to 8x", desc: "Custom width & height too" },
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
