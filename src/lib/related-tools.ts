// Central data source for "Related Tools" cross-linking across every tool page.
// Grouped into fine-grained subgroups (finer than the /tools filter categories)
// so suggestions are genuinely relevant, not just "same broad category".

export type RelatedToolProps = { name: string; href: string; description: string };

const ALL_TOOLS: Record<string, { name: string; description: string }> = {
  'compressor': { name: 'Image Compressor', description: 'Reduce file size while keeping high quality. Supports JPEG and PNG.' },
  'resizer': { name: 'Image Resizer', description: 'Change dimensions with pixel-perfect accuracy. Maintain or change aspect ratios.' },
  'jpg-to-png': { name: 'JPG to PNG', description: 'Convert JPEGs to lossless PNG format instantly in your browser.' },
  'png-to-jpg': { name: 'PNG to JPG', description: 'Fast conversion from PNG to high-quality JPG with size optimization.' },
  'image-to-pdf': { name: 'Image to PDF', description: 'Convert multiple images to a single PDF file instantly in your browser.' },
  'webp-converter': { name: 'WebP Converter', description: 'Convert JPG & PNG to WebP for faster web performance.' },
  'pdf-to-image': { name: 'PDF to Image', description: 'Convert each PDF page to high-quality PNG images instantly.' },
  'image-cropper': { name: 'Image Cropper', description: 'Crop images with precision, free & private.' },
  'image-to-text': { name: 'Image to Text (OCR)', description: 'Extract text from any image or screenshot instantly. 100+ languages.' },
  'image-watermark': { name: 'Image Watermark', description: 'Add text or logo watermarks to images, free & private.' },
  'svg-to-png': { name: 'SVG to PNG', description: 'Convert SVG files to high-quality PNG instantly.' },
  'image-converter': { name: 'Image Format Converter', description: 'Convert between JPG, PNG, WebP, GIF, BMP, and ICO — all in one tool.' },
  'image-rotate': { name: 'Image Rotate & Flip', description: 'Rotate or flip images instantly, free & private.' },
  'heic-to-jpg': { name: 'HEIC to JPG', description: 'Convert iPhone HEIC photos to JPG instantly.' },
  'color-picker': { name: 'Color Picker', description: 'Pick colors from any image. Get HEX, RGB & HSL values.' },
  'youtube-thumbnail-converter': { name: 'YouTube Thumbnail Converter', description: 'Convert and center-crop any image into a perfect 16:9 ratio (1280x720) for YouTube.' },
  'word-counter': { name: 'Word Counter', description: 'Count words, characters, sentences & reading time instantly. Free & private.' },
  'case-converter': { name: 'Case Converter', description: 'Convert text to UPPER, lower, Title, camelCase, snake_case & more.' },
  'slug-generator': { name: 'Slug Generator', description: 'Convert any text into a clean URL-friendly slug instantly.' },
  'password-generator': { name: 'Password Generator', description: 'Generate strong, secure passwords instantly. Nothing stored.' },
  'percentage-calculator': { name: 'Percentage Calculator', description: 'Calculate percentages, increases, decreases, and discounts instantly.' },
  'ai-content-detector': { name: 'AI Content Detector', description: 'Check text for common signs of AI-generated writing. Free, instant.' },
  'age-calculator': { name: 'Age Calculator', description: 'Calculate exact age in years, months, and days from a date of birth.' },
  'date-difference-calculator': { name: 'Date Difference Calculator', description: 'Find the exact number of days, weeks, months, and years between two dates.' },
  'emi-calculator': { name: 'EMI Calculator', description: 'Calculate monthly EMI for a home, car, or personal loan instantly.' },
  'gst-calculator': { name: 'GST Calculator', description: 'Add or remove GST from any amount, with CGST/SGST breakdown.' },
  'interest-calculator': { name: 'Interest Calculator', description: 'Calculate simple or compound interest on savings or a loan.' },
  'invoice-generator': { name: 'Invoice Generator', description: 'Create a professional invoice with line items and tax, download as PDF.' },
  'qr-code-generator': { name: 'QR Code Generator', description: 'Create a QR code for a URL, text, Wi-Fi, or contact card. Free, instant.' },
  'barcode-generator': { name: 'Barcode Generator', description: 'Generate a scannable barcode — CODE128, EAN-13, UPC, and more. Free, instant.' },
  'text-repeater': { name: 'Text Repeater', description: 'Repeat any text any number of times with custom separators.' },
  'character-counter': { name: 'Character Counter', description: 'Count characters, words & check Twitter, Instagram, LinkedIn limits.' },
  'base64': { name: 'Base64 Encoder/Decoder', description: 'Encode or decode Base64 strings instantly. Free & private.' },
  'url-encoder': { name: 'URL Encoder/Decoder', description: 'Encode or decode URLs instantly. Free & private.' },
  'json-formatter': { name: 'JSON Formatter', description: 'Format, validate & minify JSON instantly. Free & private.' },
  'pdf-split': { name: 'PDF Split', description: 'Extract specific pages from any PDF instantly. Free & private.' },
  'pdf-merge': { name: 'PDF Merge', description: 'Combine multiple PDFs into one file. Reorder pages freely.' },
  'image-size-checker': { name: 'Image Size Checker', description: 'Check image dimensions, file size, aspect ratio & social media fit.' },
  'passport-photo': { name: 'Passport Photo Maker', description: 'Create a passport-size (35×45mm) photo instantly. Free & private.' },
  'visa-photo': { name: 'Visa Photo Maker', description: 'Create a 2x2 inch (51x51mm) visa photo instantly. Free & private.' },
  'aadhaar-photo': { name: 'Aadhaar Photo Maker', description: 'Create a 3.5cm x 4.5cm Aadhaar enrollment photo instantly. Free & private.' },
  'pan-photo': { name: 'PAN Card Photo Maker', description: 'Create a 2.5cm x 3.5cm PAN card photo instantly. Free & private.' },
  'exam-photo': { name: 'Exam Photo Resizer', description: 'Resize photo to 200x230px for exam application forms. Free & private.' },
  'signature-resizer': { name: 'Signature Resizer', description: 'Resize signature to 140x60px for exam and application forms. Free & private.' },
  'unit-converter': { name: 'Unit Converter', description: 'Convert length, weight, temperature, area, volume, speed and more instantly. Free & private.' },
  'image-collage': { name: 'Image Collage Maker', description: 'Combine multiple photos into one grid collage. Bulk upload, custom layout. Free & private.' },
  'video-compressor': { name: 'Video Compressor', description: 'Shrink MP4, MOV, WebM and MKV files right in your browser. No upload, no waiting room.' },
  'mov-to-mp4': { name: 'MOV to MP4 Converter', description: 'Convert iPhone/QuickTime MOV videos to universally-playable MP4. Free & private.' },
  'video-to-gif': { name: 'Video to GIF Converter', description: 'Trim a clip and turn it into a high-quality animated GIF. Free & private.' },
  'uuid-generator': { name: 'UUID Generator', description: 'Generate random UUID v4 values, bulk up to 50 at once. Free & private.' },
  'timestamp-converter': { name: 'Timestamp Converter', description: 'Convert Unix timestamps to dates and back, instantly. Free & private.' },
  'hash-generator': { name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-384 & SHA-512 hashes from text or files.' },
  'lorem-ipsum-generator': { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text by words, sentences, or paragraphs.' },
  'text-to-speech': { name: 'Text to Speech', description: 'Read any text aloud using your browser\'s built-in voices. Free & private.' },
  'image-to-base64': { name: 'Image to Base64', description: 'Convert images to Base64 for CSS/HTML, or decode back to an image.' },
  'pdf-compressor': { name: 'PDF Compressor', description: 'Shrink PDF file size right in your browser. Best for scanned/image-heavy PDFs.' },
  'pdf-to-word': { name: 'PDF to Word', description: 'Extract text from a PDF into an editable Word (.docx) document.' },
};

// Fine-grained subgroups — each tool can appear in more than one group.
const SUBGROUPS: string[][] = [
  // Image editing
  ['compressor', 'resizer', 'image-cropper', 'image-rotate', 'image-watermark', 'image-collage', 'image-size-checker', 'color-picker'],
  // Image format conversion
  ['jpg-to-png', 'png-to-jpg', 'webp-converter', 'image-converter', 'heic-to-jpg', 'svg-to-png', 'image-to-pdf', 'image-to-base64'],
  // Image content extraction
  ['image-to-text', 'image-to-base64', 'image-to-pdf', 'youtube-thumbnail-converter'],
  // PDF tools
  ['pdf-merge', 'pdf-split', 'pdf-compressor', 'pdf-to-image', 'pdf-to-word', 'image-to-pdf'],
  // Document / ID photo makers
  ['passport-photo', 'visa-photo', 'aadhaar-photo', 'pan-photo', 'exam-photo', 'signature-resizer'],
  // Video tools
  ['video-compressor', 'mov-to-mp4', 'video-to-gif'],
  // Text & writing tools
  ['word-counter', 'case-converter', 'character-counter', 'text-repeater', 'text-to-speech', 'ai-content-detector', 'lorem-ipsum-generator', 'slug-generator'],
  // Calculators
  ['percentage-calculator', 'age-calculator', 'date-difference-calculator', 'emi-calculator', 'gst-calculator', 'interest-calculator', 'unit-converter'],
  // Developer / generator utilities
  ['base64', 'url-encoder', 'json-formatter', 'uuid-generator', 'timestamp-converter', 'hash-generator', 'password-generator', 'qr-code-generator', 'barcode-generator'],
  // Business / money utilities
  ['invoice-generator', 'emi-calculator', 'gst-calculator', 'percentage-calculator'],
];

/**
 * Returns up to `count` related tools for the given slug, pulled from
 * whichever subgroup(s) it belongs to, excluding itself. Falls back to
 * filling from any other tool if fewer than `count` exist in its group(s).
 * Shaped to drop directly into the existing <RelatedTools tools={...} /> component.
 */
export function getRelatedTools(currentSlug: string, count = 4): RelatedToolProps[] {
  const seen = new Set<string>([currentSlug]);
  const results: RelatedToolProps[] = [];

  const myGroups = SUBGROUPS.filter((g) => g.includes(currentSlug));

  const push = (slug: string) => {
    const t = ALL_TOOLS[slug];
    if (!t) return;
    seen.add(slug);
    results.push({ name: t.name, href: `/tools/${slug}`, description: t.description });
  };

  for (const group of myGroups) {
    for (const slug of group) {
      if (results.length >= count) break;
      if (seen.has(slug)) continue;
      push(slug);
    }
    if (results.length >= count) break;
  }

  if (results.length < count) {
    for (const slug of Object.keys(ALL_TOOLS)) {
      if (results.length >= count) break;
      if (seen.has(slug)) continue;
      push(slug);
    }
  }

  return results.slice(0, count);
}
