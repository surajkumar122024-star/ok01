'use client'

import { useState, useEffect } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ")

function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)] }

function makeSentence(minWords = 6, maxWords = 14): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords))
  const words = Array.from({ length: len }, () => randomWord())
  words[0] = words[0][0].toUpperCase() + words[0].slice(1)
  return words.join(" ") + "."
}

function makeParagraph(sentences = 5): string {
  return Array.from({ length: sentences }, () => makeSentence()).join(" ")
}

type Unit = 'words' | 'sentences' | 'paragraphs'

export default function LoremIpsumClient() {
  const [unit, setUnit] = useState<Unit>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let result = ''
    if (unit === 'words') {
      const words = Array.from({ length: count }, () => randomWord())
      if (startWithLorem) { words[0] = 'lorem'; words[1] && (words[1] = 'ipsum') }
      words[0] = words[0][0].toUpperCase() + words[0].slice(1)
      result = words.join(' ') + '.'
    } else if (unit === 'sentences') {
      const sentences = Array.from({ length: count }, () => makeSentence())
      if (startWithLorem) sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      result = sentences.join(' ')
    } else {
      const paragraphs = Array.from({ length: count }, () => makeParagraph())
      if (startWithLorem) paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0]
      result = paragraphs.join('\n\n')
    }
    setOutput(result)
  }

  useEffect(() => { generate() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
          <p className="text-muted-foreground">Generate placeholder text for designs and mockups, instantly.</p>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-5">
          <div className="flex gap-2 p-1 bg-muted/40 rounded-2xl">
            {(['words', 'sentences', 'paragraphs'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition ${unit === u ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}`}
              >
                {u}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              Count
              <input
                type="number"
                min={1}
                max={unit === 'words' ? 200 : unit === 'sentences' ? 50 : 20}
                value={count}
                onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 bg-muted/40 rounded-lg px-3 py-1.5 outline-none"
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />
              Start with &quot;Lorem ipsum...&quot;
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
            <label className="text-sm font-semibold text-muted-foreground">Output</label>
            <button onClick={copy} className="text-sm text-primary hover:underline transition">
              {copied ? '✅ Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">{output}</div>
        </div>

        <ToolContentSection data={toolContent["lorem-ipsum-generator"]} />

      </div>
    </div>
  )
}
