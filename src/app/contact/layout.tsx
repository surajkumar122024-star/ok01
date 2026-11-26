import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact OLD TOOLS — Questions, Feedback & Support',
  description: 'Contact the OLD TOOLS team with questions, bug reports, or feedback about our free online image, PDF, video, text, and document tools.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
