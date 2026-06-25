'use client'

import { useState } from 'react'

export default function UrlEncoderClient() {
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
        setOutput(encodeURIComponent(text))
      } else {
        setOutput(decodeURIComponent(text))
      }
    } catch {
      setError('❌ Invalid URL encoded string')
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">URL Encoder / Decoder</h1>
          <p className="text-muted-foreground">Encode or decode URLs instantly. 100% private.</p>
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
              {m === 'encode' ? '🔗 Encode' : '🔓 Decode'}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">
              {mode === 'encode' ? 'Plain URL Input' : 'Encoded URL Input'}
            </label>
            {input && (
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground transition">
                Clear
              </button>
            )}
          </div>
          <textarea
            className="w-full h-40 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground font-mono"
            placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world&lang=en' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
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
              {mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}
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

        {/* Difference Table */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">Common Encodings</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Character</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Encoded</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  { char: 'Space', encoded: '%20' },
                  { char: '!', encoded: '%21' },
                  { char: '#', encoded: '%23' },
                  { char: '$', encoded: '%24' },
                  { char: '&', encoded: '%26' },
                  { char: '+', encoded: '%2B' },
                  { char: '/', encoded: '%2F' },
                  { char: ':', encoded: '%3A' },
                  { char: '=', encoded: '%3D' },
                  { char: '?', encoded: '%3F' },
                  { char: '@', encoded: '%40' },
                ].map(({ char, encoded }) => (
                  <tr key={char} className="border-b border-border/50 hover:bg-muted/20 transition">
                    <td className="py-2 text-foreground">{char}</td>
                    <td className="py-2 text-primary">{encoded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examples */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Quick Examples</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'URL with spaces', text: 'https://example.com/search?q=hello world', m: 'encode' as const },
              { label: 'URL with params', text: 'https://site.com?name=John&city=New York', m: 'encode' as const },
              { label: 'Decode sample', text: 'https%3A%2F%2Fexample.com%3Fq%3Dhello%20world', m: 'decode' as const },
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

      </div>
    </div>
  )
}
