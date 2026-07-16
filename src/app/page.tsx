import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Zap,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Image as ImageIcon,
  Maximize,
  RotateCcw,
  CheckCircle2,
  FileImage,
  Layers,
  FileText,
  Code2,
  Upload,
  MousePointerClick,
  Download,
  GraduationCap,
  Paintbrush,
  Briefcase,
  Lock,
  ServerOff,
  Gauge,
  Star,
  BookOpen,
} from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { FaqSection } from '@/components/FaqSection';

export const metadata: Metadata = {
  title: 'OpticShift Pro — Free Browser-Based Image, PDF & Text Tools',
  description:
    'OpticShift Pro offers 33+ free online tools for image compression, format conversion, PDF editing, and text utilities — all processed instantly and privately in your browser. No uploads, no sign-up, no cost.',
};

const stats = [
  { label: 'Free tools', value: '33+' },
  { label: 'Files uploaded to servers', value: '0' },
  { label: 'Sign-up required', value: 'None' },
  { label: 'Cost to use', value: '$0' },
];

const categories = [
  {
    name: 'Image Tools',
    description: 'Compress, resize, crop, rotate, watermark, and pick colors from any photo.',
    icon: ImageIcon,
    href: '/tools',
    count: '11 tools',
  },
  {
    name: 'Format Converters',
    description: 'Move between JPG, PNG, WebP, HEIC, and SVG without losing quality.',
    icon: Layers,
    href: '/tools',
    count: '6 tools',
  },
  {
    name: 'PDF Utilities',
    description: 'Merge, split, and convert PDFs to and from images, all in your browser.',
    icon: FileText,
    href: '/tools',
    count: '4 tools',
  },
  {
    name: 'Document Photos',
    description: 'Aadhaar, PAN, Passport, Visa, and exam photos sized to official specs.',
    icon: FileImage,
    href: '/tools',
    count: '6 tools',
  },
  {
    name: 'Text & Developer Tools',
    description: 'Word counter, case converter, JSON formatter, Base64, and more.',
    icon: Code2,
    href: '/tools',
    count: '8+ tools',
  },
  {
    name: 'Unit Converter',
    description: 'Length, weight, temperature, area, volume, speed, data, and time.',
    icon: Maximize,
    href: '/tools/unit-converter',
    count: '8 categories',
  },
];

const tools = [
  {
    name: 'Image Compressor',
    slug: 'compressor',
    description: 'Reduce file size while keeping high quality.',
    icon: RotateCcw,
    color: 'bg-blue-500',
  },
  {
    name: 'Image Resizer',
    slug: 'resizer',
    description: 'Change dimensions with pixel-perfect accuracy.',
    icon: Maximize,
    color: 'bg-cyan-500',
  },
  {
    name: 'JPG to PNG',
    slug: 'jpg-to-png',
    description: 'Convert JPEGs to lossless PNG format.',
    icon: ImageIcon,
    color: 'bg-indigo-500',
  },
  {
    name: 'PNG to JPG',
    slug: 'png-to-jpg',
    description: 'Fast conversion from PNG to high-quality JPG.',
    icon: ImageIcon,
    color: 'bg-sky-500',
  },
  {
    name: 'Image to PDF',
    slug: 'image-to-pdf',
    description: 'Convert multiple images to a single PDF file instantly.',
    icon: FileImage,
    color: 'bg-red-500',
  },
  {
    name: 'WebP Converter',
    slug: 'webp-converter',
    description: 'Convert JPG & PNG to WebP for faster web performance.',
    icon: FileImage,
    color: 'bg-emerald-500',
  },
  {
    name: 'PDF Merge',
    slug: 'pdf-merge',
    description: 'Combine multiple PDF files into a single document.',
    icon: FileText,
    color: 'bg-orange-500',
  },
  {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, and paragraphs instantly.',
    icon: Code2,
    color: 'bg-violet-500',
  },
];

