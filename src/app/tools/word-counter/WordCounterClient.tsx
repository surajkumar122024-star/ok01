'use client'

import { useState } from 'react'

export default function WordCounterClient() {
  const [text, setText] = useState('')
  
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length

  return (
    <div className="max-w-3xl mx-auto p-6">
      <textarea
        className="w-full h-64 p-4 border rounded-lg resize-none text-sm"
        placeholder="Yahan text paste karo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{words}</div>
          <div className="text-sm text-gray-600">Words</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{chars}</div>
          <div className="text-sm text-gray-600">Characters</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{sentences}</div>
          <div className="text-sm text-gray-600">Sentences</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{paragraphs}</div>
          <div className="text-sm text-gray-600">Paragraphs</div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-4 mt-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold">Why word count matters beyond just essays</h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Word and character counts aren't just for school essays — meta descriptions, tweet drafts,
          resume bullet points, and press releases often have unofficial or official length
          expectations. Watching the live count while you write helps you catch when a paragraph has
          run long, or confirm a piece hits a required minimum word count before submitting it.
        </p>
      </div>

      <div className="space-y-3 mt-4 max-w-3xl mx-auto">
        <details className="glass rounded-xl p-4">
          <summary className="cursor-pointer font-medium text-sm">How is a "word" counted here?</summary>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            Words are counted as sequences of characters separated by spaces or line breaks, matching
            how most word processors count them.
          </p>
        </details>
        <details className="glass rounded-xl p-4">
          <summary className="cursor-pointer font-medium text-sm">Does this tool save or store what I type?</summary>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            No, all counting happens locally in your browser as you type — nothing is sent to a server
            or saved anywhere.
          </p>
        </details>
      </div>
    </div>
  )
}
