import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Make a Free QR Code Online (2026 Guide) — OpticShift Pro',
  description: 'Create a QR code for a link, Wi-Fi network, or contact card in seconds, free, with no sign-up or watermark. Learn what error correction means and how to choose it.',
  keywords: 'qr code generator, free qr code, wifi qr code, how to make a qr code, qr code maker online',
}

export default function QrCodeGuideArticle() {
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
            How to Make a Free QR Code Online — No Sign-Up, No Expiry
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate a scannable code for a link, Wi-Fi network, or contact card in seconds — and understand what &quot;error correction&quot; actually does before you pick a level.
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
            <li><a href="#what-is" className="hover:text-primary">What a QR code actually stores</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to make one, step by step</a></li>
            <li><a href="#error-correction" className="hover:text-primary">What error correction means, and which level to pick</a></li>
            <li><a href="#wifi" className="hover:text-primary">Making a Wi-Fi QR code that actually connects</a></li>
            <li><a href="#uses" className="hover:text-primary">Common uses</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            A QR code is a two-dimensional barcode — it stores data in both dimensions rather than
            just left to right like a traditional barcode, which is what lets it pack a URL, a full
            paragraph of text, or a Wi-Fi password into a small square that any phone camera can read
            instantly. Making one doesn&apos;t require a design tool or an account; it&apos;s a matter of
            picking what you want it to do and generating the pattern.
          </p>

          <h2 id="what-is" className="text-2xl font-bold mt-8">What a QR Code Actually Stores</h2>
          <p>
            The code itself doesn&apos;t connect to anything online after it&apos;s generated — it&apos;s a static
            image encoding whatever text you gave it, decoded locally by the scanning phone&apos;s camera.
            That means a QR code you generate today with no server involved will keep working
            indefinitely; there&apos;s no expiry date and no dependency on the tool that made it staying
            online.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Make One, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/qr-code-generator" className="text-primary underline underline-offset-2">QR Code Generator</Link>.</li>
            <li>Choose a type — URL, Text, Wi-Fi, or Contact — depending on what you want scanning it to do.</li>
            <li>Fill in the relevant fields; the code updates live as you type.</li>
            <li>Set an error correction level (Medium is a sensible default for most uses).</li>
            <li>Download as PNG for general use, or SVG if you plan to print it larger than a business card.</li>
          </ol>

          <h2 id="error-correction" className="text-2xl font-bold mt-8">What Error Correction Means, and Which Level to Pick</h2>
          <p>
            Error correction controls how much of the code&apos;s pattern can be damaged, dirty, or
            covered — by a logo, a fold, a scuff — while the code still scans correctly. A higher level
            rebuilds more of the missing data at scan time, at the cost of a visually denser pattern.
          </p>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>Low (≈7% recoverable):</strong> Fine for a code displayed cleanly on a screen, where nothing will obscure it.</p>
            <p><strong>Medium (≈15%):</strong> A sensible default for most everyday uses — printed flyers, digital sharing.</p>
            <p><strong>Quartile (≈25%):</strong> Better for codes that might get slightly scuffed, folded, or printed small.</p>
            <p><strong>High (≈30%):</strong> Use this if you&apos;re adding a logo to the center of the code, since that covered area needs to be reconstructed from the surrounding pattern.</p>
          </div>

          <h2 id="wifi" className="text-2xl font-bold mt-8">Making a Wi-Fi QR Code That Actually Connects</h2>
          <p>
            A Wi-Fi QR code encodes your network name and password together, so a phone camera can join
            the network automatically without anyone typing the password by hand — genuinely useful for
            guests, or for a small business posting a code near the counter. The most common failure
            cause is a typo in the network name or password when generating the code — since the code
            can&apos;t validate credentials, it just encodes exactly what you typed, so double-check both
            fields before generating.
          </p>

          <h2 id="uses" className="text-2xl font-bold mt-8">Common Uses</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Printed materials</strong> — flyers, posters, and business cards that link to a website without a long URL printed underneath.</li>
            <li><strong>Guest Wi-Fi access</strong> — a code guests scan to join instantly, no typing required.</li>
            <li><strong>Digital business cards</strong> — a contact code that saves your details directly into someone&apos;s phone.</li>
            <li><strong>Restaurant menus</strong> — a table tent pointing to a digital menu instead of a printed one.</li>
            <li><strong>Quick text transfer between devices</strong> — encode a short message or code to move it by scanning instead of retyping.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Do QR codes expire?</p>
              <p className="text-muted-foreground">No — a code generated this way is a static image. It doesn&apos;t depend on any server staying online and has no expiry date.</p>
            </div>
            <div>
              <p className="font-semibold">Is my data uploaded anywhere when I generate a code?</p>
              <p className="text-muted-foreground">No, the code is generated entirely in your browser. Nothing you type is sent to a server.</p>
            </div>
            <div>
              <p className="font-semibold">PNG or SVG — which should I download?</p>
              <p className="text-muted-foreground">PNG is fine for screens and most printing. SVG is vector-based and stays sharp at any size, which matters if you&apos;re printing the code larger than a few centimeters.</p>
            </div>
            <div>
              <p className="font-semibold">Can I add a logo to the middle of my QR code?</p>
              <p className="text-muted-foreground">Many scanners tolerate a small logo covering the center if you use a higher error correction level (Quartile or High), since that data gets reconstructed from the surrounding pattern.</p>
            </div>
            <div>
              <p className="font-semibold">My Wi-Fi QR code isn&apos;t connecting — why?</p>
              <p className="text-muted-foreground">Double-check the exact network name and password were typed correctly — the code only encodes what you entered, it can&apos;t validate the credentials itself.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/url-encoder" className="text-primary hover:underline">URL Encoder / Decoder</Link> — encode special characters in a URL before putting it into a QR code.</li>
            <li><Link href="/tools/slug-generator" className="text-primary hover:underline">Slug Generator</Link> — create a clean URL slug for a page you plan to link via QR code.</li>
            <li><Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> — generate a strong Wi-Fi password before encoding it into a Wi-Fi QR code.</li>
            <li><Link href="/tools/barcode-generator" className="text-primary hover:underline">Barcode Generator</Link> — for retail or inventory codes where scanning hardware expects a traditional barcode format instead.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to make your QR code?</p>
            <Link
              href="/tools/qr-code-generator"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try the QR Code Generator Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
