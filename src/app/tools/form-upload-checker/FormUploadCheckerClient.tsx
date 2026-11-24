"use client";

import { useEffect, useMemo, useState } from "react";

type Req = {
  width: number;
  height: number;
  maxKB: number;
  format: "image/jpeg" | "image/png";
};
type Picked = { file: File; url: string; width: number; height: number };
type ImageKind = "photo" | "signature";

const photoDefaults: Req = { width: 200, height: 230, maxKB: 50, format: "image/jpeg" };
const signatureDefaults: Req = { width: 140, height: 60, maxKB: 20, format: "image/jpeg" };
const field = "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

export default function FormUploadCheckerClient() {
  const [photoReq, setPhotoReq] = useState<Req>(photoDefaults);
  const [signatureReq, setSignatureReq] = useState<Req>(signatureDefaults);
  const [photo, setPhoto] = useState<Picked | null>(null);
  const [signature, setSignature] = useState<Picked | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.url);
    if (signature) URL.revokeObjectURL(signature.url);
  }, [photo, signature]);

  function getItem(kind: ImageKind) {
    return kind === "photo" ? photo : signature;
  }

  function setItem(kind: ImageKind, item: Picked | null) {
    if (kind === "photo") setPhoto(item);
    else setSignature(item);
  }

  function getReq(kind: ImageKind) {
    return kind === "photo" ? photoReq : signatureReq;
  }

  function setReq(kind: ImageKind, next: Req) {
    if (kind === "photo") setPhotoReq(next);
    else setSignatureReq(next);
  }

  function updateReq(kind: ImageKind, key: keyof Req, value: string) {
    const current = getReq(kind);
    if (key === "format") {
      setReq(kind, { ...current, format: value as Req["format"] });
      return;
    }
    const number = Number(value);
    const limits: Record<"width" | "height" | "maxKB", number> = {
      width: 6000,
      height: 6000,
      maxKB: 10000,
    };
    const safeValue = Number.isFinite(number)
      ? Math.min(limits[key as "width" | "height" | "maxKB"], Math.max(1, Math.round(number)))
      : 1;
    setReq(kind, { ...current, [key]: safeValue });
  }

  async function pick(file: File, kind: ImageKind) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice("Please select a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setNotice("Choose an image smaller than 15 MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const previous = getItem(kind);
      if (previous) URL.revokeObjectURL(previous.url);
      setItem(kind, { file, url, width: img.naturalWidth, height: img.naturalHeight });
      setNotice("");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setNotice("Could not read this image. Please try another file.");
    };
    img.src = url;
  }

  const photoResult = useMemo(() => photo ? ({
    dimensions: photo.width === photoReq.width && photo.height === photoReq.height,
    size: photo.file.size <= photoReq.maxKB * 1024,
    format: photo.file.type === photoReq.format,
  }) : null, [photo, photoReq]);

  const signatureResult = useMemo(() => signature ? ({
    dimensions: signature.width === signatureReq.width && signature.height === signatureReq.height,
    size: signature.file.size <= signatureReq.maxKB * 1024,
    format: signature.file.type === signatureReq.format,
  }) : null, [signature, signatureReq]);

  async function exportFile(kind: ImageKind) {
    const item = getItem(kind);
    const req = getReq(kind);
    if (!item) return;

    const img = new Image();
    img.src = item.url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image could not be loaded."));
    });

    const canvas = document.createElement("canvas");
    canvas.width = req.width;
    canvas.height = req.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is unavailable.");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Fit the entire source image inside the requested canvas so edges/signature strokes are not silently cropped.
    const scale = Math.min(req.width / img.naturalWidth, req.height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    ctx.drawImage(
      img,
      (req.width - drawWidth) / 2,
      (req.height - drawHeight) / 2,
      drawWidth,
      drawHeight,
    );

    let quality = 0.92;
    let blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, req.format, quality));
    while (req.format === "image/jpeg" && blob && blob.size > req.maxKB * 1024 && quality > 0.25) {
      quality = Math.max(0.25, quality - 0.07);
      blob = await new Promise(resolve => canvas.toBlob(resolve, req.format, quality));
    }

    if (!blob) throw new Error("Could not create the output image.");
    if (blob.size > req.maxKB * 1024) {
      setNotice(`${kind === "photo" ? "Photo" : "Signature"} is still above ${req.maxKB} KB. Increase the KB limit or reduce the dimensions.`);
      return;
    }

    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `${kind}_${req.width}x${req.height}.${req.format === "image/png" ? "png" : "jpg"}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    // Keep the object URL alive long enough for mobile browsers to start the download.
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 60000);
    setNotice(`${kind === "photo" ? "Photo" : "Signature"} prepared. Please check the downloaded file before uploading it.`);
  }

  function settingsPanel(kind: ImageKind) {
    const req = getReq(kind);
    const title = kind === "photo" ? "Photo" : "Signature";
    return (
      <section className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div>
          <h3 className="font-semibold">{title} requirements</h3>
          <p className="text-xs text-muted-foreground">Set these values independently from the other file.</p>
        </div>
        <label className="block text-sm font-medium">
          Example values only — enter the exact requirements from your application.
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Width (px)<input className={field} type="number" min="1" max="6000" value={req.width} onChange={e => updateReq(kind, "width", e.target.value)} /></label>
          <label className="text-sm">Height (px)<input className={field} type="number" min="1" max="6000" value={req.height} onChange={e => updateReq(kind, "height", e.target.value)} /></label>
          <label className="text-sm">Maximum size (KB)<input className={field} type="number" min="1" max="10000" value={req.maxKB} onChange={e => updateReq(kind, "maxKB", e.target.value)} /></label>
          <label className="text-sm">Output format<select className={field} value={req.format} onChange={e => updateReq(kind, "format", e.target.value)}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></label>
        </div>
      </section>
    );
  }

  function uploadCard(kind: ImageKind) {
    const item = getItem(kind);
    const result = kind === "photo" ? photoResult : signatureResult;
    const title = kind === "photo" ? "Photo" : "Signature";
    const req = getReq(kind);
    return (
      <section className="space-y-3 rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">{title}</h3>
        <label className="block cursor-pointer rounded-lg border-2 border-dashed border-border p-4 text-center text-sm hover:border-primary">
          Select {title.toLowerCase()}
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => {
            const file = e.target.files?.[0];
            if (file) void pick(file, kind);
            e.currentTarget.value = "";
          }} />
        </label>
        {item && (
          <div className="flex items-center gap-3">
            <img src={item.url} alt={title + " preview"} className="h-20 max-w-28 rounded border bg-white object-contain" />
            <div className="min-w-0 text-xs text-muted-foreground">
              <p className="truncate font-medium text-foreground">{item.file.name}</p>
              <p>{item.width} × {item.height}px</p>
              <p>{(item.file.size / 1024).toFixed(1)} KB · {item.file.type}</p>
              <button type="button" className="mt-1 text-primary underline" onClick={() => {
                URL.revokeObjectURL(item.url);
                setItem(kind, null);
              }}>Remove</button>
            </div>
          </div>
        )}
        {result && (
          <div className="space-y-1 text-xs text-muted-foreground" aria-live="polite">
            <p>Dimensions: {result.dimensions ? "Pass" : `Needs resize to ${req.width} × ${req.height}px`}</p>
            <p>File size: {result.size ? "Pass" : `Above ${req.maxKB} KB`}</p>
            <p>Format: {result.format ? "Pass" : `Needs ${req.format === "image/jpeg" ? "JPG" : "PNG"} conversion`}</p>
          </div>
        )}
        <button type="button" disabled={!item} onClick={() => void exportFile(kind).catch(error => setNotice(error instanceof Error ? error.message : "Could not prepare this image."))} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">
          Prepare {title.toLowerCase()}
        </button>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
        <strong>Privacy:</strong> Images are processed locally in your browser and are not uploaded to OLD TOOLS.
      </div>
      <div>
        <h2 className="text-lg font-semibold">1. Set your requirements separately</h2>
        <p className="text-sm text-muted-foreground">Photo and signature have independent dimensions, file-size limits and output formats. Enter the exact values shown in your current application instructions.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {settingsPanel("photo")}
        {settingsPanel("signature")}
      </div>
      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
        The displayed values are editable examples, not verified official rules for every exam. Always check the latest official notification. Some portals require live photo capture instead of an uploaded photo.
      </p>
      <div>
        <h2 className="mb-3 text-lg font-semibold">2. Upload and check your files</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {uploadCard("photo")}
          {uploadCard("signature")}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">The checker validates pixel dimensions, actual file size and image format. It cannot verify face placement, background, signature authenticity, DPI metadata or portal-specific rules. The output fits the complete source image inside a white canvas, which may leave blank margins. Check the downloaded file and adjust the source/canvas requirements before submitting.</p>
      {notice && <p role="status" className="rounded-lg bg-muted p-3 text-sm">{notice}</p>}
    </div>
  );
}
