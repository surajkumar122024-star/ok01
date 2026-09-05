import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  RotateCcw, 
  Maximize, 
  Image as ImageIcon,
  Zap,
  FileImage,
  Ruler,
  LayoutGrid
} from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'All Tools — 44 Free Image, PDF, Text & Document Tools',
  description: 'Browse all 44 free tools on OpticShift Pro — image compression, resizing, format conversion, PDF tools, text utilities, and document photo makers. No upload, 100% private.',
  openGraph: {
    title: 'All Tools — OpticShift Pro',
    description: 'Browse all 44 free browser-based tools for images, PDFs, text, and documents.',
    type: 'website',
    url: 'https://ok01.vercel.app/tools',
  },
};

const tools = [
{
    name: "Image Compressor",
    slug: "compressor",
  category: "image-tools",
    description: "Reduce file size while keeping high quality. Supports JPEG and PNG.",
    icon: RotateCcw,
    color: "bg-blue-500"
  },
  {
    name: "Image Resizer",
    slug: "resizer",
  category: "image-tools",
    description: "Change dimensions with pixel-perfect accuracy. Maintain or change aspect ratios.",
    icon: Maximize,
    color: "bg-cyan-500"
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
  category: "format-converters",
    description: "Convert JPEGs to lossless PNG format instantly in your browser.",
    icon: ImageIcon,
    color: "bg-indigo-500"
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
  category: "format-converters",
    description: "Fast conversion from PNG to high-quality JPG with size optimization.",
    icon: ImageIcon,
    color: "bg-sky-500"
  }
  ,
{
  name: "Image to PDF",
  slug: "image-to-pdf",
  category: "pdf-utilities",
  description: "Convert multiple images to a single PDF file instantly in your browser.",
  icon: FileImage,
  color: "bg-red-500"
},
{
  name: "WebP Converter",
  slug: "webp-converter",
  category: "format-converters",
  description: "Convert JPG & PNG to WebP for faster web performance.",
  icon: FileImage,
  color: "bg-emerald-500"
},
  {
  name: "PDF to Image",
  slug: "pdf-to-image",
  category: "pdf-utilities",
  description: "Convert each PDF page to high-quality PNG images instantly.",
  icon: FileImage,
  color: "bg-orange-500"
},
  {
  name: "Image Cropper",
  slug: "image-cropper",
  category: "image-tools",
  description: "Crop images with precision, free & private.",
  icon: FileImage,
  color: "bg-violet-500"
},
{
  name: "Image to Text (OCR)",
  slug: "image-to-text",
  category: "image-tools",
  description: "Extract text from any image or screenshot instantly. 100+ languages.",
  icon: FileImage,
  color: "bg-cyan-700"
},
  {
  name: "Image Watermark",
  slug: "image-watermark",
  category: "image-tools",
  description: "Add text or logo watermarks to images, free & private.",
  icon: FileImage,
  color: "bg-pink-500"
},
  {
  name: "SVG to PNG",
  slug: "svg-to-png",
  category: "format-converters",
  description: "Convert SVG files to high-quality PNG instantly.",
  icon: FileImage,
  color: "bg-blue-400"
},
  {
  name: "Image Rotate & Flip",
  slug: "image-rotate",
  category: "image-tools",
  description: "Rotate or flip images instantly, free & private.",
  icon: RotateCcw,
  color: "bg-teal-500"
},
  {
  name: "HEIC to JPG",
  slug: "heic-to-jpg",
  category: "format-converters",
  description: "Convert iPhone HEIC photos to JPG instantly.",
  icon: FileImage,
  color: "bg-yellow-500"
},
  {
  name: "Color Picker",
  slug: "color-picker",
  category: "image-tools",
  description: "Pick colors from any image. Get HEX, RGB & HSL values.",
  icon: FileImage,
  color: "bg-rose-500"
},
  {
  name: "YouTube Thumbnail Converter",
  slug: "youtube-thumbnail-converter",
  category: "format-converters",
  description: "Convert and center-crop any image into a perfect 16:9 ratio (1280x720) for YouTube.",
  icon: FileImage,
  color: "bg-red-500"
},
 {
  name: "Word Counter",
  slug: "word-counter",
  category: "text-dev-tools",
  description: "Count words, characters, sentences & reading time instantly. Free & private.",
  icon: FileImage,
  color: "bg-slate-500"
},
  {
  name: "Case Converter",
  slug: "case-converter",
  category: "text-dev-tools",
  description: "Convert text to UPPER, lower, Title, camelCase, snake_case & more.",
  icon: FileImage,
  color: "bg-indigo-500"
},
  {
  name: "Slug Generator",
  slug: "slug-generator",
  category: "text-dev-tools",
  description: "Convert any text into a clean URL-friendly slug instantly.",
  icon: FileImage,
  color: "bg-green-600"
},
{
  name: "Password Generator",
  slug: "password-generator",
  category: "text-dev-tools",
  description: "Generate strong, secure passwords instantly. Nothing stored.",
  icon: FileImage,
  color: "bg-purple-600"
},
{
  name: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "text-dev-tools",
  description: "Calculate percentages, increases, decreases, and discounts instantly.",
  icon: FileImage,
  color: "bg-emerald-600"
},
{
  name: "Age Calculator",
  slug: "age-calculator",
  category: "text-dev-tools",
  description: "Calculate exact age in years, months, and days from a date of birth.",
  icon: FileImage,
  color: "bg-rose-600"
},
{
  name: "Date Difference Calculator",
  slug: "date-difference-calculator",
  category: "text-dev-tools",
  description: "Find the exact number of days, weeks, months, and years between two dates.",
  icon: FileImage,
  color: "bg-pink-600"
},
{
  name: "EMI Calculator",
  slug: "emi-calculator",
  category: "text-dev-tools",
  description: "Calculate monthly EMI for a home, car, or personal loan instantly.",
  icon: FileImage,
  color: "bg-amber-700"
},
{
  name: "GST Calculator",
  slug: "gst-calculator",
  category: "text-dev-tools",
  description: "Add or remove GST from any amount, with CGST/SGST breakdown.",
  icon: FileImage,
  color: "bg-lime-700"
},
{
  name: "Interest Calculator",
  slug: "interest-calculator",
  category: "text-dev-tools",
  description: "Calculate simple or compound interest on savings or a loan.",
  icon: FileImage,
  color: "bg-yellow-700"
},
{
  name: "Invoice Generator",
  slug: "invoice-generator",
  category: "text-dev-tools",
  description: "Create a professional invoice with line items and tax, download as PDF.",
  icon: FileImage,
  color: "bg-violet-700"
},
{
  name: "QR Code Generator",
  slug: "qr-code-generator",
  category: "text-dev-tools",
  description: "Create a QR code for a URL, text, Wi-Fi, or contact card. Free, instant.",
  icon: FileImage,
  color: "bg-indigo-600"
},
{
  name: "Barcode Generator",
  slug: "barcode-generator",
  category: "text-dev-tools",
  description: "Generate a scannable barcode — CODE128, EAN-13, UPC, and more. Free, instant.",
  icon: FileImage,
  color: "bg-slate-600"
},
  {
  name: "Text Repeater",
  slug: "text-repeater",
  category: "text-dev-tools",
  description: "Repeat any text any number of times with custom separators.",
  icon: FileImage,
  color: "bg-teal-600"
},
  {
  name: "Character Counter",
  slug: "character-counter",
  category: "text-dev-tools",
  description: "Count characters, words & check Twitter, Instagram, LinkedIn limits.",
  icon: FileImage,
  color: "bg-blue-600"
},
{
  name: "Base64 Encoder/Decoder",
  slug: "base64",
  category: "text-dev-tools",
  description: "Encode or decode Base64 strings instantly. Free & private.",
  icon: FileImage,
  color: "bg-amber-600"
},
{
  name: "URL Encoder/Decoder",
  slug: "url-encoder",
  category: "text-dev-tools",
  description: "Encode or decode URLs instantly. Free & private.",
  icon: FileImage,
  color: "bg-cyan-600"
},
 {
  name: "JSON Formatter",
  slug: "json-formatter",
  category: "text-dev-tools",
  description: "Format, validate & minify JSON instantly. Free & private.",
  icon: FileImage,
  color: "bg-yellow-500"
},
  {
  name: "PDF Split",
  slug: "pdf-split",
  category: "pdf-utilities",
  description: "Extract specific pages from any PDF instantly. Free & private.",
  icon: FileImage,
  color: "bg-yellow-600"
},
  {
  name: "PDF Merge",
  slug: "pdf-merge",
  category: "pdf-utilities",
  description: "Combine multiple PDFs into one file. Reorder pages freely.",
  icon: FileImage,
  color: "bg-orange-600"
},
{
  name: "Image Size Checker",
  slug: "image-size-checker",
  category: "image-tools",
  description: "Check image dimensions, file size, aspect ratio & social media fit.",
  icon: FileImage,
  color: "bg-rose-500"
},
  {
  name: "Passport Photo Maker",
  slug: "passport-photo",
  category: "document-photos",
  description: "Create a passport-size (35×45mm) photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-fuchsia-500"
},
  {
  name: "Visa Photo Maker",
  slug: "visa-photo",
  category: "document-photos",
  description: "Create a 2x2 inch (51x51mm) visa photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-cyan-600"
},
  {
  name: "Aadhaar Photo Maker",
  slug: "aadhaar-photo",
  category: "document-photos",
  description: "Create a 3.5cm x 4.5cm Aadhaar enrollment photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-teal-600"
},
  {
  name: "PAN Card Photo Maker",
  slug: "pan-photo",
  category: "document-photos",
  description: "Create a 2.5cm x 3.5cm PAN card photo instantly. Free & private.",
  icon: FileImage,
  color: "bg-amber-600"
},
  {
  name: "Exam Photo Resizer",
  slug: "exam-photo",
  category: "document-photos",
  description: "Resize photo to 200x230px for exam application forms. Free & private.",
  icon: FileImage,
  color: "bg-indigo-600"
},
  {
  name: "Signature Resizer",
  slug: "signature-resizer",
  category: "document-photos",
  description: "Resize signature to 140x60px for exam and application forms. Free & private.",
  icon: FileImage,
  color: "bg-slate-600"
},
  {
    name: "Unit Converter",
    slug: "unit-converter",
  category: "unit-converter",
    description: "Convert length, weight, temperature, area, volume, speed and more instantly. Free & private.",
    icon: Ruler,
    color: "bg-cyan-600"
  },
  {
    name: "Image Collage Maker",
    slug: "image-collage",
  category: "image-tools",
    description: "Combine multiple photos into one grid collage. Bulk upload, custom layout. Free & private.",
    icon: LayoutGrid,
    color: "bg-fuchsia-600"
  },
];

