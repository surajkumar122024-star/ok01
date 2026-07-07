import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  RotateCcw, 
  Maximize, 
  Image as ImageIcon,
  Zap,
FileImage,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'All Tools — 32 Free Image, PDF, Text & Document Tools',
  description: 'Browse all 32 free tools on OpticShift Pro — image compression, resizing, format conversion, PDF tools, text utilities, and document photo makers. No upload, 100% private.',
  openGraph: {
    title: 'All Tools — OpticShift Pro',
    description: 'Browse all 32 free browser-based tools for images, PDFs, text, and documents.',
    type: 'website',
    url: 'https://ok01.vercel.app/tools',
  },
};

const tools = [
{
    name: "Image Compressor",
    slug: "compressor",
    description: "Reduce file size while keeping high quality. Supports JPEG and PNG.",
    icon: RotateCcw,
    color: "bg-blue-500"
  },
  {
    name: "Image Resizer",
    slug: "resizer",
    description: "Change dimensions with pixel-perfect accuracy. Maintain or change aspect ratios.",
    icon: Maximize,
    color: "bg-cyan-500"
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    description: "Convert JPEGs to lossless PNG format instantly in your browser.",
    icon: ImageIcon,
    color: "bg-indigo-500"
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    description: "Fast conversion from PNG to high-quality JPG with size optimization.",
    icon: ImageIcon,
    color: "bg-sky-500"
  }
  ,
{
  name: "Image to PDF",
  slug: "image-to-pdf",
  description: "Convert multiple images to a single PDF file instantly in your browser.",
  icon: FileImage,
  color: "bg-red-500"
},
{
  name: "WebP Converter",
  slug: "webp-converter",
  description: "Convert JPG & PNG to WebP for faster web performance.",
  icon: FileImage,
  color: "bg-emerald-500"
},
  {
  name: "PDF to Image",
  slug: "pdf-to-image",
  description: "Convert each PDF page to high-quality PNG images instantly.",
  icon: FileImage,
  color: "bg-orange-500"
},
  {
  name: "Image Cropper",
  slug: "image-cropper",
  description: "Crop images with precision, free & private.",
  icon: FileImage,
  color: "bg-violet-500"
},
  {
  name: "Image Watermark",
  slug: "image-watermark",
  description: "Add text or logo watermarks to images, free & private.",
  icon: FileImage,
  color: "bg-pink-500"
},
  {
  name: "SVG to PNG",
  slug: "svg-to-png",
  description: "Convert SVG files to high-quality PNG instantly.",
  icon: FileImage,
  color: "bg-blue-400"
},
  {
  name: "Image Rotate & Flip",
  slug: "image-rotate",
  description: "Rotate or flip images instantly, free & private.",
  icon: RotateCcw,
  color: "bg-teal-500"
},
  {
  name: "HEIC to JPG",
  slug: "heic-to-jpg",
  description: "Convert iPhone HEIC photos to JPG instantly.",
  icon: FileImage,
  color: "bg-yellow-500"
},
  {
  name: "Color Picker",
  slug: "color-picker",
  description: "Pick colors from any image. Get HEX, RGB & HSL values.",
  icon: FileImage,
  color: "bg-rose-500"
},
  {
  name: "YouTube Thumbnail Converter",
  slug: "youtube-thumbnail-converter",
  description: "Convert and center-crop any image into a perfect 16:9 ratio (1280x720) for YouTube.",
  icon: FileImage,
  color: "bg-red-500"
},
 {
  name: "Word Counter",
  slug: "word-counter",
  description: "Count words, characters, sentences & reading time instantly. Free & private.",
  icon: FileImage,
  color: "bg-slate-500"
},
  {
  name: "Case Converter",
  slug: "case-converter",
  description: "Convert text to UPPER, lower, Title, camelCase, snake_case & more.",
  icon: FileImage,
  color: "bg-indigo-500"
},
  {
  name: "Slug Generator",
  slug: "slug-generator",
  description: "Convert any text into a clean URL-friendly slug instantly.",
  icon: FileImage,
  color: "bg-green-600"
},
{
  name: "Password Generator",
  slug: "password-generator",
  description: "Generate strong, secure passwords instantly. Nothing stored.",
  icon: FileImage,
  color: "bg-purple-600"
},
  {
  name: "Text Repeater",
  slug: "text-repeater",
  description: "Repeat any text any number of times with custom separators.",
  icon: FileImage,
  color: "bg-teal-600"
},
  {
  name: "Character Counter",
  slug: "character-counter",
  description: "Count characters, words & check Twitter, Instagram, LinkedIn limits.",
  icon: FileImage,
  color: "bg-blue-600"
},
{
  name: "Base64 Encoder/Decoder",
  slug: "base64",
  description: "Encode or decode Base64 strings instantly. Free & private.",
  icon: FileImage,
  color: "bg-amber-600"
},
{
  name: "URL Encoder/Decoder",
  slug: "url-encoder",
  description: "Encode or decode URLs instantly. Free & private.",
  icon: FileImage,
  color: "bg-cyan-600"
},
 {
  name: "JSON Formatter",
  slug: "json-formatter",
  description: "Format, validate & minify JSON instantly. Free & private.",
  icon: FileImage,
  color: "bg-yellow-500"
},
  {
  name: "PDF Split",
  slug: "pdf-split",
  description: "Extract specific pages from any PDF instantly. Free & private.",
  icon: FileImage,
  color: "bg-yellow-600"
},
  {
  name: "PDF Merge",
  slug: "pdf-merge",
  description: "Combine multiple PDFs into one file. Reorder pages freely.",
  icon: FileImage,
  color: "bg-orange-600"
},
{
  name: "Image Size Checker",
  slug: "image-size-checker",
  description: "Check image dimensions, file size, aspect ratio & social media fit.",
  icon: FileImage,
  color: "bg-rose-500"
},
  {
  name: "Passport Photo Maker",
  slug: "passport-photo",
  description: "Create a passport-size (35×45mm) photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-fuchsia-500"
},
  {
  name: "Visa Photo Maker",
  slug: "visa-photo",
  description: "Create a 2x2 inch (51x51mm) visa photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-cyan-600"
},
  {
  name: "Aadhaar Photo Maker",
  slug: "aadhaar-photo",
  description: "Create a 3.5cm x 4.5cm Aadhaar enrollment photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-teal-600"
},
  {
  name: "PAN Card Photo Maker",
  slug: "pan-photo",
  description: "Create a 2.5cm x 3.5cm PAN card photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-amber-600"
},
  {
  name: "Exam Photo Resizer",
  slug: "exam-photo",
  description: "Resize photo to 200x230px for exam application forms. Free & private.",
  icon: FileImage,
  color: "bg-indigo-600"
},
  {
  name: "Signature Resizer",
  slug: "signature-resizer",
  description: "Resize signature to 140x60px for exam and application forms. Free & private.",
  icon: FileImage,
  color: "bg-slate-600"
},
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <LayoutGrid size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">All Image Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our specialized suite of tools is designed to handle all your daily image processing needs with zero latency and absolute privacy.
          </p>
        </div>

        <AdPlaceholder />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <div className="group glass p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col h-full">
                <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform`}>
                  <tool.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{tool.name}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow mb-8">{tool.description}</p>
                <div className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold group-hover:scale-105 transition-all">
                  Launch Tool <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
          
          {/* Placeholder for future tools */}
          <div className="p-8 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground mb-4">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">More coming soon</h3>
            <p className="text-muted-foreground text-sm">We're constantly working on new professional tools.</p>
          </div>
        </div>

        <AdPlaceholder className="mt-12" />
      </div>
    </div>
  );
}
