"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface PickedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPickerClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickedColor, setPickedColor] = useState<PickedColor | null>(null);
  const [palette, setPalette] = useState<PickedColor[]>([]);
  const [zoom, setZoom] = useState<{ x: number; y: number; pixels: Uint8ClampedArray | null }>({ x: 0, y: 0, pixels: null });
  const [copied, setCopied] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const drawImage = useCallback((src: string) => {
    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current!;
      const container = canvas.parentElement!;
      const maxW = container.clientWidth || 700;
      const maxH = 480;
      const s = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
      canvas.width = Math.round(img.naturalWidth * s);
      canvas.height = Math.round(img.naturalHeight * s);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = src;
  }, []);

  useEffect(() => { if (imageSrc) drawImage(imageSrc); }, [imageSrc, drawImage]);

  const getColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d")!;
    const px = ctx.getImageData(x, y, 1, 1).data;
    return { x, y, r: px[0], g: px[1], b: px[2] };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y, r, g, b } = getColor(e);
    const rect = canvasRef.current!.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    // Zoom pixels
    const ctx = canvasRef.current!.getContext("2d")!;
    const zoomData = ctx.getImageData(Math.max(0, x - 4), Math.max(0, y - 4), 9, 9).data;
    setZoom({ x, y, pixels: zoomData });
    setPickedColor({
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
    });
  };

  const onMouseLeave = () => {
    setCursor(null);
    setZoom({ x: 0, y: 0, pixels: null });
  };

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { r, g, b } = getColor(e);
    const color: PickedColor = {
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
    };
    setPalette((prev) => [color, ...prev.slice(0, 11)]);
    setPickedColor(color);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => { setImageSrc(null); setPickedColor(null); setPalette([]); };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page-wrap { max-width: 960px; margin: 0 auto; padding: 48px 20px 80px; }
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

        /* Canvas area */
        .canvas-wrap { position: relative; display: inline-block; max-width: 100%; cursor: crosshair; }
        .pick-canvas { display: block; max-width: 100%; border-radius: 8px; }

        /* Cursor magnifier */
        .magnifier { position: absolute; pointer-events: none; width: 100px; height: 100px; border-radius: 50%; border: 3px solid #6366f1; box-shadow: 0 4px 20px rgba(0,0,0,0.5); overflow: hidden; transform: translate(-50%, -110%); background: #000; z-index: 10; }
        .magnifier canvas { width: 100px; height: 100px; image-rendering: pixelated; }

        /* Color info panel */
        .color-panel { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; margin-top: 20px; }
        .color-swatch-big { width: 80px; height: 80px; border-radius: 12px; border: 2px solid #2a2a40; flex-shrink: 0; }
        .color-values { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .color-row { display: flex; align-items: center; gap: 10px; }
        .color-label { font-size: 11px; color: #5a5a7a; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; width: 28px; }
        .color-value { font-size: 14px; color: #c8c8e8; font-family: monospace; flex: 1; }
        .copy-btn { padding: 4px 10px; border-radius: 6px; background: #1e1e30; border: 1px solid #2a2a40; color: #8888aa; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .copy-btn:hover { border-color: #6366f1; color: #a5b4fc; }
        .copy-btn.copied { background: #059669; border-color: #059669; color: #fff; }

        /* Palette */
        .palette-title { font-size: 13px; font-weight: 700; color: #6868aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; margin-top: 20px; }
        .palette-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .palette-swatch { width: 44px; height: 44px; border-radius: 8px; border: 2px solid #2a2a40; cursor: pointer; transition: all 0.15s; position: relative; }
        .palette-swatch:hover { transform: scale(1.15); border-color: #6366f1; }
        .palette-swatch-tooltip { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: #1a1a2e; border: 1px solid #2a2a40; border-radius: 6px; padding: 4px 8px; font-size: 11px; color: #c8c8e8; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity 0.15s; font-family: monospace; z-index: 10; }
        .palette-swatch:hover .palette-swatch-tooltip { opacity: 1; }

        .actions { display: flex; gap: 10px; margin-top: 20px; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .btn-danger { background: transparent; color: #f87171; border: 1px solid #3a2020; }
        .btn-danger:hover { background: #2a1010; }

        .how-title { font-size: 20px; font-weight: 800; color: #c8c8e8; margin-bottom: 16px; }
        .how-text { color: #6868aa; font-size: 15px; line-height: 1.7; }
        .hint { font-size: 13px; color: #5a5a7a; margin-top: 10px; text-align: center; }
      `}</style>

      <div className="page-wrap">
        <div className="page-header">
          <div className="badge">🎨 Browser-Side Tool</div>
          <h1 className="page-title">Image <span>Color Picker</span></h1>
          <p className="page-subtitle">Hover to preview, click to pick. Get HEX, RGB & HSL instantly.</p>
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
              <div className="drop-icon">🎨</div>
              <div className="drop-title">Drop your image here</div>
              <div className="drop-sub">or <b onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>browse files</b></div>
              <div className="drop-sub" style={{ marginTop: 8 }}>Supports JPG, PNG, WebP, GIF</div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files![0])} />
            </div>
          ) : (
            <>
              {/* Canvas */}
              <div style={{ overflow: "auto" }}>
                <div className="canvas-wrap">
                  <canvas
                    ref={canvasRef}
                    className="pick-canvas"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                  />
                  {/* Magnifier */}
                  {cursor && zoom.pixels && (
                    <div className="magnifier" style={{ left: cursor.x, top: cursor.y }}>
                      <MagnifierCanvas pixels={zoom.pixels} />
                    </div>
                  )}
                </div>
              </div>
              <p className="hint">🖱 Hover to preview color · Click to save to palette</p>

              {/* Color Info */}
              {pickedColor && (
                <div className="color-panel">
                  <div className="color-swatch-big" style={{ background: pickedColor.hex }} />
                  <div className="color-values">
                    {[
                      { label: "HEX", value: pickedColor.hex },
                      { label: "RGB", value: `rgb(${pickedColor.rgb.r}, ${pickedColor.rgb.g}, ${pickedColor.rgb.b})` },
                      { label: "HSL", value: `hsl(${pickedColor.hsl.h}, ${pickedColor.hsl.s}%, ${pickedColor.hsl.l}%)` },
                    ].map(({ label, value }) => (
                      <div className="color-row" key={label}>
                        <span className="color-label">{label}</span>
                        <span className="color-value">{value}</span>
                        <button className={`copy-btn${copied === value ? " copied" : ""}`} onClick={() => copy(value)}>
                          {copied === value ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Palette */}
              {palette.length > 0 && (
                <>
                  <div className="palette-title">Saved Colors ({palette.length})</div>
                  <div className="palette-grid">
                    {palette.map((c, i) => (
                      <div key={i} className="palette-swatch" style={{ background: c.hex }} onClick={() => copy(c.hex)} title={c.hex}>
                        <div className="palette-swatch-tooltip">{c.hex}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="actions">
                <button className="btn btn-danger" onClick={reset}>✕ Reset</button>
              </div>
            </>
          )}
        </div>

        <div className="card">
          <h2 className="how-title">How it works</h2>
          <p className="how-text">
            Upload any image, then hover over it to see a magnified preview and the color values in real time. Click anywhere on the image to save that color to your palette. Copy HEX, RGB, or HSL values with one click — everything runs in your browser.
          </p>
        </div>
      </div>
    </>
  );
}

// Magnifier sub-component
function MagnifierCanvas({ pixels }: { pixels: Uint8ClampedArray }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    canvas.width = 9;
    canvas.height = 9;
    const ctx = canvas.getContext("2d")!;
    const id = ctx.createImageData(9, 9);
    id.data.set(pixels.slice(0, 9 * 9 * 4));
    ctx.putImageData(id, 0, 0);
  }, [pixels]);
  return <canvas ref={ref} style={{ width: "100px", height: "100px", imageRendering: "pixelated" }} />;
}
