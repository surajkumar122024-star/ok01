'use client';

import { useEffect } from 'react';

interface AdPlaceholderProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
}

// Fixed (not min-) heights + overflow-hidden so an unfilled/unapproved ad slot
// can never blow up the container into a large empty block on mobile.
const heightMap = {
  horizontal: 'h-[100px] max-h-[100px]',
  vertical: 'h-[600px] max-h-[600px]',
  square: 'h-[250px] max-h-[250px]',
};

export const AdPlaceholder = ({ className, variant = 'horizontal' }: AdPlaceholderProps) => {
  useEffect(() => {
    try {
      const w = window as typeof window & { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not be loaded yet (e.g. blocked by an ad blocker); safe to ignore.
    }
  }, []);

  return (
    <div className={`${className ?? ''} ${heightMap[variant]} w-full flex items-center justify-center overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%', overflow: 'hidden' }}
        data-ad-client="ca-pub-6461565201811259"
        data-ad-slot="4220072297"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
