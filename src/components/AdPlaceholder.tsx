'use client';

import { useEffect } from 'react';

interface AdPlaceholderProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
}

const minHeightMap = {
  horizontal: 'min-h-[100px]',
  vertical: 'min-h-[600px]',
  square: 'min-h-[250px]',
};

export const AdPlaceholder = ({ className, variant = 'horizontal' }: AdPlaceholderProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className={`${className ?? ''} ${minHeightMap[variant]} flex items-center justify-center overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-6461565201811259"
        data-ad-slot="4220072297"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
