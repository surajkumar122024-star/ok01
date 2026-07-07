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
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      try {
        const naturalWidth = img.naturalWidth || img.width;
        const naturalHeight = img.naturalHeight || img.height;

        let targetWidth = options.width || naturalWidth;
        let targetHeight = options.height || naturalHeight;

        // Maintain aspect ratio if only one dimension is provided
        if (options.width && !options.height) {
          targetHeight = (naturalHeight / naturalWidth) * options.width;
        } else if (!options.width && options.height) {
          targetWidth = (naturalWidth / naturalHeight) * options.height;
        }

        // Guard against zero, negative, or NaN dimensions which would
        // otherwise silently produce a broken 0x0 canvas.
        targetWidth = Math.max(1, Math.round(targetWidth) || naturalWidth);
        targetHeight = Math.max(1, Math.round(targetHeight) || naturalHeight);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context. Your browser may not support this feature.'));
          return;
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const format = options.format || 'image/jpeg';
        const quality = options.quality !== undefined ? options.quality : 0.8;

        const fallbackToDataURL = () => {
          try {
            const dataUrl = canvas.toDataURL(format, quality);
            resolve(dataURLToBlob(dataUrl));
          } catch (fallbackErr: any) {
            reject(new Error(`Could not export the resized image on this device (${fallbackErr?.message || 'unknown error'}).`));
          }
        };

        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                // Some mobile browsers return null here instead of throwing.
                // Fall back to the more universally supported toDataURL path.
                fallbackToDataURL();
              }
            },
            format,
            quality
          );
        } else {
          // Very old browsers without toBlob support at all
          fallbackToDataURL();
        }
      } catch (err: any) {
        reject(new Error(`Image processing failed: ${err?.message || 'unknown error'}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load the selected image. The file may be corrupted or in an unsupported format.'));
    };

    img.src = objectUrl;
  });
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
