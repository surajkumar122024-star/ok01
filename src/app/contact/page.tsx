import type { Metadata } from 'next';
"use client";

import { Mail, Instagram, Twitter, Send, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:rrok86383@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast({
      title: "Opening your email app",
      description: "Your message will be sent from your email app. Nothing is submitted or stored on this website.",
    });
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">Have a question or feedback? We&apos;d love to hear from you.</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-muted-foreground">rrok86383@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Twitter size={24} />
              </div>
              <div>
                <h3 className="font-bold">X (Twitter)</h3>
                <a
                  href="https://x.com/Phentom_R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @Phentom_R
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Instagram size={24} />
              </div>
              <div>
                <h3 className="font-bold">Instagram</h3>
                <a
                  href="https://instagram.com/jarus2022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @jarus2022
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Youtube size={24} />
              </div>
              <div>
                <h3 className="font-bold">YouTube</h3>
                <a
                  href="https://youtube.com/@mitb67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @mitb67
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl border p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input name="subject" placeholder="How can we help?" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea name="message" placeholder="Write your message here..." className="min-h-[150px]" required />
            </div>
            <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
