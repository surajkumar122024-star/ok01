import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  Image as ImageIcon, 
  Maximize, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import ToolsSection from '@/components/ToolsSection';
const features = [
  {
    title: "100% Private",
    description: "Your images never leave your device. All processing happens right in your browser.",
    icon: ShieldCheck
  },
  {
    title: "Lightning Fast",
    description: "Zero upload time. Immediate processing with our optimized Canvas engine.",
    icon: Zap
  },
  {
    title: "Mobile Ready",
    description: "Fully responsive design that works perfectly on phones, tablets, and desktops.",
    icon: Smartphone
  }
];

const tools = [
  {
    name: "Image Compressor",
    slug: "compressor",
    description: "Reduce file size while keeping high quality.",
    icon: RotateCcw,
    color: "bg-blue-500"
  },
  {
    name: "Image Resizer",
    slug: "resizer",
    description: "Change dimensions with pixel-perfect accuracy.",
    icon: Maximize,
    color: "bg-cyan-500"
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    description: "Convert JPEGs to lossless PNG format.",
    icon: ImageIcon,
    color: "bg-indigo-500"
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    description: "Fast conversion from PNG to high-quality JPG.",
    icon: ImageIcon,
    color: "bg-sky-500"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap size={16} fill="currentColor" />
            <span>New: Optimized Compression Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Transform Your Images <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Faster and Safer.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional image processing tools that run entirely in your browser. No uploads, no servers, just instant results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25" asChild>
              <Link href="/tools">
                Start Using Tools <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl glass" asChild>
              <Link href="/about">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 w-full mb-12">
        <AdPlaceholder />
      </div>

      {/* Tools Grid */}
      <section id="tools" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Image Tools</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Choose from our suite of high-performance image processing tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <div className="group h-full p-6 glass rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">Built for Professionals, <br /> Designed for Everyone.</h2>
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
                alt="Tool Preview" 
                className="rounded-2xl shadow-sm w-full h-auto"
                data-ai-hint="software dashboard"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative">
          <h2 className="text-3xl md:text-4xl font-bold">Safe, Secure, and Private.</h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Unlike other online tools, we value your privacy. Your sensitive images never leave your machine. No uploads means no data breaches.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {['No Tracking', 'No Ads (In Tools)', 'No Servers', 'GDPR Compliant'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <CheckCircle2 size={16} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-12 text-center space-y-6 border shadow-2xl">
          <h2 className="text-4xl font-bold">Ready to optimize your workflow?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Join thousands of users who process images daily with OpticShift Pro. Fast, free, and forever secure.</p>
          <Button size="lg" className="h-14 px-10 rounded-xl" asChild>
            <Link href="/tools">Explore All Tools</Link>
          </Button>
        </div>
      </section>
      <ToolsSection />
    </div>
  );
}
