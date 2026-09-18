"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface ImageToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  /**
   * Tool-specific content (how-to-use, FAQ, benefits, etc.) rendered below the
   * tool card. Pass unique content per tool page — do NOT reuse the same
   * text across tools, since duplicate boilerplate across pages is what
   * triggers Google's "Low value content" flag.
   */
  content?: React.ReactNode;
}

export const ImageToolLayout = ({ title, description, children, content }: ImageToolLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background text-foreground pt-24 pb-12 px-4 overflow-hidden">
      {/* Decorative gradient blobs for visual depth */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-40 -left-40 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-60 -right-40 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Free Online Tool
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-6">
            <Card className="glass border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              {children}
            </Card>
            
            <AdPlaceholder className="mt-8" />

            {content}
          </div>
          
          <div className="hidden lg:block lg:col-span-3">
            <AdPlaceholder variant="vertical" className="sticky top-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
