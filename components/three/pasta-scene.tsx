'use client'

import { useEffect, useState, type RefObject } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { PastaNoodles } from './pasta-noodles'

interface SceneContentProps {
  progressRef: RefObject<number>
  setInvalidate: (fn: () => void) => void
  noodleCount: number
}

function SceneContent({ progressRef, setInvalidate, noodleCount }: SceneContentProps) {
  const { invalidate } = useThree()

  useEffect(() => {
    setInvalidate(invalidate)
  }, [invalidate, setInvalidate])

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.0}
        color="#FFF5E6"
        castShadow={false}
      />
      <Environment preset="city" />
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.35}
        scale={8}
        blur={2}
        far={4}
      />
      <PastaNoodles progressRef={progressRef} noodleCount={noodleCount} />
    </>
  )
}

interface PastaSceneProps {
  progressRef: RefObject<number>
  setInvalidate: (fn: () => void) => void
}

export function PastaScene({ progressRef, setInvalidate }: PastaSceneProps) {
  const [noodleCount, setNoodleCount] = useState(70)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setNoodleCount(40)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ fov: 30, position: [0, 3, 6], near: 0.1, far: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent
        progressRef={progressRef}
        setInvalidate={setInvalidate}
        noodleCount={noodleCount}
      />
    </Canvas>
  )
}
