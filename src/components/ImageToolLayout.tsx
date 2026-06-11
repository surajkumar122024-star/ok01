"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface ImageToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ImageToolLayout = ({ title, description, children }: ImageToolLayoutProps) => {
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
            
            <div className="glass rounded-xl p-8 space-y-4">
              <h2 className="text-xl font-semibold">How it works</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our tools process your images directly in your browser. When you select an image, it is never uploaded to a server. Instead, we use HTML5 Canvas and advanced JavaScript APIs to perform processing locally on your computer or mobile device. This ensures maximum privacy and high-speed execution.
              </p>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-3">
            <AdPlaceholder variant="vertical" className="sticky top-24" />
          </div>
        </div>
      </div>
    </div>
  );
};