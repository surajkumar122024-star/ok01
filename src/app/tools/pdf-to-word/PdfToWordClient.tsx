'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"
import { extractPdfText } from '@/lib/pdf-processing'

export default function PdfToWordClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [pageCount, setPageCount] = useState(0)
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

  const convert = async () => {
    if (!file) return
    setProcessing(true)
    setError('')
    setResultBlob(null)
    try {
      const pages = await extractPdfText(file)
      const hasAnyText = pages.some((p) => p.trim().length > 0)
      if (!hasAnyText) {
        throw new Error("No extractable text was found — this PDF may be a scanned image, which this tool can't read text from.")
      }

      const { Document, Packer, Paragraph, TextRun, PageBreak } = await import('docx')

      const children: InstanceType<typeof Paragraph>[] = []
      pages.forEach((pageText, idx) => {
        const lines = pageText.split(/\s{2,}|\n/).map((l) => l.trim()).filter(Boolean)
        const paraLines = lines.length ? lines : [pageText.trim()]
        paraLines.forEach((line) => {
          children.push(new Paragraph({ children: [new TextRun(line)] }))
        })
        if (idx < pages.length - 1) {
          children.push(new Paragraph({ children: [new PageBreak()] }))
        }
      })

      const doc = new Document({ sections: [{ children }] })
      const blob = await Packer.toBlob(doc)
      setResultBlob(blob)
      setPageCount(pages.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert this PDF.')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultBlob || !file) return
    const url = URL.createObjectURL(resultBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file.name.replace(/\.pdf$/i, '')}.docx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setFile(null)
    setResultBlob(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF to Word Converter</h1>
          <p className="text-muted-foreground">Extract text from a PDF into an editable Word document. Nothing is uploaded.</p>
        </div>

        <div className="glass rounded-3xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          <p className="font-semibold text-amber-500 mb-1">⚠ Heads up before you convert</p>
          <p className="text-muted-foreground">
            This tool pulls out the plain text only — fonts, images, tables, columns, and exact layout are not preserved.
            It works well for simple documents like letters or notes, but won&apos;t recreate complex layouts (invoices, brochures, forms).
            Scanned PDFs (photos of pages) won&apos;t work since there&apos;s no real text to extract.
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
              <p className="font-semibold truncate max-w-xs">{file.name}</p>
              <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition">✕ Remove</button>
            </div>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            {resultBlob && (
              <p className="text-center text-sm text-muted-foreground">
                Extracted text from {pageCount} page{pageCount !== 1 ? 's' : ''}.
              </p>
            )}

            {!resultBlob ? (
              <button onClick={convert} disabled={processing} className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50">
                {processing ? 'Converting…' : 'Convert to Word'}
              </button>
            ) : (
              <button onClick={download} className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                ⬇ Download .docx
              </button>
            )}
          </div>
        )}

        <ToolContentSection data={toolContent["pdf-to-word"]} />

      </div>
    </div>
  )
}
