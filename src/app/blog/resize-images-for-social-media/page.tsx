import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Perfect Image Sizes for Every Social Media Platform (2026 Guide) — OpticShift Pro',
  description: 'The complete, up-to-date cheat sheet for Instagram, Facebook, X/Twitter, LinkedIn, YouTube, TikTok, and Pinterest image dimensions — plus how to resize for free in your browser.',
  keywords: 'social media image sizes, instagram image size, facebook image size, twitter image size, linkedin image size, youtube thumbnail size',
}

export default function ResizeForSocialMediaArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Image Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Perfect Image Sizes for Every Social Media Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            The complete 2026 cheat sheet — Instagram, Facebook, X, LinkedIn, YouTube, TikTok, and Pinterest — plus why matching these dimensions actually matters.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 Updated July 2026</span>
            <span>•</span>
            <span>⏱ 9 min read</span>
            <span>•</span>
            <span>🏷 Image Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">Jump to a platform</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#why-matters" className="hover:text-primary">Why exact dimensions matter</a></li>
            <li><a href="#instagram" className="hover:text-primary">Instagram</a></li>
            <li><a href="#facebook" className="hover:text-primary">Facebook</a></li>
            <li><a href="#x-twitter" className="hover:text-primary">X (Twitter)</a></li>
            <li><a href="#linkedin" className="hover:text-primary">LinkedIn</a></li>
            <li><a href="#youtube" className="hover:text-primary">YouTube</a></li>
            <li><a href="#tiktok-pinterest" className="hover:text-primary">TikTok &amp; Pinterest</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to resize, step by step</a></li>
            <li><a href="#format-tips" className="hover:text-primary">Format and file size tips</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes to avoid</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Using the wrong image size on social media doesn't just look slightly off — it usually
            means the platform crops your photo automatically, and that automatic crop has no idea
            what's actually important in the frame. Here's the complete, current dimension reference
            for every major platform, plus why getting this right matters more than it seems.
          </p>

          <h2 id="why-matters" className="text-2xl font-bold mt-8">Why Exact Dimensions Matter</h2>
          <p>
            Every platform displays images at a specific ratio across feeds, profiles, and previews.
            Upload something outside that ratio, and the platform doesn't reject it — it silently
            crops or letterboxes it to fit, often cutting off a face, a key piece of text, or a
            product you wanted visible. Matching the platform's actual dimensions upfront means what
            you see when you upload is exactly what your audience sees.
          </p>

          <h2 id="instagram" className="text-2xl font-bold mt-8">Instagram</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Profile photo:</strong> 320 × 320px (displays as a circle)</p>
            <p><strong>Square post:</strong> 1080 × 1080px</p>
            <p><strong>Portrait post:</strong> 1080 × 1350px</p>
            <p><strong>Story / Reel:</strong> 1080 × 1920px</p>
          </div>

          <h2 id="facebook" className="text-2xl font-bold mt-8">Facebook</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Profile photo:</strong> 170 × 170px (desktop)</p>
            <p><strong>Cover photo:</strong> 820 × 312px</p>
            <p><strong>Shared link preview:</strong> 1200 × 630px</p>
            <p><strong>Feed post image:</strong> 1200 × 630px</p>
          </div>

          <h2 id="x-twitter" className="text-2xl font-bold mt-8">X (Twitter)</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Profile photo:</strong> 400 × 400px</p>
            <p><strong>Header image:</strong> 1500 × 500px</p>
            <p><strong>In-stream post image:</strong> 1200 × 675px</p>
          </div>

          <h2 id="linkedin" className="text-2xl font-bold mt-8">LinkedIn</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Profile photo:</strong> 400 × 400px</p>
            <p><strong>Cover/banner image:</strong> 1584 × 396px</p>
            <p><strong>Shared post image:</strong> 1200 × 627px</p>
            <p><strong>Company page logo:</strong> 300 × 300px</p>
          </div>

          <h2 id="youtube" className="text-2xl font-bold mt-8">YouTube</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Channel art (banner):</strong> 2560 × 1440px</p>
            <p><strong>Video thumbnail:</strong> 1280 × 720px (16:9)</p>
            <p><strong>Profile photo:</strong> 800 × 800px</p>
          </div>
          <p>
            For thumbnails specifically, use the{' '}
            <Link href="/tools/youtube-thumbnail-converter" className="text-primary underline underline-offset-2">
              YouTube Thumbnail Converter
            </Link>{' '}
            to crop precisely to 1280×720 rather than letting YouTube's automatic crop decide what stays visible.
          </p>

          <h2 id="tiktok-pinterest" className="text-2xl font-bold mt-8">TikTok &amp; Pinterest</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>TikTok video/cover:</strong> 1080 × 1920px (9:16)</p>
            <p><strong>TikTok profile photo:</strong> 200 × 200px</p>
            <p><strong>Pinterest Pin:</strong> 1000 × 1500px (2:3)</p>
            <p><strong>Pinterest profile photo:</strong> 165 × 165px</p>
          </div>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Resize an Image, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/resizer" className="text-primary underline underline-offset-2">Image Resizer</Link> tool.</li>
            <li>Upload your photo — the tool detects its current dimensions automatically.</li>
            <li>Enter the exact width and height for your target platform from the tables above.</li>
            <li>Keep the aspect ratio lock on unless the target ratio is very different from your original, in which case crop first.</li>
            <li>Download your correctly sized image, ready to upload.</li>
          </ol>
          <p>
            If your original photo's proportions don't match your target platform at all — a square
            photo that needs to become a 9:16 Story, for example — crop first with the{' '}
            <Link href="/tools/image-cropper" className="text-primary underline underline-offset-2">Image Cropper</Link>{' '}
            to choose what stays in frame, then resize to the exact pixel target.
          </p>

          <h2 id="format-tips" className="text-2xl font-bold mt-8">Format and File Size Tips</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use <strong>JPG</strong> for photos — smaller files, universally supported across every platform.</li>
            <li>Use <strong>PNG</strong> for logos or graphics that need a transparent background.</li>
            <li>Keep file sizes reasonable (well under a few MB) for faster upload and processing — use the{' '}
              <Link href="/tools/compressor" className="text-primary underline underline-offset-2">Image Compressor</Link>{' '}
              if a file feels oversized.
            </li>
            <li>For your own website (not social platforms), <strong>WebP</strong> loads faster than JPG or PNG at similar quality — convert with the{' '}
              <Link href="/tools/webp-converter" className="text-primary underline underline-offset-2">WebP Converter</Link>.
            </li>
          </ul>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Uploading a portrait photo for a landscape slot</strong> — a tall photo squeezed into a wide banner (like a Facebook cover or LinkedIn banner) often crops out the top and bottom of your subject entirely.</li>
            <li><strong>Ignoring "safe zones" on Stories and Reels</strong> — profile icons, captions, and interactive stickers overlay the top and bottom of vertical video content, so keep key visual elements centered rather than near the edges.</li>
            <li><strong>Reusing one image size everywhere</strong> — a square Instagram post stretched to fit a Twitter header looks distorted; resize (or better, crop) separately for each platform's actual ratio.</li>
            <li><strong>Forgetting profile photos display as circles</strong> on most platforms — important details near the corners of a square profile photo get visually clipped by the circular mask.</li>
            <li><strong>Not checking file size limits</strong> — some platforms reject images above a certain size even if the pixel dimensions are correct; compress first if needed.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Do these exact dimensions change often?</p>
              <p className="text-muted-foreground">Platforms do update their recommended sizes occasionally, though the core dimensions here have been stable for a while — it's worth a quick check on the platform's official help pages before a major campaign.</p>
            </div>
            <div>
              <p className="font-semibold">What happens if I upload the wrong size?</p>
              <p className="text-muted-foreground">Most platforms don't reject a mismatched image — they crop or letterbox it automatically, which can unpredictably cut off important content near the edges.</p>
            </div>
            <div>
              <p className="font-semibold">Should I always match the exact pixel dimensions, or just the ratio?</p>
              <p className="text-muted-foreground">Matching the ratio prevents distortion, but matching the exact recommended pixel size also ensures your image looks sharp rather than being scaled up or down further by the platform.</p>
            </div>
            <div>
              <p className="font-semibold">Is it safe to resize personal photos online?</p>
              <p className="text-muted-foreground">With OpticShift Pro specifically, yes — resizing happens entirely in your browser using the Canvas API, so your photo is never uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use the same image across multiple platforms?</p>
              <p className="text-muted-foreground">You can, but since each platform uses different ratios, you'll typically get better results resizing (or cropping) a version specifically for each platform rather than reusing one size everywhere.</p>
            </div>
            <div>
              <p className="font-semibold">Why does my profile photo look cropped weirdly?</p>
              <p className="text-muted-foreground">Most platforms display profile photos inside a circular mask, even though you upload a square image — keep important details centered rather than near the corners, which get visually clipped.</p>
            </div>
            <div>
              <p className="font-semibold">What's a "safe zone" for Stories and Reels?</p>
              <p className="text-muted-foreground">The top and bottom portions of vertical video content are typically covered by profile icons, captions, and interactive stickers, so keeping key visual elements centered avoids them being obscured.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
          <p>
            Matching a platform's exact dimensions takes a couple of minutes and consistently pays off
            in how professional your content looks — no unexpected crops, no stretched logos, no
            important details lost at the edges. Keep this guide bookmarked, and resize each image for
            its specific destination before you post.
          </p>

          <h2 className="text-2xl font-bold mt-8">Related Guides</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><Link href="/blog/image-resizer-complete-guide" className="text-primary underline underline-offset-2">Image Resizer Complete Guide</Link></li>
            <li><Link href="/blog/how-to-compress-images" className="text-primary underline underline-offset-2">How to Compress Images Without Losing Quality</Link></li>
            <li><Link href="/blog/youtube-thumbnail-downloader-guide" className="text-primary underline underline-offset-2">How to Create the Perfect YouTube Thumbnail Size</Link></li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to resize your images?</p>
            <Link
              href="/tools/resizer"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Image Resizer Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
