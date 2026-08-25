import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Globe, Lock } from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'About OpticShift Pro – Privacy-First Browser-Based Tools',
  description: 'OpticShift Pro is an independently built suite of 36+ free image, PDF, and text tools that run entirely in your browser.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About OpticShift Pro</h1>
          <p className="text-xl text-muted-foreground">The future of private, fast image processing.</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            OpticShift Pro was born from a simple observation: most &quot;online&quot; image tools are slow, full of intrusive ads, and require you to upload your files to an unknown server just to get a simple result back.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
          {[
            { icon: Shield, title: "Privacy First", text: "Your data stays on your device. Period." },
            { icon: Zap, title: "Performance", text: "Optimized browser code for instant execution." },
            { icon: Globe, title: "Accessible", text: "Free tools for everyone, anywhere in the world." },
            { icon: Lock, title: "Secure", text: "No accounts, no cookies, no tracking scripts." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 glass rounded-2xl border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Technology */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Our Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            We leverage modern web technologies like HTML5 Canvas, WebAssembly, and high-performance JavaScript APIs to perform complex operations — image compression, format conversion, resizing, cropping, watermarking, and more — directly on your device&apos;s hardware, with no server-side file processing involved.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This approach protects your privacy as a direct consequence of how the tools are built, not as an added-on promise, and it also means results appear almost instantly since there&apos;s no upload or server round trip to wait for.
          </p>
        </section>

        {/* Story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Why I Built OpticShift Pro</h2>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m Suraj Kumar, the founder and developer of OpticShift Pro. Like a lot of people, I regularly needed to compress a photo, convert a file format, or resize an image for a form — small, everyday tasks. What frustrated me was that almost every free tool online required uploading the file to an unknown server first, just to get a simple result back.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For a quick screenshot that&apos;s a minor inconvenience. For a scanned ID document, a signed form, or a private photo, it&apos;s a real privacy concern — and it shouldn&apos;t be the trade-off you have to accept just to resize an image.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            So I built OpticShift Pro around a different approach: every tool runs directly in your browser using standard web APIs, so your file is processed on your own device and never uploaded anywhere. What started as a handful of image tools has grown into a suite of 36+ free tools covering images, PDFs, and text utilities.
          </p>
        </section>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            The mission is simple: <strong className="text-foreground">give people useful, professional-quality file tools without asking them to trade away their privacy.</strong> Your files belong to you, and no online tool should require you to hand over sensitive images or documents just to compress or convert them. Privacy here isn&apos;t a checkbox — it&apos;s the architecture.
          </p>
        </section>

        <AdPlaceholder />

        {/* Founder */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            OpticShift Pro is built and maintained independently by a single developer. It&apos;s not backed by outside investors or a larger company — just one person building tools they wanted to exist, and improving them based on how people actually use them.
          </p>
          <div className="flex items-start gap-4 p-5 border border-border rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
              SK
            </div>
            <div>
              <p className="font-semibold text-foreground">Suraj Kumar</p>
              <p className="text-sm text-primary mb-2">Founder &amp; Developer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I build and maintain OpticShift Pro end-to-end — from the tools themselves to the privacy-first architecture behind them. My focus is on keeping every tool genuinely useful, fast, and free, without asking anyone to give up their privacy to use it.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 px-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">Try any of our 36+ free tools — no account needed, no files uploaded.</p>
          <Link
            href="/tools"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Explore All Tools →
          </Link>
        </section>
      </div>
    </div>
  );
}
