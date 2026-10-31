'use client'

import { useRef, useMemo, useState, useEffect, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { DoubleSide } from 'three'
import {
  createPlateGeometry,
  createNoodleGeometry,
  createSauceGeometry,
  createBasilGeometry,
  createForkHandleGeometry,
  createForkTineGeometry,
} from './pasta-geometry'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface PastaNoodlesProps {
  progressRef: RefObject<number>
  noodleCount: number
}

export function PastaNoodles({ progressRef, noodleCount }: PastaNoodlesProps) {
  const plateGeo = useMemo(() => createPlateGeometry(), [])
  const sauceGeo = useMemo(() => createSauceGeometry(), [])
  const basilGeo = useMemo(() => createBasilGeometry(), [])
  const forkHandleGeo = useMemo(() => createForkHandleGeometry(), [])
  const forkTineGeo = useMemo(() => createForkTineGeometry(), [])

  const noodleGeos = useMemo(() => {
    const geos = []
    for (let i = 0; i < noodleCount; i++) {
      geos.push(createNoodleGeometry(i * 137 + 42, 1.0, 24))
    }
    return geos
  }, [noodleCount])

  const noodleRefs = useRef<(Mesh | null)[]>([])
  const forkRef = useRef<Group>(null)
  const sceneRef = useRef<Group>(null)

  // Basil positions and rotations — stable across re-renders
  const basilData = useMemo(
    () => [
      { pos: [0.3, 0.2, 0.2] as [number, number, number], rot: [-Math.PI / 3 + 0.12, 1.8, 0] as [number, number, number] },
      { pos: [-0.2, 0.18, -0.3] as [number, number, number], rot: [-Math.PI / 3 + 0.05, 0.6, 0] as [number, number, number] },
      { pos: [0.1, 0.22, -0.15] as [number, number, number], rot: [-Math.PI / 3 + 0.2, 2.4, 0] as [number, number, number] },
      { pos: [-0.35, 0.19, 0.25] as [number, number, number], rot: [-Math.PI / 3 + 0.08, 0.3, 0] as [number, number, number] },
    ],
    []
  )

  useFrame(({ camera }) => {
    const p = progressRef.current ?? 0

    // Phase 1 (0 -> 0.5): noodles fall into the plate staggered
    for (let i = 0; i < noodleCount; i++) {
      const mesh = noodleRefs.current[i]
      if (!mesh) continue

      const noodleStart = (i / noodleCount) * 0.45
      const noodleEnd = noodleStart + 0.12
      const fallP = Math.max(0, Math.min(1, (p - noodleStart) / (noodleEnd - noodleStart)))
      const eased = easeOutCubic(fallP)

      mesh.position.y = 3 * (1 - eased) + 0.05
      mesh.visible = p > noodleStart * 0.8
    }

    // Phase 2 (0.5 -> 1.0): fork descends, camera orbits
    if (forkRef.current) {
      const forkP = Math.max(0, Math.min(1, (p - 0.5) / 0.3))
      const eased = easeOutCubic(forkP)
      forkRef.current.position.y = 3 * (1 - eased) + 0.3
      forkRef.current.visible = p > 0.45
    }

    // Camera orbit in phase 2
    const orbitP = Math.max(0, Math.min(1, (p - 0.5) / 0.5))
    const orbitAngle = orbitP * (40 * Math.PI) / 180
    const baseAngle = Math.atan2(6, 0)
    const dist = 6
    const height = 3
    camera.position.x = Math.sin(baseAngle + orbitAngle) * dist
    camera.position.z = Math.cos(baseAngle + orbitAngle) * dist
    camera.position.y = height
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={sceneRef}>
      {/* Plate */}
      <mesh geometry={plateGeo} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#F0EDE8" roughness={0.2} />
      </mesh>

      {/* Sauce */}
      <mesh geometry={sauceGeo} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#B8321F" roughness={0.6} />
      </mesh>

      {/* Noodles */}
      {noodleGeos.map((geo, i) => (
        <mesh
          key={i}
          ref={(el) => { noodleRefs.current[i] = el }}
          geometry={geo}
          visible={false}
        >
          <meshStandardMaterial color="#EBC56B" roughness={0.35} />
        </mesh>
      ))}

      {/* Basil leaves */}
      {basilData.map((leaf, i) => (
        <mesh
          key={`basil-${i}`}
          geometry={basilGeo}
          position={leaf.pos}
          rotation={leaf.rot}
        >
          <meshStandardMaterial
            color="#3C7A4E"
            roughness={0.7}
            side={DoubleSide}
          />
        </mesh>
      ))}

      {/* Fork */}
      <group ref={forkRef} position={[0.4, 3, 0.1]} rotation={[0, 0, -0.15]} visible={false}>
        <mesh geometry={forkHandleGeo}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
        </mesh>
        {[-0.03, -0.01, 0.01, 0.03].map((offset, i) => (
          <mesh
            key={i}
            geometry={forkTineGeo}
            position={[offset, -1.1, 0]}
          >
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
