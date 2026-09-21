import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Single-threaded ffmpeg.wasm core, self-hosted under /public/ffmpeg/core/.
// We deliberately use the single-threaded core (not core-mt) because the
// multi-threaded build requires SharedArrayBuffer, which only works when the
// whole site is served with Cross-Origin-Opener-Policy: same-origin and
// Cross-Origin-Embedder-Policy: require-corp. Those headers would very
// likely break the Google/AdSense iframes this site depends on for revenue
// (ad networks generally don't send the CORP headers COEP:require-corp
// demands), so we trade some speed for zero risk to ads and existing
// embeds. Self-hosting (instead of pulling from a CDN) keeps everything
// same-origin, so no changes to the existing CSP connect-src are needed.
const CORE_BASE_URL = '/ffmpeg/core';

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

export type ProgressCallback = (ratio: number) => void;

/**
 * Loads (once) and returns the shared FFmpeg instance. Subsequent calls
 * reuse the same instance instead of re-downloading the ~30MB wasm core.
 */
async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();

    ffmpeg.on('log', ({ message }) => {
      // Useful for local debugging; safe to leave in since it's console-only.
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[ffmpeg]', message);
      }
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return loadPromise;
}

export class VideoProcessingError extends Error {}

function guessExtension(fileName: string): string {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'mp4';
}

export type CompressVideoOptions = {
  /** CRF (Constant Rate Factor): lower = higher quality/bigger file. 18-28 is a sane range. */
  crf?: number;
  onProgress?: ProgressCallback;
};

/**
 * Compresses a video using H.264 (libx264). Runs entirely in-browser.
 * Large files (roughly >250MB) can be slow or hit memory limits on mobile
 * devices, since the whole file is held in the wasm virtual filesystem —
 * callers should warn users before processing very large files.
 */
export const compressVideo = async (file: File, options: CompressVideoOptions = {}): Promise<Blob> => {
  const { crf = 28, onProgress } = options;
  const ffmpeg = await getFFmpeg();

  const inputExt = guessExtension(file.name);
  const inputName = `input.${inputExt}`;
  const outputName = 'output.mp4';

  const progressHandler = ({ progress }: { progress: number }) => {
    // ffmpeg.wasm reports progress as a 0-1 ratio, occasionally slightly
    // over 1 near the end of encoding — clamp for a sane UI value.
    onProgress?.(Math.min(1, Math.max(0, progress)));
  };

  try {
    if (onProgress) ffmpeg.on('progress', progressHandler);

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      '-i', inputName,
      '-c:v', 'libx264',
      '-crf', String(crf),
      '-preset', 'veryfast',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      outputName,
    ]);

    const data = await ffmpeg.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });
  } catch (err: unknown) {
    throw new VideoProcessingError(
      err instanceof Error ? err.message : 'Failed to process video. The file may be corrupted or in an unsupported format.'
    );
  } finally {
    if (onProgress) ffmpeg.off('progress', progressHandler);
    // Clean up the wasm virtual filesystem so memory doesn't grow across
    // multiple conversions in the same session.
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch {
      // Files may not exist if an earlier step failed — safe to ignore.
    }
  }
};

/** Rough client-side heuristic to warn before processing very large files on mobile. */
export const isLikelyTooLargeForMobile = (file: File): boolean => {
  const isMobile = typeof navigator !== 'undefined' && /iphone|ipad|android/i.test(navigator.userAgent);
  const MOBILE_WARNING_BYTES = 250 * 1024 * 1024; // 250MB
  return isMobile && file.size > MOBILE_WARNING_BYTES;
};

export type ConvertToMp4Options = {
  onProgress?: ProgressCallback;
};

/**
 * Converts any FFmpeg-readable video (MOV, AVI, MKV, WMV, FLV, etc.) to
 * MP4 (H.264 + AAC). Runs entirely in-browser.
 */
