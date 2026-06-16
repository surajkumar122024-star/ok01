export default function BlogPost() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-sm text-muted-foreground mb-4">June 15, 2026</p>
      <h1 className="text-4xl font-bold mb-6">
        JPG vs PNG vs WebP - Which Format Should You Use?
      </h1>
      <p className="text-muted-foreground mb-12">4 min read</p>

      <div className="prose prose-lg max-w-none space-y-6 text-foreground">

        <p>
          Choosing the right image format can make a huge difference in your 
          website speed and image quality. JPG, PNG, and WebP are the three 
          most common formats — but which one should you use?
        </p>

        <h2 className="text-2xl font-bold mt-8">JPG (JPEG)</h2>
        <p>
          JPG is the most widely used image format, best suited for photographs 
          and complex images with lots of colors.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Photos, social media images</li>
          <li><strong>Pros:</strong> Small file size, universally supported</li>
          <li><strong>Cons:</strong> Lossy compression, no transparency support</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">PNG</h2>
        <p>
          PNG uses lossless compression, meaning no quality is lost when saving. 
          It also supports transparent backgrounds.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Logos, icons, screenshots, transparent images</li>
          <li><strong>Pros:</strong> Lossless quality, supports transparency</li>
          <li><strong>Cons:</strong> Larger file size than JPG</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">WebP</h2>
        <p>
          WebP is a modern image format developed by Google. It offers 
          superior compression compared to both JPG and PNG.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Best for:</strong> Web images, fast loading websites</li>
          <li><strong>Pros:</strong> 30% smaller than JPG, supports transparency</li>
          <li><strong>Cons:</strong> Not supported by very old browsers</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Feature</th>
                <th className="border border-border p-3 text-left">JPG</th>
                <th className="border border-border p-3 text-left">PNG</th>
                <th className="border border-border p-3 text-left">WebP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3">File Size</td>
                <td className="border border-border p-3">Small</td>
                <td className="border border-border p-3">Large</td>
                <td className="border border-border p-3">Smallest</td>
              </tr>
              <tr>
                <td className="border border-border p-3">Transparency</td>
                <td className="border border-border p-3">❌</td>
                <td className="border border-border p-3">✅</td>
                <td className="border border-border p-3">✅</td>
              </tr>
              <tr>
                <td className="border border-border p-3">Best For</td>
                <td className="border border-border p-3">Photos</td>
                <td className="border border-border p-3">Logos</td>
                <td className="border border-border p-3">Web</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8">Which Should You Use?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Website images → <strong>WebP</strong></li>
          <li>Photos → <strong>JPG</strong></li>
          <li>Logos/Icons → <strong>PNG</strong></li>
          <li>Transparent background → <strong>PNG or WebP</strong></li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Convert Images for Free</h2>
        <p>
          Need to convert your images to WebP, JPG, or PNG? 
          Try OpticShift Pro — free, private, and no login required!
        </p>

        
          href="/tools"
          className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Convert Images Free →
        </a>

      </div>
    </main>
  );
}
