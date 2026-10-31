'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * Tracks scroll progress (0 to 1) of a wrapper element.
 * The wrapper should be taller than the viewport (e.g. 300vh).
 * Progress is stored in a ref to avoid re-renders per frame.
 * Returns [progressRef, wrapperRef].
 */
export function useScrollProgress() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  const invalidateRef = useRef<(() => void) | null>(null)

  const setInvalidate = useCallback((fn: () => void) => {
    invalidateRef.current = fn
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    function onScroll() {
      const el = wrapperRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const scrollableDistance = el.offsetHeight - viewportH

      if (scrollableDistance <= 0) {
        progressRef.current = 0
        return
      }

      // rect.top goes from 0 (when wrapper top is at viewport top)
      // to -scrollableDistance (when wrapper bottom hits viewport bottom)
      const raw = -rect.top / scrollableDistance
      progressRef.current = Math.max(0, Math.min(1, raw))

      invalidateRef.current?.()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial calculation
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progressRef, wrapperRef, setInvalidate } as const
}
