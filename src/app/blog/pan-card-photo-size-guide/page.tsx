import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PAN Card Photo Size Guide (2.5×3.5cm) — Free Online Tool (2026) — OpticShift Pro',
  description: 'The exact PAN application photo specification for Form 49A/49AA, common mistakes to avoid, and how to crop your own photo to the correct size for free.',
  keywords: 'pan card photo size, pan application photo, form 49a photo size, nsdl pan photo',
}

export default function PanPhotoArticle() {
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
            PAN Card Photo Size Guide (2.5×3.5cm)
          </h1>
          <p className="text-muted-foreground text-lg">
            The exact specification for Form 49A/49AA, how NSDL and UTIITSL requirements compare, and how to get a correctly sized photo in minutes.
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
            <li><a href="#spec" className="hover:text-primary">The official PAN photo specification</a></li>
            <li><a href="#nsdl-utiitsl" className="hover:text-primary">NSDL vs UTIITSL — does the portal matter?</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare your photo, step by step</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes that delay applications</a></li>
            <li><a href="#use-cases" className="hover:text-primary">When you'll need this photo</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            A PAN card is one of the most frequently used identity documents in India, required for
            everything from opening a bank account to filing taxes to making large purchases. Getting
            the application photo right the first time — rather than having it rejected and needing to
            resubmit — saves real processing time.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Official PAN Photo Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Size:</strong> 2.5cm × 3.5cm</p>
            <p><strong>Color:</strong> Full color (black and white photos are typically rejected)</p>
            <p><strong>Background:</strong> Plain white background</p>
            <p><strong>Expression:</strong> Neutral, direct-facing view</p>
            <p><strong>Form:</strong> Applies to Form 49A (Indian citizens) and Form 49AA (foreign entities)</p>
          </div>

          <h2 id="nsdl-utiitsl" className="text-2xl font-bold mt-8">NSDL vs UTIITSL — Does the Portal Matter?</h2>
          <p>
            PAN applications are processed through one of two authorized portals — NSDL (now Protean)
            or UTIITSL — and both generally follow the same core 2.5×3.5cm photo specification for
            physical form submissions. For online e-KYC-based applications specifically, upload
            requirements can occasionally differ slightly in file format or size limits between the
            two portals, so it's worth double-checking the current guidance on whichever specific
            portal you're applying through before submitting.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Your Photo, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a recent color photo against a plain white background, facing the camera directly.</li>
            <li>Ensure even lighting with no harsh shadows across your face.</li>
            <li>Open the <Link href="/tools/pan-photo" className="text-primary underline underline-offset-2">PAN Card Photo Maker</Link> tool and upload your photo.</li>
            <li>Adjust the crop to fit the 2.5×3.5cm proportions correctly.</li>
            <li>Download the finished photo, ready for your physical form or online application.</li>
          </ol>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes That Delay Applications</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Using a non-white background</strong> — PAN applications are typically stricter about background color than some other document photos.</li>
            <li><strong>Submitting a black-and-white photo</strong> — a recent color photograph is required.</li>
            <li><strong>Tinted glasses</strong> — plain glasses without tinted lenses are usually accepted, but check the latest guidance if unsure.</li>
            <li><strong>Reusing a passport-size photo without checking dimensions</strong> — PAN's 2.5×3.5cm is smaller than the 3.5×4.5cm passport standard, so the two aren't directly interchangeable without re-cropping.</li>
          </ul>

          <p>
            It's worth taking a bit more care with this photo than you might for a more temporary
            document, since a PAN card typically stays valid and in use for years, serving as identity
            verification across bank account opening, large financial transactions, and annual tax
            filing. A clear, well-lit photo you're comfortable seeing on an identity document for the
            long term is worth the extra few minutes compared to a rushed, poorly lit one.
          </p>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">When You'll Need This Photo</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>New PAN card application via Form 49A or 49AA.</li>
            <li>PAN correction or update requests following a name change or other detail update.</li>
            <li>PAN card reprint requests if the original is lost or damaged.</li>
            <li>Business or minor PAN applications, which follow the same core photo specification.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Does this work for both new PAN and correction applications?</p>
              <p className="text-muted-foreground">Yes, the 2.5×3.5cm size applies to Form 49A/49AA for new PAN cards as well as correction or update requests.</p>
            </div>
            <div>
              <p className="font-semibold">Is a color photo required?</p>
              <p className="text-muted-foreground">Yes, PAN applications require a recent color photograph; black-and-white photos are typically rejected.</p>
            </div>
            <div>
              <p className="font-semibold">Can I wear glasses in the photo?</p>
              <p className="text-muted-foreground">Plain glasses without tinted lenses are usually accepted, but check the latest NSDL/UTIITSL guidelines since requirements can be updated.</p>
            </div>
            <div>
              <p className="font-semibold">How is this different from a passport photo?</p>
              <p className="text-muted-foreground">PAN photos use a smaller 2.5×3.5cm size compared to the 3.5×4.5cm passport standard, so a passport photo needs to be re-cropped rather than reused directly.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use the same photo for both PAN and Aadhaar applications?</p>
              <p className="text-muted-foreground">The same source photo works for both, but each needs to be cropped to its own specific size — 2.5×3.5cm for PAN and 3.5×4.5cm for Aadhaar — since the proportions differ.</p>
            </div>
            <div>
              <p className="font-semibold">What if my PAN application is for a minor?</p>
              <p className="text-muted-foreground">Minor PAN applications generally follow the same 2.5×3.5cm photo specification, though the application process itself involves a parent or guardian as the applicant.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/aadhaar-photo" className="text-primary hover:underline">Aadhaar Card Photo Maker</Link> — the correct 3.5×4.5cm size for Aadhaar applications.</li>
            <li><Link href="/tools/signature-resizer" className="text-primary hover:underline">Signature Resizer</Link> — resize a scanned signature to match form upload requirements.</li>
            <li><Link href="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link> — freeform cropping for any other document photo needs.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your PAN photo?</p>
            <Link
              href="/tools/pan-photo"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try PAN Card Photo Maker Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
