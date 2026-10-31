import type { Metadata } from 'next'
import { avaliacoes } from '@/content/posts'
import { PostCard } from '@/components/post-card'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Avaliacoes',
  description: 'Avaliacoes honestas de restaurantes, lanchonetes e botecos. Com nota e sem frescura.',
}

export default function AvaliacoesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-16 lg:px-6 lg:pt-24 lg:pb-24">
      <SectionHeading>Avaliacoes</SectionHeading>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {avaliacoes.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
