import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Passport Photo Size Guide (35×45mm) — Free Online Tool (2026) — OpticShift Pro',
  description: 'The exact Passport Seva photo specification, face-framing requirements, and how to crop your own photo to the correct 35×45mm size for free.',
  keywords: 'passport photo size, passport seva photo specification, 35x45mm photo, indian passport photo online',
}

export default function PassportPhotoArticle() {
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
            Passport Photo Size Guide (35×45mm)
          </h1>
          <p className="text-muted-foreground text-lg">
            The exact Passport Seva specification, why face-framing matters more than you'd think, and how to prepare a compliant photo yourself.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 July 2026</span>
            <span>•</span>
            <span>⏱ 7 min read</span>
            <span>•</span>
            <span>🏷 Document Photos</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#spec" className="hover:text-primary">The official passport photo specification</a></li>
            <li><a href="#face-framing" className="hover:text-primary">Why face-framing matters so much</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare your photo, step by step</a></li>
            <li><a href="#international" className="hover:text-primary">Does this size work for other countries?</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes to avoid</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Passport photo requirements are among the strictest of any document photo category —
            precise face framing, background, and expression rules exist specifically to make
            automated facial recognition matching reliable at immigration checkpoints. Getting the
            details right before you submit avoids a rejected application and a repeat trip.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Official Passport Photo Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Size:</strong> 35mm × 45mm</p>
            <p><strong>Face coverage:</strong> Roughly 70-80% of the frame</p>
            <p><strong>Background:</strong> Plain, light-colored</p>
            <p><strong>Expression:</strong> Neutral — both eyes open, mouth closed</p>
            <p><strong>Glasses:</strong> Many current guidelines discourage glasses entirely to avoid glare</p>
          </div>

          <h2 id="face-framing" className="text-2xl font-bold mt-8">Why Face-Framing Matters So Much</h2>
          <p>
            Passport photo rules have moved toward internationally standard, biometric-friendly
            requirements in recent years — largely to make automated facial recognition matching more
            reliable at immigration and passport processing checkpoints. A photo where the face is too
            small, too large, or off-center within the frame can fail automated review even if it
            looks perfectly acceptable to the naked eye, which is why the 70-80% face-coverage
            guideline specifically matters more here than for most other document photos.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Your Photo, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a photo against a plain, light-colored background with even, shadow-free lighting.</li>
            <li>Face the camera directly with a neutral expression — both eyes open, mouth closed.</li>
            <li>Open the <Link href="/tools/passport-photo" className="text-primary underline underline-offset-2">Passport Size Photo Maker</Link> tool and upload your photo.</li>
            <li>Adjust the crop so your face fills roughly 70-80% of the 35×45mm frame.</li>
            <li>Download the finished photo, ready for your Passport Seva application.</li>
          </ol>

          <h2 id="international" className="text-2xl font-bold mt-8">Does This Size Work for Other Countries?</h2>
          <p>
            Several other countries use the same 35×45mm standard for passports and some long-stay
            visa categories, which makes this crop useful beyond just Indian passport applications.
            That said, requirements genuinely do vary by country — some, like the US, use a different
            2×2 inch square format instead — so always confirm your specific destination country's
            current requirement before submitting rather than assuming this size applies universally.
          </p>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Smiling in the photo</strong> — most passport authorities require a neutral expression, not a smile.</li>
            <li><strong>Wearing glasses</strong> — many current guidelines discourage glasses entirely due to glare and reflection issues.</li>
            <li><strong>Using an outdated photo</strong> — passport photos should typically be taken within the last 6 months.</li>
            <li><strong>Face too small or too large in frame</strong> — aim for the 70-80% face-coverage guideline rather than a loosely framed shot.</li>
            <li><strong>Headwear not worn for religious reasons</strong> — hats and other non-religious headwear are typically not permitted.</li>
          </ul>

          <p>
            Most Indian passport applications today are submitted through Passport Seva's online
            portal, which typically accepts a digital photo upload matching this specification rather
            than requiring a physical print for the initial application — though it's worth checking
            current requirements, since some appointment types or corrections may still expect physical
            copies. Preparing a correctly cropped digital file in advance means you're ready either way.
          </p>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I smile in a passport photo?</p>
              <p className="text-muted-foreground">Most passport authorities, including Passport Seva, ask for a neutral expression with both eyes open and mouth closed, rather than a smile.</p>
            </div>
            <div>
              <p className="font-semibold">What if I wear glasses daily?</p>
              <p className="text-muted-foreground">Many passport guidelines now discourage glasses in the photo entirely to avoid glare; check your local passport office's current rule.</p>
            </div>
            <div>
              <p className="font-semibold">How recent should the photo be?</p>
              <p className="text-muted-foreground">Passport photos should typically be taken within the last 6 months and closely resemble your current appearance.</p>
            </div>
            <div>
              <p className="font-semibold">Does this size work for other countries too?</p>
              <p className="text-muted-foreground">The 35×45mm format is used by several countries beyond India for passports and some visa categories, though it's worth confirming the specific destination's requirement.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Do I need a printed photo or can I upload it digitally?</p>
              <p className="text-muted-foreground">Most current Passport Seva applications accept a digital photo upload matching this specification, though it's worth checking the specific requirements for your appointment type.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use the same photo for a Tatkal (expedited) application?</p>
              <p className="text-muted-foreground">Yes, the same 35×45mm specification applies regardless of whether you're applying through the standard or Tatkal expedited process.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/visa-photo" className="text-primary hover:underline">Visa Photo Maker</Link> — 2×2 inch square sizing for US-format visa applications.</li>
            <li><Link href="/tools/aadhaar-photo" className="text-primary hover:underline">Aadhaar Card Photo Maker</Link> — the correct 3.5×4.5cm size for Aadhaar applications.</li>
            <li><Link href="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link> — freeform cropping for any other document photo needs.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your passport photo?</p>
            <Link
              href="/tools/passport-photo"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Passport Photo Maker Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
