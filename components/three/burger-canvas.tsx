'use client'

import dynamic from 'next/dynamic'
import { useScrollProgress } from './use-scroll-progress'
import { useWebGLSupport } from './use-webgl-support'
import { HeroText } from '@/components/hero-text'

const BurgerScene = dynamic(
  () => import('./burger-scene').then((mod) => ({ default: mod.BurgerScene })),
  {
    ssr: false,
    loading: () => <Poster />,
  }
)

function Poster() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-acai">
      <img
        src="/posters/burger.svg"
        alt="Hamburguer ilustrado"
        width={400}
        height={400}
        className="h-auto w-2/3 max-w-[400px]"
      />
    </div>
  )
}

export function BurgerCanvas() {
  const { progressRef, wrapperRef, setInvalidate } = useScrollProgress()
  const webglSupported = useWebGLSupport()

  return (
    <section
      ref={wrapperRef}
      className="relative h-[300vh]"
      aria-label="Animacao do hamburguer"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-acai">
        {webglSupported === false && <Poster />}
        {webglSupported === true && (
          <BurgerScene
            progressRef={progressRef}
            setInvalidate={setInvalidate}
          />
        )}
        {webglSupported === null && <Poster />}
        <HeroText progressRef={progressRef} />
      </div>
    </section>
  )
}
