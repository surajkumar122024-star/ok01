export default function BlogPost() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-sm text-muted-foreground mb-4">June 14, 2026</p>
      <h1 className="text-4xl font-bold mb-6">
        Perfect Image Sizes for Every Social Media Platform
      </h1>
      <p className="text-muted-foreground mb-12">5 min read</p>
      <div className="prose prose-lg max-w-none space-y-6 text-foreground">
        <p>
          Using the wrong image size on social media can make your posts look
          unprofessional. Here is the ultimate cheat sheet for 2026!
        </p>
        <h2 className="text-2xl font-bold mt-8">Twitter / X</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Profile Photo:</strong> 400 x 400 px</li>
          <li><strong>Header Image:</strong> 1500 x 500 px</li>
          <li><strong>Post Image:</strong> 1200 x 675 px</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">Instagram</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Profile Photo:</strong> 320 x 320 px</li>
          <li><strong>Square Post:</strong> 1080 x 1080 px</li>
          <li><strong>Portrait Post:</strong> 1080 x 1350 px</li>
          <li><strong>Story:</strong> 1080 x 1920 px</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">YouTube</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Channel Art:</strong> 2560 x 1440 px</li>
          <li><strong>Thumbnail:</strong> 1280 x 720 px</li>
          <li><strong>Profile Photo:</strong> 800 x 800 px</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">Tips for Best Results</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Always use <strong>JPG</strong> for photos</li>
          <li>Use <strong>PNG</strong> for logos with transparent background</li>
          <li>Keep file size under <strong>1MB</strong> for faster loading</li>
          <li>Use <strong>WebP</strong> for website images</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8">Resize Images for Free</h2>
        <p>
          Need to resize your images to perfect dimensions?
          Try OpticShift Pro - free, private, no login required!
        </p>
        <a href="/tools" className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
          Resize Images Free
        </a>
      </div>
    </main>
  );
}
