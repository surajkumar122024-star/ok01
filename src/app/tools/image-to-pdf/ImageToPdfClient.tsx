"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, RefreshCw, X, Image as ImageIcon } from "lucide-react";

interface PickedImage {
  url: string;
  name: string;
}

export default function ImageToPdfClient() {
  const [images, setImages] = useState<PickedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
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
    setDone(false);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setDone(false);
  };

  const convertToPDF = async () => {
    if (!images.length) return;
    setConverting(true);
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage();
      const img = new window.Image();
      img.src = images[i].url;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      pdf.addImage(images[i].url, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("images-to-pdf.pdf");
    setConverting(false);
    setDone(true);
  };

  const reset = () => {
    setImages([]);
    setDone(false);
  };

  return (
    <ImageToolLayout
      title="Image to PDF"
      description="Convert your images to PDF. 100% free, no upload, works in browser."
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
              <ImageIcon size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Drop your images here</p>
              <p className="text-sm text-muted-foreground">or click to browse files — multiple images supported</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm font-semibold">
              {images.length} image{images.length > 1 ? "s" : ""} selected — will be added to PDF in this order
            </p>

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
                  >
                    <X size={14} />
                  </button>
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

            <div className="flex gap-3 flex-wrap">
              <Button onClick={convertToPDF} disabled={converting} className="shadow-lg shadow-primary/20">
                {converting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                {converting ? "Converting..." : "Convert to PDF"}
              </Button>
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {done && (
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3 text-sm text-green-700 dark:text-green-400">
                ✅ Your PDF has been downloaded successfully.
              </div>
            )}
          </div>
        )}

        {images.length === 0 && (
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
