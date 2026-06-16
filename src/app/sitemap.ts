import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://opticshift.pro';

  const staticPages = [
    '',
    '/tools',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclaimer',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const toolPages = TOOLS.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
