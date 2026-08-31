import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '3 Money Calculators Everyone Should Bookmark (EMI, GST, Interest) — OpticShift Pro',
  description: 'Three everyday money questions — what will my loan EMI be, how much GST is really in this price, what will my savings grow to — answered with free calculators and real worked numbers.',
  keywords: 'emi calculator, gst calculator, interest calculator, loan calculator, money calculator, financial calculator free',
}

export default function MoneyCalculatorsArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Money & Calculators</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Three Money Questions Everyone Runs Into — Answered
          </h1>
          <p className="text-muted-foreground text-lg">
            You don&apos;t need a finance degree for these — you need the right formula and two minutes.
            Here&apos;s how to answer them with real numbers, plus a free calculator for each.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 7 min read</span>
            <span>•</span>
            <span>🏷 Money & Calculators</span>
          </div>
        </div>

        <hr className="border-border" />

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-base leading-relaxed">

          {/* Scenario 1 — EMI */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">&quot;What will my loan EMI actually be?&quot;</h2>
            <p>
              Say a bank offers a ₹25,00,000 home loan at 8.5% annual interest over 20 years. The
              number on the sanction letter is the loan amount — what you actually pay every month
              is a different figure, and it&apos;s not simply the loan divided by the number of months.
            </p>
            <p>
              Loans use a reducing-balance formula, where interest is recalculated each month on
              whatever principal is still outstanding. Worked out for this example: the monthly EMI
              comes to roughly <strong>₹21,700</strong>, and over 20 years that adds up to about{' '}
              <strong>₹27.1 lakh in interest alone</strong> — more than the loan amount itself. That&apos;s
              the part a lot of people don&apos;t fully register until they see it laid out.
            </p>
            <p>
              The two levers that move this number the most are the interest rate and the tenure.
              Dropping the tenure to 15 years on the same loan pushes the EMI up to around ₹24,600 —
              but cuts total interest paid down to about ₹19.3 lakh. Worth running both scenarios
              before deciding.
            </p>
            <div className="glass rounded-xl border p-4">
              <Link href="/tools/emi-calculator" className="text-primary underline underline-offset-2 font-medium">
                Run your own numbers on the EMI Calculator →
              </Link>
            </div>
          </section>

          {/* Scenario 2 — GST */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">&quot;How much of this price is actually GST?&quot;</h2>
            <p>
              A freelance invoice or a shop receipt often just shows one final number — say ₹11,800
              for a service billed at 18% GST. It&apos;s tempting to assume the tax portion is 18% of
              ₹11,800, but that&apos;s not right, because the 18% was applied to the base price, not the
              final one.
            </p>
            <p>
              Working backward correctly: base price = final ÷ 1.18, which comes to{' '}
              <strong>₹10,000</strong> — meaning exactly <strong>₹1,800</strong> was GST, split as ₹900
              CGST and ₹900 SGST if it&apos;s an intra-state transaction. Subtracting 18% of ₹11,800
              directly would have given a wrong answer (₹2,124 instead of ₹1,800).
            </p>
            <p>
              The reverse direction matters just as often — if you&apos;re quoting a client ₹10,000 for
              work and need to know what to actually invoice at 18% GST, the final billed amount is
              ₹11,800, not ₹10,000 + a rough add-on.
            </p>
            <div className="glass rounded-xl border p-4">
              <Link href="/tools/gst-calculator" className="text-primary underline underline-offset-2 font-medium">
                Add or remove GST from any amount →
              </Link>
            </div>
          </section>

          {/* Scenario 3 — Interest */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">&quot;What will my savings actually grow to?&quot;</h2>
            <p>
              Put ₹1,00,000 into a fixed deposit at 7% for 5 years, and the difference between simple
              and compound interest is bigger than it sounds. Simple interest — calculated only on
              the original ₹1,00,000 every year — gives exactly <strong>₹35,000</strong> in interest
              over 5 years, for a final amount of ₹1,35,000.
            </p>
            <p>
              Compound interest, calculated quarterly (common for many deposit products), instead
              gives roughly <strong>₹41,000</strong> in interest — because each quarter&apos;s interest gets
              added to the principal before the next quarter&apos;s interest is calculated. Same rate, same
              amount, same time period — a real difference of about ₹6,000 just from how the interest
              compounds.
            </p>
            <p>
              This gap widens the longer the money sits and the more frequently it compounds — monthly
              compounding edges out quarterly, which edges out annual, all at the identical stated
              rate.
            </p>
            <div className="glass rounded-xl border p-4">
              <Link href="/tools/interest-calculator" className="text-primary underline underline-offset-2 font-medium">
                Compare simple vs. compound on your own numbers →
              </Link>
            </div>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold">A quick note</h2>
            <p className="text-muted-foreground text-sm">
              These calculators give estimates based on standard formulas. Actual EMI can vary by a
              lender&apos;s processing fees and exact disbursement terms, and applicable GST rates depend
              on the specific goods or service category — always confirm the final figures with your
              bank, accountant, or the relevant official source before relying on them for a real
              decision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold">More Calculators</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link href="/tools/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link> — discounts, increases, and reverse-percentage math.</li>
              <li><Link href="/tools/invoice-generator" className="text-primary hover:underline">Invoice Generator</Link> — turn a GST calculation straight into a downloadable invoice.</li>
              <li><Link href="/tools/unit-converter" className="text-primary hover:underline">Unit Converter</Link> — length, weight, and other everyday conversions.</li>
            </ul>
          </section>

        </div>
      </div>
    </article>
  )
}
