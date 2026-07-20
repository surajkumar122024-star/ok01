import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aadhaar Card Photo Size Guide (3.5×4.5cm) — Free Online Tool (2026) — OpticShift Pro',
  description: 'The exact Aadhaar enrollment and update photo specification, common rejection reasons, and how to crop your own photo to the correct 3.5×4.5cm size for free.',
  keywords: 'aadhaar photo size, aadhaar card photo online, aadhaar photo specification, aadhaar enrollment photo',
}

export default function AadhaarPhotoArticle() {
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
            Aadhaar Card Photo Size Guide (3.5×4.5cm)
          </h1>
          <p className="text-muted-foreground text-lg">
            The exact specification, the most common rejection reasons, and how to get a correctly sized photo without a studio visit.
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
            <li><a href="#spec" className="hover:text-primary">The official Aadhaar photo specification</a></li>
            <li><a href="#rejections" className="hover:text-primary">Why photos actually get rejected</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare your photo, step by step</a></li>
            <li><a href="#printing" className="hover:text-primary">Printing your photo correctly</a></li>
            <li><a href="#use-cases" className="hover:text-primary">When you'll need this photo</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Whether you're enrolling for Aadhaar for the first time or updating existing details at a
            Seva Kendra, you'll need a photo in a specific size — and getting it wrong is one of the
            more common reasons an application gets sent back for correction. Here's exactly what's
            required and how to get it right the first time.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Official Aadhaar Photo Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Size:</strong> 3.5cm × 4.5cm</p>
            <p><strong>Background:</strong> Plain, light-colored (white or off-white)</p>
            <p><strong>Color:</strong> Full color, not black and white</p>
            <p><strong>Expression:</strong> Neutral, facing the camera directly</p>
            <p><strong>Recency:</strong> A recent photo reflecting current appearance</p>
          </div>
          <p>
            This same specification applies whether you're completing a new enrollment form or a
            correction/update request at an Aadhaar Seva Kendra — there's no separate size for each
            process.
          </p>

          <h2 id="rejections" className="text-2xl font-bold mt-8">Why Photos Actually Get Rejected</h2>
          <p>
            Enrollment operators are ultimately checking that your photo clearly and unambiguously
            matches your face for biometric enrollment purposes, which is why the details around the
            photo matter as much as the size itself. The most common rejection reasons are consistent
            and easy to avoid once you know them:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Shadowed or patterned background</strong> — a plain white or light wall works best; avoid busy backgrounds or visible shadows.</li>
            <li><strong>Glasses glare</strong> — reflective glare across lenses can obscure the eyes; angle slightly away from direct light if you wear glasses.</li>
            <li><strong>Hair obstructing the face</strong> — keep hair away from the eyes, eyebrows, and outline of the face.</li>
            <li><strong>Incorrect proportions</strong> — a photo cropped freehand rarely lands exactly on 3.5×4.5cm; a dedicated cropping tool avoids this.</li>
            <li><strong>Old or outdated photo</strong> — enrollment centers expect a photo that reflects your current appearance.</li>
          </ul>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Your Photo, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a photo against a plain white or light-colored wall, facing the camera directly with a neutral expression.</li>
            <li>Use natural daylight or bright indoor lighting to avoid harsh shadows across your face.</li>
            <li>Open the <Link href="/tools/aadhaar-photo" className="text-primary underline underline-offset-2">Aadhaar Photo Maker</Link> tool and upload your photo.</li>
            <li>Adjust the crop box so your face is centered and fills the frame appropriately within the 3.5×4.5cm proportions.</li>
            <li>Download the correctly sized photo, ready to print or upload.</li>
          </ol>

          <h2 id="printing" className="text-2xl font-bold mt-8">Printing Your Photo Correctly</h2>
          <p>
            Once you've downloaded the correctly cropped photo, any local photo printing shop can
            print it on standard photo paper — just confirm with them that the output size matches
            3.5×4.5cm exactly before they cut it, since some print shops default to a slightly
            different standard size unless you specify. A home printer with photo paper works too, as
            long as you print at 100% scale rather than "fit to page," which can distort the exact
            dimensions.
          </p>
          <p>
            A photo studio visit for a single passport-style photo typically costs a small fee and
            requires travel time during business hours — often more effort than the task actually
            needs for a document photo you likely already have a good phone photo for. Cropping your
            own photo to the exact spec and printing just the one sheet at a local shop or home
            printer usually works out faster and cheaper, especially if you already have a suitable
            recent photo on hand.
          </p>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">When You'll Need This Photo</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>New Aadhaar enrollment for yourself or a family member.</li>
            <li>Aadhaar detail correction or update requests (name, address, date of birth).</li>
            <li>Certain Aadhaar-linked service applications that request the same standard photo alongside your Aadhaar number.</li>
            <li>Re-print requests if your existing Aadhaar card is lost or damaged.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I use this photo for both new enrollment and updates?</p>
              <p className="text-muted-foreground">Yes, the same 3.5×4.5cm specification applies to both new Aadhaar enrollment and update/correction forms submitted at a Seva Kendra.</p>
            </div>
            <div>
              <p className="font-semibold">What background works best?</p>
              <p className="text-muted-foreground">A plain white or light-colored wall works best. Avoid patterns, shadows, or other people in the frame.</p>
            </div>
            <div>
              <p className="font-semibold">Can I wear glasses in the photo?</p>
              <p className="text-muted-foreground">Plain glasses are generally acceptable as long as there's no glare obscuring your eyes — angling slightly away from a direct light source helps avoid reflection.</p>
            </div>
            <div>
              <p className="font-semibold">Does the photo need to be recent?</p>
              <p className="text-muted-foreground">Yes, enrollment centers generally expect a photo that reflects your current appearance.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use a phone selfie for this?</p>
              <p className="text-muted-foreground">Yes, as long as it's taken against a plain, light background with even lighting and a direct, neutral-expression view of your face — modern phone cameras are sharp enough for this purpose.</p>
            </div>
            <div>
              <p className="font-semibold">Do I need to print this myself, or can I upload it digitally?</p>
              <p className="text-muted-foreground">Most Aadhaar enrollment processes require a printed photo attached to the physical form, though some digital update pathways may accept an uploaded photo — check the current process at your specific Seva Kendra.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/pan-photo" className="text-primary hover:underline">PAN Card Photo Maker</Link> — the correct 2.5×3.5cm size for PAN applications.</li>
            <li><Link href="/tools/passport-photo" className="text-primary hover:underline">Passport Size Photo Maker</Link> — 35×45mm sizing for passport applications.</li>
            <li><Link href="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link> — freeform cropping for any other proportions you need.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your Aadhaar photo?</p>
            <Link
              href="/tools/aadhaar-photo"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Aadhaar Photo Maker Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
