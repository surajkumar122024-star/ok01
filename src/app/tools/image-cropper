"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";

export default function ImageCropperPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, w: 200, h: 200 });
  const [dragging, setDragging] = useState(null); // null | 'move' | 'resize-se' | 'resize-sw' | 'resize-ne' | 'resize-nw'
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startBox, setStartBox] = useState(null);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 });
  const [aspectLock, setAspectLock] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [scale, setScale] = useState(1);

  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const HANDLE_SIZE = 10;

  // Load image onto canvas
  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxW = container.clientWidth || 700;
      const maxH = 480;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const s = Math.min(1, maxW / w, maxH / h);
      setScale(s);
      const dw = Math.round(w * s);
      const dh = Math.round(h * s);
      setImageSize({ w: dw, h: dh });

      const canvas = canvasRef.current;
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, dw, dh);
      imgRef.current = img;

      // Default crop: center 60%
      const bw = Math.round(dw * 0.6);
      const bh = Math.round(dh * 0.6);
      const bx = Math.round((dw - bw) / 2);
      const by = Math.round((dh - bh) / 2);
      setCropBox({ x: bx, y: by, w: bw, h: bh });
      setAspectRatio(bw / bh);
      setCroppedUrl(null);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Pointer helpers
  const getPos = (e) => {
    const rect = overlayRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const hitTest = (pos, box) => {
    const { x, y, w, h } = box;
    const hs = HANDLE_SIZE;
    if (pos.x >= x + w - hs && pos.x <= x + w + hs && pos.y >= y + h - hs && pos.y <= y + h + hs) return "resize-se";
    if (pos.x >= x - hs && pos.x <= x + hs && pos.y >= y + h - hs && pos.y <= y + h + hs) return "resize-sw";
    if (pos.x >= x + w - hs && pos.x <= x + w + hs && pos.y >= y - hs && pos.y <= y + hs) return "resize-ne";
    if (pos.x >= x - hs && pos.x <= x + hs && pos.y >= y - hs && pos.y <= y + hs) return "resize-nw";
    if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) return "move";
    return null;
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onPointerDown = useCallback((e) => {
    if (!imageSrc) return;
    e.preventDefault();
    const pos = getPos(e);
    const hit = hitTest(pos, cropBox);
    if (!hit) return;
    setDragging(hit);
    setStartPos(pos);
    setStartBox({ ...cropBox });
  }, [imageSrc, cropBox]);

  const onPointerMove = useCallback((e) => {
    if (!dragging || !startBox) return;
    e.preventDefault();
    const pos = getPos(e);
    const dx = pos.x - startPos.x;
    const dy = pos.y - startPos.y;
    const { w: iw, h: ih } = imageSize;
    let { x, y, w, h } = startBox;
    const minSize = 20;

    if (dragging === "move") {
      x = clamp(x + dx, 0, iw - w);
      y = clamp(y + dy, 0, ih - h);
    } else if (dragging === "resize-se") {
      w = clamp(w + dx, minSize, iw - x);
      h = aspectLock ? w / aspectRatio : clamp(h + dy, minSize, ih - y);
      w = aspectLock ? h * aspectRatio : w;
    } else if (dragging === "resize-sw") {
      const newW = clamp(w - dx, minSize, x + w);
      x = x + w - newW;
      w = newW;
      h = aspectLock ? w / aspectRatio : clamp(h + dy, minSize, ih - y);
    } else if (dragging === "resize-ne") {
      w = clamp(w + dx, minSize, iw - x);
      const newH = clamp(h - dy, minSize, y + h);
      y = y + h - newH;
      h = aspectLock ? w / aspectRatio : newH;
    } else if (dragging === "resize-nw") {
      const newW = clamp(w - dx, minSize, x + w);
      x = x + w - newW;
      w = newW;
      const newH = clamp(h - dy, minSize, y + h);
      y = y + h - newH;
      h = aspectLock ? w / aspectRatio : newH;
    }

    setCropBox({ x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
  }, [dragging, startPos, startBox, imageSize, aspectLock, aspectRatio]);

  const onPointerUp = useCallback(() => {
    if (dragging) {
      setAspectRatio(cropBox.w / cropBox.h);
    }
    setDragging(null);
    setStartBox(null);
  }, [dragging, cropBox]);

  const getCursor = () => {
    if (!imageSrc) return "default";
    return dragging ? (dragging === "move" ? "grabbing" : "nwse-resize") : "crosshair";
  };

  // File handling
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
    setCroppedUrl(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Crop action
  const doCrop = () => {
    if (!imgRef.current) return;
    const out = document.createElement("canvas");
    const { x, y, w, h } = cropBox;
    const s = scale;
    out.width = Math.round(w / s);
    out.height = Math.round(h / s);
    const ctx = out.getContext("2d");
    ctx.drawImage(imgRef.current, x / s, y / s, w / s, h / s, 0, 0, out.width, out.height);
    setCroppedUrl(out.toDataURL(outputFormat, 0.95));
  };

  const downloadCrop = () => {
    if (!croppedUrl) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : outputFormat === "image/webp" ? "webp" : "png";
    const a = document.createElement("a");
    a.href = croppedUrl;
    a.download = `cropped_${fileName || "image"}.${ext}`;
    a.click();
  };

  const reset = () => {
    setImageSrc(null);
    setFileName("");
    setCroppedUrl(null);
    setDragging(null);
  };

  const presets = [
    { label: "Free", ratio: null },
    { label: "1:1", ratio: 1 },
    { label: "4:3", ratio: 4 / 3 },
    { label: "16:9", ratio: 16 / 9 },
    { label: "3:2", ratio: 3 / 2 },
    { label: "2:3", ratio: 2 / 3 },
  ];

  const applyPreset = (ratio) => {
    if (ratio === null) {
      setAspectLock(false);
      return;
    }
    setAspectLock(true);
    setAspectRatio(ratio);
    const { x, y, w } = cropBox;
    const newH = Math.round(w / ratio);
    setCropBox((b) => ({ ...b, h: Math.min(newH, imageSize.h - y) }));
  };

  return (
    <>
      <Head>
        <title>Image Cropper – OpticShift Pro</title>
        <meta name="description" content="Crop images in your browser. No upload, 100% private. Supports aspect ratio presets and multiple output formats." />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0f; color: #e8e8f0; min-height: 100vh; }

        .page-wrap { max-width: 900px; margin: 0 auto; padding: 48px 20px 80px; }

        .page-header { text-align: center; margin-bottom: 40px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
        .page-title { font-size: clamp(28px, 5vw, 42px); font-weight: 800; letter-spacing: -0.03em; color: #f0f0ff; margin-bottom: 12px; }
        .page-title span { color: #818cf8; }
        .page-subtitle { color: #8888aa; font-size: 16px; }

        .card { background: #13131f; border: 1px solid #1e1e30; border-radius: 16px; padding: 28px; margin-bottom: 20px; }

        /* Drop Zone */
        .drop-zone { border: 2px dashed #2a2a40; border-radius: 12px; padding: 48px 24px; text-align: center; cursor: pointer; transition: all 0.2s; }
        .drop-zone:hover, .drop-zone.drag-over { border-color: #6366f1; background: rgba(99,102,241,0.05); }
        .drop-icon { width: 52px; height: 52px; background: rgba(99,102,241,0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; }
        .drop-title { font-size: 18px; font-weight: 700; color: #c8c8e8; margin-bottom: 6px; }
        .drop-sub { color: #5a5a7a; font-size: 14px; }
        .drop-sub b { color: #818cf8; cursor: pointer; }

        /* Toolbar */
        .toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 16px; }
        .toolbar-label { font-size: 12px; color: #5a5a7a; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .preset-btns { display: flex; gap: 6px; flex-wrap: wrap; }
        .preset-btn { padding: 5px 12px; border-radius: 6px; border: 1px solid #2a2a40; background: transparent; color: #8888aa; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .preset-btn:hover, .preset-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }
        .lock-toggle { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #8888aa; cursor: pointer; user-select: none; margin-left: auto; }
        .lock-toggle input { accent-color: #6366f1; width: 14px; height: 14px; }

        /* Canvas wrapper */
        .canvas-container { position: relative; display: inline-block; max-width: 100%; }
        .crop-canvas { display: block; max-width: 100%; border-radius: 8px; }
        .crop-overlay { position: absolute; inset: 0; }

        /* Overlay SVG */
        .overlay-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

        /* Info bar */
        .info-bar { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 12px; }
        .info-chip { background: #0f0f1c; border: 1px solid #1e1e30; border-radius: 6px; padding: 4px 10px; font-size: 12px; color: #6868aa; }
        .info-chip b { color: #a0a0cc; }

        /* Actions */
        .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover { background: #4f51e0; transform: translateY(-1px); }
        .btn-secondary { background: #1e1e30; color: #a0a0cc; border: 1px solid #2a2a40; }
        .btn-secondary:hover { background: #28283e; }
        .btn-success { background: #059669; color: #fff; }
        .btn-success:hover { background: #047857; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }

        select.format-select { padding: 8px 14px; border-radius: 8px; background: #1e1e30; border: 1px solid #2a2a40; color: #a0a0cc; font-size: 14px; cursor: pointer; outline: none; }
        select.format-select:focus { border-color: #6366f1; }

        /* Preview */
        .preview-wrap { margin-top: 24px; }
        .preview-title { font-size: 14px; font-weight: 700; color: #8888aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .preview-img { max-width: 100%; max-height: 300px; border-radius: 8px; border: 1px solid #1e1e30; display: block; }

        /* How it works */
        .how-section { margin-top: 32px; }
        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }

        .canvas-wrapper { overflow-x: auto; }
      `}</style>

      <div className="page-wrap">
        {/* Header */}
        <div className="page-header">
          <div className="badge">✂️ Browser-Side Tool</div>
          <h1 className="page-title">Image <span>Cropper</span></h1>
          <p className="page-subtitle">Crop images instantly in your browser. No upload, 100% private.</p>
        </div>

        <div className="card">
          {!imageSrc ? (
            /* Drop Zone */
            <div
              className={`drop-zone${isDragging ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              <div className="drop-icon">🖼️</div>
              <div className="drop-title">Drop your image here</div>
              <div className="drop-sub">or <b onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</b> to get started</div>
              <div className="drop-sub" style={{ marginTop: 8 }}>Supports JPG, PNG, WebP, GIF</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="toolbar">
                <span className="toolbar-label">Aspect Ratio</span>
                <div className="preset-btns">
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      className={`preset-btn${!aspectLock && p.ratio === null ? " active" : aspectLock && aspectRatio === p.ratio ? " active" : ""}`}
                      onClick={() => applyPreset(p.ratio)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <label className="lock-toggle">
                  <input type="checkbox" checked={aspectLock} onChange={(e) => setAspectLock(e.target.checked)} />
                  Lock ratio
                </label>
              </div>

              {/* Canvas */}
              <div className="canvas-wrapper">
                <div className="canvas-container" ref={containerRef}>
                  <canvas ref={canvasRef} className="crop-canvas" />
                  {/* Overlay for crop interaction */}
                  <div
                    ref={overlayRef}
                    className="crop-overlay"
                    style={{ cursor: getCursor() }}
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchMove={onPointerMove}
                    onTouchEnd={onPointerUp}
                  >
                    <svg className="overlay-svg" style={{ pointerEvents: "none" }}>
                      {/* Darken outside */}
                      <defs>
                        <mask id="cropMask">
                          <rect width="100%" height="100%" fill="white" />
                          <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="black" />
                        </mask>
                      </defs>
                      <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#cropMask)" />
                      {/* Crop border */}
                      <rect x={cropBox.x} y={cropBox.y} width={cropBox.w} height={cropBox.h} fill="none" stroke="#818cf8" strokeWidth="1.5" />
                      {/* Rule of thirds */}
                      {[1, 2].map((i) => (
                        <g key={i}>
                          <line x1={cropBox.x + (cropBox.w / 3) * i} y1={cropBox.y} x2={cropBox.x + (cropBox.w / 3) * i} y2={cropBox.y + cropBox.h} stroke="rgba(129,140,248,0.3)" strokeWidth="1" />
                          <line x1={cropBox.x} y1={cropBox.y + (cropBox.h / 3) * i} x2={cropBox.x + cropBox.w} y2={cropBox.y + (cropBox.h / 3) * i} stroke="rgba(129,140,248,0.3)" strokeWidth="1" />
                        </g>
                      ))}
                      {/* Handles */}
                      {[
                        [cropBox.x, cropBox.y],
                        [cropBox.x + cropBox.w, cropBox.y],
                        [cropBox.x, cropBox.y + cropBox.h],
                        [cropBox.x + cropBox.w, cropBox.y + cropBox.h],
                      ].map(([hx, hy], i) => (
                        <rect key={i} x={hx - HANDLE_SIZE / 2} y={hy - HANDLE_SIZE / 2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="#818cf8" rx="2" style={{ pointerEvents: "all", cursor: "nwse-resize" }} />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="info-bar">
                <div className="info-chip">Crop: <b>{cropBox.w} × {cropBox.h} px</b></div>
                <div className="info-chip">Output: <b>{Math.round(cropBox.w / scale)} × {Math.round(cropBox.h / scale)} px</b></div>
                <div className="info-chip">Position: <b>{cropBox.x}, {cropBox.y}</b></div>
              </div>

              {/* Actions */}
              <div className="actions">
                <select className="format-select" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                </select>
                <button className="btn btn-primary" onClick={doCrop}>✂️ Crop Image</button>
                {croppedUrl && (
                  <button className="btn btn-success" onClick={downloadCrop}>⬇ Download</button>
                )}
                <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
              </div>

              {/* Preview */}
              {croppedUrl && (
                <div className="preview-wrap">
                  <div className="preview-title">Cropped Preview</div>
                  <img src={croppedUrl} alt="Cropped" className="preview-img" />
                </div>
              )}
            </>
          )}
        </div>

        {/* How it works */}
        <div className="card how-section">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Your image is processed entirely inside your browser using HTML5 Canvas. Nothing is ever uploaded to a server.
            Select or drag an image, adjust the crop box by dragging the corners or moving the selection, choose an aspect ratio preset if needed, then click <b>Crop Image</b> to generate the result and download it.
          </p>
        </div>
      </div>
    </>
  );
}
