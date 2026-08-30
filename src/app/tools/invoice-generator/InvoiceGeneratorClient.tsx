'use client'

import { useState, useMemo } from 'react'
import { Plus, Trash2, Download } from 'lucide-react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

interface LineItem {
  id: string
  description: string
  quantity: string
  rate: string
}

let itemCounter = 0
const newItem = (): LineItem => ({ id: `item-${itemCounter++}`, description: '', quantity: '1', rate: '' })

export default function InvoiceGeneratorClient() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().split('T')[0])
  const [fromName, setFromName] = useState('')
  const [fromDetails, setFromDetails] = useState('')
  const [toName, setToName] = useState('')
  const [toDetails, setToDetails] = useState('')
  const [items, setItems] = useState<LineItem[]>([newItem(), newItem()])
  const [taxRate, setTaxRate] = useState('0')
  const [notes, setNotes] = useState('')
  const [generating, setGenerating] = useState(false)

  const updateItem = (id: string, field: keyof LineItem, value: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)))
  }

  const addItem = () => setItems((prev) => [...prev, newItem()])
  const removeItem = (id: string) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev))

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => {
      const qty = parseFloat(it.quantity) || 0
      const rate = parseFloat(it.rate) || 0
      return sum + qty * rate
    }, 0)
    const tax = parseFloat(taxRate) || 0
    const taxAmount = (subtotal * tax) / 100
    const total = subtotal + taxAmount
    return { subtotal, taxAmount, total }
  }, [items, taxRate])

  const formatMoney = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const generatePdf = async () => {
    setGenerating(true)
    try {
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 15
      let y = 20

      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'bold')
      pdf.text('INVOICE', margin, y)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`# ${invoiceNumber}`, pageWidth - margin, y, { align: 'right' })
      y += 6
      pdf.text(invoiceDate, pageWidth - margin, y, { align: 'right' })
      y += 14

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(10)
      pdf.text('From', margin, y)
      pdf.text('Bill To', pageWidth / 2, y)
      y += 6
      pdf.setFont('helvetica', 'normal')
      const fromLines = pdf.splitTextToSize(`${fromName}\n${fromDetails}`, pageWidth / 2 - margin - 5)
      const toLines = pdf.splitTextToSize(`${toName}\n${toDetails}`, pageWidth / 2 - margin - 5)
      pdf.text(fromLines, margin, y)
      pdf.text(toLines, pageWidth / 2, y)
      y += Math.max(fromLines.length, toLines.length) * 5 + 10

      pdf.setDrawColor(200)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 8

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(9)
      pdf.text('Description', margin, y)
      pdf.text('Qty', pageWidth - margin - 60, y, { align: 'right' })
      pdf.text('Rate', pageWidth - margin - 30, y, { align: 'right' })
      pdf.text('Amount', pageWidth - margin, y, { align: 'right' })
      y += 3
      pdf.line(margin, y, pageWidth - margin, y)
      y += 7

      pdf.setFont('helvetica', 'normal')
      for (const item of items) {
        const qty = parseFloat(item.quantity) || 0
        const rate = parseFloat(item.rate) || 0
        const amount = qty * rate
        const descLines = pdf.splitTextToSize(item.description || '-', pageWidth - margin * 2 - 90)
        pdf.text(descLines, margin, y)
        pdf.text(String(qty), pageWidth - margin - 60, y, { align: 'right' })
        pdf.text(formatMoney(rate), pageWidth - margin - 30, y, { align: 'right' })
        pdf.text(formatMoney(amount), pageWidth - margin, y, { align: 'right' })
        y += Math.max(descLines.length, 1) * 5 + 4
      }

      y += 4
      pdf.line(pageWidth / 2, y, pageWidth - margin, y)
      y += 8
      pdf.text('Subtotal', pageWidth - margin - 30, y, { align: 'right' })
      pdf.text(formatMoney(totals.subtotal), pageWidth - margin, y, { align: 'right' })
      y += 7
      pdf.text(`Tax (${taxRate}%)`, pageWidth - margin - 30, y, { align: 'right' })
      pdf.text(formatMoney(totals.taxAmount), pageWidth - margin, y, { align: 'right' })
      y += 7
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.text('Total', pageWidth - margin - 30, y, { align: 'right' })
      pdf.text(formatMoney(totals.total), pageWidth - margin, y, { align: 'right' })

      if (notes.trim()) {
        y += 16
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        pdf.text('Notes', margin, y)
        y += 6
        pdf.setFont('helvetica', 'normal')
        const noteLines = pdf.splitTextToSize(notes, pageWidth - margin * 2)
        pdf.text(noteLines, margin, y)
      }

      pdf.save(`${invoiceNumber || 'invoice'}.pdf`)
    } finally {
      setGenerating(false)
    }
  }

  const inputClass = "w-full px-3 py-2 rounded-lg bg-muted/30 border outline-none focus:border-primary text-sm"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Invoice Generator</h1>
          <p className="text-muted-foreground">Create a professional invoice and download it as a PDF. Free, no sign-up, no watermark.</p>
        </div>

        {/* Invoice meta */}
        <div className="glass rounded-3xl border p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="inv-number" className="text-sm font-semibold text-muted-foreground">Invoice Number</label>
            <input id="inv-number" type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="inv-date" className="text-sm font-semibold text-muted-foreground">Date</label>
            <input id="inv-date" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass rounded-3xl border p-6 space-y-3">
            <h2 className="font-semibold text-sm text-muted-foreground">From</h2>
            <input placeholder="Your name / business" value={fromName} onChange={(e) => setFromName(e.target.value)} className={inputClass} aria-label="From name" />
            <textarea placeholder="Address, email, phone" value={fromDetails} onChange={(e) => setFromDetails(e.target.value)} rows={3} className={`${inputClass} resize-none`} aria-label="From details" />
          </div>
          <div className="glass rounded-3xl border p-6 space-y-3">
            <h2 className="font-semibold text-sm text-muted-foreground">Bill To</h2>
            <input placeholder="Client name / business" value={toName} onChange={(e) => setToName(e.target.value)} className={inputClass} aria-label="Bill to name" />
            <textarea placeholder="Address, email, phone" value={toDetails} onChange={(e) => setToDetails(e.target.value)} rows={3} className={`${inputClass} resize-none`} aria-label="Bill to details" />
          </div>
        </div>

        {/* Line items */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground">Items</h2>
          <div className="hidden sm:grid grid-cols-[1fr_70px_90px_90px_32px] gap-2 text-xs font-semibold text-muted-foreground px-1">
            <span>Description</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
            <span></span>
          </div>
          {items.map((item) => {
            const qty = parseFloat(item.quantity) || 0
            const rate = parseFloat(item.rate) || 0
            return (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_70px_90px_90px_32px] gap-2 items-center">
                <input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className={inputClass}
                  aria-label="Item description"
                />
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  className={inputClass}
                  aria-label="Quantity"
                />
                <input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                  placeholder="0.00"
                  className={inputClass}
                  aria-label="Rate"
                />
                <span className="text-sm font-medium text-right px-1">{formatMoney(qty * rate)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
          <button
            onClick={addItem}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline pt-1"
          >
            <Plus size={16} /> Add item
          </button>
        </div>

        {/* Tax & Notes */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="space-y-1.5 max-w-[160px]">
            <label htmlFor="inv-tax" className="text-sm font-semibold text-muted-foreground">Tax (%)</label>
            <input id="inv-tax" type="number" min="0" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="inv-notes" className="text-sm font-semibold text-muted-foreground">Notes (optional)</label>
            <textarea id="inv-notes" placeholder="Payment terms, bank details, thank-you note..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </div>
        </div>

        {/* Totals */}
        <div className="glass rounded-3xl border p-6 space-y-2 max-w-sm ml-auto">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatMoney(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax ({taxRate || 0}%)</span>
            <span className="font-medium">{formatMoney(totals.taxAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">{formatMoney(totals.total)}</span>
          </div>
        </div>

        <button
          onClick={generatePdf}
          disabled={generating}
          className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
        >
          <Download size={20} />
          {generating ? 'Generating...' : 'Download Invoice as PDF'}
        </button>

        <ToolContentSection data={toolContent["invoice-generator"]} />

      </div>
    </div>
  )
}
