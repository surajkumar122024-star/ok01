import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Document Photo Size Guide India: Aadhaar, PAN, Passport, Visa & Exam (2026) — OpticShift Pro',
  description: 'One reference table for every common Indian document photo spec — Aadhaar, PAN, Passport, Visa, exam applications, and signature scans — plus how to prepare each one free online.',
  keywords: 'aadhaar photo size, pan card photo size, passport photo size india, exam photo size, document photo size chart india',
}

export default function DocumentPhotoGuideIndia() {
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
            Document Photo Size Guide: Aadhaar, PAN, Passport, Visa &amp; Exam Photos
          </h1>
          <p className="text-muted-foreground text-lg">
            Every common Indian document photo specification in one place — so you stop guessing dimensions and file-size limits application by application.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 8 min read</span>
            <span>•</span>
            <span>🏷 Document Photos</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#chart" className="hover:text-primary">Quick reference chart</a></li>
            <li><a href="#why-different" className="hover:text-primary">Why does every form want a different size?</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to prepare any of these, step by step</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Mistakes that get applications rejected</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Almost every Indian government or institutional form — Aadhaar updates, PAN applications,
            passport renewals, visa forms, competitive exams, even bank KYC — asks for a photo in its
            own exact size and file-size limit. Get it wrong, and the portal either rejects the upload
            outright or silently stretches your photo into something that looks noticeably off. This
            guide puts every common specification in one place, so you can check the number once
            instead of hunting through five different application help pages.
          </p>

          <h2 id="chart" className="text-2xl font-bold mt-8">Quick Reference Chart</h2>
          <div className="glass rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Document</th>
                  <th className="text-left p-3 font-semibold">Photo Size</th>
                  <th className="text-left p-3 font-semibold">File Size</th>
                  <th className="text-left p-3 font-semibold">Tool</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Aadhaar Card</td>
                  <td className="p-3">3.5cm × 4.5cm</td>
                  <td className="p-3">Varies by portal</td>
                  <td className="p-3"><Link href="/tools/aadhaar-photo" className="text-primary underline underline-offset-2">Aadhaar Photo Maker</Link></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">PAN Card</td>
                  <td className="p-3">2.5cm × 3.5cm</td>
                  <td className="p-3">Varies by portal</td>
                  <td className="p-3"><Link href="/tools/pan-photo" className="text-primary underline underline-offset-2">PAN Photo Maker</Link></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Indian Passport</td>
                  <td className="p-3">35mm × 45mm</td>
                  <td className="p-3">Varies by portal</td>
                  <td className="p-3"><Link href="/tools/passport-photo" className="text-primary underline underline-offset-2">Passport Photo Maker</Link></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">US Visa</td>
                  <td className="p-3">2 × 2 inch (square)</td>
                  <td className="p-3">Varies by portal</td>
                  <td className="p-3"><Link href="/tools/visa-photo" className="text-primary underline underline-offset-2">Visa Photo Maker</Link></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Competitive Exams</td>
                  <td className="p-3">200px × 230px</td>
                  <td className="p-3">20KB - 50KB</td>
                  <td className="p-3"><Link href="/tools/exam-photo" className="text-primary underline underline-offset-2">Exam Photo Resizer</Link></td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Signature Scan</td>
                  <td className="p-3">140px × 60px</td>
                  <td className="p-3">10KB - 20KB</td>
                  <td className="p-3"><Link href="/tools/signature-resizer" className="text-primary underline underline-offset-2">Signature Resizer</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            File-size caps for Aadhaar, PAN, and passport portals change more often than the pixel
            dimensions do, and vary by which specific form or update request you&apos;re filing — always
            confirm the current limit stated on your form before submitting.
          </p>

          <h2 id="why-different" className="text-2xl font-bold mt-8">Why Does Every Form Want a Different Size?</h2>
          <p>
            Each document serves a different purpose, and the photo requirement reflects that. Passport
            and visa photos follow international biometric standards designed for automated facial
            recognition at border checkpoints, which is why face-framing (roughly 70-80% of the frame)
            matters so precisely for those two. Aadhaar and PAN photos are sized for small printed ID
            cards, so the dimensions are driven by physical card layout rather than biometric matching.
            Exam and signature specs are the strictest on file size, not dimensions — they exist so
            application portals handling thousands of simultaneous uploads on deadline day don&apos;t buckle
            under the load.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Prepare Any of These, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Take a photo against a plain, light-colored background with even, shadow-free lighting.</li>
            <li>Face the camera directly with a neutral expression — most of these specs require both eyes open, mouth closed.</li>
            <li>Open the specific tool for your document from the chart above and upload your photo.</li>
            <li>Adjust the crop so your face is framed correctly for that document&apos;s guideline.</li>
            <li>If there&apos;s a file-size limit, check the result against it — run it through the <Link href="/tools/compressor" className="text-primary underline underline-offset-2">Image Compressor</Link> if it&apos;s still too large.</li>
            <li>Download and upload to your application portal.</li>
          </ol>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Mistakes That Get Applications Rejected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Using one photo for every document</strong> — a passport-cropped photo uploaded to an Aadhaar form (or vice versa) often gets stretched or rejected, since the aspect ratios differ.</li>
            <li><strong>Ignoring the file-size cap</strong> — exam and signature portals in particular reject files above their stated KB limit outright, even if the pixel dimensions are correct.</li>
            <li><strong>Smiling where a neutral expression is required</strong> — passport and visa photos specifically ask for neutral expression, not a smile.</li>
            <li><strong>An outdated photo</strong> — passport and visa photos should typically be recent, closely resembling your current appearance.</li>
            <li><strong>Wrong background color</strong> — most of these specs call for a plain, light background; a busy or dark background is a common rejection reason.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I use the same photo for Aadhaar and PAN applications?</p>
              <p className="text-muted-foreground">The aspect ratios are close but not identical (3.5×4.5cm vs 2.5×3.5cm), so it&apos;s best to crop each one separately using its specific tool rather than reusing one crop for both.</p>
            </div>
            <div>
              <p className="font-semibold">Do these tools upload my photo to a server?</p>
              <p className="text-muted-foreground">No — every tool listed here crops and resizes entirely inside your browser using the Canvas API. Your photo is never uploaded anywhere.</p>
            </div>
            <div>
              <p className="font-semibold">My exam portal has a different KB limit than listed here — what do I do?</p>
              <p className="text-muted-foreground">Always follow the specific limit stated on your application form. The ranges here are common defaults, not universal rules — run the result through the Image Compressor if it&apos;s still above your form&apos;s stated cap.</p>
            </div>
            <div>
              <p className="font-semibold">Is a scanned signature accepted, or does it need to be handwritten digitally?</p>
              <p className="text-muted-foreground">A scanned or photographed signature on plain paper is standard and accepted by most forms — crop and resize it the same way as a digitally drawn one.</p>
            </div>
            <div>
              <p className="font-semibold">What if my photo doesn&apos;t meet the face-coverage guideline after cropping?</p>
              <p className="text-muted-foreground">Retake the photo standing a bit closer to the camera, then re-crop — cropping alone can&apos;t add detail the original photo didn&apos;t capture at the right distance.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Guides</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/blog/passport-photo-size-guide" className="text-primary hover:underline">Passport Photo Size Guide (35×45mm)</Link> — full detail on the passport specification.</li>
            <li><Link href="/blog/exam-photo-size-guide" className="text-primary hover:underline">Exam Application Photo Size Guide</Link> — full detail on exam portal requirements.</li>
            <li><Link href="/blog/signature-resizer-guide" className="text-primary hover:underline">Signature Resizer Guide</Link> — full detail on signature scan specs.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to prepare your document photo?</p>
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Browse All Document Photo Tools →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
