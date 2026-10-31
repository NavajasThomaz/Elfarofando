'use client'

import { useEffect, useState, type RefObject } from 'react'
import { cn } from '@/lib/utils'

interface HeroTextProps {
  progressRef: RefObject<number>
}

const lines = [
  { text: 'Pao.', start: 0.0, end: 0.15 },
  { text: 'Carne.', start: 0.15, end: 0.30 },
  { text: 'Queijo.', start: 0.30, end: 0.45 },
  { text: 'Tomate.', start: 0.45, end: 0.58 },
  { text: 'Alface.', start: 0.58, end: 0.72 },
]

export function HeroText({ progressRef }: HeroTextProps) {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(
    new Array(lines.length + 1).fill(false)
  )

  useEffect(() => {
    // If prefers-reduced-motion, show everything immediately
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setVisibleLines(new Array(lines.length + 1).fill(true))
      return
    }

    function onScroll() {
      const p = progressRef.current ?? 0
      const next = lines.map(
        (line) => p >= line.start + (line.end - line.start) * 0.3
      )
      const showTitle = p >= 0.90
      const combined = [...next, showTitle]

      setVisibleLines((prev) => {
        const changed = combined.some((v, i) => v !== prev[i])
        return changed ? combined : prev
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial check
    return () => window.removeEventListener('scroll', onScroll)
  }, [progressRef])

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 lg:justify-center lg:p-12">
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <span
            key={line.text}
            className={cn(
              'text-display text-papel transition-all duration-500',
              visibleLines[i]
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            )}
          >
            {line.text}
          </span>
        ))}
        <span
          className={cn(
            'text-display text-farofa transition-all duration-700',
            visibleLines[lines.length]
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          )}
        >
          Elfarofando.
        </span>
      </div>
      <p
        className={cn(
          'text-body mt-4 max-w-[40ch] text-papel/80 transition-all duration-700 delay-200',
          visibleLines[lines.length]
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        )}
      >
        Noticias, avaliacoes e receitas pra quem come de verdade.
      </p>
      <a
        href="#saiu-do-forno"
        className={cn(
          'pointer-events-auto mt-6 inline-block w-fit rounded-lg bg-farofa px-6 py-3',
          'text-meta font-bold text-acai transition-colors hover:bg-pimenta hover:text-papel',
          'transition-all duration-500 delay-300',
          visibleLines[lines.length]
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        )}
      >
        Ver o que saiu do forno
      </a>
    </div>
  )
}
