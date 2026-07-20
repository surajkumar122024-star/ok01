import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'US Visa Photo Size Guide (2×2 inch) — Free Online Tool (2026) — OpticShift Pro',
  description: 'The exact US visa and passport photo specification, why the 2x2 inch square format is stricter than other ID photos, and how to crop your own photo correctly.',
  keywords: 'us visa photo size, 2x2 photo, visa photo requirements, us passport photo online',
}

export default function VisaPhotoArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Document Photos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            US Visa Photo Size Guide (2×2 inch)
          </h1>
          <p className="text-muted-foreground text-lg">
            The exact 2×2 inch square specification, why visa photo rules are stricter than most ID photos, and how to get it right the first time.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 July 2026</span>
            <span>•</span>
            <span>⏱ 6 min read</span>
            <span>•</span>
            <span>🏷 Document Photos</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#spec" className="hover:text-primary">The official visa photo specification</a></li>
            <li><a href="#why-strict" className="hover:text-primary">Why visa photo rules are so strict</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare your photo, step by step</a></li>
            <li><a href="#other-countries" className="hover:text-primary">What if my visa isn't for the US?</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes that cause rejections</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Since visa applications are usually tied to a specific travel date that can't easily move,
            a rejected photo is one of the more costly document mistakes to make — it can delay
            processing at exactly the point where time matters most. Here's the exact specification
            and how to get it right on the first submission.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Official Visa Photo Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Size:</strong> 2 × 2 inches (51mm × 51mm) — a square format</p>
            <p><strong>Background:</strong> Plain white or off-white, no shadows</p>
            <p><strong>Face:</strong> Full face forward, both ears typically visible</p>
            <p><strong>Expression:</strong> Neutral</p>
            <p><strong>Standard:</strong> Matches the US Department of State format</p>
          </div>

          <h2 id="why-strict" className="text-2xl font-bold mt-8">Why Visa Photo Rules Are So Strict</h2>
          <p>
            Visa photo requirements are noticeably stricter than most other document photos — full
            face forward, ears typically visible, no shadows at all on the background — because visa
            processing relies heavily on precise facial matching against other identity documents.
            Even small issues that a casual observer wouldn't notice, like a slight shadow along one
            side of the background or hair partially covering an ear, can be enough for an application
            to be flagged during review.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Your Photo, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a photo against a plain white or off-white background, standing a few feet away from the wall to avoid shadows.</li>
            <li>Face the camera directly with a neutral expression, ears visible if your hairstyle allows.</li>
            <li>Open the <Link href="/tools/visa-photo" className="text-primary underline underline-offset-2">Visa Photo Maker</Link> tool and upload your photo.</li>
            <li>Adjust the crop to the exact 2×2 inch square proportions.</li>
            <li>Download the finished photo, ready for your visa application.</li>
          </ol>

          <h2 id="other-countries" className="text-2xl font-bold mt-8">What If My Visa Isn't for the US?</h2>
          <p>
            The 2×2 inch square format is specifically the US Department of State standard, and while
            a few other countries' visa processes loosely follow a similar square ratio, treating it as
            a universal requirement is a common and avoidable mistake. Always verify your specific
            destination country's current visa photo requirement before submitting — some use the
            35×45mm format instead, which is a different shape entirely, not just a different size of
            the same square.
          </p>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes That Cause Rejections</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Shadows on the background</strong> — standing too close to the wall creates a visible shadow that most casual photos don't avoid by default.</li>
            <li><strong>Hair covering the ears</strong> — many visa photo standards expect both ears visible; adjust hairstyle or angle if needed.</li>
            <li><strong>Assuming the format is universal</strong> — always check your specific destination country's requirement rather than assuming 2×2 inch applies everywhere.</li>
            <li><strong>Low resolution or blurry source photo</strong> — a phone photo works fine as long as lighting is even and the image isn't blurry once cropped to the square frame.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Does this match the US visa photo requirement exactly?</p>
              <p className="text-muted-foreground">The 2×2 inch square crop matches the US Department of State format; head size and background rules should still be checked against current official guidance.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use a photo taken on my phone?</p>
              <p className="text-muted-foreground">Yes, as long as the lighting is even, the background is plain, and the phone camera resolution is high enough that the cropped square photo doesn't look blurry.</p>
            </div>
            <div>
              <p className="font-semibold">What if my visa country isn't the US?</p>
              <p className="text-muted-foreground">Some countries use different visa photo dimensions, like 35×45mm, so double-check your destination country's embassy website before using this square format.</p>
            </div>
            <div>
              <p className="font-semibold">Should ears be visible in the photo?</p>
              <p className="text-muted-foreground">Many square-format visa guidelines expect a full-face frontal view with ears visible; check the specific requirement, since some allow hair covering the ears while others don't.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Can I wear a religious head covering in a visa photo?</p>
              <p className="text-muted-foreground">Head coverings worn daily for religious reasons are generally acceptable as long as the full face remains clearly visible from the bottom of the chin to the top of the forehead.</p>
            </div>
            <div>
              <p className="font-semibold">How recent does the photo need to be?</p>
              <p className="text-muted-foreground">Most visa photo guidelines expect a photo taken within the last six months that closely resembles your current appearance.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/passport-photo" className="text-primary hover:underline">Passport Size Photo Maker</Link> — the 35×45mm format used by India and several other countries.</li>
            <li><Link href="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link> — freeform cropping for any other proportions you need.</li>
            <li><Link href="/tools/image-size-checker" className="text-primary hover:underline">Image Size Checker</Link> — verify your photo's exact pixel dimensions before submitting.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your visa photo?</p>
            <Link
              href="/tools/visa-photo"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Visa Photo Maker Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
