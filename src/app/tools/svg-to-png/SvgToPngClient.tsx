"use client";

import { useState, useRef } from "react";

export default function SvgToPngClient() {
  const [svgSrc, setSvgSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(2);
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");
  const [bgColor, setBgColor] = useState("transparent");
  const [bgHex, setBgHex] = useState("#ffffff");
  const [resultUrl, setResultUrl] = useState(null);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      setError("Please upload a valid SVG file.");
      return;
    }
    setError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setSvgSrc(text);
      setResultUrl(null);

      // Parse SVG size
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "image/svg+xml");
      const svg = doc.querySelector("svg");
      let w = parseFloat(svg?.getAttribute("width")) || 0;
      let h = parseFloat(svg?.getAttribute("height")) || 0;
      if (!w || !h) {
        const vb = svg?.getAttribute("viewBox")?.split(/[\s,]+/);
        if (vb && vb.length === 4) { w = parseFloat(vb[2]); h = parseFloat(vb[3]); }
      }
      setSvgSize({ w: w || 300, h: h || 300 });

      // Preview
      const blob = new Blob([text], { type: "image/svg+xml" });
      setPreview(URL.createObjectURL(blob));
    };
    reader.readAsText(file);
  };

  const convert = () => {
    if (!svgSrc) return;
    const outW = customW ? parseInt(customW) : Math.round(svgSize.w * scale);
    const outH = customH ? parseInt(customH) : Math.round(svgSize.h * scale);

    const canvas = canvasRef.current;
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");

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
        .section-title { font-size: 13px; font-weight: 700; color: #6868aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 12px; color: #6868aa; font-weight: 600; }
        .form-input { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; }
        .form-input:focus { border-color: #6366f1; }
        .form-input[type="range"] { padding: 6px 0; accent-color: #6366f1; background: transparent; border: none; }
        .form-input[type="color"] { padding: 4px; height: 40px; cursor: pointer; }
        .form-select { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; cursor: pointer; }
        .info-bar { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 16px; }
        .info-chip { background: #0f0f1c; border: 1px solid #1e1e30; border-radius: 6px; padding: 4px 10px; font-size: 12px; color: #6868aa; }
        .info-chip b { color: #a0a0cc; }
        .svg-preview { max-width: 100%; max-height: 200px; display: block; margin: 16px auto 0; border-radius: 8px; border: 1px solid #1e1e30; background: repeating-conic-gradient(#1e1e30 0% 25%, #13131f 0% 50%) 0 0 / 16px 16px; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover { background: #4f51e0; transform: translateY(-1px); }
        .btn-success { background: #059669; color: #fff; }
        .btn-success:hover { background: #047857; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }
        .error-msg { color: #f87171; font-size: 13px; margin-top: 10px; }
        .preview-wrap { margin-top: 24px; }
        .preview-title { font-size: 14px; font-weight: 700; color: #8888aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .preview-img { max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid #1e1e30; display: block; }
        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }
        canvas { display: none; }
        .divider { border: none; border-top: 1px solid #1e1e30; margin: 20px 0; }
      `}</style>

      <canvas ref={canvasRef} />

      <div className="page-wrap">
        {/* Header */}
        <div className="page-header">
          <div className="badge">🔷 Browser-Side Tool</div>
          <h1 className="page-title">SVG to <span>PNG</span></h1>
          <p className="page-subtitle">Convert SVG files to PNG instantly. No upload, 100% private.</p>
        </div>

        <div className="card">
          {!svgSrc ? (
            <div
              className={`drop-zone${isDragging ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            >
              <div className="drop-icon">🔷</div>
              <div className="drop-title">Drop your SVG here</div>
              <div className="drop-sub">or <b onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</b></div>
              <div className="drop-sub" style={{ marginTop: 8 }}>Only .svg files supported</div>
              <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <>
              {/* SVG Preview */}
              {preview && <img src={preview} alt="SVG Preview" className="svg-preview" />}

              <hr className="divider" />

              {/* Settings */}
              <div className="section-title" style={{ marginTop: 4 }}>Output Settings</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Scale: {scale}x</label>
                  <input className="form-input" type="range" min="1" max="8" step="0.5" value={scale} onChange={(e) => { setScale(parseFloat(e.target.value)); setCustomW(""); setCustomH(""); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Background</label>
                  <select className="form-select" value={bgColor} onChange={(e) => setBgColor(e.target.value)}>
                    <option value="transparent">Transparent</option>
                    <option value="color">Custom Color</option>
                  </select>
                </div>
                {bgColor === "color" && (
                  <div className="form-group">
                    <label className="form-label">Background Color</label>
                    <input className="form-input" type="color" value={bgHex} onChange={(e) => setBgHex(e.target.value)} />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Custom Width (px)</label>
                  <input className="form-input" type="number" placeholder={`Auto (${outW}px)`} value={customW} onChange={(e) => setCustomW(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Custom Height (px)</label>
                  <input className="form-input" type="number" placeholder={`Auto (${outH}px)`} value={customH} onChange={(e) => setCustomH(e.target.value)} />
                </div>
              </div>

              {/* Info */}
              <div className="info-bar">
                <div className="info-chip">SVG Size: <b>{svgSize.w} × {svgSize.h}</b></div>
                <div className="info-chip">Output: <b>{outW} × {outH} px</b></div>
              </div>

              {error && <div className="error-msg">⚠️ {error}</div>}

              {/* Actions */}
              <div className="actions">
                <button className="btn btn-primary" onClick={convert}>🔷 Convert to PNG</button>
                {resultUrl && <button className="btn btn-success" onClick={download}>⬇ Download PNG</button>}
                <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
              </div>

              {/* Result Preview */}
              {resultUrl && (
                <div className="preview-wrap">
                  <div className="preview-title">PNG Output</div>
                  <img src={resultUrl} alt="PNG Output" className="preview-img" />
                </div>
              )}
            </>
          )}
        </div>

        {/* How it works */}
        <div className="card">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Upload your SVG file, choose scale (1x–8x) or set a custom width/height, pick a background color or keep it transparent, then click Convert. The SVG is rendered to a PNG canvas entirely in your browser — nothing leaves your device.
          </p>
        </div>
      </div>
    </>
  );
}
