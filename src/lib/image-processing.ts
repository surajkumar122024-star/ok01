export type ImageProcessingOptions = {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'image/jpeg' | 'image/png';
};

export const processImage = async (file: File, options: ImageProcessingOptions): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      let targetWidth = options.width || img.width;
      let targetHeight = options.height || img.height;

      // Maintain aspect ratio if only one dimension is provided
      if (options.width && !options.height) {
        targetHeight = (img.height / img.width) * options.width;
      } else if (!options.width && options.height) {
        targetWidth = (img.width / img.height) * options.height;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      const format = options.format || (file.type as 'image/jpeg' | 'image/png') || 'image/jpeg';
      const quality = options.quality !== undefined ? options.quality : 0.8;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        format,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
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