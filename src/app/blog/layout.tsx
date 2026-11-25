import type { ReactNode } from 'react'
import BlogArticleShell from '@/components/BlogArticleShell'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogArticleShell>{children}</BlogArticleShell>
}
