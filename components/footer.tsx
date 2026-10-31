import Link from 'next/link'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.64 31.64 0 0 0 0 12a31.64 31.64 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.64 31.64 0 0 0 24 12a31.64 31.64 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-acai text-papel">
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <span className="text-xl font-[800] tracking-tight">
              elfarofand<span className="text-farofa">o</span>
            </span>
            <p className="text-meta text-papel/60">
              Noticias, avaliacoes e receitas pra quem come de verdade.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://tiktok.com/@elfarofando"
              target="_blank"
              rel="noopener noreferrer"
              className="text-papel/70 transition-colors hover:text-farofa"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://instagram.com/elfarofando"
              target="_blank"
              rel="noopener noreferrer"
              className="text-papel/70 transition-colors hover:text-farofa"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://youtube.com/@elfarofando"
              target="_blank"
              rel="noopener noreferrer"
              className="text-papel/70 transition-colors hover:text-farofa"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-meta text-papel/60 lg:items-end">
            <a
              href="mailto:contato@elfarofando.com"
              className="transition-colors hover:text-farofa"
            >
              Fale com a gente
            </a>
            <Link href="/" className="transition-colors hover:text-farofa">
              Sobre
            </Link>
            <span>&copy; {year} Elfarofando</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
