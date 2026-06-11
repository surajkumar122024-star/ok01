import { Shield, Zap, Globe, Lock } from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About OpticShift Pro</h1>
          <p className="text-xl text-muted-foreground">The future of private, fast image processing.</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            OpticShift Pro was born from a simple observation: most "online" image tools are slow, full of intrusive ads, and require you to upload your sensitive data to mysterious servers. We decided to change that.
          </p>
          
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

          <h2 className="text-2xl font-bold mt-12 mb-6">Our Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            We leverage modern web technologies like HTML5 Canvas, WebAssembly, and high-performance JavaScript APIs to perform complex image manipulations directly in your client's environment. This means we don't need expensive server farms to process your data, and we can pass those savings on to you by keeping our tools free.
          </p>

          <AdPlaceholder className="my-12" />

          <h2 className="text-2xl font-bold mt-12 mb-6">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to empower creators, developers, and everyday users with professional-grade tools that respect user autonomy. We believe that privacy is a right, not a feature, and we aim to set a new standard for web utility applications.
          </p>
        </div>
      </div>
    </div>
  );
}