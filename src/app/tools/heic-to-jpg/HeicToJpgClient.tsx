"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw, Smartphone, X, AlertTriangle, FileText } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

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
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png" | "application/pdf">("image/jpeg");
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

    let heic2any: typeof import("heic2any").default;
    try {
      heic2any = (await import("heic2any")).default;
    } catch {
      setResults(files.map((f) => ({ name: f.name, url: "", size: "", status: "error", error: "Library failed to load. Please refresh and try again." })));
      setConverting(false);
      return;
    }

    if (outputFormat === "application/pdf") {
      try {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF();
        let pageAdded = false;
        for (const file of files) {
          const blob = (await heic2any({ blob: file, toType: "image/jpeg", quality: quality / 100 })) as Blob;
          const dataUrl: string = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          const img = new window.Image();
          img.src = dataUrl;
          await new Promise((resolve) => { img.onload = resolve; });
          if (pageAdded) pdf.addPage();
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;
          pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
          pageAdded = true;
        }
        pdf.save("heic-photos.pdf");
        setResults(files.map((f) => ({ name: f.name.replace(/\.(heic|heif)$/i, ".pdf"), url: "", size: "", status: "done" })));
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "PDF conversion failed.";
        setResults(files.map((f) => ({ name: f.name, url: "", size: "", status: "error", error: message })));
      }
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
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Conversion failed.";
        out.push({ name: file.name, url: "", size: "", status: "error", error: message });
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
      content={<ToolContentSection data={toolContent["heic-to-jpg"]} />}
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
                onChange={(e) => setOutputFormat(e.target.value as "image/jpeg" | "image/png")}
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="application/pdf">PDF</option>
              </select>
            </div>
            {(outputFormat === "image/jpeg" || outputFormat === "application/pdf") && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="heic-quality" className="text-xs font-semibold text-muted-foreground">Quality: {quality}%</label>
                <input
                  id="heic-quality"
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
              {converting
                ? "Converting..."
                : outputFormat === "application/pdf"
                  ? `Convert ${files.length} File${files.length > 1 ? "s" : ""} to PDF`
                  : `Convert ${files.length} File${files.length > 1 ? "s" : ""}`}
            </Button>
            {outputFormat !== "application/pdf" && results.some((r) => r.status === "done") && (
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
                {r.status === "done" && r.url && <img src={r.url} alt={r.name} className="w-11 h-11 rounded-md object-cover bg-muted" />}
                {r.status === "done" && !r.url && (
                  <div className="w-11 h-11 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <FileText size={20} />
                  </div>
                )}
                {r.status === "error" && <AlertTriangle className="text-red-500 flex-shrink-0" size={28} />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  {r.status === "done" && r.url && <p className="text-xs text-muted-foreground mt-0.5">✅ {r.size}</p>}
                  {r.status === "done" && !r.url && <p className="text-xs text-muted-foreground mt-0.5">✅ Included in downloaded PDF</p>}
                  {r.status === "error" && <p className="text-xs text-red-500 mt-0.5">{r.error}</p>}
                </div>
                {r.status === "done" && r.url && (
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
