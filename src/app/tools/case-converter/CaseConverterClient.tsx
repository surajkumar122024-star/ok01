'use client'

import { useState } from 'react'

const conversions = [
  { label: 'UPPER CASE', fn: (t: string) => t.toUpperCase() },
  { label: 'lower case', fn: (t: string) => t.toLowerCase() },
  { label: 'Title Case', fn: (t: string) => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { label: 'Sentence case', fn: (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() },
  { label: 'camelCase', fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { label: 'PascalCase', fn: (t: string) => t.replace(/(^\w|[^a-zA-Z0-9]\w)/g, m => m.replace(/[^a-zA-Z0-9]/, '').toUpperCase()) },
  { label: 'snake_case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
  { label: 'kebab-case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
]

export default function CaseConverterClient() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Case Converter</h1>
          <p className="text-muted-foreground">Convert text to any case instantly. 100% private.</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6">
          <textarea
            className="w-full h-48 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setText('')}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map(({ label, fn }) => {
            const result = text ? fn(text) : ''
            return (
              <div key={label} className="glass rounded-2xl border p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
                  {text && (
                    <button
                      onClick={() => copy(result, label)}
                      className="text-xs text-primary hover:underline transition"
                    >
                      {copied === label ? '✅ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <p className="text-sm font-mono break-all min-h-[40px] text-foreground">
                  {result || <span className="text-muted-foreground">Preview here...</span>}
                </p>
              </div>
            )
          })}
        </div>

        <div className="glass rounded-xl p-6 space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Where case conversion actually gets used</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Switching between uppercase, lowercase, and title case comes up in more places than most
            people expect — reformatting a pasted headline for a slide, converting a variable name from
            "my variable" style to camelCase for code, or fixing text that was accidentally typed with
            caps lock on. Rather than retyping, pasting it here and picking the right case saves the
            manual correction.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">What's the difference between Title Case and Sentence case?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Title Case capitalizes the first letter of most words (common in headlines), while
              Sentence case only capitalizes the first word and proper nouns, matching normal writing style.
            </p>
          </details>
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Does this work with non-English text?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Basic case conversion works with any Latin-alphabet text; languages using different
              scripts (like Devanagari or Chinese) don't have an uppercase/lowercase distinction, so
              case conversion won't apply to them.
            </p>
          </details>
        </div>

      </div>
    </div>
  )
}
