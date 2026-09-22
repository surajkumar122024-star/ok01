'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"
import { getPdfjs, renderPdfPageToCanvas, formatBytes } from '@/lib/pdf-processing'

const PRESETS = [
  { label: 'Smallest size', scale: 1.0, quality: 0.5 },
  { label: 'Balanced', scale: 1.5, quality: 0.7 },
  { label: 'Best quality', scale: 2.0, quality: 0.85 },
]

function canvasToJpegBytes(canvas: HTMLCanvasElement, quality: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) { reject(new Error('Could not encode page.')); return }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)))
      },
      'image/jpeg',
      quality
    )
  })
}

export default function PdfCompressorClient() {
  const [file, setFile] = useState<File | null>(null)
  const [presetIndex, setPresetIndex] = useState(1)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      setError('Please choose a PDF file.')
      return
    }
    setFile(f)
    setResultBlob(null)
    setError('')
  }

  const compress = async () => {
    if (!file) return
    setProcessing(true)
    setProgress(0)
    setError('')
    setResultBlob(null)
    try {
      const preset = PRESETS[presetIndex]
      const pdfjsLib = await getPdfjs()
      const { PDFDocument } = await import('pdf-lib')

      const arrayBuffer = await file.arrayBuffer()
      const srcPdf = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise
      const outPdf = await PDFDocument.create()

      for (let i = 1; i <= srcPdf.numPages; i++) {
        const page = await srcPdf.getPage(i)
        const pointViewport = page.getViewport({ scale: 1 })
        const canvas = await renderPdfPageToCanvas(page, preset.scale)
        const jpgBytes = await canvasToJpegBytes(canvas, preset.quality)
        const jpgImage = await outPdf.embedJpg(jpgBytes)
        const outPage = outPdf.addPage([pointViewport.width, pointViewport.height])
        outPage.drawImage(jpgImage, { x: 0, y: 0, width: pointViewport.width, height: pointViewport.height })
        setProgress(Math.round((i / srcPdf.numPages) * 100))
      }

      const outBytes = await outPdf.save()
      setResultBlob(new Blob([outBytes], { type: 'application/pdf' }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress this PDF.')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultBlob || !file) return
    const url = URL.createObjectURL(resultBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed_${file.name}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setFile(null)
    setResultBlob(null)
    setError('')
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF Compressor</h1>
          <p className="text-muted-foreground">Shrink PDF file size, right in your browser. Nothing is uploaded.</p>
        </div>

        <div className="glass rounded-3xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          <p className="font-semibold text-amber-500 mb-1">⚠ Heads up before you compress</p>
          <p className="text-muted-foreground">
            This tool works by turning each page into a re-compressed image — it dramatically shrinks image-heavy or scanned PDFs,
            but the output PDF will no longer have selectable or searchable text. If you need to keep text selectable, this isn&apos;t the right tool for that PDF.
          </p>
        </div>

        {!file ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]) }}
            className="glass rounded-3xl border-2 border-dashed p-12 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-muted/5 transition"
          >
            <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <p className="text-lg font-semibold">Drop your PDF here</p>
            <p className="text-sm text-muted-foreground">or click to browse — processed entirely on your device</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass rounded-3xl border p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition">✕ Remove</button>
            </div>

            <div className="glass rounded-3xl border p-6 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">Compression level</label>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPresetIndex(i)}
                    disabled={processing}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition ${presetIndex === i ? 'bg-primary text-primary-foreground shadow' : 'bg-muted/40 hover:bg-muted'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {processing && (
              <div className="space-y-2">
                <div className="w-full bg-muted/40 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-center text-sm text-muted-foreground">Compressing… {progress}%</p>
              </div>
            )}

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            {resultBlob && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Original</p>
                  <p className="text-lg font-bold">{formatBytes(file.size)}</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                  <p className="text-xs text-primary uppercase tracking-wider">Compressed</p>
                  <p className="text-lg font-bold text-primary">{formatBytes(resultBlob.size)}</p>
                </div>
              </div>
            )}

            {!resultBlob ? (
              <button onClick={compress} disabled={processing} className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50">
                {processing ? 'Compressing…' : 'Compress PDF'}
              </button>
            ) : (
              <button onClick={download} className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                ⬇ Download Compressed PDF
              </button>
            )}
          </div>
        )}

        <ToolContentSection data={toolContent["pdf-compressor"]} />

      </div>
    </div>
  )
}
