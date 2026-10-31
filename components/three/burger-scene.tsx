'use client'

import { useEffect, type RefObject } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { BurgerLayers } from './burger-layers'

interface SceneContentProps {
  progressRef: RefObject<number>
  setInvalidate: (fn: () => void) => void
}

function SceneContent({ progressRef, setInvalidate }: SceneContentProps) {
  const { invalidate } = useThree()

  useEffect(() => {
    setInvalidate(invalidate)
  }, [invalidate, setInvalidate])

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFF0D4"
        castShadow={false}
      />
      <Environment preset="city" />
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        far={4}
      />
      <BurgerLayers progressRef={progressRef} />
    </>
  )
}

interface BurgerSceneProps {
  progressRef: RefObject<number>
  setInvalidate: (fn: () => void) => void
}

export function BurgerScene({ progressRef, setInvalidate }: BurgerSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ fov: 30, position: [0, 2, 6], near: 0.1, far: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent
        progressRef={progressRef}
        setInvalidate={setInvalidate}
      />
    </Canvas>
  )
}
