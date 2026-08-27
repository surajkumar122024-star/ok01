import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Convert HEIC to PDF Online (2026 Guide) — OpticShift Pro',
  description: 'Combine multiple iPhone HEIC photos into a single PDF for free, right in your browser. Step-by-step guide — no software, no upload, no sign-up.',
  keywords: 'heic to pdf, convert heic to pdf, iphone photos to pdf, combine heic photos pdf, heic to pdf converter free',
}

export default function HeicToPdfArticle() {
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
            How to Convert HEIC Photos to PDF — Free &amp; Instant
          </h1>
          <p className="text-muted-foreground text-lg">
            Turn a batch of iPhone HEIC photos into one shareable PDF — no software to install, no photo uploaded to a server.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 5 min read</span>
            <span>•</span>
            <span>🏷 Image Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#why" className="hover:text-primary">Why convert HEIC photos to PDF?</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to convert HEIC to PDF, step by step</a></li>
            <li><a href="#uses" className="hover:text-primary">Common uses</a></li>
            <li><a href="#tips" className="hover:text-primary">Tips for a cleaner result</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            iPhones save photos in HEIC format by default, which works great until you need to send
            several photos somewhere that expects a single file — a form attachment, an email, a
            printed handout. Converting a batch of HEIC photos into one PDF solves that in a single
            step, turning a folder of separate iPhone photos into one document anyone can open.
          </p>

          <h2 id="why" className="text-2xl font-bold mt-8">Why Convert HEIC Photos to PDF?</h2>
          <p>
            A PDF keeps a set of photos in a fixed order as a single file, which matters when you&apos;re
            submitting multiple photos together — receipts for an expense report, pages of a scanned
            document photographed on an iPhone, or a set of images for a form that only accepts one
            attachment. Sending five separate HEIC photos is easy to get out of order or have one
            silently fail to open on a non-Apple device; one PDF avoids both problems at once.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Convert HEIC to PDF, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/heic-to-jpg" className="text-primary underline underline-offset-2">HEIC to JPG</Link> tool — the same tool handles PDF output.</li>
            <li>Upload two or more HEIC photos, in the order you want them to appear.</li>
            <li>Set the output format dropdown to <strong>PDF</strong>.</li>
            <li>Click Convert — every photo is combined into a single PDF, one photo per page.</li>
            <li>The PDF downloads automatically as one file, ready to attach or print.</li>
          </ol>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Tip:</strong> Reorder your photos before converting — the PDF page order follows the order you uploaded them in, and re-converting is the only way to change it afterward.</p>
          </div>

          <h2 id="uses" className="text-2xl font-bold mt-8">Common Uses</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Expense reports</strong> — combine several photographed receipts into one PDF attachment instead of sending each separately.</li>
            <li><strong>Scanned documents</strong> — turn iPhone photos of paper pages into a single multi-page PDF, in reading order.</li>
            <li><strong>Application attachments</strong> — many online forms only accept one file; a combined PDF satisfies that where separate HEIC photos wouldn&apos;t.</li>
            <li><strong>Printing multiple photos at once</strong> — send one PDF to a printer instead of managing several separate image files.</li>
            <li><strong>Sharing a photo set with non-Apple users</strong> — a PDF opens on any device without HEIC compatibility issues.</li>
          </ul>

          <h2 id="tips" className="text-2xl font-bold mt-8">Tips for a Cleaner Result</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload photos in the exact order you want them to appear — the tool doesn&apos;t reorder pages after conversion.</li>
            <li>Keep the quality setting reasonably high if the PDF will be printed, since it controls the JPEG quality used inside each page.</li>
            <li>For a large batch, expect the conversion to take a few extra seconds per photo since everything processes in your browser.</li>
            <li>If you only need one photo converted, JPG or PNG output is simpler — PDF is most useful once you&apos;re combining two or more.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I convert just one HEIC photo to PDF?</p>
              <p className="text-muted-foreground">Yes — select PDF as the output format even with a single photo uploaded; it downloads as a one-page PDF.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded to a server to create the PDF?</p>
              <p className="text-muted-foreground">No — both the HEIC decoding and the PDF assembly happen entirely in your browser. Nothing is uploaded anywhere.</p>
            </div>
            <div>
              <p className="font-semibold">Can I change the order of photos in the PDF after converting?</p>
              <p className="text-muted-foreground">Not within this tool — reorder your uploaded files before clicking Convert, since the PDF follows upload order.</p>
            </div>
            <div>
              <p className="font-semibold">Does converting to PDF reduce photo quality?</p>
              <p className="text-muted-foreground">Each photo is converted through JPEG before being placed on a PDF page, so the same small, usually unnoticeable quality trade-off applies as with JPG output.</p>
            </div>
            <div>
              <p className="font-semibold">Is there a limit to how many photos I can combine?</p>
              <p className="text-muted-foreground">There&apos;s no hard-coded limit, but very large batches take longer to process since everything runs in your browser rather than on a server.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link> — combine JPG or PNG photos into a PDF the same way.</li>
            <li><Link href="/tools/compressor" className="text-primary hover:underline">Image Compressor</Link> — shrink large photos first if your PDF is coming out too big.</li>
            <li><Link href="/tools/pdf-merge" className="text-primary hover:underline">PDF Merge</Link> — combine this PDF with other existing PDF files afterward.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to combine your photos?</p>
            <Link
              href="/tools/heic-to-jpg"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try HEIC to PDF Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
