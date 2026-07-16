'use client'

import { useState } from 'react'

export default function JsonFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'format' | 'minify'>('format')

  const process = (text: string, m: 'format' | 'minify', spaces: number) => {
    setError('')
    setOutput('')
    if (!text.trim()) return
    try {
      const parsed = JSON.parse(text)
      if (m === 'format') {
        setOutput(JSON.stringify(parsed, null, spaces))
      } else {
        setOutput(JSON.stringify(parsed))
      }
    } catch (e: any) {
      setError(`❌ Invalid JSON: ${e.message}`)
    }
  }

  const handleInput = (value: string) => {
    setInput(value)
    process(value, mode, indent)
  }

  const handleMode = (m: 'format' | 'minify') => {
    setMode(m)
    process(input, m, indent)
  }

  const handleIndent = (spaces: number) => {
    setIndent(spaces)
    process(input, mode, spaces)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const lineCount = output.split('\n').length
  const size = new Blob([output]).size

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">JSON Formatter</h1>
          <p className="text-muted-foreground">Format, validate and minify JSON instantly. 100% private.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl">
          {(['format', 'minify'] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
                mode === m
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'hover:bg-muted'
              }`}
            >
              {m === 'format' ? '✨ Format' : '🗜️ Minify'}
            </button>
          ))}
        </div>

        {/* Indent Options — only for format mode */}
        {mode === 'format' && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Indent:</span>
            <div className="flex gap-2">
              {[2, 4, 8].map((space) => (
                <button
                  key={space}
                  onClick={() => handleIndent(space)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    indent === space
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  {space} spaces
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editor Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Input */}
          <div className="glass rounded-3xl border p-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground">Input JSON</label>
              {input && (
                <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground transition">
                  Clear
                </button>
              )}
            </div>
            <textarea
              className="w-full h-96 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground font-mono"
              placeholder='{"name": "John", "age": 30}'
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="glass rounded-3xl border p-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground">
                {error ? 'Error' : `Output — ${lineCount} lines, ${size} bytes`}
              </label>
              {output && (
                <button onClick={copy} className="text-sm text-primary hover:underline transition">
                  {copied ? '✅ Copied!' : 'Copy'}
                </button>
              )}
            </div>
            {error ? (
              <div className="p-4 bg-red-500/10 rounded-xl">
                <p className="text-red-500 text-sm font-mono">{error}</p>
              </div>
            ) : (
              <pre className="w-full h-96 overflow-auto text-sm font-mono whitespace-pre text-foreground">
                {output || <span className="text-muted-foreground">Formatted output here...</span>}
              </pre>
            )}
          </div>

        </div>

        {/* Examples */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Quick Examples</p>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: 'Simple Object',
                text: '{"name":"John","age":30,"city":"New York"}'
              },
              {
                label: 'Array',
                text: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'
              },
              {
                label: 'Nested',
                text: '{"user":{"name":"John","address":{"city":"Delhi","pin":"110001"}},"active":true}'
              },
            ].map((ex) => (
              <button
                key={ex.label}
                onClick={() => handleInput(ex.text)}
                className="px-3 py-1.5 bg-muted/40 hover:bg-muted rounded-lg text-xs transition"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Reading minified API responses</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            APIs and browser dev tools often return JSON as one long unformatted line, which is
            efficient for transfer but nearly impossible to read by eye. This formatter re-indents the
            structure with proper nesting and line breaks, and flags syntax errors like a missing comma
            or unclosed bracket, so debugging a broken payload takes seconds instead of manual scanning.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Why does it say my JSON is invalid?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Common causes are trailing commas, single quotes instead of double quotes, or unescaped
              characters inside a string — valid JSON requires double-quoted keys and values.
            </p>
          </details>
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Is my JSON data sent anywhere?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              No, formatting and validation happen entirely in your browser using JavaScript — nothing
              is uploaded to a server.
            </p>
          </details>
        </div>

      </div>
    </div>
  )
}
