'use client'

import { useState } from 'react'

export default function Base64Client() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = (text: string, m: 'encode' | 'decode') => {
    setError('')
    setOutput('')
    if (!text) return
    try {
      if (m === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(text))))
      } else {
        setOutput(decodeURIComponent(escape(atob(text))))
      }
    } catch {
      setError(m === 'decode' ? '❌ Invalid Base64 string' : '❌ Encoding failed')
    }
  }

  const handleInput = (value: string) => {
    setInput(value)
    process(value, mode)
  }

  const handleMode = (m: 'encode' | 'decode') => {
    setMode(m)
    setOutput('')
    setError('')
    process(input, m)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    process(output, newMode)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Base64 Encoder / Decoder</h1>
          <p className="text-muted-foreground">Encode or decode Base64 strings instantly. 100% private.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl">
          {(['encode', 'decode'] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
                mode === m
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'hover:bg-muted'
              }`}
            >
              {m === 'encode' ? '🔒 Encode' : '🔓 Decode'}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">
              {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
            </label>
            {input && (
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground transition">
                Clear
              </button>
            )}
          </div>
          <textarea
            className="w-full h-40 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground font-mono"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>

        {/* Swap Button */}
        {output && !error && (
          <div className="flex justify-center">
            <button
              onClick={swap}
              className="px-6 py-2 bg-muted/40 hover:bg-muted rounded-xl text-sm font-semibold transition"
            >
              ⇅ Swap & {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
          </div>
        )}

        {/* Output */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && (
              <button onClick={copy} className="text-sm text-primary hover:underline transition">
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <pre className="text-sm font-mono whitespace-pre-wrap break-all min-h-[80px] text-foreground">
              {output || <span className="text-muted-foreground">Output will appear here...</span>}
            </pre>
          )}
        </div>

        {/* Examples */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Quick Examples</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Hello World', text: 'Hello World', m: 'encode' as const },
              { label: 'Email', text: 'user@example.com', m: 'encode' as const },
              { label: 'Decode sample', text: 'SGVsbG8gV29ybGQ=', m: 'decode' as const },
            ].map((ex) => (
              <button
                key={ex.label}
                onClick={() => { setMode(ex.m); setInput(ex.text); process(ex.text, ex.m) }}
                className="px-3 py-1.5 bg-muted/40 hover:bg-muted rounded-lg text-xs transition"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4 mt-6">
          <h2 className="text-lg font-semibold">What Base64 encoding actually does</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Base64 converts binary or text data into a set of 64 printable characters (A-Z, a-z, 0-9,
            +, /), which is why it's commonly used to embed images inside CSS/HTML, pass data safely
            through URLs and JSON, or attach files in email systems that only handle plain text. It's
            not encryption — anyone can decode Base64 back to the original text, so it should never be
            used to hide sensitive information.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Is Base64 the same as encryption?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              No — Base64 is an encoding scheme, not encryption. It has no secret key, and anyone can
              decode it instantly, so it should not be relied on to protect sensitive data.
            </p>
          </details>
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Why is the encoded text longer than the original?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Base64 encoding increases size by roughly 33%, since every 3 bytes of original data
              becomes 4 characters of encoded output.
            </p>
          </details>
        </div>

      </div>
    </div>
  )
}
