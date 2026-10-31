'use client'

import { useState, useEffect } from 'react'

/**
 * Detects if WebGL is available and if the user hasn't opted into reduced motion.
 * Returns true only if both WebGL is supported and motion is not reduced.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setSupported(false)
      return
    }

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(gl !== null)
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
