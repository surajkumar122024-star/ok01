"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ImageIcon, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">OpticShift <span className="text-primary">Pro</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button size="sm" asChild>
              <Link href="/tools">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full" asChild>
                <Link href="/tools" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
