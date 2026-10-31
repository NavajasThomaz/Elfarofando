import type { Metadata } from 'next'
import { receitas } from '@/content/posts'
import { PostCard } from '@/components/post-card'
import { SectionHeading } from '@/components/section-heading'
import { ReceitasFilter } from './filter'

export const metadata: Metadata = {
  title: 'Receitas',
  description: 'Receitas brasileiras testadas e aprovadas. De coxinha a brigadeiro, do smash burger ao pao de queijo.',
}

export default function ReceitasPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-16 lg:px-6 lg:pt-24 lg:pb-24">
      <SectionHeading>Receitas</SectionHeading>
      <ReceitasFilter receitas={receitas} />
    </div>
  )
}
