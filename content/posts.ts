import type { Post } from './types'
import { receitas } from './receitas'
import { avaliacoes } from './avaliacoes'
import { noticias } from './noticias'

export type { Post } from './types'
export type { Categoria, Tag } from './types'

export const posts: Post[] = [...receitas, ...avaliacoes, ...noticias]

export function getPostBySlug(categoria: string, slug: string): Post | undefined {
  return posts.find((p) => p.categoria === categoria && p.slug === slug)
}

export function getPostsByCategoria(categoria: string): Post[] {
  return posts.filter((p) => p.categoria === categoria)
}

export function getLatestPosts(count: number): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, count)
}

export { receitas, avaliacoes, noticias }
