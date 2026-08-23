import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Make a Free Barcode Online (CODE128, EAN-13, UPC) — OpticShift Pro',
  description: 'Generate a scannable barcode in the right format for your use case — retail, inventory, or shipping — free, with no sign-up. Learn which format to pick and why.',
  keywords: 'barcode generator, free barcode generator, code128 barcode, ean13 barcode generator, upc barcode maker, how to make a barcode',
}

export default function BarcodeGuideArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Developer Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            How to Make a Free Barcode Online — And Which Format to Pick
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate a scannable barcode in seconds — the part that actually trips people up is picking the right format for the job, not the generating itself.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 6 min read</span>
            <span>•</span>
            <span>🏷 Developer Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#what-is" className="hover:text-primary">What a barcode encodes, and how it differs from a QR code</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to generate one, step by step</a></li>
            <li><a href="#formats" className="hover:text-primary">Which format to pick for your use case</a></li>
            <li><a href="#mistakes" className="hover:text-primary">Common mistakes that produce an unscannable barcode</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            A barcode encodes a short piece of data — typically a number or product code — as a
            pattern of parallel lines that a scanner reads in one direction. It&apos;s a much older
            format than a QR code, but it&apos;s still the standard for retail products, inventory
            tracking, and shipping labels, precisely because scanning hardware built for it is
            everywhere and the format itself is simple and reliable.
          </p>

          <h2 id="what-is" className="text-2xl font-bold mt-8">What a Barcode Encodes, and How It Differs From a QR Code</h2>
          <p>
            A traditional barcode reads left to right and typically holds a short numeric or
            alphanumeric code — a product ID, a batch number, a tracking code. A{' '}
            <Link href="/tools/qr-code-generator" className="text-primary underline underline-offset-2">QR code</Link>{' '}
            stores data across two dimensions instead of one, which lets it hold far more — a full
            URL or paragraph of text — in the same physical space. If you just need to encode a
            product SKU or inventory number for a scanner that expects a traditional barcode, a
            QR code isn&apos;t a substitute; retail and logistics hardware is usually built around
            reading one specific barcode format.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Generate One, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/barcode-generator" className="text-primary underline underline-offset-2">Barcode Generator</Link>.</li>
            <li>Choose the format that matches your use case (see the breakdown below).</li>
            <li>Type in the value you want encoded — the barcode updates live as you type.</li>
            <li>If the value doesn&apos;t fit the selected format&apos;s rules, an error tells you exactly why rather than producing a broken code silently.</li>
            <li>Download as PNG for general use, or SVG if you plan to print it at a larger size.</li>
          </ol>

          <h2 id="formats" className="text-2xl font-bold mt-8">Which Format to Pick for Your Use Case</h2>
          <div className="space-y-3">
            <div className="glass rounded-xl border p-4">
              <p className="font-semibold">CODE128 — general purpose</p>
              <p className="text-muted-foreground text-sm">Accepts nearly any letters, numbers, and symbols. The safest default when you&apos;re not encoding a retail product and just need a flexible, reliable code.</p>
            </div>
            <div className="glass rounded-xl border p-4">
              <p className="font-semibold">EAN-13 / UPC-A — retail products</p>
              <p className="text-muted-foreground text-sm">The standard format printed on packaged goods worldwide. Requires an exact digit count (12-13 for EAN-13, 11-12 for UPC-A) with a built-in checksum digit.</p>
            </div>
            <div className="glass rounded-xl border p-4">
              <p className="font-semibold">CODE39 — logistics and asset tags</p>
              <p className="text-muted-foreground text-sm">Common on internal inventory and equipment labels. Supports letters, numbers, and a limited set of symbols.</p>
            </div>
            <div className="glass rounded-xl border p-4">
              <p className="font-semibold">ITF-14 — shipping cartons</p>
              <p className="text-muted-foreground text-sm">Used specifically for carton-level shipping labels rather than individual products, requiring 13-14 digits.</p>
            </div>
            <div className="glass rounded-xl border p-4">
              <p className="font-semibold">MSI — warehouse shelf labels</p>
              <p className="text-muted-foreground text-sm">A numeric-only format still used in some warehouse and shelf-labeling systems.</p>
            </div>
          </div>

          <h2 id="mistakes" className="text-2xl font-bold mt-8">Common Mistakes That Produce an Unscannable Barcode</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Wrong digit count for EAN-13 or UPC</strong> — these formats validate against a specific length; a value that&apos;s too short or too long won&apos;t generate a valid code.</li>
            <li><strong>Printing too small</strong> — very narrow bars become unreliable to scan at low print resolution, especially with cheaper scanners.</li>
            <li><strong>Using letters in a numeric-only format</strong> — MSI and EAN-13/UPC-A only accept digits; CODE128 or CODE39 are needed for alphanumeric values.</li>
            <li><strong>Low contrast printing</strong> — a barcode printed in a light color, or on a textured/colored background, reduces scan reliability significantly.</li>
            <li><strong>Assuming any format works for retail</strong> — retail point-of-sale systems expect EAN-13 or UPC-A specifically, not CODE128 or CODE39.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Can I use a barcode I generate here for an actual retail product?</p>
              <p className="text-muted-foreground">The EAN-13/UPC-A codes follow the correct standard format, but official commercial retail use typically requires a registered code from GS1 or a similar body — check your specific retail platform&apos;s requirements before using a self-generated code commercially.</p>
            </div>
            <div>
              <p className="font-semibold">Is my data uploaded anywhere when I generate a barcode?</p>
              <p className="text-muted-foreground">No — the barcode is rendered entirely in your browser. Nothing you type is sent to a server.</p>
            </div>
            <div>
              <p className="font-semibold">Why did my EAN-13 value get rejected?</p>
              <p className="text-muted-foreground">EAN-13 requires exactly 12 or 13 digits, including a checksum digit. A different length, or any non-numeric character, will fail validation.</p>
            </div>
            <div>
              <p className="font-semibold">PNG or SVG — which should I download?</p>
              <p className="text-muted-foreground">PNG works fine for screens and most printing. SVG is vector-based and stays sharp at any size, which matters if you&apos;re printing the barcode larger than a small label.</p>
            </div>
            <div>
              <p className="font-semibold">Should I use a barcode or a QR code for my product?</p>
              <p className="text-muted-foreground">If your scanning hardware or point-of-sale system expects a specific barcode format (common in retail), use that format. QR codes are better suited when you need to encode more data, like a full URL.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/qr-code-generator" className="text-primary hover:underline">QR Code Generator</Link> — for encoding URLs, Wi-Fi credentials, or contact cards instead of a short numeric code.</li>
            <li><Link href="/tools/slug-generator" className="text-primary hover:underline">Slug Generator</Link> — create a clean identifier string before encoding it as a CODE128 barcode.</li>
            <li><Link href="/tools/character-counter" className="text-primary hover:underline">Character Counter</Link> — check your value&apos;s length before encoding it as EAN-13 or UPC-A.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to make your barcode?</p>
            <Link
              href="/tools/barcode-generator"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try the Barcode Generator Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
