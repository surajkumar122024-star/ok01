import Link from 'next/link';
import { Zap, Image as ImageIcon, FileText, Code2, FileImage } from 'lucide-react';

// ✅ Sirf yahan add karo naya tool — footer automatically update ho jayega
const popularTools = [
  { name: 'Image Compressor', slug: 'compressor' },
  { name: 'Image Resizer', slug: 'resizer' },
  { name: 'JPG to PNG', slug: 'jpg-to-png' },
  { name: 'PNG to JPG', slug: 'png-to-jpg' },
  { name: 'Image to PDF', slug: 'image-to-pdf' },
  { name: 'WebP Converter', slug: 'webp-converter' },
];

const toolCategories = [
  { name: 'Image Tools', icon: ImageIcon },
  { name: 'PDF Tools', icon: FileText },
  { name: 'Text & Dev Tools', icon: Code2 },
  { name: 'Document Photos', icon: FileImage },
];

const latestBlogs = [
  { name: 'How to Compress Images Without Losing Quality', slug: 'how-to-compress-images' },
  { name: 'JPG vs PNG vs WebP — Which Format Should You Use?', slug: 'jpg-vs-png-vs-webp' },
  { name: 'How to Convert HEIC to JPG', slug: 'how-to-convert-heic-to-jpg' },
  { name: 'Perfect Image Sizes for Every Social Media Platform', slug: 'resize-images-for-social-media' },
];

export const Footer = () => {
  return (
    <footer className="relative border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand + description — spans 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="text-lg font-bold">OpticShift Pro</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              33+ free, browser-based image, PDF, and text tools. Every file is processed locally
              on your device — nothing is ever uploaded to a server.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2.5">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {toolCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <cat.icon size={14} className="flex-shrink-0" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Blogs */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Latest Blogs
            </h3>
            <ul className="space-y-2.5">
              {latestBlogs.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {post.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links / Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/terms#disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} OpticShift Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            Built for people who'd rather their files stay on their own device.
          </p>
        </div>
      </div>
    </footer>
  );
};
