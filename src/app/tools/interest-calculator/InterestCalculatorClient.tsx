'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

const compoundOptions = [
  { label: 'Annually', n: 1 },
  { label: 'Semi-Annually', n: 2 },
  { label: 'Quarterly', n: 4 },
  { label: 'Monthly', n: 12 },
]

export default function InterestCalculatorClient() {
  const [mode, setMode] = useState<'simple' | 'compound'>('compound')
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('5')
  const [compoundN, setCompoundN] = useState(4)

  const result = useMemo(() => {
    const P = parseFloat(principal)
    const R = parseFloat(rate)
    const T = parseFloat(years)
    if (isNaN(P) || isNaN(R) || isNaN(T) || P < 0 || R < 0 || T < 0) return null

    let interest: number
    let finalAmount: number

    if (mode === 'simple') {
      interest = (P * R * T) / 100
      finalAmount = P + interest
    } else {
      finalAmount = P * Math.pow(1 + R / (100 * compoundN), compoundN * T)
      interest = finalAmount - P
    }

    return { interest, finalAmount, principal: P }
  }, [principal, rate, years, mode, compoundN])

  const formatCurrency = (n: number) =>
    n.toLocaleString('en-IN', { maximumFractionDigits: 2 })

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Interest Calculator</h1>
          <p className="text-muted-foreground">Calculate simple or compound interest on savings or a loan. Free, instant.</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'simple' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
          >
            Simple Interest
          </button>
          <button
            onClick={() => setMode('compound')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'compound' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
          >
            Compound Interest
          </button>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="int-principal" className="text-sm font-semibold text-muted-foreground">Principal Amount (₹)</label>
            <input id="int-principal" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="int-rate" className="text-sm font-semibold text-muted-foreground">Annual Rate (%)</label>
              <input id="int-rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="int-years" className="text-sm font-semibold text-muted-foreground">Time (years)</label>
              <input id="int-years" type="number" min="0" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} />
            </div>
          </div>
          {mode === 'compound' && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-muted-foreground">Compounding Frequency</label>
              <div className="flex gap-2 flex-wrap">
                {compoundOptions.map((opt) => (
                  <button
                    key={opt.n}
                    onClick={() => setCompoundN(opt.n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${compoundN === opt.n ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-4">
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Final Amount</p>
              <p className="text-4xl font-bold text-primary">₹{formatCurrency(result.finalAmount)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold">₹{formatCurrency(result.principal)}</p>
                <p className="text-xs text-muted-foreground mt-1">Principal</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold text-primary">₹{formatCurrency(result.interest)}</p>
                <p className="text-xs text-muted-foreground mt-1">Interest Earned</p>
              </div>
            </div>
          </div>
        )}

        <ToolContentSection data={toolContent["interest-calculator"]} />

      </div>
    </div>
  )
}
