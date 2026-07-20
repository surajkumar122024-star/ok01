import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Free Guides for Image, PDF & Text Tools',
  description: 'Step-by-step guides and tutorials for compressing, converting, and editing images and PDFs, plus tips on text and developer tools — all free and browser-based.',
  openGraph: {
    title: 'Blog — OpticShift Pro',
    description: 'Step-by-step guides and tutorials for image, PDF, text, and developer tools — all free and browser-based.',
    type: 'website',
    url: 'https://ok01.vercel.app/blog',
  },
};

const blogs = [
  // ── Existing articles ──
  {
    slug: 'how-to-convert-png-to-jpg',
    title: 'How to Convert PNG to JPG Online — Free & Instant',
    description: 'Reduce PNG file size by up to 80% by converting to JPG format instantly in your browser.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-convert-jpg-to-png',
    title: 'How to Convert JPG to PNG Online — Free & Instant',
    description: 'Convert JPG images to lossless PNG format with transparency support, instantly in your browser.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-convert-pdf-to-image',
    title: 'How to Convert PDF to Image Online — Free & No Upload',
    description: 'Extract every PDF page as a high-quality PNG image instantly in your browser.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-convert-image-to-pdf',
    title: 'How to Convert Images to PDF Online — Free & Private',
    description: 'Combine multiple JPG or PNG images into a single PDF file without any upload.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-compress-images',
    title: 'How to Compress Images Without Losing Quality',
    description: 'Learn how to reduce image file size while maintaining visual quality using browser-based tools.',
    date: 'June 16, 2026',
  },
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP - Which Format Should You Use?',
    description: 'A complete guide to choosing the right image format for your website or project.',
    date: 'June 15, 2026',
  },
  {
    slug: 'resize-images-for-social-media',
    title: 'Perfect Image Sizes for Every Social Media Platform',
    description: 'The ultimate cheat sheet for image dimensions on Instagram, Twitter, YouTube and more.',
    date: 'June 14, 2026',
  },
  {
    slug: 'how-to-add-watermark-to-image',
    title: 'Add a Watermark to Image Online',
    description: 'Learn how to add text or logo watermarks to your images online. Protect your photos, artwork, and branding with this simple step-by-step guide.',
    date: 'June 27, 2026',
  },

  // ── New articles ──
  {
    slug: 'how-to-use-base64-encoder-decoder',
    title: 'How to Use Base64 Encoder Decoder: The Complete 2026 Guide',
    description: 'Learn how to encode and decode text, files, and images to and from Base64 — free, fast, and secure.',
    date: 'July 1, 2026',
  },
  {
    slug: 'case-converter-guide',
    title: 'Case Converter Guide: Convert Text to Upper, Lower, Title & Sentence Case',
    description: 'Instantly change text to uppercase, lowercase, title case, sentence case, and more — free and fast.',
    date: 'July 1, 2026',
  },
  {
    slug: 'character-counter-for-writing-and-seo',
    title: 'Character Counter for Writing and SEO: The Complete Guide',
    description: 'Track text length for SEO meta tags, social media posts, and writing limits in real time.',
    date: 'July 1, 2026',
  },
  {
    slug: 'color-picker-guide-for-designers',
    title: 'Color Picker Guide for Designers: Find, Copy & Use Any Color',
    description: 'Find HEX, RGB, and HSL codes for any color instantly — a complete guide for designers and developers.',
    date: 'July 1, 2026',
  },
  {
    slug: 'how-to-convert-heic-to-jpg',
    title: 'How to Convert HEIC to JPG: Complete 2026 Guide',
    description: 'Fix iPhone photo compatibility issues by converting HEIC photos to JPG online for free.',
    date: 'July 1, 2026',
  },
  {
    slug: 'image-cropper-complete-guide',
    title: 'Image Cropper Complete Guide: Crop Photos Online in Seconds',
    description: 'Crop images online for free — perfect for social media, profile photos, and design projects.',
    date: 'July 1, 2026',
  },
  {
    slug: 'how-to-rotate-images-online',
    title: 'How to Rotate Images Online: Complete 2026 Guide',
    description: 'Fix sideways or upside-down photos in seconds, no software needed.',
    date: 'July 1, 2026',
  },
  {
    slug: 'image-size-checker-guide',
    title: 'Image Size Checker Guide: Check Dimensions & File Size Instantly',
    description: 'Check image dimensions, resolution, and file size online for free — great for web optimization.',
    date: 'July 1, 2026',
  },
  {
    slug: 'json-formatter-guide',
    title: 'JSON Formatter Guide: Beautify, Validate & Debug JSON Online',
    description: 'Format, validate, and beautify JSON online for free — a must-have for developers.',
    date: 'July 1, 2026',
  },
  {
    slug: 'strong-password-generator-guide',
    title: 'Strong Password Generator Guide: Create Secure Passwords Instantly',
    description: 'Generate strong, secure passwords online for free with our complete security guide.',
    date: 'July 1, 2026',
  },
  {
    slug: 'how-to-merge-pdf-files',
    title: 'How to Merge PDF Files: Complete 2026 Guide',
    description: 'Combine multiple PDF files into one document online for free in just a few clicks.',
    date: 'July 1, 2026',
  },
  {
    slug: 'how-to-split-pdf-pages',
    title: 'How to Split PDF Pages: Complete 2026 Guide',
    description: 'Split a PDF into separate pages or files online for free, instantly.',
    date: 'July 1, 2026',
  },
  {
    slug: 'image-resizer-complete-guide',
    title: 'Image Resizer Complete Guide: Resize Photos Online Without Losing Quality',
    description: 'Resize images online for free without losing quality — for social media, websites, and print.',
    date: 'July 1, 2026',
  },
  {
    slug: 'slug-generator-for-seo',
    title: 'Slug Generator for SEO: Create Perfect URL Slugs Instantly',
    description: 'Generate clean, SEO-friendly URL slugs online for free for blogs, products, and web pages.',
    date: 'July 1, 2026',
  },
  {
    slug: 'how-to-convert-svg-to-png',
    title: 'How to Convert SVG to PNG: Complete 2026 Guide',
    description: 'Convert SVG files to PNG online for free — a guide for designers and developers.',
    date: 'July 1, 2026',
  },
  {
    slug: 'text-repeater-tool-guide',
    title: 'Text Repeater Tool Guide: Repeat Any Text Instantly',
    description: 'Duplicate words, phrases, or sentences multiple times instantly for testing, design, and fun.',
    date: 'July 1, 2026',
  },
  {
    slug: 'url-encoder-decoder-guide',
    title: 'URL Encoder Decoder Guide: Encode & Decode URLs Instantly',
    description: 'Encode and decode URLs online for free — a complete guide to percent-encoding for developers.',
    date: 'July 1, 2026',
  },
  {
    slug: 'webp-converter-complete-guide',
    title: 'WebP Converter Complete Guide: Convert Images for Faster Websites',
    description: 'Convert images to WebP format online for free for smaller file sizes and better SEO.',
    date: 'July 1, 2026',
  },
  {
    slug: 'word-counter-for-writers',
    title: 'Word Counter for Writers: Track Word Count & Writing Goals',
    description: 'Track word count, character count, sentences, and paragraphs — free for writers, students, and creators.',
    date: 'July 1, 2026',
  },
  {
    slug: 'youtube-thumbnail-downloader-guide',
    title: 'How to Create the Perfect YouTube Thumbnail Size (1280×720)',
    description: 'Turn any photo into a correctly sized YouTube thumbnail and avoid YouTube\'s automatic cropping cutting off your best content.',
    date: 'July 1, 2026',
  },
  {
    slug: 'unit-converter-guide',
    title: 'Unit Converter Guide: Convert Length, Weight, Temperature & More',
    description: 'Convert between metric and imperial units accurately — length, weight, temperature, area, volume, speed, data, and time.',
    date: 'July 20, 2026',
  },
  {
    slug: 'aadhaar-card-photo-size-guide',
    title: 'Aadhaar Card Photo Size Guide (3.5×4.5cm)',
    description: 'The exact Aadhaar enrollment and update photo specification, common rejection reasons, and how to crop your own photo correctly.',
    date: 'July 20, 2026',
  },
  {
    slug: 'pan-card-photo-size-guide',
    title: 'PAN Card Photo Size Guide (2.5×3.5cm)',
    description: 'The exact PAN application photo specification for Form 49A/49AA, common mistakes, and how to crop your photo correctly.',
    date: 'July 20, 2026',
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-12">Tips, guides and tutorials about image editing.</p>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug}>
            <div className="border rounded-xl p-6 hover:border-primary transition-colors cursor-pointer">
              <p className="text-sm text-muted-foreground mb-2">{blog.date}</p>
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-muted-foreground">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
