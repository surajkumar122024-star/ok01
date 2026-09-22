# PDF Compressor + PDF to Word — 2 new tools, plus a live bug fix

## Bug fix included (important)
`PDF to Image` was loading its pdf.js worker from **cdnjs.cloudflare.com**
— a cross-origin CDN not allowed by your CSP's `worker-src 'self' blob:`.
This means it's very likely broken right now in production (silently
blocked, same class of bug as the earlier Tesseract.js CDN issue). Fixed
by self-hosting the worker file, same approach as ffmpeg/tesseract.

## New tools
- `/tools/pdf-compressor` — shrinks PDF file size by re-rendering each
  page as a compressed JPEG and rebuilding the PDF from those images.
  Works great on scanned/image-heavy PDFs; the tool clearly warns users
  that output text won't be selectable (it's necessarily image-based).
- `/tools/pdf-to-word` — extracts plain text from a PDF into a downloadable
  .docx. Clearly warns that layout/formatting/images aren't preserved —
  it's text extraction, not a true format converter (no server-side AI
  or OCR involved, so this is the honest ceiling for a pure-browser tool).

## New dependency
- `docx` (~19 packages) — generates the .docx file for PDF to Word.
  Already included in the package.json/package-lock.json in this zip.

## What changed
- `src/lib/pdf-processing.ts` (new) — shared self-hosted pdf.js loader +
  page-rendering + text-extraction helpers, used by all 3 PDF-reading tools
- `src/app/tools/pdf-to-image/PdfToImageClient.tsx` — switched from the
  CDN worker to the shared self-hosted loader (the bug fix above)
- `public/pdfjs/pdf.worker.min.mjs` (new) — the self-hosted worker file
- `next.config.ts` — added a 1-year immutable Cache-Control header for
  `/pdfjs/*`, same as `/ffmpeg/*` and `/tesseract/*`
- `src/data/toolContent.ts`, `ToolsMegaMenu.tsx`, `src/app/tools/page.tsx`,
  `src/app/page.tsx`, `src/app/sitemap.ts` — registered the 2 new tools,
  bumped tool count 54→56

## Steps
1. Copy all files in this zip into your project at matching paths.
2. Run `npm install` (docx is already in package.json, or install it
   manually: `npm install docx`).
3. `npm run build` locally to confirm — verified clean in this session,
   all 56 tool pages build fine.
4. Commit and push as before.

## Test after deploying
- `/tools/pdf-to-image` — confirm it now actually works (it may have
  been silently broken before this fix)
- `/tools/pdf-compressor` — try a scanned or image-heavy PDF for the
  clearest size reduction
- `/tools/pdf-to-word` — try a simple text PDF (a letter, notes) rather
  than something with tables/columns, for the best result
