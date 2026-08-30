'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

const commonRates = [5, 12, 18, 28]

export default function GstCalculatorClient() {
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState('18')

  const result = useMemo(() => {
    const amt = parseFloat(amount)
    const gstRate = parseFloat(rate)
    if (isNaN(amt) || isNaN(gstRate) || amt < 0 || gstRate < 0) return null

    let baseAmount: number
    let gstAmount: number
    let finalAmount: number

    if (mode === 'add') {
      baseAmount = amt
      gstAmount = (amt * gstRate) / 100
      finalAmount = baseAmount + gstAmount
    } else {
      finalAmount = amt
      baseAmount = (amt * 100) / (100 + gstRate)
      gstAmount = finalAmount - baseAmount
    }

    return {
      baseAmount,
      gstAmount,
      finalAmount,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
    }
  }, [amount, rate, mode])

  const formatCurrency = (n: number) =>
    n.toLocaleString('en-IN', { maximumFractionDigits: 2 })

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">GST Calculator</h1>
          <p className="text-muted-foreground">Add or remove GST from any amount, with CGST/SGST breakdown. Free, instant.</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setMode('add')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'add' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
          >
            Add GST
          </button>
          <button
            onClick={() => setMode('remove')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'remove' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
          >
            Remove GST
          </button>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="gst-amount" className="text-sm font-semibold text-muted-foreground">
              {mode === 'add' ? 'Amount (excluding GST)' : 'Amount (including GST)'}
            </label>
            <input id="gst-amount" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="gst-rate" className="text-sm font-semibold text-muted-foreground">GST Rate (%)</label>
            <input id="gst-rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
            <div className="flex gap-2 flex-wrap pt-1">
              {commonRates.map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(String(r))}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${rate === String(r) ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">{mode === 'add' ? 'Final Amount (incl. GST)' : 'Base Amount (excl. GST)'}</p>
              <p className="text-4xl font-bold text-primary">
                ₹{formatCurrency(mode === 'add' ? result.finalAmount : result.baseAmount)}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-lg font-bold">₹{formatCurrency(result.gstAmount)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total GST</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-lg font-bold">₹{formatCurrency(result.cgst)}</p>
                <p className="text-xs text-muted-foreground mt-1">CGST</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-lg font-bold">₹{formatCurrency(result.sgst)}</p>
                <p className="text-xs text-muted-foreground mt-1">SGST</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">
              CGST/SGST split shown assumes an intra-state transaction (equal split). For inter-state
              transactions, the full GST amount is charged as IGST instead.
            </p>
          </div>
        )}

        <ToolContentSection data={toolContent["gst-calculator"]} />

      </div>
    </div>
  )
}
