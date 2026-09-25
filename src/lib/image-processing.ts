export type ImageProcessingOptions = {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'image/jpeg' | 'image/png';
};

// Converts a data URL string into a Blob. Used as a fallback when
// canvas.toBlob() fails or returns null, which is a known issue on
// some mobile browsers (certain Android WebViews and older iOS Safari).
function dataURLToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

export const processImage = async (file: File, options: ImageProcessingOptions): Promise<Blob> => {
  if (!file || file.size === 0) {
    throw new Error('The selected image file is empty or unavailable.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file.');
  }

  let source: CanvasImageSource;

  try {
    // Use the same FileReader/data-URL HTMLImageElement path that the
    // preview uses. This is more reliable on mobile for images that can be
    // previewed by the browser but cannot be decoded by createImageBitmap.
    source = await loadImageFromFile(file);

    const naturalWidth = (source as HTMLImageElement).naturalWidth || (source as HTMLImageElement).width;
    const naturalHeight = (source as HTMLImageElement).naturalHeight || (source as HTMLImageElement).height;

    if (!naturalWidth || !naturalHeight) {
      throw new Error('Could not determine the image dimensions on this device.');
    }

    let targetWidth = options.width || naturalWidth;
    let targetHeight = options.height || naturalHeight;

    if (options.width && !options.height) {
      targetHeight = (naturalHeight / naturalWidth) * options.width;
    } else if (!options.width && options.height) {
      targetWidth = (naturalWidth / naturalHeight) * options.height;
    }

    // Keep the working canvas safe for mobile devices.
    const MAX_DIMENSION = 3200;
    const MAX_PIXELS = 9_000_000;
    const requestedPixels = targetWidth * targetHeight;
    const safeScale = Math.min(
      1,
      MAX_DIMENSION / Math.max(targetWidth, targetHeight),
      Math.sqrt(MAX_PIXELS / Math.max(1, requestedPixels))
    );

    targetWidth = Math.max(1, Math.round(targetWidth * safeScale));
    targetHeight = Math.max(1, Math.round(targetHeight * safeScale));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Your browser could not create an image canvas.');
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    const format = options.format || 'image/jpeg';
    const quality = options.quality !== undefined ? options.quality : 0.8;

    const blob = await canvasToBlob(canvas, format, quality);
    if (!blob || blob.size === 0) {
      throw new Error('The browser could not create the compressed image.');
    }

    return blob;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    throw new Error(`Image processing failed: ${message}`);
  }
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Loads a File into an HTMLImageElement via FileReader (data: URL) rather
 * than URL.createObjectURL (blob: URL). Some mobile browsers/network
 * configurations fail to reliably load blob: URLs into <img>. The
 * data-URL path is also the fallback for createImageBitmap failures.
 */
export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let objectUrl: string | null = null;
    let settled = false;

    const cleanup = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
    };

    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(message));
    };

    img.onload = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(img);
    };

    img.onerror = () => {
      if (objectUrl) {
        cleanup();
        const reader = new FileReader();
        reader.onload = () => {
          img.onload = () => {
            if (settled) return;
            settled = true;
            resolve(img);
          };
          img.onerror = () => fail('Failed to load the selected image. The file may be corrupted or in an unsupported format.');
          img.src = reader.result as string;
        };
        reader.onerror = () => fail('Failed to read the selected image file.');
        reader.readAsDataURL(file);
      } else {
        fail('Failed to load the selected image. The file may be corrupted or in an unsupported format.');
      }
    };

    try {
      objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
    } catch {
      const reader = new FileReader();
      reader.onload = () => { img.src = reader.result as string; };
      reader.onerror = () => fail('Failed to read the selected image file.');
      reader.readAsDataURL(file);
    }
  });
};

/**
 * canvas.toBlob(), with a fallback to canvas.toDataURL() for browsers
 * (mostly older Android WebViews) that return null from toBlob() instead
 * of throwing.
 */
export const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const fallbackToDataURL = () => {
      try {
        resolve(dataURLToBlob(canvas.toDataURL(type, quality)));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'unknown error';
        reject(new Error(`Could not export the image on this device (${message}).`));
      }
    };

    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob((blob) => (blob ? resolve(blob) : fallbackToDataURL()), type, quality);
    } else {
      fallbackToDataURL();
    }
  });
};
