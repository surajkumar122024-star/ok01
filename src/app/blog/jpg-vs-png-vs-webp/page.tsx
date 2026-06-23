export const metadata = {
  title: 'JPG vs PNG vs WebP — Which Format Should You Use?',
  description: 'Compare JPG, PNG and WebP image formats. Learn which to use for photos, logos, and web images to get the best quality and file size.',
};
export default function BlogPost() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-sm text-muted-foreground mb-4">June 15, 2026</p>
      <h1 className="text-4xl font-bold mb-6">
        JPG vs PNG vs WebP - Which Format Should You Use?
      </h1>
      <p className="text-muted-foreground mb-12">4 min read</p>
      <div className="prose prose-lg max-w-none space-y-6 text-foreground">
        <p>Choosing the right image format can make a huge difference in your website speed and image quality.</p>
        <h2 className="text-2xl font-bold mt-8">JPG (JPEG)</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Photos, social media images</li>
          <li><strong>Pros:</strong> Small file size, universally supported</li>
          <li><strong>Cons:</strong> No transparency support</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">PNG</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Logos, icons, transparent images</li>
          <li><strong>Pros:</strong> Lossless quality, supports transparency</li>
          <li><strong>Cons:</strong> Larger file size than JPG</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">WebP</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Web images, fast loading websites</li>
          <li><strong>Pros:</strong> 30% smaller than JPG, supports transparency</li>
          <li><strong>Cons:</strong> Not supported by very old browsers</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">Which Should You Use?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Website images: <strong>WebP</strong></li>
          <li>Photos: <strong>JPG</strong></li>
          <li>Logos/Icons: <strong>PNG</strong></li>
          <li>Transparent background: <strong>PNG or WebP</strong></li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">Convert Images for Free</h2>
        <p>Need to convert your images? Try OpticShift Pro - free, private, no login required!</p>
        <a href="/tools" className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
          Convert Images Free
        </a>
      </div>
    </main>
  );
}
