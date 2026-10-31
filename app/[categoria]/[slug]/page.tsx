import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts, getPostBySlug } from '@/content/posts'
import { ShareButton } from '@/components/share-button'

interface PageProps {
  params: Promise<{ categoria: string; slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    categoria: post.categoria,
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, slug } = await params
  const post = getPostBySlug(categoria, slug)

  if (!post) {
    return { title: 'Nao encontrado' }
  }

  return {
    title: post.titulo,
    description: post.resumo,
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      images: [{ url: post.imagem, width: 1200, height: 630 }],
      type: 'article',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titulo,
      description: post.resumo,
      images: [post.imagem],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { categoria, slug } = await params
  const post = getPostBySlug(categoria, slug)

  if (!post) {
    notFound()
  }

  const categoriaLabel =
    post.categoria === 'receitas'
      ? 'receita'
      : post.categoria === 'avaliacoes'
        ? 'avaliacao'
        : 'noticia'

  return (
    <article className="pb-16 lg:pb-24">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[300px] w-full lg:h-[60vh]">
        <img
          src={post.imagem}
          alt={post.titulo}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-acai/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-[68ch] px-4 lg:px-6">
        {/* Meta */}
        <div className="mt-8 flex items-center gap-3 text-meta text-tinta/60">
          <span className={
            post.categoria === 'receitas' ? 'text-coentro' :
            'text-farofa'
          }>
            {categoriaLabel}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.autor}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.data}>
            {new Date(post.data + 'T00:00:00').toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          {post.tempoLeitura && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{post.tempoLeitura}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-display mt-4 text-tinta">{post.titulo}</h1>

        {/* Rating */}
        {post.nota !== undefined && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-pimenta/10 px-3 py-1.5">
            <span className="text-xl font-bold text-pimenta">
              {post.nota.toFixed(1)}
            </span>
            <span className="text-meta text-pimenta/80">/ 10</span>
          </div>
        )}

        {/* Body */}
        <div className="mt-8 space-y-4">
          {post.corpo.map((paragraph, i) => (
            <p key={i} className="text-body text-tinta/90">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Ingredients (receitas only) */}
        {post.ingredientes && post.ingredientes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h2 mb-4 text-tinta">Ingredientes</h2>
            <ul className="space-y-2">
              {post.ingredientes.map((item, i) => (
                <li
                  key={i}
                  className="text-body flex items-start gap-2 text-tinta/90"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-farofa"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps (receitas only) */}
        {post.passos && post.passos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h2 mb-4 text-tinta">Modo de preparo</h2>
            <ol className="space-y-4">
              {post.passos.map((step, i) => (
                <li key={i} className="text-body flex gap-3 text-tinta/90">
                  <span className="shrink-0 text-lg font-bold text-farofa">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Share button */}
        <div className="mt-12 border-t border-tinta/10 pt-8">
          <ShareButton title={post.titulo} text={post.resumo} />
        </div>
      </div>
    </article>
  )
}
