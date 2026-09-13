'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

const AI_PHRASES = [
  "it's important to note", "it is important to note", "in conclusion", "furthermore",
  "moreover", "additionally", "in today's", "in the realm of", "delve into", "delving into",
  "a testament to", "plays a crucial role", "plays a vital role", "it's worth noting",
  "on the other hand", "in summary", "overall,", "as an ai", "navigate the complexities",
  "in this digital age", "unlock the potential", "in the world of", "ever-evolving",
]

function analyze(text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 3)
  const words = text.toLowerCase().match(/[a-z']+/g) || []

  if (sentences.length < 3 || words.length < 40) return null

  // 1. Sentence length uniformity (low variance = more "AI-like")
  const lengths = sentences.map(s => (s.match(/[a-z']+/gi) || []).length)
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length
  const variance = lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length
  const stdDev = Math.sqrt(variance)
  const coefVariation = mean > 0 ? stdDev / mean : 0
  // Human writing typically has higher burstiness (coefVariation often > 0.5)
  const uniformityScore = Math.max(0, Math.min(100, (0.65 - coefVariation) * 180))

  // 2. Common AI transition/filler phrases
  const lowerText = text.toLowerCase()
  const phraseHits = AI_PHRASES.filter(p => lowerText.includes(p)).length
  const phraseScore = Math.min(100, phraseHits * 22)

  // 3. Vocabulary diversity (type-token ratio) - lower diversity can indicate more formulaic text
  const uniqueWords = new Set(words)
  const ttr = uniqueWords.size / words.length
  const diversityScore = Math.max(0, Math.min(100, (0.5 - ttr) * 200))

  const overall = Math.round(uniformityScore * 0.4 + phraseScore * 0.35 + diversityScore * 0.25)

  return {
    overall: Math.max(0, Math.min(100, overall)),
    uniformityScore: Math.round(uniformityScore),
    phraseScore: Math.round(phraseScore),
    diversityScore: Math.round(diversityScore),
    phraseHits,
    sentenceCount: sentences.length,
    wordCount: words.length,
  }
}

export default function AiContentDetectorClient() {
  const [text, setText] = useState('')
  const result = useMemo(() => analyze(text), [text])

  const label = (score: number) => {
    if (score < 30) return { text: 'Likely Human-Written', color: 'text-green-600 dark:text-green-400' }
    if (score < 60) return { text: 'Mixed Signals', color: 'text-yellow-600 dark:text-yellow-400' }
    return { text: 'Shows Common AI Patterns', color: 'text-orange-600 dark:text-orange-400' }
  }

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Content Detector</h1>
          <p className="text-muted-foreground">Check text for common patterns associated with AI-generated writing. Free, instant.</p>
        </div>

        <div className="glass rounded-2xl border p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Important:</strong> This tool checks for statistical patterns (sentence
          uniformity, common AI phrasing, vocabulary variety) that are <em>often</em> more common in AI-generated text —
          it does not access any AI model's actual output logs and cannot verify authorship with certainty. Human writing
          can trigger a high score, and AI writing can trigger a low one. Don't use this as sole evidence for academic,
          legal, or employment decisions.
        </div>

        <div className="glass rounded-3xl border p-6 space-y-3">
          <label htmlFor="ai-text-input" className="text-sm font-semibold text-muted-foreground">Paste text to analyze (at least 40 words)</label>
          <textarea
            id="ai-text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste an article, essay, or paragraph here..."
            className="w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-sm resize-y"
          />
          <p className="text-xs text-muted-foreground text-right">{(text.match(/[a-z']+/gi) || []).length} words</p>
        </div>

        {text.length > 0 && !result && (
          <p className="text-sm text-muted-foreground text-center">Add a bit more text (at least 40 words, 3+ sentences) for a meaningful reading.</p>
        )}

        {result && (
          <div className="space-y-4">
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Overall Signal</p>
              <p className={`text-3xl font-bold ${label(result.overall).color}`}>{label(result.overall).text}</p>
              <p className="text-sm text-muted-foreground">Score: {result.overall} / 100</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold text-primary">{result.uniformityScore}</p>
                <p className="text-xs text-muted-foreground mt-1">Sentence Uniformity</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold text-primary">{result.phraseHits}</p>
                <p className="text-xs text-muted-foreground mt-1">Common AI Phrases Found</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-xl font-bold text-primary">{result.diversityScore}</p>
                <p className="text-xs text-muted-foreground mt-1">Low Vocabulary Variety</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center px-4">
              Based on {result.sentenceCount} sentences and {result.wordCount} words. All analysis runs in your browser — your text is never uploaded anywhere.
            </p>
          </div>
        )}

        <ToolContentSection data={toolContent["ai-content-detector"]} />

      </div>
    </div>
  )
}
