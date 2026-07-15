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
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-6">
            <Card className="glass border-none shadow-xl overflow-hidden p-6">
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
