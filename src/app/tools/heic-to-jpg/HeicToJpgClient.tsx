"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw, Smartphone, X, AlertTriangle } from "lucide-react";

interface ConvertedFile {
  name: string;
  url: string;
  size: string;
  status: "done" | "error";
  error?: string;
}

export default function HeicToJpgClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState(90);
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isHeic = (file: File) =>
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif") ||
    file.type === "image/heic" ||
    file.type === "image/heif";

  const handleFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming).filter(isHeic);
    if (arr.length === 0) return;
    setFiles((prev) => [...prev, ...arr]);
    setResults([]);
  };

  const convertAll = async () => {
    if (!files.length) return;
    setConverting(true);
    setResults([]);

    let heic2any: any;
    try {
      heic2any = (await import("heic2any")).default;
    } catch {
      setResults(files.map((f) => ({ name: f.name, url: "", size: "", status: "error", error: "Library failed to load. Please refresh and try again." })));
      setConverting(false);
      return;
    }

    const out: ConvertedFile[] = [];
    for (const file of files) {
      try {
        const blob = await heic2any({ blob: file, toType: outputFormat, quality: quality / 100 }) as Blob;
        const url = URL.createObjectURL(blob);
        const ext = outputFormat === "image/jpeg" ? "jpg" : "png";
        const name = file.name.replace(/\.(heic|heif)$/i, `.${ext}`);
        const size = (blob.size / 1024).toFixed(1) + " KB";
        out.push({ name, url, size, status: "done" });
      } catch (e: any) {
        out.push({ name: file.name, url: "", size: "", status: "error", error: e?.message || "Conversion failed." });
      }
    }
    setResults(out);
    setConverting(false);
  };

  const downloadAll = () => {
    results.filter((r) => r.status === "done").forEach((r) => {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = r.name;
      a.click();
    });
  };

  const reset = () => {
    setFiles([]);
    setResults([]);
  };

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setResults([]);
  };

  return (
    <ImageToolLayout
      title="HEIC to JPG"
      description="Convert iPhone HEIC photos to JPG instantly. No upload, 100% private."
      content={
        <div className="space-y-8">
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Why iPhone photos won't open on some devices</h2>
            <p className="text-muted-foreground leading-relaxed">
              iPhones save photos in HEIC format by default, which compresses better than JPG but isn't
              universally supported — many Windows PCs, older Android phones, and web upload forms
              can't display or accept .heic files directly. Converting to JPG fixes compatibility
              instantly, whether you're emailing a photo to someone on Windows or uploading it to a
              website that rejects the format.
            </p>
          </div>
          <div className="glass rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Can I avoid this issue by changing my iPhone's camera settings?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Yes — under Settings → Camera → Formats, choosing "Most Compatible" saves new photos
                  directly as JPG, but this tool is still useful for HEIC photos you already have.
                </p>
              </div>
              <div>
                <p className="font-medium">Does converting to JPG reduce photo quality?</p>
                <p className="text-muted-foreground leading-relaxed">
                  There is a small quality trade-off since JPG uses different compression than HEIC, but
                  at normal viewing sizes the difference is rarely noticeable.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Drop Zone */}
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
            accept=".heic,.heif,image/heic,image/heif"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Smartphone size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Drop HEIC / HEIF files here</p>
            <p className="text-sm text-muted-foreground">or click to browse files — multiple files supported</p>
          </div>
          <p className="text-xs text-muted-foreground">Only .heic and .heif files</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/20 border rounded-lg px-4 py-2.5">
                <span className="text-lg">📷</span>
                <span className="flex-1 text-sm truncate">{f.name}</span>
                <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
                <button
                  className="text-red-500 hover:bg-red-500/10 rounded p-1 transition-colors"
                  onClick={() => removeFile(i)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Output Format</label>
              <select
                className="px-3 py-2 rounded-lg bg-background border text-sm outline-none cursor-pointer"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as any)}
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
            {outputFormat === "image/jpeg" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Quality: {quality}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-36 accent-primary"
                />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {files.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            <Button onClick={convertAll} disabled={converting} className="shadow-lg shadow-primary/20">
              {converting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {converting ? "Converting..." : `Convert ${files.length} File${files.length > 1 ? "s" : ""}`}
            </Button>
            {results.some((r) => r.status === "done") && (
              <Button variant="secondary" onClick={downloadAll}>
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            )}
            <Button variant="outline" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="flex flex-col gap-2">
            {results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
                  r.status === "done"
                    ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                }`}
              >
                {r.status === "done" && <img src={r.url} alt={r.name} className="w-11 h-11 rounded-md object-cover bg-muted" />}
                {r.status === "error" && <AlertTriangle className="text-red-500 flex-shrink-0" size={28} />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  {r.status === "done" && <p className="text-xs text-muted-foreground mt-0.5">✅ {r.size}</p>}
                  {r.status === "error" && <p className="text-xs text-red-500 mt-0.5">{r.error}</p>}
                </div>
                {r.status === "done" && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={r.url} download={r.name}>
                      <Download className="mr-1 h-3 w-3" />
                      Save
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground">
          💡 HEIC is Apple&apos;s default photo format on iPhone (iOS 11+). This tool converts them to JPG/PNG so they open on any device or platform.
        </div>

        {files.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: "🔒", title: "100% Private", desc: "All processing in your browser" },
              { icon: "⚡", title: "Lightning Fast", desc: "Converts in seconds" },
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
