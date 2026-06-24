"use client";

import { useState, useRef } from "react";

export default function ImageRotateClient() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [resultUrl, setResultUrl] = useState(null);
  const [previewStyle, setPreviewStyle] = useState({});

  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  const updatePreview = (rot, fh, fv) => {
    const scaleX = fh ? -1 : 1;
    const scaleY = fv ? -1 : 1;
    setPreviewStyle({
      transform: `rotate(${rot}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
      transition: "transform 0.3s ease",
    });
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setResultUrl(null);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setPreviewStyle({});
    };
    reader.readAsDataURL(file);
  };

  const rotate = (deg) => {
    const newRot = (rotation + deg + 360) % 360;
    setRotation(newRot);
    updatePreview(newRot, flipH, flipV);
    setResultUrl(null);
  };

  const toggleFlipH = () => {
    const newFlip = !flipH;
    setFlipH(newFlip);
    updatePreview(rotation, newFlip, flipV);
    setResultUrl(null);
  };

  const toggleFlipV = () => {
    const newFlip = !flipV;
    setFlipV(newFlip);
    updatePreview(rotation, flipH, newFlip);
    setResultUrl(null);
  };

  const applyAndExport = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const ow = img.naturalWidth;
    const oh = img.naturalHeight;
    const cw = Math.round(ow * cos + oh * sin);
    const ch = Math.round(ow * sin + oh * cos);

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");

    ctx.translate(cw / 2, ch / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -ow / 2, -oh / 2);

    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    setResultUrl(canvas.toDataURL(outputFormat, 0.95));
  };

  const download = () => {
    if (!resultUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `rotated_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setFileName("");
    setResultUrl(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setPreviewStyle({});
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

        /* Preview box */
        .preview-box { background: repeating-conic-gradient(#1e1e30 0% 25%, #13131f 0% 50%) 0 0 / 20px 20px; border-radius: 12px; display: flex; align-items: center; justify-content: center; min-height: 260px; overflow: hidden; margin-bottom: 24px; }
        .preview-box img { max-width: 90%; max-height: 260px; object-fit: contain; border-radius: 4px; }

        /* Controls */
        .controls { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px; }
        .ctrl-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 16px; border-radius: 10px; border: 1px solid #2a2a40; background: #1a1a2e; color: #a0a0cc; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; min-width: 72px; }
        .ctrl-btn:hover { border-color: #6366f1; color: #fff; background: #1e1e35; }
        .ctrl-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }
        .ctrl-icon { font-size: 22px; }

        .divider { border: none; border-top: 1px solid #1e1e30; margin: 20px 0; }
        .info-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
        .info-chip { background: #0f0f1c; border: 1px solid #1e1e30; border-radius: 6px; padding: 4px 10px; font-size: 12px; color: #6868aa; }
        .info-chip b { color: #a0a0cc; }

        .actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover { background: #4f51e0; transform: translateY(-1px); }
        .btn-success { background: #059669; color: #fff; }
        .btn-success:hover { background: #047857; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }
        select.format-select { padding: 8px 14px; border-radius: 8px; background: #1e1e30; border: 1px solid #2a2a40; color: #a0a0cc; font-size: 14px; cursor: pointer; outline: none; }

        .result-wrap { margin-top: 24px; }
        .result-title { font-size: 14px; font-weight: 700; color: #8888aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .result-img { max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid #1e1e30; display: block; }

        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }
      `}</style>

      <div className="page-wrap">
        {/* Header */}
        <div className="page-header">
          <div className="badge">🔄 Browser-Side Tool</div>
          <h1 className="page-title">Image <span>Rotate & Flip</span></h1>
          <p className="page-subtitle">Rotate or flip images instantly. No upload, 100% private.</p>
        </div>

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
              <div className="drop-sub" style={{ marginTop: 8 }}>Supports JPG, PNG, WebP, GIF</div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <>
              {/* Live Preview */}
              <div className="preview-box">
                <img ref={imgRef} src={imageSrc} alt="Preview" style={previewStyle} crossOrigin="anonymous" />
              </div>

              {/* Controls */}
              <div className="controls">
                <button className="ctrl-btn" onClick={() => rotate(-90)}>
                  <span className="ctrl-icon">↺</span> Rotate Left
                </button>
                <button className="ctrl-btn" onClick={() => rotate(90)}>
                  <span className="ctrl-icon">↻</span> Rotate Right
                </button>
                <button className="ctrl-btn" onClick={() => rotate(180)}>
                  <span className="ctrl-icon">🔃</span> 180°
                </button>
                <button className={`ctrl-btn${flipH ? " active" : ""}`} onClick={toggleFlipH}>
                  <span className="ctrl-icon">↔️</span> Flip H
                </button>
                <button className={`ctrl-btn${flipV ? " active" : ""}`} onClick={toggleFlipV}>
                  <span className="ctrl-icon">↕️</span> Flip V
                </button>
              </div>

              <hr className="divider" />

              {/* Info */}
              <div className="info-bar">
                <div className="info-chip">Rotation: <b>{rotation}°</b></div>
                <div className="info-chip">Flip H: <b>{flipH ? "Yes" : "No"}</b></div>
                <div className="info-chip">Flip V: <b>{flipV ? "Yes" : "No"}</b></div>
              </div>

              {/* Actions */}
              <div className="actions">
                <select className="format-select" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                </select>
                <button className="btn btn-primary" onClick={applyAndExport}>🔄 Apply & Export</button>
                {resultUrl && <button className="btn btn-success" onClick={download}>⬇ Download</button>}
                <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
              </div>

              {/* Result */}
              {resultUrl && (
                <div className="result-wrap">
                  <div className="result-title">Result</div>
                  <img src={resultUrl} alt="Result" className="result-img" />
                </div>
              )}
            </>
          )}
        </div>

        {/* How it works */}
        <div className="card">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Upload your image, use the rotate buttons to turn it 90°, 180°, or 270°, and flip it horizontally or vertically. The live preview updates instantly. Click "Apply & Export" to render the final image and download it — all processing happens in your browser.
          </p>
        </div>
      </div>
    </>
  );
}