const features = [
  {
    title: '100% Private by Design',
    description:
      'Your images and documents never leave your device. All processing happens inside your browser using the Canvas and File APIs, so there is nothing to intercept on a server.',
    icon: ShieldCheck,
  },
  {
    title: 'No Upload Wait Time',
    description:
      'Because nothing travels to a remote server, results appear the moment you click convert — even on a slow mobile connection.',
    icon: Zap,
  },
  {
    title: 'Works on Any Device',
    description:
      'Every tool is fully responsive and tested across phones, tablets, and desktops, so the same workflow works whether you are at a desk or on the go.',
    icon: Smartphone,
  },
  {
    title: 'No Account, No Paywall',
    description:
      'There is no sign-up form, no email capture, and no premium tier hiding basic features. Every tool is free to use as many times as you need.',
    icon: Gauge,
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose a tool',
    description: 'Pick from the tools menu or browse by category — image, PDF, or text.',
    icon: MousePointerClick,
  },
  {
    step: '02',
    title: 'Add your file or text',
    description: 'Drag and drop a file, paste text, or select an image directly from your device.',
    icon: Upload,
  },
  {
    step: '03',
    title: 'Adjust the settings',
    description: 'Fine-tune quality, dimensions, or format using the on-screen controls.',
    icon: Maximize,
  },
  {
    step: '04',
    title: 'Download instantly',
    description: 'Your result is generated locally and ready to download in seconds.',
    icon: Download,
  },
];

const featuredPosts = [
  {
    title: 'How to Compress Images Without Losing Quality',
    slug: 'how-to-compress-images',
    excerpt: 'A practical walkthrough of quality settings, formats, and when compression actually helps.',
  },
  {
    title: 'JPG vs PNG vs WebP — Which Format Should You Use?',
    slug: 'jpg-vs-png-vs-webp',
    excerpt: 'A side-by-side comparison of the three most common image formats and where each one wins.',
  },
  {
    title: 'How to Convert HEIC to JPG: Complete Guide',
    slug: 'how-to-convert-heic-to-jpg',
    excerpt: "Why iPhone photos won't open everywhere, and how to fix it in seconds.",
  },
  {
    title: 'How to Resize Images for Social Media',
    slug: 'resize-images-for-social-media',
    excerpt: 'Exact pixel dimensions for Instagram, Facebook, LinkedIn, and more.',
  },
];

const audiences = [
  {
    title: 'Students',
    icon: GraduationCap,
    description:
      'Resize a photo for an exam application, shrink a scanned assignment under an upload limit, or merge multiple lecture-note scans into one PDF before submitting — all without installing anything on a shared computer.',
  },
  {
    title: 'Teachers & Educators',
    icon: BookOpen,
    description:
      'Compress classroom photos before sharing them in a newsletter, convert worksheets between formats, or split a large PDF textbook chapter into individual handouts for students.',
  },
  {
    title: 'Designers',
    icon: Paintbrush,
    description:
      'Pick an exact color from a reference image, convert between SVG and PNG for different platforms, and export web-optimized WebP versions of assets without opening a full design suite.',
  },
  {
    title: 'Developers',
    icon: Code2,
    description:
      'Format messy JSON responses, encode or decode Base64 strings, generate URL-safe slugs, and check image dimensions before committing assets to a repository.',
  },
  {
    title: 'Businesses & Freelancers',
    icon: Briefcase,
    description:
      'Prepare product photos for an online store, merge client documents into a single PDF proposal, and generate strong passwords for shared accounts — all free, with no team seat limits.',
  },
];

