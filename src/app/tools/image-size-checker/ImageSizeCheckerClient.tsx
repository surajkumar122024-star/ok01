'use client'

import { useState, useRef } from 'react'

interface ImageInfo {
  name: string
  size: number
  type: string
  width: number
  height: number
  aspectRatio: string
  url: string
}

export default function ImageSizeCheckerClient() {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const getAspectRatio = (w: number, h: number) => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
    const d = gcd(w, h)
    return `${w / d}:${h / d}`
  }

  const processFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        setImages(prev => [...prev, {
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: getAspectRatio(img.naturalWidth, img.naturalHeight),
          url,
        }])
      }
      img.src = url
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getMegapixels = (w: number, h: number) =>
    ((w * h) / 1_000_000).toFixed(1) + ' MP'

  const getSocialFit = (w: number, h: number) => {
    const fits = []
    if (w >= 1200 && h >= 630) fits.push('✅ Facebook/LinkedIn')
    if (w >= 1280 && h >= 720) fits.push('✅ YouTube Thumbnail')
    if (w >= 1080 && h >= 1080) fits.push('✅ Instagram Square')
    if (w >= 1080 && h >= 1920) fits.push('✅ Instagram Story')
    if (w >= 1500 && h >= 500) fits.push('✅ Twitter Header')
    if (fits.length === 0) fits.push('⚠️ Too small for most platforms')
    return fits
  }

  const remove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Image Size Checker</h1>
          <p className="text-muted-foreground">
            Check image dimensions, file size, aspect ratio and social media fit instantly.
          </p>
        </div>

        <div
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            processFiles(e.dataTransfer.files)
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`glass border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-colors ${
            dragging ? 'border-primary bg-primary/5' : 'hover:border-primary'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && processFiles(e.target.files)}
          />
          <div className="text-5xl mb-4">🖼️</div>
          <p className="font-semibold text-lg">Drop images here or click to upload</p>
          <p className="text-muted-foreground text-sm mt-1">
            Supports JPG, PNG, WebP, GIF — multiple files allowed
          </p>
        </div>
