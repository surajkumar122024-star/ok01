import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Calculate Percentages (Discounts, Increases & More) — OpticShift Pro',
  description: 'A quick reference for the percentage formulas people actually search for — discounts, percentage increase/decrease, and "X is what percent of Y" — with a free calculator.',
  keywords: 'percentage calculator, how to calculate percentage, percentage increase formula, percentage decrease formula, discount calculator, what percent of',
}

export default function PercentageCalculatorGuideArticle() {
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
            How to Calculate Percentages — Without Mixing Up the Formula
          </h1>
          <p className="text-muted-foreground text-lg">
            Four common percentage questions, the formula behind each one, and a free calculator so you never have to remember which number goes where.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 5 min read</span>
            <span>•</span>
            <span>🏷 Developer Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#basic" className="hover:text-primary">Finding X% of a number</a></li>
            <li><a href="#reverse" className="hover:text-primary">Finding what percent one number is of another</a></li>
            <li><a href="#change" className="hover:text-primary">Percentage increase and decrease</a></li>
            <li><a href="#discount" className="hover:text-primary">Discounts, tips, and adding tax</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Percentage math is simple once you know which formula applies — the tricky part is that
            four fairly different everyday questions all get called &quot;percentage calculations,&quot; and
            each one uses the numbers in a different order. Here&apos;s a quick reference for each, plus a{' '}
            <Link href="/tools/percentage-calculator" className="text-primary underline underline-offset-2">free calculator</Link>{' '}
            that handles all four without needing to remember the formula.
          </p>

          <h2 id="basic" className="text-2xl font-bold mt-8">Finding X% of a Number</h2>
          <p>
            This is the most common case — &quot;what is 15% of 200?&quot; The formula is:
          </p>
          <div className="glass rounded-xl border p-4 font-mono text-sm">
            (percent ÷ 100) × value = result
          </div>
          <p>
            For 15% of 200: (15 ÷ 100) × 200 = 30.
          </p>

          <h2 id="reverse" className="text-2xl font-bold mt-8">Finding What Percent One Number Is of Another</h2>
          <p>
            This is the reverse question — &quot;30 is what percent of 200?&quot; Common for test scores,
            survey results, or figuring out what share something represents.
          </p>
          <div className="glass rounded-xl border p-4 font-mono text-sm">
            (part ÷ whole) × 100 = percent
          </div>
          <p>
            For 30 out of 200: (30 ÷ 200) × 100 = 15%.
          </p>

          <h2 id="change" className="text-2xl font-bold mt-8">Percentage Increase and Decrease</h2>
          <p>
            This measures how much something changed relative to where it started — a salary,
            a stock price, a weight, a business metric.
          </p>
          <div className="glass rounded-xl border p-4 font-mono text-sm">
            ((new − old) ÷ old) × 100 = % change
          </div>
          <p>
            Going from 80 to 100: ((100 − 80) ÷ 80) × 100 = 25% increase. Note the change is always
            measured against the starting value — going from 50 to 100 is a 100% increase, not 50%,
            because 100 is double the original 50.
          </p>

          <h2 id="discount" className="text-2xl font-bold mt-8">Discounts, Tips, and Adding Tax</h2>
          <p>
            To find a final price after a discount, or a total after adding a tip or tax, calculate
            the percentage amount first, then add or subtract it from the original value:
          </p>
          <div className="glass rounded-xl border p-4 font-mono text-sm space-y-1">
            <p>Discount: value − (value × percent ÷ 100) = final price</p>
            <p>Adding tax/tip: value + (value × percent ÷ 100) = final total</p>
          </div>
          <p>
            For a ₹500 item with a 20% discount: 500 − (500 × 20 ÷ 100) = ₹400.
          </p>

          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Skip the manual math</p>
            <Link
              href="/tools/percentage-calculator"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try the Percentage Calculator Free →
            </Link>
          </div>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Why is going from 50 to 100 a 100% increase, not 50%?</p>
              <p className="text-muted-foreground">Percentage change is measured relative to the starting value. Since 100 is exactly double 50, that&apos;s a 100% increase over the original amount, not a flat 50-point difference expressed as a percent.</p>
            </div>
            <div>
              <p className="font-semibold">What&apos;s the fastest way to calculate a discount?</p>
              <p className="text-muted-foreground">Multiply the price by the discount percent, divide by 100, then subtract that from the original price — or use the Add/Subtract mode on the calculator to skip the manual steps.</p>
            </div>
            <div>
              <p className="font-semibold">How do I calculate a percentage decrease?</p>
              <p className="text-muted-foreground">Same formula as an increase — ((new − old) ÷ old) × 100 — the result comes out negative when the new value is lower, which represents the decrease.</p>
            </div>
            <div>
              <p className="font-semibold">Can percentages be negative?</p>
              <p className="text-muted-foreground">Yes — a negative percentage in a change calculation simply means a decrease rather than an increase.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/unit-converter" className="text-primary hover:underline">Unit Converter</Link> — for length, weight, temperature, and other unit conversions.</li>
            <li><Link href="/tools/word-counter" className="text-primary hover:underline">Word Counter</Link> — count words and characters instantly.</li>
          </ul>

        </div>
      </div>
    </article>
  )
}