const categoryInfo: Record<string, { title: string; description: string }> = {
  'image-tools': { title: 'Image Tools', description: 'Compress, resize, crop, rotate, watermark, and pick colors from any photo.' },
  'format-converters': { title: 'Format Converters', description: 'Move between JPG, PNG, WebP, HEIC, and SVG without losing quality.' },
  'pdf-utilities': { title: 'PDF Utilities', description: 'Merge, split, and convert PDFs to and from images, all in your browser.' },
  'document-photos': { title: 'Document Photos', description: 'Aadhaar, PAN, Passport, Visa, and exam photos sized to official specs.' },
  'text-dev-tools': { title: 'Text & Developer Tools', description: 'Word counter, case converter, JSON formatter, Base64, and more.' },
  'unit-converter': { title: 'Unit Converter', description: 'Length, weight, temperature, area, volume, speed, data, and time.' },
};

const categoryOrder = ['image-tools', 'format-converters', 'pdf-utilities', 'document-photos', 'text-dev-tools', 'unit-converter'];

export default function ToolsPage() {
  const grouped = categoryOrder.map((catSlug) => ({
    slug: catSlug,
    ...categoryInfo[catSlug],
    tools: tools.filter((t) => t.category === catSlug),
  }));

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <LayoutGrid size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">All Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            44+ free, browser-based tools for images, PDFs, documents, and text — zero uploads, zero latency, absolute privacy.
          </p>
        </div>

        <AdPlaceholder />

        {grouped.map((group, i) => (
          <section key={group.slug} id={group.slug} className="scroll-mt-28 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{group.title}</h2>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {group.tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <div className="group glass p-4 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col h-full">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 ${tool.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-8 group-hover:rotate-12 transition-transform`}>
                      <tool.icon size={20} className="sm:hidden" />
                      <tool.icon size={28} className="hidden sm:block" />
                    </div>
                    <h3 className="text-base sm:text-2xl font-bold mb-1.5 sm:mb-4">{tool.name}</h3>
                    <p className="text-xs sm:text-base text-muted-foreground leading-snug sm:leading-relaxed flex-grow mb-3 sm:mb-8 line-clamp-3 sm:line-clamp-none">{tool.description}</p>
                    <div className="inline-flex items-center justify-center h-9 sm:h-12 px-3 sm:px-6 rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-base group-hover:scale-105 transition-all">
                      Launch Tool <ArrowRight size={16} className="ml-1.5 sm:ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
              {i === grouped.length - 1 && (
                <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-dashed flex flex-col items-center justify-center text-center opacity-60">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-muted rounded-xl sm:rounded-2xl flex items-center justify-center text-muted-foreground mb-3 sm:mb-4">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">More coming soon</h3>
                  <p className="text-muted-foreground text-sm">We&apos;re constantly working on new professional tools.</p>
                </div>
              )}
            </div>
          </section>
        ))}

        <AdPlaceholder className="mt-12" />
      </div>
    </div>
  );
}
