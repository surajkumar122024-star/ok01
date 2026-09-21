'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function HashGeneratorClient() {
  const [mode, setMode] = useState<'text' | 'file'>('text')
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hashData = async (data: BufferSource) => {
    setBusy(true)
    const results: Record<string, string> = {}
    for (const algo of ALGORITHMS) {
      const digest = await crypto.subtle.digest(algo, data)
      results[algo] = bufferToHex(digest)
    }
    setHashes(results)
    setBusy(false)
  }

  const handleTextChange = async (value: string) => {
    setText(value)
    if (!value) { setHashes({}); return }
    const data = new TextEncoder().encode(value)
    await hashData(data)
  }

  const handleFile = async (file: File) => {
    setFileName(file.name)
    const buffer = await file.arrayBuffer()
    await hashData(buffer)
  }

  const copy = (algo: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(algo)
    setTimeout(() => setCopied(null), 1500)
  }

  const switchMode = (m: 'text' | 'file') => {
    setMode(m)
    setHashes({})
    setText('')
    setFileName('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hash Generator</h1>
          <p className="text-muted-foreground">Generate SHA-1, SHA-256, SHA-384 & SHA-512 hashes. 100% private, nothing uploaded.</p>
        </div>

        <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl">
          {(['text', 'file'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
            >
              {m === 'text' ? '📝 Text' : '📁 File'}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl border p-6 space-y-3">
          {mode === 'text' ? (
            <>
              <label className="text-sm font-semibold text-muted-foreground">Input Text</label>
              <textarea
                className="w-full h-32 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground font-mono"
                placeholder="Type or paste text to hash..."
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-muted/5 transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <p className="font-semibold">{fileName || 'Click to choose a file'}</p>
              <p className="text-xs text-muted-foreground">File is hashed locally, never uploaded</p>
            </div>
          )}
        </div>

        {busy && <p className="text-center text-sm text-muted-foreground">Hashing…</p>}

        {Object.keys(hashes).length > 0 && !busy && (
          <div className="glass rounded-3xl border p-6 space-y-4">
            {ALGORITHMS.map((algo) => (
              <div key={algo} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">{algo}</span>
                  <button onClick={() => copy(algo, hashes[algo])} className="text-xs text-primary hover:underline">
                    {copied === algo ? '✅ Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="font-mono text-xs break-all bg-muted/30 rounded-lg px-3 py-2">{hashes[algo]}</p>
              </div>
            ))}
          </div>
        )}

        <ToolContentSection data={toolContent["hash-generator"]} />

      </div>
    </div>
  )
}
