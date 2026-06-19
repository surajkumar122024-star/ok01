"use client";
import { useState, useRef, useCallback } from "react";

export default function WebpConverter() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(85);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!valid.length) return;
    const mapped = valid.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name.replace(/\.[^.]+$/, "") + ".webp",
      originalSize: f.size,
    }));
    setFiles((prev) => [...prev, ...mapped]);
    setConverted([]);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const convertToWebP = async () => {
    setConverting(true);
    const results = await Promise.all(
      files.map(
        (item) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                (blob) => {
                  resolve({
                    ...item,
                    blob,
                    webpSize: blob.size,
                    url: URL.createObjectURL(blob),
                    saving: (
                      ((item.originalSize - blob.size) / item.originalSize) *
                      100
                    ).toFixed(1),
                  });
                },
                "image/webp",
                quality / 100
              );
            };
            img.src = item.preview;
          })
      )
    );
    setConverted(results);
    setConverting(false);
  };

  const downloadAll = () => {
    converted.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.url;
      a.download = item.name;
      a.click();
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setConverted((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <div>
            <h1 style={styles.title}>WebP Converter</h1>
            <p style={styles.subtitle}>Images ko WebP format mein convert karo — faster loading, smaller size</p>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          style={{ ...styles.dropzone, ...(dragOver ? styles.dropzoneActive : {}) }}
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={dragOver ? "#6366f1" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
          </svg>
          <p style={styles.dropText}>
            {dragOver ? "Yahan drop karo!" : "Images drag & drop karo ya click karke select karo"}
          </p>
          <p style={styles.dropHint}>PNG, JPG, JPEG, GIF, BMP — multiple files supported</p>
        </div>

        {/* Quality Slider */}
        {files.length > 0 && (
          <div style={styles.qualityBox}>
            <div style={styles.qualityRow}>
              <span style={styles.qualityLabel}>Quality</span>
              <span style={styles.qualityValue}>{quality}%</span>
            </div>
            <input
              type="range" min="10" max="100" value={quality}
              onChange={(e) => { setQuality(+e.target.value); setConverted([]); }}
              style={styles.slider}
            />
            <div style={styles.qualityHints}>
              <span>Smaller file</span><span>Better quality</span>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div style={styles.fileList}>
            {files.map((item) => {
              const result = converted.find((c) => c.id === item.id);
              return (
                <div key={item.id} style={styles.fileRow}>
                  <img src={item.preview} alt="" style={styles.thumb} />
                  <div style={styles.fileInfo}>
                    <p style={styles.fileName}>{item.name}</p>
                    <p style={styles.fileMeta}>
                      Original: {formatSize(item.originalSize)}
                      {result && (
                        <span style={styles.saving}>
                          {" "}→ {formatSize(result.webpSize)}
                          {result.saving > 0 ? (
                            <span style={styles.savingBadge}>↓ {result.saving}% saved</span>
                          ) : (
                            <span style={styles.biggerBadge}>↑ larger</span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                  <div style={styles.fileActions}>
                    {result && (
                      <a href={result.url} download={result.name} style={styles.downloadBtn}>
                        ⬇ Download
                      </a>
                    )}
                    <button onClick={() => removeFile(item.id)} style={styles.removeBtn}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        {files.length > 0 && (
          <div style={styles.actions}>
            <button
              onClick={convertToWebP}
              disabled={converting}
              style={{ ...styles.convertBtn, ...(converting ? styles.btnDisabled : {}) }}
            >
              {converting ? "Converting..." : `Convert ${files.length} Image${files.length > 1 ? "s" : ""} to WebP`}
            </button>
            {converted.length > 0 && (
              <button onClick={downloadAll} style={styles.downloadAllBtn}>
                ⬇ Download All
              </button>
            )}
            <button onClick={() => { setFiles([]); setConverted([]); }} style={styles.clearBtn}>
              Clear All
            </button>
          </div>
        )}

        {/* Stats */}
        {converted.length > 0 && (
          <div style={styles.stats}>
            {(() => {
              const totalOrig = converted.reduce((s, c) => s + c.originalSize, 0);
              const totalNew = converted.reduce((s, c) => s + c.webpSize, 0);
              const totalSaved = totalOrig - totalNew;
              const pct = ((totalSaved / totalOrig) * 100).toFixed(1);
              return (
                <>
                  <div style={styles.statItem}>
                    <span style={styles.statNum}>{formatSize(totalOrig)}</span>
                    <span style={styles.statLabel}>Original</span>
                  </div>
                  <div style={styles.statArrow}>→</div>
                  <div style={styles.statItem}>
                    <span style={{ ...styles.statNum, color: "#22c55e" }}>{formatSize(totalNew)}</span>
                    <span style={styles.statLabel}>WebP Size</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={{ ...styles.statNum, color: "#6366f1" }}>
                      {totalSaved > 0 ? `-${pct}%` : `+${Math.abs(+pct)}%`}
                    </span>
                    <span style={styles.statLabel}>Total {totalSaved > 0 ? "Saved" : "Increased"}</span>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  card: { width: "100%", maxWidth: 680, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 32 },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
  iconWrap: { width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  title: { margin: 0, fontSize: 22, fontWeight: 700, color: "#1e293b" },
  subtitle: { margin: "4px 0 0", fontSize: 13, color: "#64748b" },
  dropzone: { border: "2px dashed #cbd5e1", borderRadius: 14, padding: "36px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#f8fafc", marginBottom: 20 },
  dropzoneActive: { borderColor: "#6366f1", background: "#eef2ff" },
  dropText: { margin: "12px 0 4px", fontSize: 15, color: "#475569", fontWeight: 500 },
  dropHint: { margin: 0, fontSize: 12, color: "#94a3b8" },
  qualityBox: { background: "#f8fafc", borderRadius: 12, padding: "16px 20px", marginBottom: 20 },
  qualityRow: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  qualityLabel: { fontSize: 13, fontWeight: 600, color: "#475569" },
  qualityValue: { fontSize: 13, fontWeight: 700, color: "#6366f1" },
  slider: { width: "100%", accentColor: "#6366f1", cursor: "pointer" },
  qualityHints: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8", marginTop: 4 },
  fileList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  fileRow: { display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", borderRadius: 12, padding: "10px 14px" },
  thumb: { width: 48, height: 48, objectFit: "cover", borderRadius: 8, flexShrink: 0, border: "1px solid #e2e8f0" },
  fileInfo: { flex: 1, minWidth: 0 },
  fileName: { margin: 0, fontSize: 13, fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  fileMeta: { margin: "2px 0 0", fontSize: 12, color: "#64748b" },
  saving: { color: "#475569" },
  savingBadge: { marginLeft: 6, background: "#dcfce7", color: "#16a34a", borderRadius: 6, padding: "1px 6px", fontSize: 11, fontWeight: 700 },
  biggerBadge: { marginLeft: 6, background: "#fee2e2", color: "#dc2626", borderRadius: 6, padding: "1px 6px", fontSize: 11, fontWeight: 700 },
  fileActions: { display: "flex", gap: 8, alignItems: "center", flexShrink: 0 },
  downloadBtn: { fontSize: 12, fontWeight: 600, color: "#6366f1", background: "#eef2ff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", textDecoration: "none" },
  removeBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 16, padding: "4px 8px", borderRadius: 6, lineHeight: 1 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 },
  convertBtn: { flex: 1, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  downloadAllBtn: { background: "#ecfdf5", color: "#16a34a", border: "none", borderRadius: 12, padding: "13px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  clearBtn: { background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 12, padding: "13px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  stats: { display: "flex", alignItems: "center", justifyContent: "center", gap: 24, background: "#f8fafc", borderRadius: 14, padding: "16px 24px" },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  statNum: { fontSize: 18, fontWeight: 800, color: "#1e293b" },
  statLabel: { fontSize: 11, color: "#94a3b8", fontWeight: 500 },
  statArrow: { fontSize: 20, color: "#cbd5e1" },
};