const testimonials = [
  {
    quote:
      'I needed a passport-size photo at 11pm before an application deadline and did not want to pay a photo studio. This had the exact dimensions ready in under a minute.',
    name: 'Ananya R.',
    role: 'Graduate student',
  },
  {
    quote:
      'The fact that nothing gets uploaded matters to me — I handle client screenshots that I am not comfortable sending to a random server just to resize them.',
    name: 'Marcus T.',
    role: 'Freelance designer',
  },
  {
    quote:
      'Our team uses the PDF merge tool almost weekly to combine scanned invoices. It is faster than anything we had installed before.',
    name: 'Priya K.',
    role: 'Small business owner',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Zap size={16} fill="currentColor" />
            <span>33+ browser-based tools, zero uploads</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Every File Tool You Need, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Running in Your Browser.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            OpticShift Pro is a free suite of image, PDF, and text tools that process everything
            locally on your device. No server upload, no account, no waiting — just open a tool
            and get your result.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25" asChild>
              <Link href="/tools">
                Browse All Tools <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl glass" asChild>
              <Link href="/about">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass border rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <AdPlaceholder />
      </div>

      {/* Popular Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six categories covering everything from quick image edits to developer utilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="group h-full p-6 glass rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    <cat.icon size={22} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section id="tools" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Most Used Tools</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A quick shortcut to the tools people reach for most often.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <div className="group h-full p-6 glass rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <tool.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{tool.description}</p>
                  <div className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Launch Tool <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-xl glass" asChild>
              <Link href="/tools">
                View All 33 Tools <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Why OpticShift Pro Works <br /> Differently From Other Tool Sites
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most free online converters route your file through a server before sending back a
              result — which means your file is copied, temporarily stored, and processed
              somewhere you can't see. OpticShift Pro takes a different approach: every tool runs
              entirely on JavaScript already loaded in your browser, using APIs like Canvas and
              FileReader that ship with every modern browser. Nothing is transmitted anywhere.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
            <div className="glass rounded-3xl p-4 shadow-2xl relative">
              <img
                src="/hero-image.png"
                alt="OpticShift Pro tool interface preview"
                className="rounded-2xl shadow-sm w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every tool follows the same simple flow, regardless of what you're converting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="glass rounded-2xl border p-6 relative">
                <span className="text-5xl font-extrabold text-primary/10 absolute top-4 right-5">
                  {item.step}
                </span>
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 relative">
                  <item.icon size={20} />
                </div>
                <h3 className="font-bold mb-2 relative">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">From the Blog</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Practical guides on formats, compression, and getting the most out of each tool.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group h-full p-6 glass rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col">
                  <BookOpen size={20} className="text-primary mb-4" />
                  <h3 className="font-bold mb-2 leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="text-primary text-sm font-semibold inline-flex items-center gap-1 mt-4 group-hover:gap-2 transition-all">
                    Read guide <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-xl glass" asChild>
              <Link href="/blog">
                Read All Guides <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Long Educational Content */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">A Practical Guide to File Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding what these tools actually do — and why processing happens in your
              browser instead of on a server — helps you pick the right tool for the job.
            </p>
          </div>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Understanding Image Compression</h3>
              <p>
                Image compression reduces a photo's file size by removing redundant or less
                noticeable data. Lossy compression, used by formats like JPG and WebP, discards
                some detail permanently in exchange for a much smaller file — usually without any
                visible difference at normal viewing sizes. Lossless compression, used by PNG,
                preserves every original pixel but produces larger files as a result. Our{' '}
                <Link href="/tools/compressor" className="text-primary underline underline-offset-2">
                  Image Compressor
                </Link>{' '}
                uses adjustable lossy compression so you can find the exact balance between file
                size and visual quality for your specific use case, whether that's a website
                thumbnail or a print-ready photo.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Why Image Format Conversion Matters</h3>
              <p>
                Not every format works everywhere. HEIC, the default format on modern iPhones,
                isn't recognized by many Windows applications and older Android devices. SVG,
                great for scalable logos, can't be pasted directly into most photo editors. WebP
                loads faster on websites but isn't accepted by every upload form. Converting
                between formats — through tools like{' '}
                <Link href="/tools/jpg-to-png" className="text-primary underline underline-offset-2">
                  JPG to PNG
                </Link>
                ,{' '}
                <Link href="/tools/heic-to-jpg" className="text-primary underline underline-offset-2">
                  HEIC to JPG
                </Link>
                , or{' '}
                <Link href="/tools/webp-converter" className="text-primary underline underline-offset-2">
                  WebP Converter
                </Link>{' '}
                — is less about preference and more about compatibility: making sure the file
                actually opens where you're sending it.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">PDF Utilities for Everyday Documents</h3>
              <p>
                PDFs remain the standard format for anything that needs to look the same on every
                device — contracts, applications, reports. But a single PDF workflow rarely covers
                every situation: sometimes you need to combine several scanned pages into one file
                with{' '}
                <Link href="/tools/pdf-merge" className="text-primary underline underline-offset-2">
                  PDF Merge
                </Link>
                , pull out just a few pages with{' '}
                <Link href="/tools/pdf-split" className="text-primary underline underline-offset-2">
                  PDF Split
                </Link>
                , or turn image files into a submittable PDF with{' '}
                <Link href="/tools/image-to-pdf" className="text-primary underline underline-offset-2">
                  Image to PDF
                </Link>
                . Doing this in a browser avoids installing desktop PDF software just for a
                one-time task.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">
                Browser-Based Processing and File Security
              </h3>
              <p>
                The core design decision behind OpticShift Pro is that processing happens entirely
                client-side — inside your browser, using your device's own processing power.
                Traditional online tools upload your file to a remote server, process it there,
                and send back the result; during that round trip, your file exists on infrastructure
                you have no visibility into. Browser-based tools skip that step entirely. Your photo
                of a bank statement, your child's document scan, or your unpublished design file
                stays on your device the entire time — it's simply read into memory, transformed
                using standard web APIs, and offered back to you as a download. There is no
                database entry, no temporary storage bucket, and nothing to accidentally leave
                exposed on a misconfigured server.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">
                Online Productivity Without the Overhead
              </h3>
              <p>
                A lot of everyday tasks don't need a full desktop application — they need a quick,
                reliable tool that's available the moment you think of it. Checking a word count
                before submitting an assignment, formatting a JSON response while debugging an API,
                or generating a strong password for a new account are all two-minute tasks that
                shouldn't require downloading software. Keeping these tools free, fast, and
                install-free is a deliberate choice to reduce friction for exactly that kind of
                everyday work.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Best Practices When Working With Files Online</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>
                  Prefer tools that clearly state they process files locally, especially for
                  personal documents like ID scans or financial statements.
                </li>
                <li>
                  Compress images before uploading them to websites or forms — large files slow
                  down page loads and can hit upload size limits.
                </li>
                <li>
                  Double-check exact pixel dimensions and file size limits before submitting
                  document photos, since requirements vary between forms and countries.
                </li>
                <li>
                  Keep a backup of the original file before converting or compressing, in case you
                  need the unmodified version later.
                </li>
                <li>
                  Use a password manager alongside a generator like our{' '}
                  <Link href="/tools/password-generator" className="text-primary underline underline-offset-2">
                    Password Generator
                  </Link>{' '}
                  so unique, strong passwords stay practical across every account.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Uses Our Tools */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Who Uses OpticShift Pro</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The same set of tools ends up solving very different problems depending on who's using them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="glass rounded-2xl border p-6">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <a.icon size={20} />
                </div>
                <h3 className="font-bold mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security / Trust Section */}
      <section className="py-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative">
          <h2 className="text-3xl md:text-4xl font-bold">Privacy Is the Architecture, Not a Promise</h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            We don't ask you to trust a privacy policy about what happens to your uploaded file —
            because there is no upload. Every tool is built so that your file physically cannot
            leave your device during processing. That's a structural guarantee, not a setting you
            have to enable.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: ServerOff, label: 'No File Uploads' },
              { icon: Lock, label: 'Browser-Based Processing' },
              { icon: ShieldCheck, label: 'No Tracking Cookies for Tools' },
              { icon: CheckCircle2, label: 'No Account Required' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-full border border-white/20"
              >
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">What People Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A few notes from people who use these tools regularly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass rounded-2xl border p-6 flex flex-col gap-4">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 w-full mb-4">
        <AdPlaceholder />
      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* Call to Action */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-12 text-center space-y-6 border shadow-2xl">
          <h2 className="text-4xl font-bold">Ready to Optimize Your Workflow?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fast, free, and forever private — OpticShift Pro keeps your files on your device while
            delivering professional results.
          </p>
          <Button size="lg" className="h-14 px-10 rounded-xl" asChild>
            <Link href="/tools">Explore All Tools</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
