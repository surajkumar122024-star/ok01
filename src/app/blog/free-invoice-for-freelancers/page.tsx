import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Freelancers Can Send a Professional Invoice Without Buying Software — OpticShift Pro',
  description: 'You finished the work — now you need to get paid. Here is how to put together a proper invoice in a few minutes, free, without signing up for invoicing software.',
  keywords: 'free invoice generator, freelance invoice, invoice for freelancers, create invoice online free, invoice template no sign up',
}

export default function InvoiceForFreelancersArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Freelancing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            You Finished the Project. Now You Need an Invoice.
          </h1>
          <p className="text-muted-foreground text-lg">
            Most freelance work doesn&apos;t need dedicated invoicing software — it needs one clean PDF
            with the right numbers on it.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 5 min read</span>
            <span>•</span>
            <span>🏷 Freelancing</span>
          </div>
        </div>

        <hr className="border-border" />

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            The work is done, the client is happy, and now there&apos;s one more step before payment
            actually arrives: sending something they can pay against. A text message with a number in
            it usually isn&apos;t enough — most clients, especially businesses, expect an actual invoice
            with a number, a date, and an itemized breakdown.
          </p>

          <p>
            For a single project or an occasional client, signing up for invoicing software just to
            produce one PDF is overkill — a free account, a template to pick, fields to fill in a
            dashboard, and often a &quot;upgrade to remove watermark&quot; wall right when you&apos;re about to
            download. What actually gets the job done is simpler: a form with the right fields, and a
            PDF at the end.
          </p>

          <h2 className="text-2xl font-bold mt-8">What a Client Actually Expects to See</h2>
          <p>Most invoices, regardless of industry, share the same core structure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>An invoice number and date — clients (and accountants) reference these, so a consistent numbering habit helps if you invoice the same client more than once.</li>
            <li>Who it&apos;s from and who it&apos;s billed to — your name or business, and the client&apos;s.</li>
            <li>A line-item breakdown — what was done or delivered, at what rate, rather than one lump total. This is what clients actually check against the original quote.</li>
            <li>A total, with tax broken out separately if applicable — not folded silently into the final number.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Putting One Together</h2>
          <p>
            The <Link href="/tools/invoice-generator" className="text-primary underline underline-offset-2">Invoice Generator</Link>{' '}
            covers exactly that structure — invoice number and date, your details and the client&apos;s,
            as many line items as the project needs, an optional tax percentage, and a notes field for
            payment instructions or a thank-you line. Every field updates the total live, so the final
            number is visible before generating anything.
          </p>
          <p>
            When it&apos;s ready, it downloads as a finished PDF — no watermark, no account, and nothing
            about the invoice sent to a server in the process, since the whole thing is generated
            directly in the browser.
          </p>

          <div className="glass rounded-xl border p-6 space-y-2">
            <p className="font-semibold">If you&apos;re billing with GST</p>
            <p className="text-muted-foreground text-sm">
              Work out the tax-inclusive total first with the{' '}
              <Link href="/tools/gst-calculator" className="text-primary underline underline-offset-2">GST Calculator</Link>{' '}
              , then carry that rate straight into the invoice&apos;s tax field.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8">A Few Things Worth Getting Right</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Keep a consistent numbering pattern</strong> — even something simple like INV-001, INV-002 makes it easy for you and the client to reference a specific invoice later.</li>
            <li><strong>Itemize instead of lumping</strong> — a single line item labeled &quot;Project work&quot; invites more questions than three lines showing what was actually billed.</li>
            <li><strong>Double-check before downloading</strong> — the PDF generates fresh from whatever is in the form; there&apos;s no saved draft to go back and edit afterward.</li>
            <li><strong>Add payment details in the notes field</strong> — a client can&apos;t pay an invoice that doesn&apos;t say how.</li>
          </ul>

          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to send your invoice?</p>
            <Link
              href="/tools/invoice-generator"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Create an Invoice Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
