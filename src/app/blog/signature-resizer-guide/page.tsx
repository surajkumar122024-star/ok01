import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Signature Resizer Guide: Prepare a Scanned Signature (140×60px) — OpticShift Pro',
  description: 'How to scan, crop, and resize your signature for bank KYC, exam applications, and government forms — the common 140×60px, under-20KB specification explained.',
  keywords: 'signature resize online, signature scan for forms, bank kyc signature size, exam form signature size',
}

export default function SignatureResizerArticle() {
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
            Signature Resizer Guide: Prepare a Scanned Signature for Any Form
          </h1>
          <p className="text-muted-foreground text-lg">
            Why forms reject your signature scan, the common 140×60px specification, and how to get a clean, compliant scan in minutes.
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
            <li><a href="#spec" className="hover:text-primary">The common signature scan specification</a></li>
            <li><a href="#capture" className="hover:text-primary">Capturing a clean signature scan</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to resize your signature, step by step</a></li>
            <li><a href="#why-rejected" className="hover:text-primary">Why signature uploads get rejected</a></li>
            <li><a href="#use-cases" className="hover:text-primary">Where this signature format is used</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Bank KYC forms, exam applications, and government portals routinely ask for a scanned
            signature under a strict file size limit, uploaded at a small, fixed pixel size. A
            signature photographed on a phone is usually many times too large in both dimensions and
            file size, and needs cropping plus compression before it will pass an upload check.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Common Signature Scan Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Dimensions:</strong> Approximately 140 × 60 pixels</p>
            <p><strong>File size:</strong> Typically 10-20KB</p>
            <p><strong>Ink color:</strong> Black or dark blue on plain white paper</p>
            <p><strong>Format:</strong> Usually JPG or PNG, depending on the specific form</p>
          </div>
          <p>
            As with exam photos, exact requirements vary by form — treat these numbers as a reliable
            starting point and confirm against your specific form's instructions if it states a
            different size.
          </p>

          <h2 id="capture" className="text-2xl font-bold mt-8">Capturing a Clean Signature Scan</h2>
          <p>
            The quality of your final upload starts before you even open a resizing tool. Sign with
            black or dark blue ink on plain white paper — this combination gives the cleanest contrast,
            which matters because contrast is exactly what survives best when a signature gets
            compressed down to a tiny file size. Photograph or scan it in even, bright lighting to
            avoid shadows that reduce legibility once compressed, and try to sign naturally rather than
            hesitantly — a shaky, uncertain signature tends to compress less predictably than a
            confident, consistent one.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Resize Your Signature, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Sign on plain white paper with dark ink, then photograph or scan it in good lighting.</li>
            <li>Open the <Link href="/tools/signature-resizer" className="text-primary underline underline-offset-2">Signature Resizer</Link> tool and upload the image.</li>
            <li>Crop tightly around just the signature, removing excess white space.</li>
            <li>Confirm the output fits within your form's stated pixel and file size limits.</li>
            <li>Download the finished file, ready to upload.</li>
          </ol>

          <h2 id="why-rejected" className="text-2xl font-bold mt-8">Why Signature Uploads Get Rejected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>File too large</strong> — a straight phone photo is often 100x or more above a 10-20KB limit.</li>
            <li><strong>Wrong pixel dimensions</strong> — many forms expect an exact width and height, not just "small enough."</li>
            <li><strong>Too much white space around the signature</strong> — cropping loosely wastes the limited pixel area on blank paper instead of the signature itself.</li>
            <li><strong>Light or faded ink</strong> — a pale signature can become illegible after the heavy compression needed to hit a small file size.</li>
          </ul>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">Where This Signature Format Is Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bank account opening and KYC (Know Your Customer) verification forms.</li>
            <li>Competitive exam applications (often alongside a photo with its own size limit).</li>
            <li>Government portal registrations and applications.</li>
            <li>Digital document signing preparation where a clean signature image is needed.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">What ink color works best for scanning?</p>
              <p className="text-muted-foreground">Black or dark blue ink on plain white paper gives the cleanest contrast, which helps the signature stay legible after compression.</p>
            </div>
            <div>
              <p className="font-semibold">Why does my form reject the signature file?</p>
              <p className="text-muted-foreground">Most rejections happen because the file exceeds the maximum size limit or doesn't match the required pixel dimensions — cropping tightly and downloading here usually resolves both.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use a stylus-drawn signature instead of a scanned one?</p>
              <p className="text-muted-foreground">Yes, a digitally drawn signature works the same way — upload the image and crop and resize it just like a scanned one.</p>
            </div>
            <div>
              <p className="font-semibold">Is there a standard signature size across all forms?</p>
              <p className="text-muted-foreground">No, requirements vary by form; always check the specific size and KB limit stated in your application's instructions.</p>
            </div>
            <div>
              <p className="font-semibold">Is my image uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Should my signature look identical across every form I submit?</p>
              <p className="text-muted-foreground">Keeping a consistent signature scan across forms and accounts is generally good practice, since some institutions compare submitted signatures against a specimen on file.</p>
            </div>
            <div>
              <p className="font-semibold">Can I resize the same signature for multiple forms with different size limits?</p>
              <p className="text-muted-foreground">Yes, keep one clean master scan and re-crop or re-compress it separately for each form's specific pixel and file size requirement rather than photographing your signature fresh each time.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/exam-photo" className="text-primary hover:underline">Exam Photo Resizer</Link> — the matching photo specification most exam forms also require.</li>
            <li><Link href="/tools/compressor" className="text-primary hover:underline">Image Compressor</Link> — further reduce file size if your form's limit is unusually small.</li>
            <li><Link href="/tools/pan-photo" className="text-primary hover:underline">PAN Card Photo Maker</Link> — another common document photo requirement.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your signature scan?</p>
            <Link
              href="/tools/signature-resizer"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Signature Resizer Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
