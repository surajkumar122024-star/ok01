'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

type Mode = 'of' | 'is-what-percent' | 'change' | 'add-subtract'

const modes: { id: Mode; label: string }[] = [
  { id: 'of', label: 'X% of Y' },
  { id: 'is-what-percent', label: 'X is what % of Y' },
  { id: 'change', label: '% Increase / Decrease' },
  { id: 'add-subtract', label: 'Add / Subtract %' },
]

export default function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>('of')

  // Mode 1: X% of Y
  const [percentA, setPercentA] = useState('')
  const [valueA, setValueA] = useState('')

  // Mode 2: X is what % of Y
  const [partB, setPartB] = useState('')
  const [wholeB, setWholeB] = useState('')

  // Mode 3: change from X to Y
  const [fromC, setFromC] = useState('')
  const [toC, setToC] = useState('')

  // Mode 4: add/subtract percent
  const [valueD, setValueD] = useState('')
  const [percentD, setPercentD] = useState('')
  const [opD, setOpD] = useState<'add' | 'subtract'>('add')

  const resultA = useMemo(() => {
    const p = parseFloat(percentA)
    const v = parseFloat(valueA)
    if (isNaN(p) || isNaN(v)) return null
    return (p / 100) * v
  }, [percentA, valueA])

  const resultB = useMemo(() => {
    const part = parseFloat(partB)
    const whole = parseFloat(wholeB)
    if (isNaN(part) || isNaN(whole) || whole === 0) return null
    return (part / whole) * 100
  }, [partB, wholeB])

  const resultC = useMemo(() => {
    const from = parseFloat(fromC)
    const to = parseFloat(toC)
    if (isNaN(from) || isNaN(to) || from === 0) return null
    return ((to - from) / Math.abs(from)) * 100
  }, [fromC, toC])

  const resultD = useMemo(() => {
    const v = parseFloat(valueD)
    const p = parseFloat(percentD)
    if (isNaN(v) || isNaN(p)) return null
    return opD === 'add' ? v + (v * p) / 100 : v - (v * p) / 100
  }, [valueD, percentD, opD])

  const format = (n: number) => {
    const rounded = Math.round(n * 10000) / 10000
    return rounded.toLocaleString(undefined, { maximumFractionDigits: 4 })
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Percentage Calculator</h1>
          <p className="text-muted-foreground">Calculate percentages, increases, decreases, and more. Free, instant, no sign-up.</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-2 flex-wrap justify-center">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === m.id ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl border p-6 space-y-6">

          {mode === 'of' && (
            <>
              <div className="flex items-center gap-3 flex-wrap justify-center text-lg">
                <span>What is</span>
                <input
                  type="number"
                  value={percentA}
                  onChange={(e) => setPercentA(e.target.value)}
                  placeholder="15"
                  aria-label="Percent value"
                  className="w-24 px-3 py-2 rounded-lg bg-muted/30 border outline-none focus:border-primary text-center"
                />
                <span>% of</span>
                <input
                  type="number"
                  value={valueA}
                  onChange={(e) => setValueA(e.target.value)}
                  placeholder="200"
                  aria-label="Base value"
                  className="w-28 px-3 py-2 rounded-lg bg-muted/30 border outline-none focus:border-primary text-center"
                />
                <span>?</span>
              </div>
              {resultA !== null && (
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-primary">{format(resultA)}</p>
                </div>
              )}
            </>
          )}

          {mode === 'is-what-percent' && (
            <>
              <div className="flex items-center gap-3 flex-wrap justify-center text-lg">
                <input
                  type="number"
                  value={partB}
                  onChange={(e) => setPartB(e.target.value)}
                  placeholder="30"
                  aria-label="Part value"
                  className="w-24 px-3 py-2 rounded-lg bg-muted/30 border outline-none focus:border-primary text-center"
                />
                <span>is what % of</span>
                <input
                  type="number"
                  value={wholeB}
                  onChange={(e) => setWholeB(e.target.value)}
                  placeholder="200"
                  aria-label="Whole value"
                  className="w-28 px-3 py-2 rounded-lg bg-muted/30 border outline-none focus:border-primary text-center"
                />
                <span>?</span>
              </div>
              {resultB !== null && (
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-primary">{format(resultB)}%</p>
                </div>
              )}
            </>
          )}

          {mode === 'change' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="pct-from" className="text-sm font-semibold text-muted-foreground">From</label>
                  <input id="pct-from" type="number" value={fromC} onChange={(e) => setFromC(e.target.value)} placeholder="80" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="pct-to" className="text-sm font-semibold text-muted-foreground">To</label>
                  <input id="pct-to" type="number" value={toC} onChange={(e) => setToC(e.target.value)} placeholder="100" className={inputClass} />
                </div>
              </div>
              {resultC !== null && (
                <div className="text-center py-4">
                  <p className={`text-3xl font-bold ${resultC >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {resultC >= 0 ? '+' : ''}{format(resultC)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{resultC >= 0 ? 'Increase' : 'Decrease'}</p>
                </div>
              )}
            </>
          )}

          {mode === 'add-subtract' && (
            <>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setOpD('add')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${opD === 'add' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
                >
                  Add %
                </button>
                <button
                  onClick={() => setOpD('subtract')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${opD === 'subtract' ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
                >
                  Subtract %
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="pct-value" className="text-sm font-semibold text-muted-foreground">Value</label>
                  <input id="pct-value" type="number" value={valueD} onChange={(e) => setValueD(e.target.value)} placeholder="500" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="pct-percent" className="text-sm font-semibold text-muted-foreground">Percent</label>
                  <input id="pct-percent" type="number" value={percentD} onChange={(e) => setPercentD(e.target.value)} placeholder="20" className={inputClass} />
                </div>
              </div>
              {resultD !== null && (
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-primary">{format(resultD)}</p>
                </div>
              )}
            </>
          )}

        </div>

        <ToolContentSection data={toolContent["percentage-calculator"]} />

      </div>
    </div>
  )
}
