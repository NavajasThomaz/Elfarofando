'use client'

import { useState, useMemo } from 'react'
import type { Post, Tag } from '@/content/types'
import { PostCard } from '@/components/post-card'
import { cn } from '@/lib/utils'

const tagLabels: { value: Tag | 'todas'; label: string }[] = [
  { value: 'todas', label: 'todas' },
  { value: 'rapidas', label: 'rapidas' },
  { value: 'vegetarianas', label: 'vegetarianas' },
  { value: 'doces', label: 'doces' },
  { value: 'boteco', label: 'boteco' },
  { value: 'carnes', label: 'carnes' },
]

interface ReceitasFilterProps {
  receitas: Post[]
}

export function ReceitasFilter({ receitas }: ReceitasFilterProps) {
  const [activeTag, setActiveTag] = useState<Tag | 'todas'>('todas')

  const filtered = useMemo(() => {
    if (activeTag === 'todas') return receitas
    return receitas.filter((r) => r.tags.includes(activeTag))
  }, [receitas, activeTag])

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {tagLabels.map((tag) => (
          <button
            key={tag.value}
            type="button"
            onClick={() => setActiveTag(tag.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-meta transition-colors',
              activeTag === tag.value
                ? 'bg-farofa text-acai font-bold'
                : 'bg-acai/5 text-tinta/70 hover:bg-acai/10'
            )}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-body text-tinta/60 py-12 text-center">
          Nenhuma receita com essa tag ainda.
        </p>
      )}
    </>
  )
}
