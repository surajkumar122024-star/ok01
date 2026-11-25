'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

function getVariant(pathname: string) {
  const slug = pathname.split('/').filter(Boolean).pop() || ''
  const hash = [...slug].reduce((total, char) => total + char.charCodeAt(0), 0)
  return ['editorial', 'field-guide', 'cards', 'minimal'][hash % 4]
}

export default function BlogArticleShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return <div className={`blog-article-shell blog-article-shell--${getVariant(pathname)}`}>{children}</div>
}
