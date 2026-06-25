'use client'

import { useState, useRef } from 'react'

export default function PdfCompressorClient() {
  const [file, setFile] = useState<File | null>(null)
  const [compressed, setCompressed] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setOriginalSize(f.size)
    setCompressed(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f?.type === 'application/pdf') handleFile(f)
  }

  const compress = async () => {
    if (!file) return
    setLoading(true)

    // PDF compression using pdf-lib
    const { PDFDocument } = await import('pdf-lib')
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const compressed = await pdfDoc.save({ useObjectStreams: true })
    const blob = new Blob([compressed], { type: 'application/pdf' })
    setCompressed(blob)
    setCompressedSize(blob.size)
    setLoading(false)
  }

  const download = () => {
    if (!compressed) return
    const url = URL.createObjectURL(compressed)
    const a = document.createElement('a')
    a.href = url
    a.download = file?.name.replace('.pdf', '_compressed.pdf') || 'compressed.pdf'
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF Compressor</h1>
          <p className="text-muted-foreground">Reduce PDF file size instantly. 100% private — runs in your browser.</p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="glass border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="text-5xl mb-4">📄</div>
          {file ? (
            <div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-muted-foreground text-sm mt-1">{formatSize(originalSize)}</p>
            </div>
          ) : (
            <div>
              <p className="font-semibold">Drop PDF here or click to upload</p>
              <p className="text-muted-foreground text-sm mt-1">Only PDF files supported</p>
            </div>
          )}
        </div>

        {/* Compress Button */}
        {file && !compressed && (
          <button
            onClick={compress}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Compressing...' : 'Compress PDF'}
          </button>
        )}

        {/* Result */}
        {compressed && (
          <div className="glass rounded-3xl border p-8 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">{formatSize(originalSize)}</div>
                <div className="text-sm text-muted-foreground">Original</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-500">{savings}% saved</div>
                <div className="text-sm text-muted-foreground">Reduction</div>
              </div>
              <div>
                <div className="text-xl font-bold">{formatSize(compressedSize)}</div>
                <div className="text-sm text-muted-foreground">Compressed</div>
              </div>
            </div>
            <button
              onClick={download}
              className="w-full h-14 rounded-2xl bg-green-500 text-white font-semibold text-lg hover:opacity-90 transition"
            >
              ⬇️ Download Compressed PDF
            </button>
            <button
              onClick={() => { setFile(null); setCompressed(null) }}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition"
            >
              Compress another file
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
