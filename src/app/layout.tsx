import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '  Online Free Image | Tools OpticShift Pro',
  description: 'Professional, browser-side image compression, resizing, and format conversion. Fast, secure, and 100% private.',
  keywords: 'image compressor, image resizer, jpg to png, png to jpg, photo editor, browser image tools',
verification: {
  google: 'GGvF0UPj84iXp1cP1DJ_wHErlNISZjBJvqL34DwgOOY',
},
  openGraph: {
    title: 'OpticShift Pro',
    description: 'Professional browser-side image tools.',
    type: 'website',
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
