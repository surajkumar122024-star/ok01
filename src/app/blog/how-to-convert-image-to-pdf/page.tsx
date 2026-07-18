import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Convert Images to PDF Online — Free & Private (2026 Guide) — OpticShift Pro',
  description: 'Combine JPG, PNG, or WebP images into a single PDF for free, right in your browser. Step-by-step guide, format tips, and answers to common questions about image-to-PDF conversion.',
  keywords: 'convert image to pdf, jpg to pdf, png to pdf, combine images into pdf, free image to pdf converter',
}

export default function ImageToPdfArticle() {
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
            How to Convert Images to PDF Online — Free & Private
          </h1>
          <p className="text-muted-foreground text-lg">
            Combine scanned pages, photos, or screenshots into a single, properly ordered PDF — without installing anything or uploading your files anywhere.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 Updated July 2026</span>
            <span>•</span>
            <span>⏱ 8 min read</span>
            <span>•</span>
            <span>🏷 PDF Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#why" className="hover:text-primary">Why convert images to PDF?</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to convert, step by step</a></li>
            <li><a href="#formats" className="hover:text-primary">Best image formats for PDF conversion</a></li>
            <li><a href="#page-behavior" className="hover:text-primary">How mixed orientations behave in the PDF</a></li>
            <li><a href="#scanning-tips" className="hover:text-primary">Getting clean results from a phone "scan"</a></li>
            <li><a href="#privacy" className="hover:text-primary">Is it safe to convert images to PDF online?</a></li>
            <li><a href="#use-cases" className="hover:text-primary">Common use cases</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Need to combine multiple images into a single PDF file? Whether you're scanning documents
            with your phone camera, compiling a photo portfolio, or submitting an assignment, this
            comes up constantly — and it doesn't require a scanner, a dedicated app, or uploading your
            photos to a random website. It runs entirely in your browser.
          </p>

          <h2 id="why" className="text-2xl font-bold mt-8">Why Convert Images to PDF?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Universal format</strong> — a PDF opens the same way on every device and operating system, unlike loose image files that some apps handle inconsistently.</li>
            <li><strong>Combine multiple images into one file</strong> — instead of sending five separate JPGs, a recipient gets one organized document.</li>
            <li><strong>Professional presentation</strong> — PDFs look cleaner for sharing, printing, or submitting to a formal process like a job application.</li>
            <li><strong>Easier to manage</strong> — one PDF is simpler to attach, name, and archive than a scattered folder of individual photos.</li>
          </ul>
          <p>
            The difference becomes obvious the moment someone has to actually use what you sent them.
            Five loose JPG attachments in an email arrive in an unpredictable order, can get separated
            if forwarded, and give no sense of how they relate to each other. A single PDF preserves
            your intended page order, travels as one attachment, and reads like an actual document
            rather than a scattered photo dump — which matters more than it seems the moment a hiring
            manager or reviewer is the one opening it.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Convert Images to PDF, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/image-to-pdf" className="text-primary underline underline-offset-2">Image to PDF</Link> tool. No login required.</li>
            <li>Click the upload area or drag and drop your JPG, PNG, or WebP images — add as many as you need in one go.</li>
            <li>Arrange the thumbnails in the exact order you want the final PDF pages to appear.</li>
            <li>Remove any image you added by mistake before converting.</li>
            <li>Click <strong>Convert to PDF</strong>, then download the finished multi-page document.</li>
          </ol>
          <p>
            Each image becomes its own page in the resulting PDF, sized to fit the page while
            preserving the original aspect ratio — nothing gets stretched or distorted in the process.
          </p>

          <h2 id="formats" className="text-2xl font-bold mt-8">Best Image Formats for PDF Conversion</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>JPG/JPEG</strong> — best for photos; produces the smallest resulting PDF file size for photographic content.</li>
            <li><strong>PNG</strong> — best for screenshots, scanned text documents, or graphics that need sharp edges and no compression artifacts.</li>
            <li><strong>WebP</strong> — a modern format offering an excellent quality-to-size ratio if your source images are already in WebP.</li>
          </ul>
          <p>
            Mixing formats in the same batch is fine — you might combine a few JPG photos with a PNG
            screenshot in one PDF, and each page converts correctly regardless of its original format.
            If you need to switch a source image's format first, the{' '}
            <Link href="/tools/jpg-to-png" className="text-primary underline underline-offset-2">JPG to PNG</Link>{' '}
            and{' '}
            <Link href="/tools/webp-converter" className="text-primary underline underline-offset-2">WebP Converter</Link>{' '}
            tools handle that conversion before you build your PDF.
          </p>

          <h2 id="page-behavior" className="text-2xl font-bold mt-8">How Mixed Orientations Behave in the PDF</h2>
          <p>
            If you're combining a batch of photos where some are portrait and some are landscape,
            expect the resulting PDF pages to vary in shape to match — this is normal and matches how
            most PDF viewers and printers handle mixed-orientation documents. If you'd prefer every
            page to look uniform, rotate any sideways photos first using the{' '}
            <Link href="/tools/image-rotate" className="text-primary underline underline-offset-2">Image Rotate &amp; Flip</Link>{' '}
            tool before uploading them here.
          </p>

          <h2 id="privacy" className="text-2xl font-bold mt-8">Is It Safe to Convert Images to PDF Online?</h2>
          <p>
            With most online tools, your images are uploaded to a remote server for processing — which
            means your private photos exist, even briefly, on infrastructure you can't see. OpticShift
            Pro works differently: the entire PDF is assembled locally using a JavaScript library
            running in your browser. Your images never leave your device at any point, which matters
            if you're converting anything from a scanned ID to a confidential business document.
          </p>

          <h2 id="scanning-tips" className="text-2xl font-bold mt-8">Getting Clean Results When "Scanning" With Your Phone Camera</h2>
          <p>
            Most people building a PDF from images today are actually photographing paper documents
            with a phone rather than using a dedicated scanner, and the quality of that source photo
            has a real effect on how professional the final PDF looks. A few habits make a noticeable
            difference: shoot straight-on rather than at an angle to avoid distorted, trapezoid-shaped
            pages; use even, bright lighting to avoid a harsh shadow across part of the document; and
            fill the frame with the page itself rather than leaving a lot of background table or desk
            visible around the edges.
          </p>
          <p>
            If a photographed page comes out sideways, straighten it with the{' '}
            <Link href="/tools/image-rotate" className="text-primary underline underline-offset-2">Image Rotate &amp; Flip</Link>{' '}
            tool before adding it to your PDF batch — it's much faster to fix orientation per-photo
            beforehand than to regenerate the whole document afterward.
          </p>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Converting scanned documents (photographed with your phone) into a PDF for email or upload.</li>
            <li>Creating a PDF portfolio from a set of design or photography samples.</li>
            <li>Submitting assignments, forms, or applications that specifically require PDF format.</li>
            <li>Turning a series of WhatsApp or camera roll images into one organized multi-page PDF.</li>
            <li>Combining photographed receipts or invoices into a single PDF for expense reporting.</li>
            <li>Compiling meeting handouts or whiteboard photos into a shareable document.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I combine JPG and PNG images in the same PDF?</p>
              <p className="text-muted-foreground">Yes, you can mix formats freely — each image is placed on its own PDF page regardless of its original file type.</p>
            </div>
            <div>
              <p className="font-semibold">Is there a limit on how many images I can add?</p>
              <p className="text-muted-foreground">There's no hard-coded limit, though very large batches of high-resolution images take longer to process since everything runs in your browser.</p>
            </div>
            <div>
              <p className="font-semibold">Will my images be compressed in the PDF?</p>
              <p className="text-muted-foreground">Images are placed at a size that fits the page while preserving their aspect ratio, without deliberately re-compressing them beyond what PDF embedding requires.</p>
            </div>
            <div>
              <p className="font-semibold">Can I reorder images after uploading them?</p>
              <p className="text-muted-foreground">Yes, drag the thumbnails into the order you want before clicking Convert — the final PDF follows that exact sequence.</p>
            </div>
            <div>
              <p className="font-semibold">Is this tool free to use?</p>
              <p className="text-muted-foreground">Yes, completely free with no login, no file size limits, and no watermarks added to your PDF.</p>
            </div>
            <div>
              <p className="font-semibold">Does it work on mobile devices?</p>
              <p className="text-muted-foreground">Yes, the tool is fully responsive and works in any modern mobile browser on Android or iOS.</p>
            </div>
            <div>
              <p className="font-semibold">My photographed document looks slanted — will that carry into the PDF?</p>
              <p className="text-muted-foreground">Yes, this tool doesn't auto-straighten a photo, so shooting straight-on with good lighting before uploading gives the cleanest results, especially for text-heavy scanned pages.</p>
            </div>
            <div>
              <p className="font-semibold">Can I add a cover page or blank page?</p>
              <p className="text-muted-foreground">This tool converts your uploaded images directly into pages; adding a separate blank cover page isn't currently supported.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
          <p>
            Turning a handful of scattered photos into one clean, properly ordered PDF is a five-step
            process that takes less time than opening a separate PDF editor would. Since everything
            runs locally in your browser, it's just as suited to a confidential document scan as it is
            to a quick portfolio compilation.
          </p>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/pdf-merge" className="text-primary hover:underline">PDF Merge</Link> — combine multiple existing PDFs into one document.</li>
            <li><Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link> — go the other direction, converting PDF pages back to images.</li>
            <li><Link href="/tools/image-rotate" className="text-primary hover:underline">Image Rotate &amp; Flip</Link> — fix sideways photos before combining them into a PDF.</li>
            <li><Link href="/tools/compressor" className="text-primary hover:underline">Image Compressor</Link> — shrink oversized source photos before converting for a smaller final PDF.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to combine your images into a PDF?</p>
            <Link
              href="/tools/image-to-pdf"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Image to PDF Converter Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
