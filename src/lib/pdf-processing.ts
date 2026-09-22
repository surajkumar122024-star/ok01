// Shared PDF.js loader. Self-hosts the worker file under /public/pdfjs/
// instead of pulling it from a CDN (cdnjs.cloudflare.com) — a cross-origin
// worker script is blocked by this site's CSP (worker-src 'self' blob:),
// and self-hosting also keeps everything on-device, matching the site's
// no-upload, nothing-external promise.

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

export async function getPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist').then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
      return pdfjsLib;
    });
  }
  return pdfjsPromise;
}

/** Renders one PDF page to a canvas at the given scale (2 = ~144 DPI equivalent for a 72dpi page). */
export async function renderPdfPageToCanvas(
  page: import('pdfjs-dist').PDFPageProxy,
  scale: number
): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d')!;
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

/** Extracts plain text from every page of a PDF, one string per page. */
export async function extractPdfText(file: File): Promise<string[]> {
  const pdfjsLib = await getPdfjs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ');
    pages.push(text);
  }
  return pages;
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
