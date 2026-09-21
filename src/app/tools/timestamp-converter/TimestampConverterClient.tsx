'use client'

import { useState, useEffect } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

function pad(n: number) { return String(n).padStart(2, '0') }

function toLocalInputValue(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function TimestampConverterClient() {
  const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000))
  const [timestampInput, setTimestampInput] = useState('')
  const [dateInput, setDateInput] = useState(toLocalInputValue(new Date()))
  const [unit, setUnit] = useState<'seconds' | 'ms'>('seconds')

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const parsedDate = (() => {
    if (!timestampInput.trim()) return null
    const raw = Number(timestampInput.trim())
    if (Number.isNaN(raw)) return null
    const ms = unit === 'seconds' ? raw * 1000 : raw
    const d = new Date(ms)
    if (isNaN(d.getTime())) return null
    return d
  })()

  const dateToTimestamp = (() => {
    if (!dateInput) return null
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return null
    return unit === 'seconds' ? Math.floor(d.getTime() / 1000) : d.getTime()
  })()

  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Unix Timestamp Converter</h1>
          <p className="text-muted-foreground">Convert between Unix timestamps and readable dates. 100% private.</p>
        </div>

        <div className="glass rounded-3xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Unix Timestamp</p>
            <p className="text-2xl font-bold font-mono">{now}</p>
          </div>
          <button onClick={() => copy(String(now))} className="px-4 py-2 bg-muted/40 hover:bg-muted rounded-xl text-sm font-semibold transition">
            Copy
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl w-fit mx-auto">
          {(['seconds', 'ms'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${unit === u ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
            >
              {u === 'seconds' ? 'Seconds' : 'Milliseconds'}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl border p-6 space-y-3">
          <label className="text-sm font-semibold text-muted-foreground">Timestamp → Date</label>
          <input
            type="text"
            placeholder={unit === 'seconds' ? 'e.g. 1735689600' : 'e.g. 1735689600000'}
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            className="w-full bg-muted/40 rounded-xl px-4 py-3 outline-none font-mono text-sm"
          />
          {timestampInput.trim() && !parsedDate ? (
            <p className="text-red-500 text-sm">Invalid timestamp</p>
          ) : parsedDate ? (
            <div className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
              <span className="font-mono text-sm">{parsedDate.toString()}</span>
              <button onClick={() => copy(parsedDate.toISOString())} className="text-xs text-primary hover:underline shrink-0 ml-3">Copy ISO</button>
            </div>
          ) : null}
        </div>

        <div className="glass rounded-3xl border p-6 space-y-3">
          <label className="text-sm font-semibold text-muted-foreground">Date → Timestamp</label>
          <input
            type="datetime-local"
            step="1"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full bg-muted/40 rounded-xl px-4 py-3 outline-none text-sm"
          />
          {dateToTimestamp !== null && (
            <div className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
              <span className="font-mono text-sm">{dateToTimestamp}</span>
              <button onClick={() => copy(String(dateToTimestamp))} className="text-xs text-primary hover:underline shrink-0 ml-3">Copy</button>
            </div>
          )}
        </div>

        <ToolContentSection data={toolContent["timestamp-converter"]} />

      </div>
    </div>
  )
}
