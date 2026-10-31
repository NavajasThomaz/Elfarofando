import Link from 'next/link'
import type { Post } from '@/content/types'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  priority?: boolean
}

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group">
      <Link
        href={`/${post.categoria}/${post.slug}`}
        className="block overflow-hidden rounded-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-acai/5">
          <img
            src={post.imagem}
            alt={post.titulo}
            loading={priority ? 'eager' : 'lazy'}
            width={1200}
            height={750}
            className="h-full w-full object-cover"
          />
          {post.nota !== undefined && (
            <span className="absolute top-3 right-3 rounded-md bg-pimenta px-2 py-1 text-sm font-bold text-papel">
              {post.nota.toFixed(1)}
            </span>
          )}
        </div>
        <div className="pt-3">
          <div className="flex items-center gap-2 text-meta text-tinta/50">
            <span className={cn(
              post.categoria === 'receitas' && 'text-coentro',
              post.categoria === 'avaliacoes' && 'text-farofa',
              post.categoria === 'noticias' && 'text-farofa',
            )}>
              {post.categoria === 'receitas' && 'receita'}
              {post.categoria === 'avaliacoes' && 'avaliacao'}
              {post.categoria === 'noticias' && 'noticia'}
            </span>
            {post.tempoLeitura && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.tempoLeitura}</span>
              </>
            )}
          </div>
          <h3 className="text-h3 mt-1 text-tinta">
            {post.titulo}
          </h3>
          <p className="text-body mt-1 line-clamp-2 text-tinta/70">
            {post.resumo}
          </p>
        </div>
      </Link>
    </article>
  )
}
