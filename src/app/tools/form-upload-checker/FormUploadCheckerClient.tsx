"use client";

import { useMemo, useState } from "react";

type Req = { width: number; height: number; maxKB: number; format: "image/jpeg" | "image/png" };
type Picked = { file: File; url: string; width: number; height: number };

const initial: Req = { width: 200, height: 230, maxKB: 50, format: "image/jpeg" };

export default function FormUploadCheckerClient() {
  const [req, setReq] = useState<Req>(initial);
  const [preset, setPreset] = useState("photo");
  const [photo, setPhoto] = useState<Picked | null>(null);
  const [signature, setSignature] = useState<Picked | null>(null);
  const [notice, setNotice] = useState("");

  async function pick(file: File, type: "photo" | "signature") {
    if (!file.type.startsWith("image/")) return setNotice("Please select an image file.");
    if (file.size > 15 * 1024 * 1024) return setNotice("Choose an image smaller than 15 MB.");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const item = { file, url, width: img.naturalWidth, height: img.naturalHeight };
      if (type === "photo") setPhoto(item); else setSignature(item);
      setNotice("");
    };
    img.onerror = () => { URL.revokeObjectURL(url); setNotice("Could not read this image."); };
    img.src = url;
  }

  function choosePreset(value: string) {
    setPreset(value);
    if (value === "photo") setReq({ width: 200, height: 230, maxKB: 50, format: "image/jpeg" });
    if (value === "signature") setReq({ width: 140, height: 60, maxKB: 20, format: "image/jpeg" });
    if (value === "custom") setReq({ width: 200, height: 230, maxKB: 50, format: "image/jpeg" });
  }

  const results = useMemo(() => [photo, signature].map(item => item ? ({
    dimensions: item.width === req.width && item.height === req.height,
    size: item.file.size <= req.maxKB * 1024,
    format: item.file.type === req.format
  }) : null), [photo, signature, req]);

  async function exportFile(item: Picked, name: string) {
    const img = new Image(); img.src = item.url;
    await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error("Image could not be loaded.")); });
    const canvas = document.createElement("canvas"); canvas.width = req.width; canvas.height = req.height;
    const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas is unavailable.");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(req.width / img.naturalWidth, req.height / img.naturalHeight);
    const sw = req.width / scale, sh = req.height / scale;
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, req.width, req.height);
    let quality = 0.92;
    let blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, req.format, quality));
    while (blob && blob.size > req.maxKB * 1024 && quality > 0.25) {
      quality -= 0.07;
      blob = await new Promise(resolve => canvas.toBlob(resolve, req.format, quality));
    }
    if (!blob) throw new Error("Could not create output image.");
    if (blob.size > req.maxKB * 1024) {
      setNotice(`${name}: output is still above ${req.maxKB} KB. Try a higher size limit or smaller dimensions.`);
      return;
    }
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = `${name}_${req.width}x${req.height}.${req.format === "image/png" ? "png" : "jpg"}`;
    a.click(); URL.revokeObjectURL(url); setNotice(`${name} is ready. Check the downloaded file before uploading it.`);
  }

  const field = "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
  function uploadCard(title: string, item: Picked | null, type: "photo" | "signature", index: number) {
    const result = results[index];
    return <section className="space-y-3 rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold">{title}</h3>
      <label className="block cursor-pointer rounded-lg border-2 border-dashed border-border p-4 text-center text-sm hover:border-primary">
        Select {title.toLowerCase()}
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { const f = e.target.files?.[0]; if (f) void pick(f, type); }} />
      </label>
      {item && <div className="flex items-center gap-3">
        <img src={item.url} alt={title + " preview"} className="h-20 max-w-28 rounded border bg-white object-contain" />
        <div className="min-w-0 text-xs text-muted-foreground"><p className="truncate font-medium text-foreground">{item.file.name}</p><p>{item.width} × {item.height}px</p><p>{(item.file.size / 1024).toFixed(1)} KB · {item.file.type}</p>
        <button className="mt-1 text-primary underline" onClick={() => type === "photo" ? setPhoto(null) : setSignature(null)}>Remove</button></div>
      </div>}
      {result && <div className="space-y-1 text-xs text-muted-foreground">
        <p>Dimensions: {result.dimensions ? "Pass" : "Needs resize"}</p><p>File size: {result.size ? "Pass" : "Too large"}</p><p>Format: {result.format ? "Pass" : "Needs conversion"}</p>
      </div>}
    </section>;
  }

  return <div className="mx-auto max-w-4xl space-y-6">
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><strong>Privacy:</strong> Images are processed locally in your browser and are not uploaded to OLD TOOLS.</div>
    <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div><h2 className="text-lg font-semibold">1. Set your form requirements</h2><p className="text-sm text-muted-foreground">Choose a starting preset or enter the exact values from your current application notification.</p></div>
      <label className="block text-sm font-medium">Preset<select className={field} value={preset} onChange={e => choosePreset(e.target.value)}><option value="photo">Common photo starting point (200 × 230px, max 50KB)</option><option value="signature">Common signature starting point (140 × 60px, max 20KB)</option><option value="custom">Custom</option></select></label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="text-sm">Width px<input className={field} type="number" min="1" max="6000" value={req.width} onChange={e => {setPreset("custom"); setReq({...req,width:Math.max(1,Number(e.target.value))});}} /></label>
        <label className="text-sm">Height px<input className={field} type="number" min="1" max="6000" value={req.height} onChange={e => {setPreset("custom"); setReq({...req,height:Math.max(1,Number(e.target.value))});}} /></label>
        <label className="text-sm">Maximum KB<input className={field} type="number" min="1" max="10000" value={req.maxKB} onChange={e => {setPreset("custom"); setReq({...req,maxKB:Math.max(1,Number(e.target.value))});}} /></label>
        <label className="text-sm">Format<select className={field} value={req.format} onChange={e => {setPreset("custom"); setReq({...req,format:e.target.value as Req["format"]});}}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></label>
      </div>
      <p className="text-xs text-amber-700 dark:text-amber-400">These are editable example values, not verified official rules for every exam. Check the latest official notification. Some portals require live photo capture rather than an uploaded photo.</p>
    </section>
    <div className="grid gap-4 sm:grid-cols-2">{uploadCard("Photo",photo,"photo",0)}{uploadCard("Signature",signature,"signature",1)}</div>
    <section className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-6">
      <h2 className="text-lg font-semibold">2. Prepare and download</h2>
      <p className="text-sm text-muted-foreground">The tool center-crops to the selected ratio, resizes, and attempts to meet the maximum file size.</p>
      <div className="flex flex-wrap gap-3">
        <button disabled={!photo} onClick={() => photo && void exportFile(photo,"photo").catch(e => setNotice(e.message))} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Prepare photo</button>
        <button disabled={!signature} onClick={() => signature && void exportFile(signature,"signature").catch(e => setNotice(e.message))} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Prepare signature</button>
      </div>
      <p className="text-xs text-muted-foreground">The checker validates dimensions, actual file size and format only. It cannot verify face placement, background, signature authenticity or portal-specific rules.</p>
      {notice && <p role="status" className="rounded-lg bg-muted p-3 text-sm">{notice}</p>}
    </section>
  </div>;
}
