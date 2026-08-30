'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

export default function EmiCalculatorClient() {
  const [principal, setPrincipal] = useState('1000000')
  const [rate, setRate] = useState('9')
  const [tenureYears, setTenureYears] = useState('20')

  const result = useMemo(() => {
    const P = parseFloat(principal)
    const annualRate = parseFloat(rate)
    const years = parseFloat(tenureYears)
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || years <= 0) return null

    const n = years * 12
    const r = annualRate / 12 / 100

    let emi: number
    if (r === 0) {
      emi = P / n
    } else {
      const factor = Math.pow(1 + r, n)
      emi = (P * r * factor) / (factor - 1)
    }

    const totalPayment = emi * n
    const totalInterest = totalPayment - P

    return { emi, totalPayment, totalInterest, months: n }
  }, [principal, rate, tenureYears])

  const formatCurrency = (n: number) =>
    n.toLocaleString('en-IN', { maximumFractionDigits: 0 })

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">EMI Calculator</h1>
          <p className="text-muted-foreground">Calculate your monthly EMI for a home, car, or personal loan. Free, instant, no sign-up.</p>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="emi-principal" className="text-sm font-semibold text-muted-foreground">Loan Amount (₹)</label>
            <input id="emi-principal" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="emi-rate" className="text-sm font-semibold text-muted-foreground">Interest Rate (% p.a.)</label>
              <input id="emi-rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="emi-tenure" className="text-sm font-semibold text-muted-foreground">Tenure (years)</label>
              <input id="emi-tenure" type="number" min="1" value={tenureYears} onChange={(e) => setTenureYears(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary">₹{formatCurrency(result.emi)}</p>
              <p className="text-xs text-muted-foreground">for {result.months} months</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold">₹{formatCurrency(result.totalInterest)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Interest</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold">₹{formatCurrency(result.totalPayment)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Payment</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">
              This is an estimate based on the standard reducing-balance EMI formula. Your actual EMI may vary
              slightly depending on your lender&apos;s processing fees, exact disbursement date, and rate type.
            </p>
          </div>
        )}

        <ToolContentSection data={toolContent["emi-calculator"]} />

      </div>
    </div>
  )
}
