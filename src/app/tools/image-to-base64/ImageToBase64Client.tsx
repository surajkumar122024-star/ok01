'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

export default function ImageToBase64Client() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [fileName, setFileName] = useState('')
  const [base64, setBase64] = useState('')
  const [cssOutput, setCssOutput] = useState('')
  const [decodeInput, setDecodeInput] = useState('')
  const [decodedPreview, setDecodedPreview] = useState('')
  const [decodeError, setDecodeError] = useState('')
  const [copied, setCopied] = useState<'plain' | 'css' | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setBase64(dataUrl)
      setCssOutput(`background-image: url("${dataUrl}");`)
    }
    reader.readAsDataURL(file)
  }

  const handleDecode = (value: string) => {
    setDecodeInput(value)
    setDecodeError('')
    setDecodedPreview('')
    if (!value.trim()) return
    const trimmed = value.trim()
    const dataUrl = trimmed.startsWith('data:') ? trimmed : `data:image/png;base64,${trimmed}`
    // Quick validation: try loading it as an image.
    const img = new Image()
    img.onload = () => setDecodedPreview(dataUrl)
    img.onerror = () => setDecodeError('This doesn\'t look like a valid Base64 image.')
    img.src = dataUrl
  }

  const copy = (text: string, which: 'plain' | 'css') => {
    navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 2000)
  }

  const downloadDecoded = () => {
    if (!decodedPreview) return
    const a = document.createElement('a')
    a.href = decodedPreview
    a.download = 'decoded-image'
    a.click()
  }

  const switchMode = (m: 'encode' | 'decode') => {
    setMode(m)
    setBase64('')
    setFileName('')
    setDecodeInput('')
    setDecodedPreview('')
    setDecodeError('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Image to Base64 Converter</h1>
          <p className="text-muted-foreground">Convert images to Base64 for CSS/HTML, or decode Base64 back to an image. 100% private.</p>
        </div>

        <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl">
          {(['encode', 'decode'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
            >
              {m === 'encode' ? '🖼️ Image → Base64' : '🔤 Base64 → Image'}
            </button>
          ))}
        </div>

        {mode === 'encode' ? (
          <>
            <div className="glass rounded-3xl border p-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-muted/5 transition"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <p className="font-semibold">{fileName || 'Click to choose an image'}</p>
                <p className="text-xs text-muted-foreground">Converted locally, never uploaded</p>
              </div>
            </div>

            {base64 && (
              <>
                <div className="rounded-2xl overflow-hidden border bg-black flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={base64} alt="Preview" className="max-h-56" />
                </div>

                <div className="glass rounded-3xl border p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-muted-foreground">Base64 (Data URI)</label>
                    <button onClick={() => copy(base64, 'plain')} className="text-sm text-primary hover:underline transition">
                      {copied === 'plain' ? '✅ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-40 overflow-y-auto text-muted-foreground">{base64}</pre>
                </div>

                <div className="glass rounded-3xl border p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-muted-foreground">CSS Snippet</label>
                    <button onClick={() => copy(cssOutput, 'css')} className="text-sm text-primary hover:underline transition">
                      {copied === 'css' ? '✅ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all text-muted-foreground">{cssOutput}</pre>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="glass rounded-3xl border p-6 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">Base64 String (with or without the data: prefix)</label>
              <textarea
                className="w-full h-32 bg-transparent resize-none text-xs outline-none placeholder:text-muted-foreground font-mono"
                placeholder="Paste Base64 string here..."
                value={decodeInput}
                onChange={(e) => handleDecode(e.target.value)}
              />
            </div>

            {decodeError && <p className="text-center text-sm text-red-500">{decodeError}</p>}

            {decodedPreview && (
              <>
                <div className="rounded-2xl overflow-hidden border bg-black flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={decodedPreview} alt="Decoded" className="max-h-56" />
                </div>
                <button onClick={downloadDecoded} className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                  ⬇ Download Image
                </button>
              </>
            )}
          </>
        )}

        <ToolContentSection data={toolContent["image-to-base64"]} />

      </div>
    </div>
  )
}
