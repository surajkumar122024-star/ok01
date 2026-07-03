import { MetadataRoute } from 'next'

const BASE_URL = 'https://ok01.vercel.app'

const tools = [
  'compressor',
  'resizer',
  'jpg-to-png',
  'png-to-jpg',
  'image-to-pdf',
  'webp-converter',
  'pdf-to-image',
  'image-cropper',
  'image-watermark',
  'svg-to-png',
  'image-rotate',
  'image-size-checker',
  'heic-to-jpg',
  'base64',
  'case-converter',
  'character-counter',
  'color-picker',
  'json-formatter',
  'password-generator',
  'pdf-merge',
  'pdf-split',
  'slug-generator',
  'text-repeater',
  'url-encoder',
  'word-counter',
  'youtube-thumbnail-converter',
]

const blogPosts = [
  // Existing articles
  'how-to-convert-png-to-jpg',
  'how-to-convert-jpg-to-png',
  'how-to-convert-pdf-to-image',
  'how-to-convert-image-to-pdf',
  'how-to-compress-images',
  'jpg-vs-png-vs-webp',
  'resize-images-for-social-media',
  'how-to-add-watermark-to-image',
  // New articles
  'how-to-use-base64-encoder-decoder',
  'case-converter-guide',
  'character-counter-for-writing-and-seo',
  'color-picker-guide-for-designers',
  'how-to-convert-heic-to-jpg',
  'image-cropper-complete-guide',
  'how-to-rotate-images-online',
  'image-size-checker-guide',
  'json-formatter-guide',
  'strong-password-generator-guide',
  'how-to-merge-pdf-files',
  'how-to-split-pdf-pages',
  'image-resizer-complete-guide',
  'slug-generator-for-seo',
  'how-to-convert-svg-to-png',
  'text-repeater-tool-guide',
  'url-encoder-decoder-guide',
  'webp-converter-complete-guide',
  'word-counter-for-writers',
  'youtube-thumbnail-downloader-guide',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const toolPages: MetadataRoute.Sitemap = tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...toolPages, ...blogPages]
}
