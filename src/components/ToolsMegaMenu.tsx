"use client";

import Link from "next/link";
import type { ElementType } from "react";
import {
  Minimize2, Maximize2, Crop, RotateCw, Droplet, Ruler, Palette,
  RefreshCw, FileImage, FileText, Layers, Scissors,
  Type, Hash, ArrowUpDown, Repeat, Link2,
  Binary, Braces, Link as LinkIcon,
  KeyRound, Youtube, Fingerprint,
} from "lucide-react";

interface ToolItem {
  name: string;
  href: string;
  icon: ElementType;
}

interface ToolCategory {
  title: string;
  items: ToolItem[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "Image Tools",
    items: [
      { name: "Image Compressor", href: "/tools/compressor", icon: Minimize2 },
      { name: "Image Resizer", href: "/tools/resizer", icon: Maximize2 },
      { name: "Image Cropper", href: "/tools/image-cropper", icon: Crop },
      { name: "Rotate & Flip", href: "/tools/image-rotate", icon: RotateCw },
      { name: "Image Watermark", href: "/tools/image-watermark", icon: Droplet },
      { name: "Size Checker", href: "/tools/image-size-checker", icon: Ruler },
      { name: "Color Picker", href: "/tools/color-picker", icon: Palette },
    ],
  },
  {
    title: "Convert Formats",
    items: [
      { name: "JPG to PNG", href: "/tools/jpg-to-png", icon: RefreshCw },
      { name: "PNG to JPG", href: "/tools/png-to-jpg", icon: RefreshCw },
      { name: "WebP Converter", href: "/tools/webp-converter", icon: RefreshCw },
      { name: "HEIC to JPG", href: "/tools/heic-to-jpg", icon: RefreshCw },
      { name: "SVG to PNG", href: "/tools/svg-to-png", icon: RefreshCw },
    ],
  },
  {
    title: "PDF Tools",
    items: [
      { name: "Image to PDF", href: "/tools/image-to-pdf", icon: FileText },
      { name: "PDF to Image", href: "/tools/pdf-to-image", icon: FileImage },
      { name: "Merge PDF", href: "/tools/pdf-merge", icon: Layers },
      { name: "Split PDF", href: "/tools/pdf-split", icon: Scissors },
    ],
  },
  {
    title: "Text Tools",
    items: [
      { name: "Word Counter", href: "/tools/word-counter", icon: Type },
      { name: "Character Counter", href: "/tools/character-counter", icon: Hash },
      { name: "Case Converter", href: "/tools/case-converter", icon: ArrowUpDown },
      { name: "Text Repeater", href: "/tools/text-repeater", icon: Repeat },
      { name: "Slug Generator", href: "/tools/slug-generator", icon: Link2 },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      { name: "Base64 Encoder", href: "/tools/base64", icon: Binary },
      { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
      { name: "URL Encoder", href: "/tools/url-encoder", icon: LinkIcon },
    ],
  },
  {
    title: "More Tools",
    items: [
      { name: "Password Generator", href: "/tools/password-generator", icon: KeyRound },
      { name: "YouTube Thumbnail", href: "/tools/youtube-thumbnail-converter", icon: Youtube },
    ],
  },
  {
    title: "Document Photos",
    items: [
      { name: "Passport Photo", href: "/tools/passport-photo", icon: Fingerprint },
      { name: "Visa Photo", href: "/tools/visa-photo", icon: Fingerprint },
      { name: "Aadhaar Photo", href: "/tools/aadhaar-photo", icon: Fingerprint },
    ],
  },
];

export function ToolsMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6 w-full">
      {toolCategories.map((cat) => (
        <div key={cat.title} className="flex flex-col gap-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            {cat.title}
          </p>
          {cat.items.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={onNavigate}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Icon size={16} className="flex-shrink-0 text-primary" />
                <span className="leading-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
