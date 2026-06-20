'use client';

import { useEffect } from 'react';

interface AdPlaceholderProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
}

export const AdPlaceholder = ({ className, variant = 'horizontal' }: AdPlaceholderProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6461565201811259"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
