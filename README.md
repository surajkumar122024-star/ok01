# MOV to MP4 + Video to GIF — 2 new tools

No new packages needed — both reuse the same self-hosted, single-threaded
ffmpeg.wasm setup already deployed for Video Compressor. No next.config.ts
changes either (the CSP/cache rules already cover these).

## New tools
- `/tools/mov-to-mp4` — converts MOV (QuickTime/iPhone) to MP4
- `/tools/video-to-gif` — trims a clip (up to 15s) and converts it to an
  animated GIF, with start-time/length sliders and 3 quality presets
  (Small/Medium/Large), using FFmpeg's two-pass palette workflow for
  better color quality than a naive single-pass GIF encode

## What changed
- `src/lib/video-processing.ts` — added `convertToMp4()`, `convertVideoToGif()`,
  and `getVideoDuration()` (reads a video's length for the GIF trim sliders)
- `src/data/toolContent.ts` — added `mov-to-mp4` and `video-to-gif` entries,
  updated `video-compressor`'s related-tools links
- `src/components/ToolsMegaMenu.tsx` — added both to the Video Tools section
- `src/app/tools/page.tsx` — added both tool cards, bumped tool count 46→48
- `src/app/page.tsx` — "View All 46 Tools" → "View All 48 Tools"
- `src/app/sitemap.ts` — added both routes

## Steps
1. Copy all files in this zip into your project at matching paths (the two
   new tool folders are new; the rest overwrite existing files).
2. `npm run build` locally to confirm — already verified clean in this
   session, all 48 tool pages build fine (video-to-gif is the heaviest at
   225KB First Load JS due to the trim-slider UI, still a reasonable size).
3. Commit and push as before.

## Notes
- Both tools show the same "large file on mobile" warning as Video
  Compressor for files over 250MB.
- Video to GIF caps clips at 15 seconds — this is a deliberate limit to
  keep GIF file sizes reasonable (GIF size grows fast with clip length).
