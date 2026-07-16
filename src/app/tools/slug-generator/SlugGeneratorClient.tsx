'use client'

import { useState } from 'react'

export default function SlugGeneratorClient() {
  const [text, setText] = useState('')
  const [separator, setSeparator] = useState<'-' | '_'>('-')
  const [lowercase, setLowercase] = useState(true)
  const [copied, setCopied] = useState(false)

  const generateSlug = (input: string) => {
    let slug = input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .replace(/\s+/g, separator)
      .replace(/[-_]+/g, separator)

    if (lowercase) slug = slug.toLowerCase()
    return slug
  }

  const slug = generateSlug(text)

  const copy = () => {
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Slug Generator</h1>
          <p className="text-muted-foreground">Convert any text into a clean URL slug instantly.</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <label className="text-sm font-semibold text-muted-foreground">Input Text</label>
          <input
            type="text"
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            placeholder="My Awesome Blog Post Title!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">Options</p>
          <div className="flex flex-wrap gap-6">

            {/* Separator */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Separator</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeparator('-')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    separator === '-' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  Hyphen (-)
                </button>
                <button
                  onClick={() => setSeparator('_')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    separator === '_' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  Underscore (_)
                </button>
              </div>
            </div>

            {/* Lowercase toggle */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Case</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setLowercase(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    lowercase ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  lowercase
                </button>
                <button
                  onClick={() => setLowercase(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    !lowercase ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  Keep Case
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Output */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">Generated Slug</label>
            {slug && (
              <button
                onClick={copy}
                className="text-sm text-primary hover:underline transition"
              >
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <p className="text-lg font-mono break-all text-foreground min-h-[32px]">
            {slug || <span className="text-muted-foreground">your-slug-will-appear-here</span>}
          </p>
        </div>

        {/* Examples */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Quick Examples</p>
          <div className="flex flex-wrap gap-2">
            {[
              'My Blog Post Title',
              'Hello World! 123',
              'The Best SEO Tips 2026',
              'How to Code in Next.js',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setText(example)}
                className="px-3 py-1.5 bg-muted/40 hover:bg-muted rounded-lg text-xs transition"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Why URL slugs matter for SEO</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            A blog post titled "10 Best Places to Visit in 2026!" turns into an ugly URL if pasted
            as-is — spaces, punctuation, and capital letters all cause problems for web servers and
            search engines. A clean slug like "10-best-places-to-visit-2026" is lowercase, hyphenated,
            and free of special characters, which both looks more trustworthy to visitors and is easier
            for Google to index correctly.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Should I use hyphens or underscores in a slug?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Hyphens are generally recommended over underscores, since Google treats hyphens as word
              separators but can read underscore-joined words as a single term.
            </p>
          </details>
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">How long should a slug be?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Shorter, descriptive slugs (roughly 3-6 words) tend to be easier to read and share than
              long ones that mirror the entire page title word for word.
            </p>
          </details>
        </div>

      </div>
    </div>
  )
}
