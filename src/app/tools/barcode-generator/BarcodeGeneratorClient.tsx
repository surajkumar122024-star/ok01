'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import JsBarcode from 'jsbarcode'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

type Format = 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14' | 'MSI'

const formats: { id: Format; label: string; hint: string }[] = [
  { id: 'CODE128', label: 'CODE128', hint: 'Any letters, numbers, and symbols — the most flexible format.' },
  { id: 'EAN13', label: 'EAN-13', hint: 'Exactly 12 or 13 digits — the standard retail product barcode.' },
  { id: 'UPC', label: 'UPC-A', hint: 'Exactly 11 or 12 digits — the standard US retail barcode.' },
  { id: 'CODE39', label: 'CODE39', hint: 'Letters, numbers, and a few symbols — common in logistics and inventory.' },
  { id: 'ITF14', label: 'ITF-14', hint: 'Exactly 13 or 14 digits — used for shipping cartons.' },
  { id: 'MSI', label: 'MSI', hint: 'Numeric only — used for warehouse shelf labeling.' },
]

export default function BarcodeGeneratorClient() {
  const [format, setFormat] = useState<Format>('CODE128')
  const [value, setValue] = useState('')
  const [displayValue, setDisplayValue] = useState(true)
  const [error, setError] = useState('')
  const [hasResult, setHasResult] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = useCallback(() => {
    if (!value.trim()) {
      setHasResult(false)
      setError('')
      return
    }
    let valid = true
    try {
      if (svgRef.current) {
        JsBarcode(svgRef.current, value, {
          format,
          displayValue,
          width: 2,
          height: 100,
          margin: 10,
          valid: (v) => { valid = v },
        })
      }
      if (canvasRef.current) {
        JsBarcode(canvasRef.current, value, {
          format,
          displayValue,
          width: 2,
          height: 100,
          margin: 10,
        })
      }
      if (!valid) {
        setError(`"${value}" is not a valid ${format} value. Check the format hint below.`)
        setHasResult(false)
      } else {
        setError('')
        setHasResult(true)
      }
    } catch {
      setError(`"${value}" is not a valid ${format} value. Check the format hint below.`)
      setHasResult(false)
    }
  }, [value, format, displayValue])

  useEffect(() => {
    generate()
  }, [generate])

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'barcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadSvg = () => {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.download = 'barcode.svg'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const activeFormat = formats.find((f) => f.id === format)!

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Barcode Generator</h1>
          <p className="text-muted-foreground">Create a scannable barcode in CODE128, EAN-13, UPC, and more. Free, instant, no sign-up.</p>
        </div>

        {/* Format Selector */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Barcode Format</p>
          <div className="flex gap-2 flex-wrap">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${format === f.id ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{activeFormat.hint}</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="barcode-value" className="text-sm font-semibold text-muted-foreground">Value to Encode</label>
            <input
              id="barcode-value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 123456789012"
              className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary font-mono"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <span className="text-sm font-medium">Show text below barcode</span>
            <button
              onClick={() => setDisplayValue(!displayValue)}
              aria-label="Show text below barcode"
              aria-pressed={displayValue}
              className={`w-12 h-6 rounded-full transition-colors relative ${displayValue ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${displayValue ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass rounded-3xl border p-6 space-y-4 flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl overflow-x-auto max-w-full">
            <svg ref={svgRef} className={hasResult ? '' : 'hidden'} />
            <canvas ref={canvasRef} className="hidden" />
            {!hasResult && !error && <p className="text-sm text-muted-foreground px-8 py-6">Enter a value above to generate your barcode</p>}
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          {hasResult && (
            <div className="flex gap-3 flex-wrap justify-center">
              <button onClick={downloadPng} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">Download PNG</button>
              <button onClick={downloadSvg} className="px-5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted font-semibold text-sm transition">Download SVG</button>
            </div>
          )}
        </div>

        <ToolContentSection data={toolContent["barcode-generator"]} />

      </div>
    </div>
  )
}
