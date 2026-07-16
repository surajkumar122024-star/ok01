'use client'

import { useState, useRef } from 'react'

export default function PdfMergeClient() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (newFiles: FileList) => {
    const pdfs = Array.from(newFiles).filter(f => f.type === 'application/pdf')
    setFiles(prev => [...prev, ...pdfs])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    setFiles(prev => {
      const arr = [...prev]
      ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
      return arr
    })
  }

  const moveDown = (index: number) => {
    if (index === files.length - 1) return
    setFiles(prev => {
      const arr = [...prev]
      ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      return arr
    })
  }

  const merge = async () => {
    if (files.length < 2) return
    setLoading(true)

    const { PDFDocument } = await import('pdf-lib')
    const mergedPdf = await PDFDocument.create()

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(page => mergedPdf.addPage(page))
    }

    const merged = await mergedPdf.save()
    const blob = new Blob([merged], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'merged.pdf'
    a.click()
    setLoading(false)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF Merge</h1>
          <p className="text-muted-foreground">Combine multiple PDFs into one. Drag to reorder. 100% private.</p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files) }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="glass border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <div className="text-5xl mb-4">📑</div>
          <p className="font-semibold">Drop PDFs here or click to upload</p>
          <p className="text-muted-foreground text-sm mt-1">Select multiple PDF files</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="glass rounded-3xl border p-6 space-y-3">
            <p className="font-semibold text-sm text-muted-foreground mb-4">{files.length} file(s) — drag to reorder</p>
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <span className="text-muted-foreground text-sm w-6">{i + 1}</span>
                <span className="flex-1 text-sm font-medium truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveUp(i)} className="p-1 hover:text-primary transition text-muted-foreground">↑</button>
                  <button onClick={() => moveDown(i)} className="p-1 hover:text-primary transition text-muted-foreground">↓</button>
                  <button onClick={() => removeFile(i)} className="p-1 hover:text-red-500 transition text-muted-foreground">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Merge Button */}
        {files.length >= 2 && (
          <button
            onClick={merge}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Merging...' : `Merge ${files.length} PDFs`}
          </button>
        )}

        {files.length === 1 && (
          <p className="text-center text-muted-foreground text-sm">Add at least one more PDF to merge</p>
        )}

        <div className="glass rounded-xl p-6 space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Combining scattered PDFs into one file</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Job applications and government submissions often ask for a single PDF containing multiple
            documents — a resume plus certificates, or several scanned ID pages — rather than separate
            attachments. This tool stacks your selected PDFs in order into one combined file, which you
            can reorder before merging so the pages come out in the sequence you need.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Can I change the order of the PDFs before merging?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Yes, arrange the files in the order you want them to appear before clicking merge — the
              final PDF follows that exact sequence.
            </p>
          </details>
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium text-sm">Is there a limit on how many PDFs I can merge?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              There's no fixed limit, though merging many large PDFs at once may take longer since
              processing happens entirely in your browser.
            </p>
          </details>
        </div>

      </div>
    </div>
  )
}
