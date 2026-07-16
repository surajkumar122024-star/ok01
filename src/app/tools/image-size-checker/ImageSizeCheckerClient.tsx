'use client'

import { useState, useRef } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"

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

        {images.length > 0 && (
          <div className="space-y-6">
            {images.map((img, i) => (
              <div key={i} className="glass rounded-3xl border p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-20 h-20 object-cover rounded-2xl border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg truncate">{img.name}</p>
                    <p className="text-muted-foreground text-sm">{img.type}</p>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-muted-foreground hover:text-red-500 transition text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Width', value: `${img.width}px`, color: 'text-blue-500' },
                    { label: 'Height', value: `${img.height}px`, color: 'text-green-500' },
                    { label: 'File Size', value: formatSize(img.size), color: 'text-orange-500' },
                    { label: 'Aspect Ratio', value: img.aspectRatio, color: 'text-purple-500' },
                    { label: 'Megapixels', value: getMegapixels(img.width, img.height), color: 'text-pink-500' },
                    { label: 'Resolution', value: `${img.width}×${img.height}`, color: 'text-cyan-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted/30 p-4 rounded-2xl text-center">
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Social Media Compatibility</p>
                  <div className="flex flex-wrap gap-2">
                    {getSocialFit(img.width, img.height).map((fit, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          fit.startsWith('✅')
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-yellow-500/10 text-yellow-600'
                        }`}
                      >
                        {fit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setImages([])}
              className="w-full py-3 rounded-2xl border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="glass rounded-3xl border p-6 space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">Standard Image Sizes Reference</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Platform</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Size</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: 'Facebook Cover', size: '1640×856', ratio: '1.91:1' },
                  { platform: 'Instagram Square', size: '1080×1080', ratio: '1:1' },
                  { platform: 'Instagram Story', size: '1080×1920', ratio: '9:16' },
                  { platform: 'YouTube Thumbnail', size: '1280×720', ratio: '16:9' },
                  { platform: 'Twitter Header', size: '1500×500', ratio: '3:1' },
                  { platform: 'LinkedIn Banner', size: '1584×396', ratio: '4:1' },
                  { platform: 'WhatsApp DP', size: '500×500', ratio: '1:1' },
                ].map(({ platform, size, ratio }) => (
                  <tr key={platform} className="border-b border-border/50 hover:bg-muted/20 transition">
                    <td className="py-2 font-medium">{platform}</td>
                    <td className="py-2 text-primary font-mono">{size}</td>
                    <td className="py-2 text-muted-foreground">{ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ToolContentSection data={toolContent["image-size-checker"]} />

      </div>
    </div>
  )
}
