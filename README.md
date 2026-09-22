# Text to Speech — download feature added

No new packages, no next.config.ts changes. Uses the browser's built-in
getDisplayMedia (tab-audio capture) + MediaRecorder APIs.

## What changed
- `src/app/tools/text-to-speech/TextToSpeechClient.tsx` — added a
  "Record & Prepare Download" button. Clicking it:
  1. Opens the browser's screen/tab share picker (user must choose
     "This Tab" and check "Share tab audio")
  2. Plays the text through speech synthesis while recording just the
     captured tab audio (video track is discarded immediately)
  3. Produces a downloadable .webm (or .ogg) audio file when speech ends
- `src/data/toolContent.ts` — updated the "Can I download the audio?" FAQ
  answer to reflect the new feature and its browser support caveat

## Browser support
Tab-audio capture only works in Chrome/Edge on desktop. Firefox and
Safari don't support capturing tab audio via getDisplayMedia yet, so the
download section is feature-detected and simply doesn't render there —
the normal Speak/Pause/Stop playback still works everywhere regardless.

## Steps
1. Copy the two files in this zip into your project at matching paths
   (both overwrite existing files).
2. `npm run build` locally to confirm — verified clean in this session,
   `/tools/text-to-speech` is now 184KB First Load JS (was 183KB), a
   negligible increase.
3. Commit and push as before.
