import Link from 'next/link';

const blogs = [
  {
    slug: 'how-to-convert-pdf-to-image',
    title: 'How to Convert PDF to Image Online — Free & No Upload',
    description: 'Extract every PDF page as a high-quality PNG image instantly in your browser.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-convert-image-to-pdf',
    title: 'How to Convert Images to PDF Online — Free & Private',
    description: 'Combine multiple JPG or PNG images into a single PDF file without any upload.',
    date: 'June 20, 2026',
  },
  {
    slug: 'how-to-compress-images',
    title: 'How to Compress Images Without Losing Quality',
    description: 'Learn how to reduce image file size while maintaining visual quality using browser-based tools.',
    date: 'June 16, 2026',
  },
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP - Which Format Should You Use?',
    description: 'A complete guide to choosing the right image format for your website or project.',
    date: 'June 15, 2026',
  },
  {
    slug: 'resize-images-for-social-media',
    title: 'Perfect Image Sizes for Every Social Media Platform',
    description: 'The ultimate cheat sheet for image dimensions on Instagram, Twitter, YouTube and more.',
    date: 'June 14, 2026',
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-12">Tips, guides and tutorials about image editing.</p>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug}>
            <div className="border rounded-xl p-6 hover:border-primary transition-colors cursor-pointer">
              <p className="text-sm text-muted-foreground mb-2">{blog.date}</p>
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-muted-foreground">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
