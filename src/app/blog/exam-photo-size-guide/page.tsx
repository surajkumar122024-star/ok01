import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Exam Application Photo Size Guide (200×230px) — Free Tool (2026) — OpticShift Pro',
  description: 'The common photo and file size specification for SSC, IBPS, Railways, and other competitive exam applications, plus how to prepare a compliant photo for free.',
  keywords: 'exam photo size, ssc photo size, ibps photo size, railway exam photo, competitive exam photo specification',
}

export default function ExamPhotoArticle() {
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
            Exam Application Photo Size Guide (200×230px)
          </h1>
          <p className="text-muted-foreground text-lg">
            Why exam portals demand such small file sizes, the common specification across SSC/IBPS/Railways, and how to prepare a compliant photo quickly.
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
            <li><a href="#spec" className="hover:text-primary">The common exam photo specification</a></li>
            <li><a href="#why-small" className="hover:text-primary">Why the file size limit is so small</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare your photo, step by step</a></li>
            <li><a href="#always-check" className="hover:text-primary">Always check your specific exam notification</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes to avoid</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Competitive exam applications — SSC, IBPS, Indian Railways, and many state-level boards —
            are notorious for strict, often tiny photo upload limits that catch applicants off guard.
            A typical phone photo is many times too large in both dimensions and file size, and
            portals rarely explain clearly why an upload failed.
          </p>

          <h2 id="spec" className="text-2xl font-bold mt-8">The Common Exam Photo Specification</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Dimensions:</strong> Approximately 200 × 230 pixels</p>
            <p><strong>File size:</strong> Between 20KB and 50KB</p>
            <p><strong>Background:</strong> Plain, light background recommended</p>
            <p><strong>Recency:</strong> A recent photo for identity verification at the exam center</p>
          </div>
          <p>
            These numbers are widely used as a common baseline across SSC, banking (IBPS), Railways,
            and several state-level competitive exams — but treat them as a solid starting point rather
            than a guarantee for every single exam notification.
          </p>

          <h2 id="why-small" className="text-2xl font-bold mt-8">Why the File Size Limit Is So Small</h2>
          <p>
            Government exam portals handle enormous simultaneous traffic during registration
            windows — sometimes millions of applicants uploading documents within the same few days
            before a deadline. Small, heavily compressed photo files, typically capped between 20KB
            and 50KB, keep the upload servers responsive under that load, rather than buckling under
            the combined weight of full-resolution photos from every applicant.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Your Photo, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a recent, clear photo against a plain background suitable for identity verification.</li>
            <li>Open the <Link href="/tools/exam-photo" className="text-primary underline underline-offset-2">Exam Photo Resizer</Link> tool and upload your photo.</li>
            <li>Crop toward the 200×230 pixel proportions.</li>
            <li>Check the resulting file size falls within your exam's stated KB range.</li>
            <li>Download and, if needed, compress further with the{' '}
              <Link href="/tools/compressor" className="text-primary underline underline-offset-2">Image Compressor</Link>{' '}
              to hit an unusually small limit.
            </li>
          </ol>

          <h2 id="always-check" className="text-2xl font-bold mt-8">Always Check Your Specific Exam Notification</h2>
          <p>
            This is worth repeating clearly: exact pixel dimensions and file size limits genuinely vary
            between exams, sometimes significantly. Before finalizing your photo, open your specific
            exam's official notification PDF and confirm the exact requirement stated there — using
            this tool's common specification as your starting crop, then adjusting further only if your
            exam's notification states something different.
          </p>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Uploading a full-resolution photo</strong> — most portals reject files well above the stated KB limit outright.</li>
            <li><strong>Assuming every exam uses identical dimensions</strong> — always cross-check the specific notification.</li>
            <li><strong>Using an old photo</strong> — exam centers use this photo for identity verification against your admit card, so recency matters.</li>
            <li><strong>Waiting until the deadline to discover the requirement</strong> — check the spec early so there's time to prepare, rather than scrambling right before registration closes.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Why do exam forms have such strict file size limits?</p>
              <p className="text-muted-foreground">Government exam portals handle thousands to millions of simultaneous applicants, so small, compressed photo files keep upload servers from getting overloaded.</p>
            </div>
            <div>
              <p className="font-semibold">What if my exam asks for a different pixel size?</p>
              <p className="text-muted-foreground">Use this tool to get close to the right proportions, then check the specific exam's notification PDF for exact width, height, and file size limits.</p>
            </div>
            <div>
              <p className="font-semibold">Should the photo be recent?</p>
              <p className="text-muted-foreground">Yes — most exam boards require a photo taken within the last few months so it matches your appearance at the exam center for identity verification.</p>
            </div>
            <div>
              <p className="font-semibold">What if my compressed photo is still above the KB limit?</p>
              <p className="text-muted-foreground">Run it through the Image Compressor for further size reduction — lowering the quality slightly usually gets an already-small photo under a tight KB limit.</p>
            </div>
            <div>
              <p className="font-semibold">Is my photo uploaded anywhere while using this tool?</p>
              <p className="text-muted-foreground">No, cropping and resizing happen entirely in your browser — nothing is uploaded to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use the same photo for multiple exam applications?</p>
              <p className="text-muted-foreground">Only if the size and recency requirements match; many exams share similar specs, but it's worth verifying each notification individually before reusing a photo.</p>
            </div>
            <div>
              <p className="font-semibold">What format should the photo be in?</p>
              <p className="text-muted-foreground">Most exam portals accept JPG specifically; check your exam's notification, since a few portals may accept PNG as well.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/signature-resizer" className="text-primary hover:underline">Signature Resizer</Link> — most exam applications also require a small resized signature scan.</li>
            <li><Link href="/tools/compressor" className="text-primary hover:underline">Image Compressor</Link> — reduce file size further if your exam's limit is unusually small.</li>
            <li><Link href="/tools/image-size-checker" className="text-primary hover:underline">Image Size Checker</Link> — verify exact dimensions and file size before uploading.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your exam photo?</p>
            <Link
              href="/tools/exam-photo"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Exam Photo Resizer Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
