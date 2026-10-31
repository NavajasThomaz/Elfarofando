'use client'

import { useState, useCallback } from 'react'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  text: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
      } catch {
        // User cancelled or share failed — do nothing
      }
      return
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }, [title, text, url])

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border-2 border-farofa px-4 py-2',
        'text-meta font-semibold text-farofa transition-colors',
        'hover:bg-farofa hover:text-acai'
      )}
    >
      <Share2 size={18} aria-hidden="true" />
      {copied ? 'Link copiado' : 'Compartilhar'}
    </button>
  )
}
