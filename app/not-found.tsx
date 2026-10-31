import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-display text-tinta">404</h1>
      <p className="text-body mt-4 max-w-[40ch] text-tinta/70">
        Essa pagina nao existe. Pode ter sido removida, ou voce digitou o endereco errado.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-farofa px-6 py-3 text-meta font-bold text-acai transition-colors hover:bg-pimenta hover:text-papel"
      >
        Voltar para a home
      </Link>
    </div>
  )
}
