'use client'

import { useState, useCallback } from 'react'

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const nums = '0123456789'
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (uppercase) chars += upper
    if (lowercase) chars += lower
    if (numbers) chars += nums
    if (symbols) chars += syms

    if (!chars) return

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
    setCopied(false)
  }, [length, uppercase, lowercase, numbers, symbols])

  const copy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (uppercase) score++
    if (lowercase) score++
    if (numbers) score++
    if (symbols) score++
    if (length >= 12) score++
    if (length >= 20) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
    if (score <= 3) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' }
    if (score <= 4) return { label: 'Strong', color: 'bg-blue-500', width: 'w-3/4' }
    return { label: 'Very Strong', color: 'bg-green-500', width: 'w-full' }
  }

  const strength = getStrength()

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-muted'}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Password Generator</h1>
          <p className="text-muted-foreground">Generate strong, secure passwords instantly. Nothing is stored.</p>
        </div>

        {/* Output */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Generated Password</span>
            {password && (
              <button onClick={copy} className="text-sm text-primary hover:underline">
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="font-mono text-xl break-all min-h-[40px] tracking-wider">
            {password || <span className="text-muted-foreground text-base">Click generate...</span>}
          </div>

          {/* Strength Bar */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Strength</span>
                <span className="font-semibold">{strength.label}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Password Length</span>
            <span className="text-2xl font-bold text-primary">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Character Types</p>
          <Toggle label="Uppercase (A-Z)" value={uppercase} onChange={setUppercase} />
          <Toggle label="Lowercase (a-z)" value={lowercase} onChange={setLowercase} />
          <Toggle label="Numbers (0-9)" value={numbers} onChange={setNumbers} />
          <Toggle label="Symbols (!@#$...)" value={symbols} onChange={setSymbols} />
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition"
        >
          🔐 Generate Password
        </button>

        {/* Bulk Generate */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'PIN (4 digits)', len: 4, up: false, lo: false, num: true, sym: false },
              { label: 'Simple (8)', len: 8, up: true, lo: true, num: true, sym: false },
              { label: 'Strong (16)', len: 16, up: true, lo: true, num: true, sym: true },
              { label: 'Max (32)', len: 32, up: true, lo: true, num: true, sym: true },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setLength(preset.len)
                  setUppercase(preset.up)
                  setLowercase(preset.lo)
                  setNumbers(preset.num)
                  setSymbols(preset.sym)
                }}
                className="px-3 py-1.5 bg-muted/40 hover:bg-muted rounded-lg text-xs transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
