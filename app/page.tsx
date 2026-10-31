import dynamic from 'next/dynamic'
import { getLatestPosts, getPostsByCategoria } from '@/content/posts'
import { PostCard } from '@/components/post-card'
import { SectionHeading } from '@/components/section-heading'

const BurgerCanvas = dynamic(
  () =>
    import('@/components/three/burger-canvas').then((mod) => ({
      default: mod.BurgerCanvas,
    })),
  { ssr: false }
)

const PastaCanvas = dynamic(
  () =>
    import('@/components/three/pasta-canvas').then((mod) => ({
      default: mod.PastaCanvas,
    })),
  { ssr: false }
)

export default function HomePage() {
  const latestPosts = getLatestPosts(6)
  const avaliacoes = getPostsByCategoria('avaliacoes').slice(0, 4)
  const noticias = getPostsByCategoria('noticias').slice(0, 4)

  return (
    <>
      {/* Hero — Burger 3D */}
      <BurgerCanvas />

      {/* Saiu do forno */}
      <section
        id="saiu-do-forno"
        className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-16 lg:px-6 lg:py-24"
      >
        <SectionHeading>Saiu do forno</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* Pasta 3D */}
      <PastaCanvas />

      {/* Avaliacoes */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-6 lg:py-24">
        <SectionHeading>Avaliacoes</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {avaliacoes.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Noticias */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-6 lg:py-24">
        <SectionHeading>Noticias</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {noticias.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
