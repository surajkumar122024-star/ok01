'use client';

import { useEffect } from 'react';

interface AdPlaceholderProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
}

// Flip this to true once AdSense approval comes through. Until then, the ad
// slot is skipped entirely — Google's script sometimes reserves unpredictable
// extra height for an unapproved/unfilled slot, which was causing a large
// empty gap on the page. Rendering nothing guarantees zero layout impact.
const ADS_ENABLED = false;

export const AdPlaceholder = ({ className, variant = 'horizontal' }: AdPlaceholderProps) => {
  useEffect(() => {
    if (!ADS_ENABLED) return;
    try {
      const w = window as typeof window & { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not be loaded yet (e.g. blocked by an ad blocker); safe to ignore.
    }
  }, []);

  if (!ADS_ENABLED) return null;

  const heightMap = {
    horizontal: 'h-[100px] max-h-[100px]',
    vertical: 'h-[600px] max-h-[600px]',
    square: 'h-[250px] max-h-[250px]',
  };

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
