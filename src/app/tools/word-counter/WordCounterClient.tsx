'use client'

import { useState } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"

export default function WordCounterClient() {
  const [text, setText] = useState('')
  
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Word Counter</h1>
          <p className="text-muted-foreground">Count words, characters, sentences &amp; paragraphs instantly.</p>
        </div>

        <div className="glass rounded-3xl border p-6">
          <textarea
            className="w-full h-56 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{words}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{chars}</div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sentences}</div>
            <div className="text-sm text-muted-foreground">Sentences</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{paragraphs}</div>
            <div className="text-sm text-muted-foreground">Paragraphs</div>
          </div>
        </div>

        <ToolContentSection data={toolContent["word-counter"]} />
      </div>
    </div>
  )
}
