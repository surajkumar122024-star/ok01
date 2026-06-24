"use client";

import { useState, useRef } from "react";

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

    // Dynamically load heic2any
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
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page-wrap { max-width: 900px; margin: 0 auto; padding: 48px 20px 80px; }
        .page-header { text-align: center; margin-bottom: 40px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
        .page-title { font-size: clamp(28px, 5vw, 42px); font-weight: 800; letter-spacing: -0.03em; color: #f0f0ff; margin-bottom: 12px; }
        .page-title span { color: #818cf8; }
        .page-subtitle { color: #8888aa; font-size: 16px; }
        .card { background: #13131f; border: 1px solid #1e1e30; border-radius: 16px; padding: 28px; margin-bottom: 20px; }
        .drop-zone { border: 2px dashed #2a2a40; border-radius: 12px; padding: 48px 24px; text-align: center; cursor: pointer; transition: all 0.2s; }
        .drop-zone:hover, .drop-zone.drag-over { border-color: #6366f1; background: rgba(99,102,241,0.05); }
        .drop-icon { width: 52px; height: 52px; background: rgba(99,102,241,0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; }
        .drop-title { font-size: 18px; font-weight: 700; color: #c8c8e8; margin-bottom: 6px; }
        .drop-sub { color: #5a5a7a; font-size: 14px; }
        .drop-sub b { color: #818cf8; cursor: pointer; }
        .file-list { margin-top: 20px; display: flex; flex-direction: column; gap: 8px; }
        .file-item { display: flex; align-items: center; gap: 12px; background: #0f0f1c; border: 1px solid #1e1e30; border-radius: 8px; padding: 10px 14px; }
        .file-icon { font-size: 20px; }
        .file-name { flex: 1; font-size: 14px; color: #c8c8e8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .file-remove { background: none; border: none; color: #f87171; cursor: pointer; font-size: 16px; padding: 2px 6px; border-radius: 4px; }
        .file-remove:hover { background: #2a1010; }
        .settings-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 20px; align-items: flex-end; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 12px; color: #6868aa; font-weight: 600; }
        .form-input { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; }
        .form-input[type="range"] { padding: 6px 0; accent-color: #6366f1; background: transparent; border: none; width: 140px; }
        .form-select { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; cursor: pointer; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover:not(:disabled) { background: #4f51e0; transform: translateY(-1px); }
        .btn-success { background: #059669; color: #fff; }
        .btn-success:hover { background: #047857; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }
        .results { margin-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .result-item { display: flex; align-items: center; gap: 12px; border-radius: 10px; padding: 12px 16px; }
        .result-done { background: rgba(5,150,105,0.08); border: 1px solid rgba(5,150,105,0.25); }
        .result-error { background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2); }
        .result-thumb { width: 44px; height: 44px; border-radius: 6px; object-fit: cover; background: #1e1e30; }
        .result-info { flex: 1; }
        .result-name { font-size: 14px; color: #c8c8e8; font-weight: 600; }
        .result-meta { font-size: 12px; color: #6868aa; margin-top: 2px; }
        .result-error-msg { font-size: 12px; color: #f87171; margin-top: 2px; }
        .result-dl { padding: 6px 14px; border-radius: 6px; background: #059669; color: #fff; font-size: 13px; font-weight: 700; border: none; cursor: pointer; text-decoration: none; }
        .result-dl:hover { background: #047857; }
        .spinner { display: inline-block; width: 18px; height: 18px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px; vertical-align: middle; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }
        .note { background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #8888cc; margin-top: 16px; }
      `}</style>

      <div className="page-wrap">
        {/* Header */}
        <div className="page-header">
          <div className="badge">📱 iPhone Photo Converter</div>
          <h1 className="page-title">HEIC to <span>JPG</span></h1>
          <p className="page-subtitle">Convert iPhone HEIC photos to JPG instantly. No upload, 100% private.</p>
        </div>

        <div className="card">
          {/* Drop Zone */}
          <div
            className={`drop-zone${isDragging ? " drag-over" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          >
            <div className="drop-icon">📱</div>
            <div className="drop-title">Drop HEIC / HEIF files here</div>
            <div className="drop-sub">or <b onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</b> — multiple files supported</div>
            <div className="drop-sub" style={{ marginTop: 8 }}>Only .heic and .heif files</div>
            <input ref={fileInputRef} type="file" accept=".heic,.heif,image/heic,image/heif" multiple style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files!)} />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="file-list">
              {files.map((f, i) => (
                <div key={i} className="file-item">
                  <span className="file-icon">📷</span>
                  <span className="file-name">{f.name}</span>
                  <span style={{ fontSize: 12, color: "#5a5a7a" }}>{(f.size / 1024).toFixed(0)} KB</span>
                  <button className="file-remove" onClick={() => removeFile(i)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Settings */}
          {files.length > 0 && (
            <div className="settings-row">
              <div className="form-group">
                <label className="form-label">Output Format</label>
                <select className="form-select" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as any)}>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>
              {outputFormat === "image/jpeg" && (
                <div className="form-group">
                  <label className="form-label">Quality: {quality}%</label>
                  <input className="form-input" type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {files.length > 0 && (
            <div className="actions">
              <button className="btn btn-primary" onClick={convertAll} disabled={converting}>
                {converting && <span className="spinner" />}
                {converting ? "Converting..." : `🔄 Convert ${files.length} File${files.length > 1 ? "s" : ""}`}
              </button>
              {results.some((r) => r.status === "done") && (
                <button className="btn btn-success" onClick={downloadAll}>⬇ Download All</button>
              )}
              <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="results">
              {results.map((r, i) => (
                <div key={i} className={`result-item ${r.status === "done" ? "result-done" : "result-error"}`}>
                  {r.status === "done" && <img src={r.url} alt={r.name} className="result-thumb" />}
                  {r.status === "error" && <span style={{ fontSize: 28 }}>⚠️</span>}
                  <div className="result-info">
                    <div className="result-name">{r.name}</div>
                    {r.status === "done" && <div className="result-meta">✅ {r.size}</div>}
                    {r.status === "error" && <div className="result-error-msg">{r.error}</div>}
                  </div>
                  {r.status === "done" && (
                    <a href={r.url} download={r.name} className="result-dl">⬇ Save</a>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="note">
            💡 HEIC is Apple's default photo format on iPhone (iOS 11+). This tool converts them to JPG/PNG so they open on any device or platform.
          </div>
        </div>

        {/* How it works */}
        <div className="card">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Upload one or more HEIC/HEIF files, choose output format (JPG or PNG) and quality, then click Convert. The conversion happens entirely in your browser using the open-source heic2any library. Nothing is ever uploaded to a server — your photos stay on your device.
          </p>
        </div>
      </div>
    </>
  );
}
