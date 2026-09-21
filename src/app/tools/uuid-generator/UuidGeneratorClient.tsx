'use client'

import { useState, useEffect } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

export default function UuidGeneratorClient() {
  const [count, setCount] = useState(5)
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [uuids, setUuids] = useState<string[]>([])
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generate = () => {
    const list = Array.from({ length: count }, () => {
      let id = crypto.randomUUID()
      if (!hyphens) id = id.replace(/-/g, '')
      if (uppercase) id = id.toUpperCase()
      return id
    })
    setUuids(list)
  }

  useEffect(() => { generate() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const copyOne = (text: string, i: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(i)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">UUID Generator</h1>
          <p className="text-muted-foreground">Generate random UUID v4 values instantly. 100% private, nothing sent anywhere.</p>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              How many
              <input
                type="number"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                className="w-20 bg-muted/40 rounded-lg px-3 py-1.5 outline-none"
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} />
              Hyphens
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
              Uppercase
            </label>
            <button
              onClick={generate}
              className="ml-auto px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">{uuids.length} UUID{uuids.length !== 1 ? 's' : ''}</label>
            <button onClick={copyAll} className="text-sm text-primary hover:underline transition">
              {copiedAll ? '✅ Copied all!' : 'Copy all'}
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((id, i) => (
              <div
                key={i}
                onClick={() => copyOne(id, i)}
                className="flex items-center justify-between px-4 py-2.5 bg-muted/30 hover:bg-muted/50 rounded-xl font-mono text-sm cursor-pointer transition"
              >
                <span>{id}</span>
                <span className="text-xs text-muted-foreground ml-3 shrink-0">{copiedIndex === i ? '✅ Copied' : 'Copy'}</span>
              </div>
            ))}
          </div>
        </div>

        <ToolContentSection data={toolContent["uuid-generator"]} />

      </div>
    </div>
  )
}
