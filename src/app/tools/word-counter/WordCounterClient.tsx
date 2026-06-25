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
    </div>
  )
}
