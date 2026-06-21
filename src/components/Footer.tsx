import Link from 'next/link';
import { Zap } from 'lucide-react';

// ✅ Sirf yahan add karo naya tool — footer automatically update ho jayega
const tools = [
  { name: 'Image Compressor', slug: 'compressor' },
  { name: 'Image Resizer', slug: 'resizer' },
  { name: 'JPG to PNG', slug: 'jpg-to-png' },
  { name: 'PNG to JPG', slug: 'png-to-jpg' },
  { name: 'Image to PDF', slug: 'image-to-pdf' },
  { name: 'WebP Converter', slug: 'webp-converter' },
  { name: 'PDF to Image', slug: 'pdf-to-image' },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="text-lg font-bold">OpticShift Pro</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Professional, browser-side image tools. Your privacy is our priority. No images ever leave your device.
            </p>
          </div>

          {/* Tools — dynamic */}
          <div>
            <Link href="/tools">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 hover:text-primary transition-colors cursor-pointer">
                Tools →
              </h3>
            </Link>
            <ul className="space-y-2">
              {tools.map((tool) => (
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

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OpticShift Pro. All rights reserved.
          </p>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
};
