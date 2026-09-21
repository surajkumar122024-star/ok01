# 6 new quick-win tools — zero new dependencies

UUID Generator, Timestamp Converter, Hash Generator, Lorem Ipsum Generator,
Text to Speech, Image to Base64. All use only built-in browser APIs
(crypto.randomUUID, Web Crypto digest, Speech Synthesis, FileReader) —
no new npm packages, no next.config.ts changes.

## New tool pages
- `/tools/uuid-generator`
- `/tools/timestamp-converter`
- `/tools/hash-generator` (SHA-1/256/384/512, text or file)
- `/tools/lorem-ipsum-generator`
- `/tools/text-to-speech`
- `/tools/image-to-base64` (encode + decode)

## What changed
- `src/data/toolContent.ts` — added all 6 tool content entries
- `src/components/ToolsMegaMenu.tsx` — added to Text Tools / Developer Tools sections
- `src/app/tools/page.tsx` — added all 6 tool cards (category: text-dev-tools),
  bumped tool count 48→54
- `src/app/page.tsx` — "View All 48 Tools" → "View All 54 Tools"
- `src/app/sitemap.ts` — added all 6 routes

## Steps
1. Copy all files in this zip into your project at matching paths (6 new
   tool folders, plus the 5 files above that get overwritten).
2. `npm run build` locally to confirm — verified clean in this session,
   all 54 tool pages build fine, each new tool is ~182-183KB First Load JS
   (right in line with your existing tools, no bloat).
3. Commit and push as before.

## Notes
- Text to Speech can't export audio files — browsers don't provide a way
  to capture Speech Synthesis output, so it's playback-only (explained in
  the tool's own FAQ).
- Hash Generator intentionally doesn't offer MD5 — it's not available in
  the browser's Web Crypto API and is cryptographically broken anyway;
  SHA-256/512 are the modern equivalents (also explained in-page).
