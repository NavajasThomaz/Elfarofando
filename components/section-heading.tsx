import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id?: string
  children: ReactNode
}

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-h2 mb-6 text-tinta lg:mb-8"
    >
      {children}
    </h2>
  )
}
