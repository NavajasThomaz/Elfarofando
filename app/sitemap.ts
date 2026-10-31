import type { MetadataRoute } from 'next'
import { posts } from '@/content/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elfarofando.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/receitas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/avaliacoes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.categoria}/${post.slug}`,
    lastModified: new Date(post.data + 'T00:00:00'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages]
}
