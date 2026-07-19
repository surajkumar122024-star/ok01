import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Convert PDF Pages to Images (PNG) — Free & Private (2026 Guide) — OpticShift Pro',
  description: 'Convert every page of a PDF into a high-quality PNG image, free and entirely in your browser. Step-by-step guide, resolution tips, and answers to common questions.',
  keywords: 'convert pdf to image, pdf to png, pdf to jpg, extract pdf pages as images, free pdf converter',
}

export default function PdfToImageArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>PDF Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            How to Convert PDF Pages to Images
          </h1>
          <p className="text-muted-foreground text-lg">
            Turn any PDF page into a sharable, editable PNG image — free, private, and without installing anything.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 Updated July 2026</span>
            <span>•</span>
            <span>⏱ 7 min read</span>
            <span>•</span>
            <span>🏷 PDF Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#why" className="hover:text-primary">Why convert PDF pages to images?</a></li>
            <li><a href="#why-png" className="hover:text-primary">Why this tool outputs PNG</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to convert, step by step</a></li>
            <li><a href="#resolution" className="hover:text-primary">Getting the right resolution for your use</a></li>
            <li><a href="#other-methods" className="hover:text-primary">Other ways to convert (and their trade-offs)</a></li>
            <li><a href="#use-cases" className="hover:text-primary">Common use cases</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Need to pull a page out of a PDF as an actual image? Whether you want to share a single
            page on social media, embed a slide into a blog post, or edit specific content in a photo
            editor, converting a PDF page to an image is the practical fix — and it doesn't require
            Adobe Acrobat or a paid subscription to do it.
          </p>

          <h2 id="why" className="text-2xl font-bold mt-8">Why Convert PDF Pages to Images?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Share an individual PDF page on social media or a messaging app that doesn't support PDF previews.</li>
            <li>Embed a specific PDF slide or page directly into a website or blog post.</li>
            <li>Preview or reference document content without needing a PDF reader installed.</li>
            <li>Bring PDF content into an image editor for annotation or further editing.</li>
            <li>Create a permanent, unchangeable visual snapshot of a document's exact current state.</li>
          </ul>

          <h2 id="why-png" className="text-2xl font-bold mt-8">Why This Tool Outputs PNG</h2>
          <p>
            OpticShift Pro's PDF to Image tool exports every page as a <strong>PNG</strong>, and that's
            a deliberate choice rather than a limitation. PDF pages frequently contain sharp text, thin
            lines, and clean vector graphics — exactly the kind of content that PNG's lossless
            compression preserves perfectly, while JPG's lossy compression can introduce visible
            blurring or artifacts around fine text edges. If you specifically need a smaller JPG
            afterward, you can run the exported PNG through the{' '}
            <Link href="/tools/png-to-jpg" className="text-primary underline underline-offset-2">PNG to JPG</Link>{' '}
            converter as a quick second step.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Convert PDF Pages to Images, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/pdf-to-image" className="text-primary underline underline-offset-2">PDF to Image</Link> tool. No installation or account needed.</li>
            <li>Upload your PDF file — the tool works with both text-based and scanned PDFs.</li>
            <li>Wait a moment while each page renders as a thumbnail preview.</li>
            <li>Select the specific pages you need, or all of them.</li>
            <li>Download your chosen pages as individual PNG image files.</li>
          </ol>
          <p>
            Everything happens locally in your browser using a PDF-rendering library — your document is
            never uploaded to a server, which matters if the PDF contains anything sensitive.
          </p>

          <h2 id="resolution" className="text-2xl font-bold mt-8">Getting the Right Resolution for Your Use</h2>
          <p>
            Resolution matters more than people expect when converting a PDF page. A page rendered at a
            resolution suited for on-screen viewing will look fine in a chat message or embedded in a
            web page, but the same file can look noticeably soft if printed at a larger size. As a
            general reference: content meant purely for screen viewing needs less resolution than
            anything you plan to print, where a higher-resolution export keeps fine text and detail crisp.
          </p>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Screen viewing / chat sharing:</strong> standard resolution is usually sufficient</p>
            <p><strong>Embedding in a web page:</strong> match roughly to the display size you'll actually use</p>
            <p><strong>Printing at document size:</strong> higher resolution preserves crisp text</p>
            <p><strong>Zooming in to read fine print:</strong> higher resolution avoids blurry, pixelated text</p>
          </div>
          <p>
            If a PDF page contains both dense text and an embedded photo, exporting at a higher
            resolution keeps the text legible without needing to zoom in — worth doing if you're
            planning to read the exported image closely rather than just glance at it.
          </p>

          <h2 id="other-methods" className="text-2xl font-bold mt-8">Other Ways to Convert (and Their Trade-Offs)</h2>
          <p>
            A browser-based tool like this one is the fastest, free, no-install option, but it's worth
            knowing the alternatives and where they fall short in comparison:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Adobe Acrobat</strong> (File → Export To → Image) works well but requires a paid subscription for full export functionality.</li>
            <li><strong>Taking a screenshot</strong> of a PDF viewed on-screen is fast for a one-off page, but produces lower resolution results that look soft when printed or zoomed in.</li>
            <li><strong>macOS Preview</strong> (File → Export, choosing an image format) is a solid free built-in option specifically for Mac users, with adjustable DPI.</li>
          </ul>
          <p>
            A browser-based converter avoids the trade-offs of all three — no subscription, no
            resolution loss from screenshotting, and no platform lock-in to macOS specifically.
          </p>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sharing a single contract page or diagram without sending the whole document.</li>
            <li>Embedding a report chart or slide directly into a blog post or presentation.</li>
            <li>Creating a visual archive of a document's exact state, including any filled-in form fields.</li>
            <li>Extracting scanned document pages for further editing in a photo tool.</li>
            <li>Quickly previewing PDF content on a device without a PDF reader app installed.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">What image format does this tool export to?</p>
              <p className="text-muted-foreground">PNG — chosen specifically because it preserves sharp text and fine detail without the compression artifacts JPG can introduce around edges.</p>
            </div>
            <div>
              <p className="font-semibold">Can I get a JPG instead of PNG?</p>
              <p className="text-muted-foreground">Not directly from this tool, but you can convert the exported PNG to JPG afterward using the PNG to JPG converter if a smaller file size matters more than lossless text quality.</p>
            </div>
            <div>
              <p className="font-semibold">Will each PDF page become one image?</p>
              <p className="text-muted-foreground">Yes, every page in the PDF is rendered as its own separate PNG image, matching the page's original layout.</p>
            </div>
            <div>
              <p className="font-semibold">Does this work with scanned PDFs?</p>
              <p className="text-muted-foreground">Yes — since the tool renders the visual page rather than extracting text, scanned documents convert the same way as text-based PDFs.</p>
            </div>
            <div>
              <p className="font-semibold">Is there a limit to how many pages I can convert?</p>
              <p className="text-muted-foreground">There's no fixed limit, though very long documents take longer to render since processing happens entirely in your browser.</p>
            </div>
            <div>
              <p className="font-semibold">Is my PDF uploaded to a server?</p>
              <p className="text-muted-foreground">No, rendering happens entirely in your browser using a local PDF-parsing library — your document is never transmitted anywhere.</p>
            </div>
            <div>
              <p className="font-semibold">Why does PNG make more sense than JPG for PDF pages?</p>
              <p className="text-muted-foreground">Most PDF pages contain sharp text and vector graphics, which PNG's lossless compression preserves cleanly; JPG's lossy compression can introduce visible blurring around fine text edges.</p>
            </div>
            <div>
              <p className="font-semibold">Can I convert a password-protected PDF?</p>
              <p className="text-muted-foreground">Password-protected PDFs generally need to be unlocked first before their pages can be rendered, since the encryption prevents reading the page content directly.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
          <p>
            Converting a PDF page to an image doesn't need to involve a paid subscription or a lossy
            screenshot. Exporting directly to PNG keeps text and detail sharp, and if you need a
            smaller file afterward, converting to JPG is one quick extra step rather than a trade-off
            you have to accept upfront.
          </p>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link> — go the other direction, combining images into a PDF.</li>
            <li><Link href="/tools/png-to-jpg" className="text-primary hover:underline">PNG to JPG</Link> — shrink an exported page into a smaller JPG file.</li>
            <li><Link href="/tools/pdf-split" className="text-primary hover:underline">PDF Split</Link> — extract specific pages as a smaller PDF instead of images.</li>
            <li><Link href="/tools/pdf-merge" className="text-primary hover:underline">PDF Merge</Link> — combine multiple PDFs before extracting pages.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to convert your PDF pages?</p>
            <Link
              href="/tools/pdf-to-image"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try PDF to Image Converter Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
