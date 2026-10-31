'use client'

import { useRef, useMemo, type RefObject, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { DoubleSide } from 'three'
import {
  createBunBottomGeometry,
  createBunTopGeometry,
  createPattyGeometry,
  createCheeseGeometry,
  createTomatoGeometry,
  createLettuceGeometry,
  createSesameGeometry,
} from './burger-geometry'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function layerProgress(progress: number, start: number, end: number): number {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return easeOutCubic((progress - start) / (end - start))
}

interface LayerProps {
  progressRef: RefObject<number>
  start: number
  end: number
  finalY: number
  children: ReactNode
}

function AnimatedLayer({ progressRef, start, end, finalY, children }: LayerProps) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const p = progressRef.current ?? 0
    const t = layerProgress(p, start, end)
    const entryY = 4
    const rotX = (1 - t) * 0.15
    groupRef.current.position.y = finalY + (1 - t) * entryY
    groupRef.current.rotation.x = rotX
  })

  return <group ref={groupRef}>{children}</group>
}

interface BurgerLayersProps {
  progressRef: RefObject<number>
}

export function BurgerLayers({ progressRef }: BurgerLayersProps) {
  const bunBottomGeo = useMemo(() => createBunBottomGeometry(), [])
  const pattyGeo = useMemo(() => createPattyGeometry(), [])
  const cheeseGeo = useMemo(() => createCheeseGeometry(), [])
  const tomatoGeo = useMemo(() => createTomatoGeometry(), [])
  const lettuceGeo = useMemo(() => createLettuceGeometry(), [])
  const bunTopGeo = useMemo(() => createBunTopGeometry(), [])
  const sesameGeo = useMemo(() => createSesameGeometry(), [])

  // Sesame seed positions on top of the bun
  const sesamePositions = useMemo(() => {
    const seeds: [number, number, number][] = []
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * 0.7 + 0.15
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r
      const y = 0.65 - r * 0.15
      seeds.push([x, y, z])
    }
    return seeds
  }, [])

  const groupRef = useRef<Group>(null)

  // Slowly rotate the whole burger based on progress
  useFrame(() => {
    if (!groupRef.current) return
    const p = progressRef.current ?? 0
    groupRef.current.rotation.y = p * 0.6
  })

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {/* Pao de baixo */}
      <AnimatedLayer progressRef={progressRef} start={0.0} end={0.15} finalY={0}>
        <mesh geometry={bunBottomGeo}>
          <meshStandardMaterial color="#D9913F" roughness={0.75} />
        </mesh>
      </AnimatedLayer>

      {/* Carne */}
      <AnimatedLayer progressRef={progressRef} start={0.15} end={0.30} finalY={0.3}>
        <mesh geometry={pattyGeo}>
          <meshStandardMaterial color="#5A2E1B" roughness={0.9} />
        </mesh>
      </AnimatedLayer>

      {/* Queijo */}
      <AnimatedLayer progressRef={progressRef} start={0.30} end={0.45} finalY={0.5}>
        <mesh geometry={cheeseGeo}>
          <meshStandardMaterial color="#F2B233" roughness={0.4} />
        </mesh>
      </AnimatedLayer>

      {/* Tomate x2 */}
      <AnimatedLayer progressRef={progressRef} start={0.45} end={0.58} finalY={0.6}>
        <mesh geometry={tomatoGeo} position={[-0.35, 0, 0]}>
          <meshStandardMaterial color="#C8302B" roughness={0.5} />
        </mesh>
        <mesh geometry={tomatoGeo} position={[0.35, 0, 0]}>
          <meshStandardMaterial color="#C8302B" roughness={0.5} />
        </mesh>
      </AnimatedLayer>

      {/* Alface */}
      <AnimatedLayer progressRef={progressRef} start={0.58} end={0.72} finalY={0.72}>
        <mesh geometry={lettuceGeo}>
          <meshStandardMaterial color="#5FA05A" roughness={0.8} side={DoubleSide} />
        </mesh>
      </AnimatedLayer>

      {/* Pao de cima + gergelins */}
      <AnimatedLayer progressRef={progressRef} start={0.72} end={0.90} finalY={0.85}>
        <mesh geometry={bunTopGeo}>
          <meshStandardMaterial color="#D9913F" roughness={0.75} />
        </mesh>
        {sesamePositions.map((pos, i) => (
          <mesh key={i} geometry={sesameGeo} position={pos} scale={[1, 0.5, 1]}>
            <meshStandardMaterial color="#F4E3B5" roughness={0.6} />
          </mesh>
        ))}
      </AnimatedLayer>
    </group>
  )
}
