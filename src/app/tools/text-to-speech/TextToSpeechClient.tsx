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

  // Recording (tab-audio capture) state
  const recordingSupportedRef = useRef(false)
  const [recordingSupported, setRecordingSupported] = useState(false)
  const [recording, setRecording] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadExt, setDownloadExt] = useState('webm')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const captureStreamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

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

    const canCapture = typeof navigator !== 'undefined' &&
      !!navigator.mediaDevices?.getDisplayMedia &&
      typeof window.MediaRecorder !== 'undefined'
    recordingSupportedRef.current = canCapture
    setRecordingSupported(canCapture)

    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const buildUtterance = () => {
    const utterance = new SpeechSynthesisUtterance(text)
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex]
    utterance.rate = rate
    utterance.pitch = pitch
    return utterance
  }

  const speak = () => {
    if (!supported || !text.trim()) return
    window.speechSynthesis.cancel()
    const utterance = buildUtterance()
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

  const cleanupCapture = () => {
    captureStreamRef.current?.getTracks().forEach((t) => t.stop())
    captureStreamRef.current = null
    mediaRecorderRef.current = null
  }

  const recordAndDownload = async () => {
    if (!recordingSupportedRef.current || !text.trim()) return
    setRecordingError('')
    setDownloadUrl(null)
    chunksRef.current = []

    let displayStream: MediaStream
    try {
      // video: true is required by the browser to open the share picker at
      // all — we discard the video track immediately and keep only audio.
      displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    } catch {
      setRecordingError('Permission was cancelled — recording needs you to share this tab with audio.')
      return
    }

    const audioTracks = displayStream.getAudioTracks()
    if (audioTracks.length === 0) {
      displayStream.getTracks().forEach((t) => t.stop())
      setRecordingError('No audio was shared. When the picker opens, choose "This Tab" and make sure "Share tab audio" is checked.')
      return
    }
    // Stop the video track right away — we only need audio, and this
    // avoids capturing/holding a video feed unnecessarily.
    displayStream.getVideoTracks().forEach((t) => t.stop())

    const audioOnlyStream = new MediaStream(audioTracks)
    captureStreamRef.current = displayStream

    const mimeCandidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus']
    const mimeType = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || ''
    const recorder = mimeType ? new MediaRecorder(audioOnlyStream, { mimeType }) : new MediaRecorder(audioOnlyStream)
    setDownloadExt(mimeType.includes('ogg') ? 'ogg' : 'webm')

    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' })
      setDownloadUrl(URL.createObjectURL(blob))
      setRecording(false)
      cleanupCapture()
    }

    // If the user stops sharing from the browser's own "Stop sharing" bar
    // mid-recording, wind everything down gracefully.
    audioTracks[0].addEventListener('ended', () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        window.speechSynthesis.cancel()
        setSpeaking(false)
        setPaused(false)
        mediaRecorderRef.current.stop()
      }
    })

    mediaRecorderRef.current = recorder
    recorder.start()
    setRecording(true)

    window.speechSynthesis.cancel()
    const utterance = buildUtterance()
    utterance.onstart = () => { setSpeaking(true); setPaused(false) }
    utterance.onend = () => {
      setSpeaking(false)
      setPaused(false)
      // Small tail delay so the last word isn't clipped in the recording.
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop()
        }
      }, 300)
    }
    utterance.onerror = () => {
      setSpeaking(false)
      setPaused(false)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const downloadRecording = () => {
    if (!downloadUrl) return
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `speech.${downloadExt}`
    a.click()
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
                <button onClick={speak} disabled={recording} className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50">
                  ▶ Speak
                </button>
              ) : (
                <>
                  <button onClick={pauseResume} disabled={recording} className="flex-1 h-12 bg-muted/40 hover:bg-muted rounded-xl text-lg font-semibold transition disabled:opacity-50">
                    {paused ? '▶ Resume' : '⏸ Pause'}
                  </button>
                  <button onClick={stop} className="flex-1 h-12 bg-destructive text-destructive-foreground rounded-xl text-lg font-semibold hover:opacity-90 transition">
                    ⏹ Stop
                  </button>
                </>
              )}
            </div>

            {recordingSupported && (
              <div className="glass rounded-3xl border p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Download as audio file</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You&apos;ll be asked to share this tab — pick &quot;This Tab&quot; and make sure &quot;Share tab audio&quot; is checked.
                    </p>
                  </div>
                </div>

                {!downloadUrl ? (
                  <button
                    onClick={recordAndDownload}
                    disabled={recording || speaking || !text.trim()}
                    className="w-full h-11 bg-muted/40 hover:bg-muted rounded-xl text-sm font-semibold transition disabled:opacity-50"
                  >
                    {recording ? '🔴 Recording…' : '⏺ Record & Prepare Download'}
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={downloadRecording} className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition">
                      ⬇ Download Audio
                    </button>
                    <button
                      onClick={() => { setDownloadUrl(null); setRecordingError('') }}
                      className="px-4 h-11 bg-muted/40 hover:bg-muted rounded-xl text-sm font-semibold transition"
                    >
                      Record again
                    </button>
                  </div>
                )}

                {recordingError && <p className="text-xs text-red-500">{recordingError}</p>}
              </div>
            )}
          </>
        )}

        <ToolContentSection data={toolContent["text-to-speech"]} />

      </div>
    </div>
  )
}

