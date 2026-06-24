"use client";

import { useState, useRef, useEffect } from "react";

const POSITIONS = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Center", value: "top-center" },
  { label: "Top Right", value: "top-right" },
  { label: "Center", value: "center" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Tile", value: "tile" },
];

export default function ImageWatermarkClient() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("text"); // "text" | "logo"
  const [watermarkText, setWatermarkText] = useState("© My Brand");
  const [fontSize, setFontSize] = useState(36);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(70);
  const [position, setPosition] = useState("bottom-right");
  const [padding, setPadding] = useState(20);
  const [logoSrc, setLogoSrc] = useState(null);
  const [logoSize, setLogoSize] = useState(120);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [resultUrl, setResultUrl] = useState(null);

  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => { setImageSrc(e.target.result); setResultUrl(null); };
    reader.readAsDataURL(file);
  };

  const handleLogo = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogoSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const getXY = (pos, iw, ih, ww, wh, pad) => {
    switch (pos) {
      case "top-left": return [pad, pad];
      case "top-center": return [(iw - ww) / 2, pad];
      case "top-right": return [iw - ww - pad, pad];
      case "center": return [(iw - ww) / 2, (ih - wh) / 2];
      case "bottom-left": return [pad, ih - wh - pad];
      case "bottom-center": return [(iw - ww) / 2, ih - wh - pad];
      case "bottom-right": return [iw - ww - pad, ih - wh - pad];
      default: return [pad, pad];
    }
  };

  const applyWatermark = () => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;

      if (mode === "text") {
        ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
        ctx.fillStyle = fontColor;
        const metrics = ctx.measureText(watermarkText);
        const tw = metrics.width;
        const th = fontSize;

        if (position === "tile") {
          for (let y = padding; y < img.naturalHeight; y += th * 3) {
            for (let x = padding; x < img.naturalWidth; x += tw + 60) {
              ctx.fillText(watermarkText, x, y + th);
            }
          }
        } else {
          const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, tw, th, padding);
          ctx.fillText(watermarkText, x, y + th);
        }
      } else if (mode === "logo" && logoSrc) {
        const logo = new window.Image();
        logo.onload = () => {
          const ratio = logo.naturalWidth / logo.naturalHeight;
          const lw = logoSize;
          const lh = logoSize / ratio;

          if (position === "tile") {
            for (let y = padding; y < img.naturalHeight; y += lh * 2) {
              for (let x = padding; x < img.naturalWidth; x += lw * 2) {
                ctx.drawImage(logo, x, y, lw, lh);
              }
            }
          } else {
            const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, lw, lh, padding);
            ctx.drawImage(logo, x, y, lw, lh);
          }
          ctx.globalAlpha = 1;
          setResultUrl(canvas.toDataURL(outputFormat, 0.95));
        };
        logo.src = logoSrc;
        return;
      }

      ctx.globalAlpha = 1;
      setResultUrl(canvas.toDataURL(outputFormat, 0.95));
    };
    img.src = imageSrc;
  };

  const download = () => {
    if (!resultUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `watermarked_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setLogoSrc(null);
    setFileName("");
    setResultUrl(null);
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
        .section-title { font-size: 13px; font-weight: 700; color: #6868aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
        .mode-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
        .mode-tab { padding: 8px 20px; border-radius: 8px; border: 1px solid #2a2a40; background: transparent; color: #8888aa; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .mode-tab.active { background: #6366f1; border-color: #6366f1; color: #fff; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 12px; color: #6868aa; font-weight: 600; }
        .form-input { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; }
        .form-input:focus { border-color: #6366f1; }
        .form-input[type="range"] { padding: 6px 0; accent-color: #6366f1; background: transparent; border: none; }
        .form-input[type="color"] { padding: 4px; height: 40px; cursor: pointer; }
        .form-select { padding: 9px 12px; border-radius: 8px; background: #1a1a2e; border: 1px solid #2a2a40; color: #c8c8e8; font-size: 14px; outline: none; cursor: pointer; }
        .form-select:focus { border-color: #6366f1; }
        .logo-upload { border: 2px dashed #2a2a40; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; font-size: 13px; color: #6868aa; }
        .logo-upload:hover { border-color: #6366f1; color: #818cf8; }
        .logo-preview { max-height: 60px; max-width: 120px; border-radius: 6px; margin-top: 8px; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover { background: #4f51e0; transform: translateY(-1px); }
        .btn-success { background: #059669; color: #fff; }
        .btn-success:hover { background: #047857; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }
        select.format-select { padding: 8px 14px; border-radius: 8px; background: #1e1e30; border: 1px solid #2a2a40; color: #a0a0cc; font-size: 14px; cursor: pointer; outline: none; }
        .preview-wrap { margin-top: 24px; }
        .preview-title { font-size: 14px; font-weight: 700; color: #8888aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .preview-img { max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid #1e1e30; display: block; }
        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }
        canvas { display: none; }
      `}</style>

      <canvas ref={canvasRef} />

      <div className="page-wrap">
        {/* Header */}
        <div className="page-header">
          <div className="badge">💧 Browser-Side Tool</div>
          <h1 className="page-title">Image <span>Watermark</span></h1>
          <p className="page-subtitle">Add text or logo watermarks instantly. No upload, 100% private.</p>
        </div>

        {/* Upload */}
        <div className="card">
          {!imageSrc ? (
            <div
              className={`drop-zone${isDragging ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            >
              <div className="drop-icon">🖼️</div>
              <div className="drop-title">Drop your image here</div>
              <div className="drop-sub">or <b onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</b></div>
              <div className="drop-sub" style={{ marginTop: 8 }}>Supports JPG, PNG, WebP</div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <>
              {/* Mode Tabs */}
              <div className="section-title">Watermark Type</div>
              <div className="mode-tabs">
                <button className={`mode-tab${mode === "text" ? " active" : ""}`} onClick={() => setMode("text")}>✏️ Text</button>
                <button className={`mode-tab${mode === "logo" ? " active" : ""}`} onClick={() => setMode("logo")}>🖼 Logo / Image</button>
              </div>

              {/* Text Options */}
              {mode === "text" && (
                <div className="form-grid">
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Watermark Text</label>
                    <input className="form-input" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="© Your Brand" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Font Size: {fontSize}px</label>
                    <input className="form-input" type="range" min="12" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Text Color</label>
                    <input className="form-input" type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Logo Options */}
              {mode === "logo" && (
                <div className="form-grid">
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Logo Image</label>
                    <div className="logo-upload" onClick={() => logoInputRef.current?.click()}>
                      {logoSrc ? <img src={logoSrc} alt="Logo" className="logo-preview" /> : "Click to upload logo (PNG recommended)"}
                      <input ref={logoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleLogo(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Logo Size: {logoSize}px</label>
                    <input className="form-input" type="range" min="20" max="400" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} />
                  </div>
                </div>
              )}

              {/* Common Options */}
              <div className="form-grid" style={{ marginTop: 16 }}>
                <div className="form-group">
                  <label className="form-label">Position</label>
                  <select className="form-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                    {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Opacity: {opacity}%</label>
                  <input className="form-input" type="range" min="5" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Padding: {padding}px</label>
                  <input className="form-input" type="range" min="0" max="100" value={padding} onChange={(e) => setPadding(Number(e.target.value))} />
                </div>
              </div>

              {/* Actions */}
              <div className="actions">
                <select className="format-select" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                </select>
                <button className="btn btn-primary" onClick={applyWatermark}>💧 Apply Watermark</button>
                {resultUrl && <button className="btn btn-success" onClick={download}>⬇ Download</button>}
                <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
              </div>

              {/* Preview */}
              {resultUrl && (
                <div className="preview-wrap">
                  <div className="preview-title">Preview</div>
                  <img src={resultUrl} alt="Watermarked" className="preview-img" />
                </div>
              )}
            </>
          )}
        </div>

        {/* How it works */}
        <div className="card">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Upload your image, choose text or logo watermark, adjust position, opacity, and size — then click Apply. Everything runs in your browser using HTML5 Canvas. No data is ever sent to a server.
          </p>
        </div>
      </div>
    </>
  );
}
