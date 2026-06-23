import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'OpticShift Pro — Free Online Image Tools',
    template: '%s | OpticShift Pro',
  },
  description: 'Free browser-based image tools — compress, resize, convert JPG, PNG, WebP and PDF. No upload, 100% private and instant.',
  keywords: 'image compressor, image resizer, jpg to png, png to jpg, pdf to image, webp converter, free image tools',
  verification: {
    google: 'GGvF0UPj84iXp1cP1DJ_wHErlNISZjBJvqL34DwgOOY',
  },
  openGraph: {
    title: 'OpticShift Pro — Free Online Image Tools',
    description: 'Free browser-based image tools — compress, resize, convert JPG, PNG, WebP and PDF. No upload, 100% private and instant.',
    type: 'website',
    url: 'https://ok01.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6461565201811259"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <GoogleAnalytics gaId="G-BTR44CPL1C" />
      </body>
    </html>
  );
}
