"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ToolsMegaMenu, toolCategories } from '@/components/ToolsMegaMenu';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTools = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setToolsOpen(true);
  };

  const scheduleCloseTools = () => {
    closeTimer.current = setTimeout(() => setToolsOpen(false), 150);
  };

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
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>

            {/* Tools dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={openTools}
              onMouseLeave={scheduleCloseTools}
            >
              <Link
                href="/tools"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname.startsWith("/tools") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Tools
                <ChevronDown size={14} className={cn("transition-transform", toolsOpen && "rotate-180")} />
              </Link>

              {toolsOpen && (
                <div className="fixed left-1/2 -translate-x-1/2 top-16 mt-2 w-[min(1100px,92vw)] glass border rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <ToolsMegaMenu onNavigate={() => setToolsOpen(false)} />
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
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
        <div className="md:hidden glass animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>

            {/* Mobile Tools Accordion */}
            <div>
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted",
                  pathname.startsWith("/tools") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Tools
                <ChevronDown size={16} className={cn("transition-transform", mobileToolsOpen && "rotate-180")} />
              </button>
              {mobileToolsOpen && (
                <div className="pl-3 pr-1 py-2 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  {toolCategories.map((cat) => (
                    <div key={cat.title}>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 px-2">
                        {cat.title}
                      </p>
                      {cat.items.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => { setIsOpen(false); setMobileToolsOpen(false); }}
                            className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <Icon size={15} className="flex-shrink-0 text-primary" />
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                  <Link
                    href="/tools"
                    onClick={() => { setIsOpen(false); setMobileToolsOpen(false); }}
                    className="block px-2 py-2 text-sm font-semibold text-primary"
                  >
                    View All Tools →
                  </Link>
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
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
