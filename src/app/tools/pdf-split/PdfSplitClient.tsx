'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (f: File) => {
    setFile(f)
    setSelected([])
    const { PDFDocument } = await import('pdf-lib')
    const arrayBuffer = await f.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    setPageCount(pdf.getPageCount())
  }

  const togglePage = (page: number) => {
    setSelected(prev =>
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    )
  }

  const selectAll = () => setSelected(Array.from({ length: pageCount }, (_, i) => i))
  const clearAll = () => setSelected([])

  const split = async () => {
    if (!file || selected.length === 0) return
    setLoading(true)

    const { PDFDocument } = await import('pdf-lib')
    const arrayBuffer = await file.arrayBuffer()
    const srcPdf = await PDFDocument.load(arrayBuffer)

    const newPdf = await PDFDocument.create()
    const sortedPages = [...selected].sort((a, b) => a - b)
    const pages = await newPdf.copyPages(srcPdf, sortedPages)
    pages.forEach(page => newPdf.addPage(page))

    const bytes = await newPdf.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `split_pages_${sortedPages.map(p => p + 1).join('-')}.pdf`
    a.click()
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF Split</h1>
          <p className="text-muted-foreground">Select pages to extract into a new PDF. 100% private.</p>
        </div>

        {/* Upload */}
        <div
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === 'application/pdf') handleFile(f) }}
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
          <div className="text-5xl mb-4">✂️</div>
          {file ? (
            <div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-muted-foreground text-sm mt-1">{pageCount} pages detected</p>
            </div>
          ) : (
            <div>
              <p className="font-semibold">Drop PDF here or click to upload</p>
              <p className="text-muted-foreground text-sm mt-1">Only PDF files supported</p>
            </div>
          )}
        </div>

        {/* Page Selector */}
        {pageCount > 0 && (
          <div className="glass rounded-3xl border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Select pages to extract</p>
              <div className="flex gap-3 text-sm">
                <button onClick={selectAll} className="text-primary hover:underline">Select All</button>
                <button onClick={clearAll} className="text-muted-foreground hover:underline">Clear</button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => togglePage(i)}
                  className={`h-12 rounded-xl text-sm font-semibold transition-all ${
                    selected.includes(i)
                      ? 'bg-primary text-primary-foreground scale-105'
                      : 'bg-muted/40 hover:bg-muted'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{selected.length} page(s) selected</p>
          </div>
        )}

        {/* Extract Button */}
        {selected.length > 0 && (
          <button
            onClick={split}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Extracting...' : `Extract ${selected.length} Page(s)`}
          </button>
        )}

        <ToolContentSection data={toolContent["pdf-split"]} />

      </div>
    </div>
  )
}
