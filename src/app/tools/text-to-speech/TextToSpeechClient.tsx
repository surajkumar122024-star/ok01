'use client'

import { useState, useEffect, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

export default function TextToSpeechClient() {
  const [text, setText] = useState('Welcome to OpticShift Pro. This tool reads your text aloud, right in your browser.')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [supported, setSupported] = useState(true)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false)
      return
    }
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length) setVoices(v)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const speak = () => {
    if (!supported || !text.trim()) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex]
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.onstart = () => { setSpeaking(true); setPaused(false) }
    utterance.onend = () => { setSpeaking(false); setPaused(false) }
    utterance.onerror = () => { setSpeaking(false); setPaused(false) }
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const pauseResume = () => {
    if (!window.speechSynthesis.speaking) return
    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
    } else {
      window.speechSynthesis.pause()
      setPaused(true)
    }
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Text to Speech</h1>
          <p className="text-muted-foreground">Have your text read aloud, using your browser&apos;s built-in voices. 100% private.</p>
        </div>

        {!supported ? (
          <div className="glass rounded-3xl border p-6 text-center text-sm text-red-500">
            Your browser doesn&apos;t support text-to-speech. Try a recent Chrome, Edge, or Safari.
          </div>
        ) : (
          <>
            <div className="glass rounded-3xl border p-6 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">Text to read</label>
              <textarea
                className="w-full h-40 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Type or paste text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="glass rounded-3xl border p-6 space-y-5">
              {voices.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Voice</label>
                  <select
                    value={voiceIndex}
                    onChange={(e) => setVoiceIndex(Number(e.target.value))}
                    className="w-full bg-muted/40 rounded-xl px-4 py-2.5 outline-none text-sm"
                  >
                    {voices.map((v, i) => (
                      <option key={i} value={i}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-muted-foreground">Speed</span>
                    <span className="text-muted-foreground">{rate.toFixed(1)}x</span>
                  </div>
                  <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-muted-foreground">Pitch</span>
                    <span className="text-muted-foreground">{pitch.toFixed(1)}</span>
                  </div>
                  <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {!speaking ? (
                <button onClick={speak} className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                  ▶ Speak
                </button>
              ) : (
                <>
                  <button onClick={pauseResume} className="flex-1 h-12 bg-muted/40 hover:bg-muted rounded-xl text-lg font-semibold transition">
                    {paused ? '▶ Resume' : '⏸ Pause'}
                  </button>
                  <button onClick={stop} className="flex-1 h-12 bg-destructive text-destructive-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                    ⏹ Stop
                  </button>
                </>
              )}
            </div>
          </>
        )}

        <ToolContentSection data={toolContent["text-to-speech"]} />

      </div>
    </div>
  )
}
