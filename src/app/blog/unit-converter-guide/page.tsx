import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unit Converter Guide: Convert Length, Weight, Temperature & More (2026) — OpticShift Pro',
  description: 'A complete guide to converting length, weight, temperature, area, volume, speed, data storage, and time online — free, instant, and accurate to international standards.',
  keywords: 'unit converter, metric to imperial converter, convert miles to km, convert kg to lbs, temperature converter',
}

export default function UnitConverterArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Utility Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Unit Converter Guide: Convert Length, Weight, Temperature & More
          </h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to convert between metric and imperial units accurately — with the exact formulas and common conversions people actually search for.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 July 2026</span>
            <span>•</span>
            <span>⏱ 8 min read</span>
            <span>•</span>
            <span>🏷 Utility Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Table of Contents */}
        <nav className="glass rounded-xl border p-6 space-y-2 text-sm">
          <p className="font-semibold mb-2">In this guide</p>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            <li><a href="#why" className="hover:text-primary">Why unit conversion still trips people up</a></li>
            <li><a href="#categories" className="hover:text-primary">The 8 categories this tool covers</a></li>
            <li><a href="#common-conversions" className="hover:text-primary">Common conversions people search for</a></li>
            <li><a href="#temperature" className="hover:text-primary">Temperature: the trickiest conversion</a></li>
            <li><a href="#how-to" className="hover:text-primary">How to use the tool, step by step</a></li>
            <li><a href="#accuracy" className="hover:text-primary">How accurate are these conversions?</a></li>
            <li><a href="#use-cases" className="hover:text-primary">Common use cases</a></li>
            <li><a href="#faq" className="hover:text-primary">Frequently asked questions</a></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Only three countries in the world haven't officially adopted the metric system as their
            primary measurement standard — which means the rest of us regularly bump into recipes
            written in cups when our scale reads grams, a US shoe size chart listed in inches, or a
            car's speedometer in km/h when we're used to thinking in mph. Converting between systems
            shouldn't require memorizing formulas or doing mental math under pressure.
          </p>

          <h2 id="why" className="text-2xl font-bold mt-8">Why Unit Conversion Still Trips People Up</h2>
          <p>
            The core difficulty isn't the math itself — it's that most people don't do these
            conversions often enough to memorize the conversion factors, and getting them wrong isn't
            always obvious. Miscalculating a recipe's grams-to-cups conversion might just mean a
            slightly off dessert, but getting a medication dosage, a shipping weight limit, or an
            engineering measurement wrong has real consequences. A calculator built specifically for
            unit conversion removes the guesswork and the risk of a manual math error.
          </p>

          <h2 id="categories" className="text-2xl font-bold mt-8">The 8 Categories This Tool Covers</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Length</strong> — meters, kilometers, miles, feet, inches, yards, centimeters, millimeters</li>
            <li><strong>Weight</strong> — kilograms, grams, pounds, ounces, milligrams, metric tons</li>
            <li><strong>Temperature</strong> — Celsius, Fahrenheit, Kelvin</li>
            <li><strong>Area</strong> — square meters, square feet, acres, hectares, square miles, square kilometers</li>
            <li><strong>Volume</strong> — liters, milliliters, gallons, quarts, cups, fluid ounces</li>
            <li><strong>Speed</strong> — km/h, mph, m/s, knots</li>
            <li><strong>Data storage</strong> — bytes, kilobytes, megabytes, gigabytes, terabytes</li>
            <li><strong>Time</strong> — seconds, minutes, hours, days, weeks</li>
          </ul>

          <h2 id="common-conversions" className="text-2xl font-bold mt-8">Common Conversions People Search For</h2>
          <div className="glass rounded-xl border p-6 space-y-2 text-sm">
            <p><strong>1 mile</strong> = 1.60934 kilometers</p>
            <p><strong>1 kilogram</strong> = 2.20462 pounds</p>
            <p><strong>1 inch</strong> = 2.54 centimeters (exactly)</p>
            <p><strong>1 gallon (US)</strong> = 3.78541 liters</p>
            <p><strong>100°F</strong> = 37.8°C</p>
            <p><strong>1 GB</strong> = 1024 MB (binary) or 1000 MB (decimal, as some manufacturers use)</p>
          </div>

          <h2 id="temperature" className="text-2xl font-bold mt-8">Temperature: The Trickiest Conversion</h2>
          <p>
            Unlike length or weight, temperature scales don't share a common zero point, which is why
            you can't just multiply by a fixed ratio — the formulas involve both multiplication and
            addition. Celsius to Fahrenheit is °F = (°C × 9/5) + 32, while Fahrenheit to Celsius is
            °C = (°F − 32) × 5/9. Kelvin, used mainly in scientific contexts, simply shifts Celsius by
            273.15 with no multiplication involved (K = °C + 273.15), since Kelvin's zero point is
            absolute zero rather than the freezing point of water.
          </p>

          <h2 id="how-to" className="text-2xl font-bold mt-8">How to Use the Tool, Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the <Link href="/tools/unit-converter" className="text-primary underline underline-offset-2">Unit Converter</Link> tool.</li>
            <li>Select a category — Length, Weight, Temperature, and so on.</li>
            <li>Choose your starting unit under "From" and your target unit under "To."</li>
            <li>Type in the value you want to convert — the result updates instantly.</li>
            <li>Use the swap icon to quickly reverse the conversion direction if needed.</li>
          </ol>

          <h2 id="accuracy" className="text-2xl font-bold mt-8">How Accurate Are These Conversions?</h2>
          <p>
            The conversion factors used here match standard international definitions — for example, 1
            inch is defined as exactly 2.54 centimeters under the international yard and pound
            agreement of 1959. Results display with up to six decimal places for precision, though for
            everyday use you can safely round to fewer digits than the tool shows. For regulated,
            legal, or safety-critical measurements, always confirm against an official reference
            specific to your field.
          </p>

          <h2 id="use-cases" className="text-2xl font-bold mt-8">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Converting a recipe between metric and imperial measurements while cooking.</li>
            <li>Checking a car's fuel efficiency or speed limit when traveling between countries using different systems.</li>
            <li>Converting body weight or height between kg/cm and lbs/inches for fitness tracking.</li>
            <li>Calculating file storage needs across different data units for a project or device.</li>
            <li>Converting temperature readings for cooking, weather, or scientific contexts.</li>
            <li>Working out property or land size in acres versus hectares or square meters.</li>
          </ul>

          <h2 id="faq" className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Why do my results have so many decimal places?</p>
              <p className="text-muted-foreground">Some conversions, like miles to kilometers, don't land on round numbers, so the tool shows up to six decimal places for accuracy. Round the displayed value to whatever precision your use case needs.</p>
            </div>
            <div>
              <p className="font-semibold">Is this accurate enough for professional or scientific use?</p>
              <p className="text-muted-foreground">The conversion factors match standard international definitions, so results are accurate for everyday, academic, and most professional purposes. For regulated or legal measurements, always confirm against an official reference.</p>
            </div>
            <div>
              <p className="font-semibold">Does it work without an internet connection?</p>
              <p className="text-muted-foreground">Once the page has loaded, all math runs locally in your browser using JavaScript — no server call is made for the conversion itself.</p>
            </div>
            <div>
              <p className="font-semibold">Why is there a difference between a "GB" on my hard drive and a "GB" my computer reports?</p>
              <p className="text-muted-foreground">Storage manufacturers typically use decimal gigabytes (1 GB = 1,000,000,000 bytes), while operating systems often report binary gigabytes (1 GB = 1,073,741,824 bytes) — this discrepancy is why a "1TB" drive shows less than 1TB in your file explorer.</p>
            </div>
            <div>
              <p className="font-semibold">Is my data sent anywhere when I use this tool?</p>
              <p className="text-muted-foreground">No, all calculations happen locally in your browser — nothing is transmitted to a server.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
          <p>
            Unit conversion is one of those tasks that feels trivial until you actually need to get it
            right under time pressure — a recipe, a shipping form, a school assignment. Having a
            reliable, instant converter for all eight major categories in one place removes the need to
            search for individual formulas or risk a manual calculation error.
          </p>

          <h2 className="text-2xl font-bold mt-8">Related Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/tools/image-size-checker" className="text-primary hover:underline">Image Size Checker</Link> — check pixel dimensions and file size instantly.</li>
            <li><Link href="/tools/word-counter" className="text-primary hover:underline">Word Counter</Link> — another quick everyday utility for writers.</li>
            <li><Link href="/tools/character-counter" className="text-primary hover:underline">Character Counter</Link> — track character limits for SEO and social media.</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 bg-primary/10 rounded-2xl text-center space-y-3">
            <p className="font-bold text-lg">Ready to convert your units?</p>
            <Link
              href="/tools/unit-converter"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition"
            >
              Try Unit Converter Free →
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