export const convertToMp4 = async (file: File, options: ConvertToMp4Options = {}): Promise<Blob> => {
  const { onProgress } = options;
  const ffmpeg = await getFFmpeg();

  const inputExt = guessExtension(file.name);
  const inputName = `input.${inputExt}`;
  const outputName = 'output.mp4';

  const progressHandler = ({ progress }: { progress: number }) => {
    onProgress?.(Math.min(1, Math.max(0, progress)));
  };

  try {
    if (onProgress) ffmpeg.on('progress', progressHandler);

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      '-i', inputName,
      '-c:v', 'libx264',
      '-crf', '20',
      '-preset', 'veryfast',
      '-pix_fmt', 'yuv420p', // ensures compatibility with players that choke on other pixel formats from MOV sources
      '-c:a', 'aac',
      '-b:a', '192k',
      '-movflags', '+faststart',
      outputName,
    ]);

    const data = await ffmpeg.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });
  } catch (err: unknown) {
    throw new VideoProcessingError(
      err instanceof Error ? err.message : 'Failed to convert video. The file may be corrupted or in an unsupported format.'
    );
  } finally {
    if (onProgress) ffmpeg.off('progress', progressHandler);
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch {
      // Safe to ignore.
    }
  }
};

export type ConvertToGifOptions = {
  /** Frames per second for the GIF. Lower = smaller file. Default 10. */
  fps?: number;
  /** Output width in pixels; height auto-scales to preserve aspect ratio. Default 480. */
  width?: number;
  /** Start time in seconds within the source video. Default 0. */
  startTime?: number;
  /** Duration in seconds to convert. Default: whole remaining video (omit -t). */
  duration?: number;
  onProgress?: ProgressCallback;
};

/**
 * Converts a video (or a clipped portion of one) into an animated GIF,
 * using FFmpeg's two-pass palette workflow (palettegen + paletteuse) for
 * much better color quality than a naive single-pass GIF encode. Runs
 * entirely in-browser.
 */
export const convertVideoToGif = async (file: File, options: ConvertToGifOptions = {}): Promise<Blob> => {
  const { fps = 10, width = 480, startTime = 0, duration, onProgress } = options;
  const ffmpeg = await getFFmpeg();

  const inputExt = guessExtension(file.name);
  const inputName = `input.${inputExt}`;
  const paletteName = 'palette.png';
  const outputName = 'output.gif';

  const progressHandler = ({ progress }: { progress: number }) => {
    onProgress?.(Math.min(1, Math.max(0, progress)));
  };

  const seekArgs: string[] = [];
  if (startTime > 0) seekArgs.push('-ss', String(startTime));
  if (duration && duration > 0) seekArgs.push('-t', String(duration));

  const filter = `fps=${fps},scale=${width}:-1:flags=lanczos`;

  try {
    if (onProgress) ffmpeg.on('progress', progressHandler);

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    // Pass 1: generate an optimal color palette for this clip.
    await ffmpeg.exec([
      ...seekArgs,
      '-i', inputName,
      '-vf', `${filter},palettegen`,
      paletteName,
    ]);

    // Pass 2: encode the GIF using that palette.
    await ffmpeg.exec([
      ...seekArgs,
      '-i', inputName,
      '-i', paletteName,
      '-lavfi', `${filter} [x]; [x][1:v] paletteuse`,
      outputName,
    ]);

    const data = await ffmpeg.readFile(outputName);
    return new Blob([data], { type: 'image/gif' });
  } catch (err: unknown) {
    throw new VideoProcessingError(
      err instanceof Error ? err.message : 'Failed to create GIF. Try a shorter clip or lower resolution.'
    );
  } finally {
    if (onProgress) ffmpeg.off('progress', progressHandler);
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(paletteName);
      await ffmpeg.deleteFile(outputName);
    } catch {
      // Safe to ignore.
    }
  }
};

/** Reads basic metadata (duration in seconds) from a video file via a hidden <video> element. */
export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Could not read video metadata.'));
    };
    video.src = URL.createObjectURL(file);
  });
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
