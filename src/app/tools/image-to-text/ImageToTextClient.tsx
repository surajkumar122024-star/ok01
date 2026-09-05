"use client";

import { useState, useRef } from "react";
import { ImageToolLayout } from "@/components/ImageToolLayout";
import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { ScanText, Copy, Check, Download, Loader2 } from "lucide-react";
import { ToolContentSection } from "@/components/ToolContentSection";
import { toolContent } from "@/data/toolContent";

const languages = [
  { code: "eng", label: "English" },
  { code: "hin", label: "Hindi" },
  { code: "spa", label: "Spanish" },
  { code: "fra", label: "French" },
  { code: "deu", label: "German" },
  { code: "por", label: "Portuguese" },
  { code: "ara", label: "Arabic" },
  { code: "chi_sim", label: "Chinese (Simplified)" },
  { code: "jpn", label: "Japanese" },
  { code: "rus", label: "Russian" },
];

export default function ImageToTextClient() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [language, setLanguage] = useState("eng");
  const [extractedText, setExtractedText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const workerRef = useRef<Awaited<ReturnType<typeof import("tesseract.js").createWorker>> | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setExtractedText("");
    setError("");
  };

  const handleClear = () => {
    setSelectedImage(null);
    setExtractedText("");
    setError("");
  };

  const extractText = async () => {
    if (!selectedImage) return;
    setProcessing(true);
    setError("");
    setExtractedText("");
    setProgress(0);
    setProgressLabel("Loading language data...");

    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(language, 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgressLabel("Recognizing text...");
            setProgress(Math.round(m.progress * 100));
          } else if (m.status) {
            setProgressLabel(m.status.charAt(0).toUpperCase() + m.status.slice(1));
          }
        },
      });
      workerRef.current = worker;

      const { data } = await worker.recognize(selectedImage);
      setExtractedText(data.text.trim());
      await worker.terminate();
      workerRef.current = null;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not extract text from this image.";
      setError(message);
    } finally {
      setProcessing(false);
      setProgress(0);
      setProgressLabel("");
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    await navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "extracted-text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <ImageToolLayout
      title="Image to Text Converter (OCR)"
      description="Extract text from any image, photo, or screenshot instantly in your browser. No upload, 100+ languages supported."
      content={<ToolContentSection data={toolContent["image-to-text"]} />}
    >
      <div className="space-y-6">
        <ImageDropzone
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          onClear={handleClear}
          accept="image/png, image/jpeg, image/jpg, image/webp, image/bmp"
        />

        {selectedImage && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <div className="space-y-1.5 flex-1">
                <label htmlFor="ocr-lang" className="text-sm font-semibold text-muted-foreground">Text Language</label>
                <select
                  id="ocr-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={processing}
                  className="w-full px-3 py-2 rounded-lg bg-background border text-sm outline-none cursor-pointer disabled:opacity-50"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
              <Button onClick={extractText} disabled={processing} className="h-10 gap-2">
                {processing ? <Loader2 className="animate-spin" size={18} /> : <ScanText size={18} />}
                {processing ? "Extracting..." : "Extract Text"}
              </Button>
            </div>

            {processing && (
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{progressLabel} {progress > 0 && `${progress}%`}</p>
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
            )}

            {extractedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="ocr-result" className="text-sm font-semibold text-muted-foreground">Extracted Text</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 h-8">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5 h-8">
                      <Download size={14} /> Download .txt
                    </Button>
                  </div>
                </div>
                <textarea
                  id="ocr-result"
                  readOnly
                  value={extractedText}
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none text-sm font-mono resize-y"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
