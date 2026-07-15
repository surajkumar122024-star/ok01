'use client'
import { useState, useMemo } from 'react'
import { ArrowLeftRight } from 'lucide-react'

type UnitDef = { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }
type Category = { label: string; icon: string; units: Record<string, UnitDef> }

const categories: Record<string, Category> = {
  length: {
    label: 'Length',
    icon: '📏',
    units: {
      m: { label: 'Meters', toBase: (v) => v, fromBase: (v) => v },
      km: { label: 'Kilometers', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cm: { label: 'Centimeters', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      mm: { label: 'Millimeters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      mi: { label: 'Miles', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      yd: { label: 'Yards', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      ft: { label: 'Feet', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      in: { label: 'Inches', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    },
  },
  weight: {
    label: 'Weight',
    icon: '⚖️',
    units: {
      kg: { label: 'Kilograms', toBase: (v) => v, fromBase: (v) => v },
      g: { label: 'Grams', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      mg: { label: 'Milligrams', toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      lb: { label: 'Pounds', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      oz: { label: 'Ounces', toBase: (v) => v * 0.028349523, fromBase: (v) => v / 0.028349523 },
      ton: { label: 'Metric Tons', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
  temperature: {
    label: 'Temperature',
    icon: '🌡️',
    units: {
      c: { label: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
      f: { label: 'Fahrenheit', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      k: { label: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  area: {
    label: 'Area',
    icon: '🔲',
    units: {
      sqm: { label: 'Square Meters', toBase: (v) => v, fromBase: (v) => v },
      sqkm: { label: 'Square Kilometers', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      sqft: { label: 'Square Feet', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      sqmi: { label: 'Square Miles', toBase: (v) => v * 2589988.11, fromBase: (v) => v / 2589988.11 },
      acre: { label: 'Acres', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      hectare: { label: 'Hectares', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    },
  },
  volume: {
    label: 'Volume',
    icon: '🧪',
    units: {
      l: { label: 'Liters', toBase: (v) => v, fromBase: (v) => v },
      ml: { label: 'Milliliters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      gal: { label: 'Gallons (US)', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      qt: { label: 'Quarts (US)', toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      cup: { label: 'Cups (US)', toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
      floz: { label: 'Fluid Ounces (US)', toBase: (v) => v * 0.0295735296, fromBase: (v) => v / 0.0295735296 },
    },
  },
  speed: {
    label: 'Speed',
    icon: '🚀',
    units: {
      kmh: { label: 'km/h', toBase: (v) => v, fromBase: (v) => v },
      mph: { label: 'mph', toBase: (v) => v * 1.609344, fromBase: (v) => v / 1.609344 },
      ms: { label: 'm/s', toBase: (v) => v * 3.6, fromBase: (v) => v / 3.6 },
      knot: { label: 'Knots', toBase: (v) => v * 1.852, fromBase: (v) => v / 1.852 },
    },
  },
  data: {
    label: 'Data Storage',
    icon: '💾',
    units: {
      b: { label: 'Bytes', toBase: (v) => v, fromBase: (v) => v },
      kb: { label: 'Kilobytes', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      mb: { label: 'Megabytes', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      gb: { label: 'Gigabytes', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      tb: { label: 'Terabytes', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
    },
  },
  time: {
    label: 'Time',
    icon: '⏱️',
    units: {
      s: { label: 'Seconds', toBase: (v) => v, fromBase: (v) => v },
      min: { label: 'Minutes', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      hr: { label: 'Hours', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      day: { label: 'Days', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      week: { label: 'Weeks', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    },
  },
}

function formatResult(n: number) {
  if (!isFinite(n)) return ''
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(4)
  return parseFloat(n.toFixed(6)).toString()
}

export default function UnitConverterClient() {
  const [category, setCategory] = useState('length')
  const unitKeys = Object.keys(categories[category].units)
  const [fromUnit, setFromUnit] = useState(unitKeys[0])
  const [toUnit, setToUnit] = useState(unitKeys[1])
  const [value, setValue] = useState('1')

  const handleCategoryChange = (key: string) => {
    setCategory(key)
    const keys = Object.keys(categories[key].units)
    setFromUnit(keys[0])
    setToUnit(keys[1])
  }

  const result = useMemo(() => {
    const num = parseFloat(value)
    if (isNaN(num)) return ''
    const cat = categories[category].units
    const base = cat[fromUnit].toBase(num)
    const converted = cat[toUnit].fromBase(base)
    return formatResult(converted)
  }, [value, fromUnit, toUnit, category])

  const swap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Unit Converter</h1>
          <p className="text-muted-foreground">Convert length, weight, temperature, and more. Instantly, in your browser.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                category === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'glass border text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl border p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-transparent border rounded-xl px-3 py-2 text-sm outline-none"
              >
                {Object.entries(categories[category].units).map(([key, u]) => (
                  <option key={key} value={key} className="bg-background">
                    {u.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent border rounded-xl px-3 py-3 text-lg font-mono outline-none"
                placeholder="Enter value"
              />
            </div>

            <button
              onClick={swap}
              className="mx-auto md:mt-6 w-10 h-10 rounded-full glass border flex items-center justify-center hover:bg-primary/10 transition"
              aria-label="Swap units"
            >
              <ArrowLeftRight size={18} />
            </button>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-transparent border rounded-xl px-3 py-2 text-sm outline-none"
              >
                {Object.entries(categories[category].units).map(([key, u]) => (
                  <option key={key} value={key} className="bg-background">
                    {u.label}
                  </option>
                ))}
              </select>
              <div className="w-full border rounded-xl px-3 py-3 text-lg font-mono min-h-[52px] flex items-center text-foreground">
                {result || <span className="text-muted-foreground">Result</span>}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          All conversions happen locally in your browser. Nothing is uploaded or stored.
        </p>

        <div className="glass rounded-2xl border p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-semibold">About this converter</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Switching between metric and imperial units comes up constantly — checking a recipe
            written in cups when your kitchen scale reads grams, converting a US shoe size chart
            listed in inches, or figuring out how many kilometers a 10-mile run actually covers.
            This tool covers eight everyday categories (length, weight, temperature, area, volume,
            speed, data storage, and time) with the common units people actually search for, so you
            rarely need to open a second tab to double-check a formula.
          </p>
        </div>

        <div className="glass rounded-2xl border p-6 md:p-8 space-y-3">
          <h2 className="text-lg font-semibold">Common conversions people look up</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 mile</p>
              <p className="text-muted-foreground">1.609 km</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 kg</p>
              <p className="text-muted-foreground">2.205 lb</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">100°F</p>
              <p className="text-muted-foreground">37.8°C</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 GB</p>
              <p className="text-muted-foreground">1024 MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">Questions people ask</h2>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Why do my results have so many decimal places?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Some conversions (like miles to kilometers) don't land on round numbers, so the tool
              shows up to six decimal places for accuracy. You can round the displayed value to
              whatever precision your use case needs.
            </p>
          </details>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Is this accurate enough for professional or scientific use?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              The conversion factors used here match standard international definitions (e.g. 1 inch
              = 2.54 cm exactly), so results are accurate for everyday, academic, and most
              professional purposes. For regulated or legal measurements, always confirm against an
              official reference.
            </p>
          </details>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Does it work without an internet connection?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Once the page has loaded, all math runs locally in your browser using JavaScript — no
              server call is made for the conversion itself, so it keeps working even on a flaky
              connection.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}
