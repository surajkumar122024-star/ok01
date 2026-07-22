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

      {/* ============================================================ */}
      {/* BOTTOM SECTION — REDESIGNED (Why Choose → Final CTA)          */}
      {/* ============================================================ */}

      {/* 1. Why Choose OpticShift Pro — 6 premium feature cards */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
              Why OpticShift Pro
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built Differently From Other Tool Sites
            </h2>
            <p className="text-muted-foreground text-lg">
              Every design decision here traces back to one idea: your files are yours, and a tool
              shouldn't need to see them to be useful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Privacy by Design',
                description:
                  'Every file is processed locally in your browser using the Canvas and File APIs. Nothing is uploaded, so there is nothing to intercept or leak.',
              },
              {
                icon: Zap,
                title: 'Instant Results',
                description:
                  'Skipping the upload step entirely means results appear the moment you click — even on a slow mobile connection.',
              },
              {
                icon: Gauge,
                title: 'No Paywalls',
                description:
                  'Every tool is free, with no account, no watermark, and no artificial file-size limit hiding behind a subscription.',
              },
              {
                icon: Smartphone,
                title: 'Works Everywhere',
                description:
                  'Fully responsive across desktop, tablet, and mobile, so the same workflow holds up wherever you are.',
              },
              {
                icon: Lock,
                title: 'No Account Needed',
                description:
                  'Open a tool and use it immediately. No sign-up form, no email capture, no friction between you and your result.',
              },
              {
                icon: ServerOff,
                title: 'Zero Server Storage',
                description:
                  'There is no database of uploaded files sitting on a server, because there is no upload step to begin with.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. How It Works — 3 steps */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
              Simple by Design
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Three steps, no exceptions — every tool on the site follows the same flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-9 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            {[
              {
                icon: MousePointerClick,
                step: '01',
                title: 'Choose a Tool',
                description: 'Pick from 33+ tools organized by category — image, PDF, or text.',
              },
              {
                icon: Zap,
                step: '02',
                title: 'Process Instantly',
                description: 'Your file is handled locally in your browser the moment you upload it.',
              },
              {
                icon: Download,
                step: '03',
                title: 'Download Result',
                description: 'Get your finished file immediately — no waiting, no watermark.',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center space-y-4">
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-background border-2 border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                  <item.icon size={28} />
                </div>
                <span className="text-xs font-bold text-primary/50 tracking-widest">STEP {item.step}</span>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Blog Posts */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
                From the Blog
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Guides &amp; Tutorials</h2>
              <p className="text-muted-foreground text-lg">
                Practical, in-depth guides on formats, compression, and getting the most out of each tool.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all whitespace-nowrap"
            >
              View all articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPosts.map((post) => (
              <div
                key={post.slug}
                className="group h-full flex flex-col rounded-3xl border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="p-7 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                    <BookOpen size={18} />
                  </div>
                  <h3 className="font-bold mb-2 leading-snug flex-shrink-0">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Button size="lg" variant="outline" className="rounded-xl glass" asChild>
              <Link href="/blog">
                View All Articles <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Trusted By */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
              Trusted By
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              People Who Rely on These Tools Every Week
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { icon: GraduationCap, label: 'Students' },
              { icon: Paintbrush, label: 'Designers' },
              { icon: Code2, label: 'Developers' },
              { icon: Briefcase, label: 'Businesses' },
              { icon: Star, label: 'Content Creators' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Privacy & Security */}
      <section className="py-24 px-4 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary-foreground/70 uppercase">
            Privacy &amp; Security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Privacy Is the Architecture, Not a Promise
          </h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t ask you to trust a privacy policy about what happens to your uploaded
            file — because there is no upload. Every tool is built so your file physically cannot
            leave your device while it&apos;s being processed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[
              { icon: ServerOff, label: 'No File Uploads' },
              { icon: Lock, label: 'Browser-Based Processing' },
              { icon: ShieldCheck, label: 'No Tracking Cookies for Tools' },
              { icon: CheckCircle2, label: 'No Account Required' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm font-medium bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/15 transition-colors"
              >
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 w-full py-12">
        <AdPlaceholder />
      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* 6. Final Call-To-Action */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] border shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="relative glass p-12 md:p-20 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Ready to Optimize <br className="hidden sm:block" /> Your Workflow?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Fast, free, and forever private — OpticShift Pro keeps your files on your device
              while delivering professional results, every time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button size="lg" className="h-14 px-10 rounded-xl text-lg shadow-xl shadow-primary/25" asChild>
                <Link href="/tools">
                  Explore All 33+ Tools <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl text-lg glass" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
