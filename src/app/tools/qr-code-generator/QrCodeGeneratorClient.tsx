'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

type Mode = 'url' | 'text' | 'wifi' | 'contact'

export default function QrCodeGeneratorClient() {
  const [mode, setMode] = useState<Mode>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [wifiSsid, setWifiSsid] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const [svgString, setSvgString] = useState('')
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const buildPayload = useCallback((): string => {
    switch (mode) {
      case 'url':
        return url.trim()
      case 'text':
        return text
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiEncryption === 'nopass' ? '' : wifiPassword};;`
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${contactName}\nFN:${contactName}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nEND:VCARD`
    }
  }, [mode, url, text, wifiSsid, wifiPassword, wifiEncryption, contactName, contactPhone, contactEmail])

  useEffect(() => {
    const payload = buildPayload()
    if (!payload || (mode === 'wifi' && !wifiSsid) || (mode === 'contact' && !contactName)) {
      setSvgString('')
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx?.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }
    setError('')
    QRCode.toString(payload, { type: 'svg', errorCorrectionLevel: errorCorrection, margin: 1, width: 320 })
      .then(setSvgString)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not generate QR code'))

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, payload, { errorCorrectionLevel: errorCorrection, margin: 1, width: 320 }).catch(() => {})
    }
  }, [buildPayload, errorCorrection, mode, wifiSsid, contactName])

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadSvg = () => {
    if (!svgString) return
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.download = 'qr-code.svg'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const hasContent = svgString.length > 0

  const modes: { id: Mode; label: string }[] = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'Text' },
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">QR Code Generator</h1>
          <p className="text-muted-foreground">Create a QR code for a link, text, Wi-Fi network, or contact card. Free, instant, no sign-up.</p>
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

        {/* Input Panel */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          {mode === 'url' && (
            <div className="space-y-1.5">
              <label htmlFor="qr-url" className="text-sm font-semibold text-muted-foreground">Website URL</label>
              <input
                id="qr-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary"
              />
            </div>
          )}
          {mode === 'text' && (
            <div className="space-y-1.5">
              <label htmlFor="qr-text" className="text-sm font-semibold text-muted-foreground">Text</label>
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type anything — a message, note, or code"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary resize-none"
              />
            </div>
          )}
          {mode === 'wifi' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label htmlFor="wifi-ssid" className="text-sm font-semibold text-muted-foreground">Network Name (SSID)</label>
                <input id="wifi-ssid" type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="MyHomeWiFi" className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wifi-encryption" className="text-sm font-semibold text-muted-foreground">Encryption</label>
                <select id="wifi-encryption" value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')} className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (Open network)</option>
                </select>
              </div>
              {wifiEncryption !== 'nopass' && (
                <div className="space-y-1.5">
                  <label htmlFor="wifi-password" className="text-sm font-semibold text-muted-foreground">Password</label>
                  <input id="wifi-password" type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="Network password" className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary" />
                </div>
              )}
            </div>
          )}
          {mode === 'contact' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-semibold text-muted-foreground">Full Name</label>
                <input id="contact-name" type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className="text-sm font-semibold text-muted-foreground">Phone</label>
                <input id="contact-phone" type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-semibold text-muted-foreground">Email</label>
                <input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Error correction */}
        <div className="glass rounded-3xl border p-6 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Error Correction Level</p>
          <div className="flex gap-2 flex-wrap">
            {([
              { id: 'L', label: 'Low (7%)' },
              { id: 'M', label: 'Medium (15%)' },
              { id: 'Q', label: 'Quartile (25%)' },
              { id: 'H', label: 'High (30%)' },
            ] as const).map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setErrorCorrection(lvl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition ${errorCorrection === lvl.id ? 'bg-primary text-primary-foreground' : 'bg-muted/40 hover:bg-muted'}`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Higher levels stay scannable even if the code is partly damaged or covered by a logo, at the cost of a slightly denser pattern.</p>
        </div>

        {/* Output */}
        <div className="glass rounded-3xl border p-6 space-y-4 flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl">
            <canvas ref={canvasRef} width={320} height={320} className={hasContent ? '' : 'opacity-20'} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!hasContent && !error && <p className="text-sm text-muted-foreground">Fill in the details above to generate your QR code</p>}
          {hasContent && (
            <div className="flex gap-3 flex-wrap justify-center">
              <button onClick={downloadPng} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">Download PNG</button>
              <button onClick={downloadSvg} className="px-5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted font-semibold text-sm transition">Download SVG</button>
            </div>
          )}
        </div>

        <ToolContentSection data={toolContent["qr-code-generator"]} />

      </div>
    </div>
  )
}
