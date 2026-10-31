'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/receitas', label: 'Receitas' },
  { href: '/avaliacoes', label: 'Avaliacoes' },
  { href: '/noticias', label: 'Noticias' },
]

const MENU_ID = 'mobile-nav-menu'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const lastLinkRef = useRef<HTMLAnchorElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  // Focus management: move focus into dialog when opening, back to button when closing
  useEffect(() => {
    if (menuOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden'
      // Focus first link after render
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus()
      })
    } else {
      document.body.style.overflow = ''
      buttonRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close on Escape + tab trap
  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (e.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return

        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-acai/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 lg:h-16 lg:px-6">
          <Link
            href="/"
            className="text-xl font-[800] tracking-tight text-papel"
            onClick={closeMenu}
          >
            elfarofand
            <span className="text-farofa">o</span>
          </Link>

          <nav className="hidden gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-meta text-papel/80 transition-colors hover:text-farofa"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            ref={buttonRef}
            type="button"
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center gap-[5px] p-2 lg:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
          >
            <span
              className={cn(
                'block h-[2px] w-6 bg-papel transition-transform duration-200',
                menuOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block h-[3px] w-6 bg-papel transition-opacity duration-200',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-[2px] w-6 bg-papel transition-transform duration-200',
                menuOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={dialogRef}
          id={MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegacao"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-acai pt-14 lg:hidden"
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={
                  i === 0
                    ? firstLinkRef
                    : i === navLinks.length - 1
                      ? lastLinkRef
                      : undefined
                }
                onClick={closeMenu}
                className="text-h2 text-papel transition-colors hover:text-farofa"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
