'use client'

import { useState } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"

export default function TextRepeaterClient() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(5)
  const [separator, setSeparator] = useState('newline')
  const [copied, setCopied] = useState(false)

  const separators: Record<string, string> = {
    newline: '\n',
    space: ' ',
    comma: ', ',
    dash: ' — ',
    none: '',
  }

  const result = text
    ? Array(count).fill(text).join(separators[separator])
    : ''

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Text Repeater</h1>
          <p className="text-muted-foreground">Repeat any text any number of times instantly.</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <label className="text-sm font-semibold text-muted-foreground">Text to Repeat</label>
          <textarea
            className="w-full h-32 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="glass rounded-3xl border p-6 space-y-6">
          <p className="text-sm font-semibold text-muted-foreground">Options</p>

          {/* Count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Repeat Count</span>
              <span className="text-2xl font-bold text-primary">{count}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          {/* Manual count input */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Or type count:</span>
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(Math.min(1000, Math.max(1, Number(e.target.value))))}
              className="w-24 px-3 py-2 bg-muted/40 rounded-xl text-sm outline-none text-center font-bold"
            />
          </div>

          {/* Separator */}
          <div className="space-y-3">
            <span className="text-sm font-medium">Separator</span>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'newline', label: 'New Line' },
                { key: 'space', label: 'Space' },
                { key: 'comma', label: 'Comma' },
                { key: 'dash', label: 'Dash' },
                { key: 'none', label: 'None' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSeparator(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    separator === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        {result && (
          <div className="glass rounded-3xl border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Result — {count} repetitions
              </span>
              <button onClick={copy} className="text-sm text-primary hover:underline">
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-sm whitespace-pre-wrap break-all max-h-64 overflow-y-auto font-mono bg-muted/20 rounded-xl p-4">
              {result}
            </pre>
          </div>
        )}

        <ToolContentSection data={toolContent["text-repeater"]} />

      </div>
    </div>
  )
}
