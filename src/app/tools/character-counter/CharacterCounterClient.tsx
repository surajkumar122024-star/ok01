'use client'

import { useState } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"

export default function CharacterCounterClient() {
  const [text, setText] = useState('')

  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length
  const lines = text.split('\n').length
  const readingTime = Math.ceil(words / 200)
  const speakingTime = Math.ceil(words / 130)

  const topWords = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .reduce((acc: Record<string, number>, w) => {
      acc[w] = (acc[w] || 0) + 1
      return acc
    }, {})

  const topWordsList = Object.entries(topWords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const stats = [
    { label: 'Characters', value: chars, color: 'text-blue-500' },
    { label: 'Chars (no space)', value: charsNoSpace, color: 'text-indigo-500' },
    { label: 'Words', value: words, color: 'text-green-500' },
    { label: 'Sentences', value: sentences, color: 'text-orange-500' },
    { label: 'Paragraphs', value: paragraphs, color: 'text-pink-500' },
    { label: 'Lines', value: lines, color: 'text-purple-500' },
    { label: 'Reading Time', value: `${readingTime} min`, color: 'text-cyan-500' },
    { label: 'Speaking Time', value: `${speakingTime} min`, color: 'text-rose-500' },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Character Counter</h1>
          <p className="text-muted-foreground">Count characters, words, sentences & more instantly.</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl border p-6">
          <textarea
            className="w-full h-56 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">{chars} characters</span>
              <button
                onClick={() => setText('')}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass p-5 rounded-2xl border text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Limits Checker */}
        <div className="glass rounded-3xl border p-6 space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">Platform Limits</p>
          <div className="space-y-3">
            {[
              { platform: 'Twitter / X', limit: 280 },
              { platform: 'Instagram Caption', limit: 2200 },
              { platform: 'Meta Description', limit: 160 },
              { platform: 'LinkedIn Post', limit: 3000 },
              { platform: 'YouTube Title', limit: 100 },
            ].map(({ platform, limit }) => {
              const percent = Math.min((chars / limit) * 100, 100)
              const over = chars > limit
              return (
                <div key={platform} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{platform}</span>
                    <span className={over ? 'text-red-500 font-bold' : 'text-muted-foreground'}>
                      {chars}/{limit} {over ? '⚠️ Over limit' : ''}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : percent > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Words */}
        {topWordsList.length > 0 && (
          <div className="glass rounded-3xl border p-6 space-y-4">
            <p className="text-sm font-semibold text-muted-foreground">Top Words</p>
            <div className="flex flex-wrap gap-2">
              {topWordsList.map(([word, count]) => (
                <div key={word} className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 rounded-lg">
                  <span className="text-sm font-medium">{word}</span>
                  <span className="text-xs text-primary font-bold">×{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ToolContentSection data={toolContent["character-counter"]} />

      </div>
    </div>
  )
}
