"use client";

import { useState, useRef } from "react";
import { FileText } from "lucide-react";
export default function PdfToImagePage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file || file.type !== "application/pdf") {
      setError("Sirf PDF file upload karein.");
      return;
    }
    setError("");
    setImages([]);
    setFileName(file.name);
    setLoading(true);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const generatedImages: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        generatedImages.push(canvas.toDataURL("image/png"));
      }

      setImages(generatedImages);
    } catch (e) {
      setError("PDF process karne mein error aaya. Dobara try karein.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function downloadImage(dataUrl: string, index: number) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `page-${index + 1}.png`;
    a.click();
  }

  function downloadAll() {
    images.forEach((img, i) => downloadImage(img, i));
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <a href="/" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>← Home</a>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>PDF to Image</span>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>PDF to Image</h1>
          <p style={{ fontSize: 15, color: "#6b7280", margin: 0 }}>
            PDF ke har page ko PNG image mein convert karein — bilkul free, browser mein
          </p>
        </div>

        {/* Upload Area */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? "#4f46e5" : "#d1d5db"}`,
            borderRadius: 16,
            padding: "3rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#f5f3ff" : "#fff",
            transition: "all 0.2s",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>📁</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 6px" }}>
            PDF yahan drop karein
          </p>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 16px" }}>ya click karke select karein</p>
          <div style={{
            display: "inline-block",
            padding: "8px 20px",
            background: "#4f46e5",
            color: "#fff",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
          }}>
            PDF Choose Karein
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 14, marginBottom: "1.5rem" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
            <p style={{ fontSize: 15, color: "#6b7280", margin: 0 }}>
              <strong>{fileName}</strong> convert ho raha hai...
            </p>
          </div>
        )}

        {/* Results */}
        {images.length > 0 && (
          <div>
            {/* Stats + Download All */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#111827" }}>
                  ✅ {images.length} page{images.length > 1 ? "s" : ""} convert ho gaye
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{fileName}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={downloadAll}
                  style={{
                    padding: "8px 18px",
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ⬇ Sab Download Karein
                </button>
                <button
                  onClick={() => { setImages([]); setFileName(""); }}
                  style={{
                    padding: "8px 18px",
                    background: "#fff",
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {images.map((img, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                  <img
                    src={img}
                    alt={`Page ${i + 1}`}
                    style={{ width: "100%", display: "block", borderBottom: "1px solid #e5e7eb" }}
                  />
                  <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Page {i + 1}</span>
                    <button
                      onClick={() => downloadImage(img, i)}
                      style={{
                        padding: "5px 12px",
                        background: "#f5f3ff",
                        color: "#4f46e5",
                        border: "1px solid #e0e7ff",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      ⬇ Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        {images.length === 0 && !loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
            {[
              { icon: "🔒", title: "100% Private", desc: "Sab kuch browser mein hota hai — koi upload nahi" },
              { icon: "⚡", title: "Fast", desc: "Seconds mein convert ho jata hai" },
              { icon: "📱", title: "Mobile Ready", desc: "Phone pe bhi kaam karta hai" },
              { icon: "🆓", title: "Bilkul Free", desc: "Koi payment nahi, koi limit nahi" },
            ].map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14, color: "#111827" }}>{f.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
