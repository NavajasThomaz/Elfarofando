'use client'

import dynamic from 'next/dynamic'
import { useScrollProgress } from './use-scroll-progress'
import { useWebGLSupport } from './use-webgl-support'

const PastaScene = dynamic(
  () => import('./pasta-scene').then((mod) => ({ default: mod.PastaScene })),
  {
    ssr: false,
    loading: () => <Poster />,
  }
)

function Poster() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-acai">
      <img
        src="/posters/pasta.svg"
        alt="Prato de macarrao ilustrado"
        width={400}
        height={400}
        className="h-auto w-2/3 max-w-[400px]"
      />
    </div>
  )
}

export function PastaCanvas() {
  const { progressRef, wrapperRef, setInvalidate } = useScrollProgress()
  const webglSupported = useWebGLSupport()

  return (
    <section
      ref={wrapperRef}
      className="relative h-[200vh]"
      aria-label="Animacao do prato de macarrao"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-acai">
        {webglSupported === false && <Poster />}
        {webglSupported === true && (
          <PastaScene
            progressRef={progressRef}
            setInvalidate={setInvalidate}
          />
        )}
        {webglSupported === null && <Poster />}

        {/* Overlay text */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end p-6 lg:justify-center lg:p-12">
          <h2 className="text-h2 text-papel">Do rolo ao prato</h2>
          <p className="text-body mt-2 max-w-[40ch] text-papel/80">
            Receitas de massa feitas do zero, do jeito que a nonna ensinaria se ela tivesse TikTok.
          </p>
        </div>
      </div>
    </section>
  )
}
