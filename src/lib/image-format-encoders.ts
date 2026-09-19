import { GifWriter } from "omggif";

/**
 * Encoders for image formats that browsers' canvas.toBlob() does not
 * support natively (BMP, ICO, GIF). JPG/PNG/WebP use canvas.toBlob()
 * directly and don't need anything here.
 */

/** Encode a canvas as an uncompressed 32-bit BMP (BITMAPINFOHEADER, top-down not supported by BMP spec, so rows are written bottom-up as required). */
export function canvasToBmpBlob(canvas: HTMLCanvasElement): Blob {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d")!;
  const { data } = ctx.getImageData(0, 0, width, height);

  const rowSize = width * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BITMAPFILEHEADER (14 bytes)
  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true); // reserved
  view.setUint32(10, 54, true); // pixel data offset

  // BITMAPINFOHEADER (40 bytes)
  view.setUint32(14, 40, true); // header size
  view.setInt32(18, width, true);
  view.setInt32(22, height, true); // positive = bottom-up
  view.setUint16(26, 1, true); // planes
  view.setUint16(28, 32, true); // bits per pixel
  view.setUint32(30, 0, true); // no compression
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true); // ~72 DPI
  view.setInt32(42, 2835, true);
  view.setUint32(46, 0, true); // colors used
  view.setUint32(50, 0, true); // important colors

  // Pixel data — BMP stores rows bottom-up, and BGRA byte order.
  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      view.setUint8(offset++, data[i + 2]); // B
      view.setUint8(offset++, data[i + 1]); // G
      view.setUint8(offset++, data[i]); // R
      view.setUint8(offset++, data[i + 3]); // A
    }
  }

  return new Blob([buffer], { type: "image/bmp" });
}

/** Wrap a PNG-encoded canvas in a single-image ICO container (the modern, widely-supported "PNG-in-ICO" format used since Windows Vista). */
export async function canvasToIcoBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  // ICO directory entries store width/height as one byte each, 0 meaning 256.
  const size = Math.max(canvas.width, canvas.height);
  let iconCanvas = canvas;
  if (size > 256) {
    // Scale down to fit within the 256x256 ICO limit, preserving aspect ratio.
    const scale = 256 / size;
    iconCanvas = document.createElement("canvas");
    iconCanvas.width = Math.round(canvas.width * scale);
    iconCanvas.height = Math.round(canvas.height * scale);
    const ictx = iconCanvas.getContext("2d")!;
    ictx.drawImage(canvas, 0, 0, iconCanvas.width, iconCanvas.height);
  }

  const pngBlob: Blob = await new Promise((resolve, reject) => {
    iconCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))), "image/png");
  });
  const pngBuffer = await pngBlob.arrayBuffer();
  const pngBytes = new Uint8Array(pngBuffer);

  const w = iconCanvas.width >= 256 ? 0 : iconCanvas.width;
  const h = iconCanvas.height >= 256 ? 0 : iconCanvas.height;

  const headerSize = 6;
  const dirEntrySize = 16;
  const totalSize = headerSize + dirEntrySize + pngBytes.length;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // ICONDIR
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: 1 = icon
  view.setUint16(4, 1, true); // image count

  // ICONDIRENTRY
  view.setUint8(6, w);
  view.setUint8(7, h);
  view.setUint8(8, 0); // color palette
  view.setUint8(9, 0); // reserved
  view.setUint16(10, 1, true); // color planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, pngBytes.length, true); // image data size
  view.setUint32(18, headerSize + dirEntrySize, true); // offset

  const bytes = new Uint8Array(buffer);
  bytes.set(pngBytes, headerSize + dirEntrySize);

  return new Blob([buffer], { type: "image/x-icon" });
}

/**
 * Encode a canvas as a single-frame GIF using omggif. GIFs are
 * palette-based (max 256 colors), so we quantize the image with a simple
 * uniform color-cube reduction — good enough for photos/graphics without
 * pulling in a full median-cut quantizer.
 */
export function canvasToGifBlob(canvas: HTMLCanvasElement): Blob {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d")!;
  const { data } = ctx.getImageData(0, 0, width, height);

  // 6x6x6 uniform color cube = 216 colors, leaving room for safety under 256.
  const LEVELS = 6;
  const step = 255 / (LEVELS - 1);
  const palette: number[] = [];
  const paletteIndex = new Map<number, number>();

  const quantize = (v: number) => Math.round(Math.round(v / step) * step);

  const indices = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) {
    const i = p * 4;
    const r = quantize(data[i]);
    const g = quantize(data[i + 1]);
    const b = quantize(data[i + 2]);
    const key = (r << 16) | (g << 8) | b;
    let idx = paletteIndex.get(key);
    if (idx === undefined) {
      idx = palette.length / 3;
      palette.push(r, g, b);
      paletteIndex.set(key, idx);
    }
    indices[p] = idx;
  }

  // GIF palettes must be a power-of-two size.
  let paletteSize = 2;
  while (paletteSize < palette.length / 3) paletteSize *= 2;
  const rgbPalette: number[] = [];
  for (let i = 0; i < paletteSize; i++) {
    if (i < palette.length / 3) {
      rgbPalette.push((palette[i * 3] << 16) | (palette[i * 3 + 1] << 8) | palette[i * 3 + 2]);
    } else {
      rgbPalette.push(0);
    }
  }

  // Generous upper bound for the output buffer.
  const outBuffer = new Uint8Array(width * height * 2 + 1024);
  const writer = new GifWriter(outBuffer, width, height, { palette: rgbPalette });
  writer.addFrame(0, 0, width, height, Array.from(indices), { palette: rgbPalette });
  const end = writer.end();

  return new Blob([outBuffer.slice(0, end)], { type: "image/gif" });
}
