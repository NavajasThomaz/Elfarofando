import type { Metadata } from 'next'
import { noticias } from '@/content/posts'
import { PostCard } from '@/components/post-card'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Noticias do mundo gastronomico brasileiro. Festivais, precos, tendencias e curiosidades.',
}

export default function NoticiasPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-16 lg:px-6 lg:pt-24 lg:pb-24">
      <SectionHeading>Noticias</SectionHeading>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
