import {
  Vector2,
  Vector3,
  LatheGeometry,
  TubeGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  BoxGeometry,
  PlaneGeometry,
} from 'three'

/**
 * Creates a plate geometry: shallow bowl via LatheGeometry.
 */
export function createPlateGeometry(): LatheGeometry {
  const points: Vector2[] = []
  const radius = 2.2
  const rimHeight = 0.25
  const bowlDepth = 0.15

  // Center dip
  points.push(new Vector2(0, -bowlDepth))

  // Bowl curve to rim
  const steps = 12
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = t * radius
    const y = -bowlDepth * Math.cos(t * Math.PI * 0.5)
    points.push(new Vector2(x, y))
  }

  // Rim lip
  points.push(new Vector2(radius, rimHeight * 0.3))
  points.push(new Vector2(radius + 0.08, rimHeight))
  points.push(new Vector2(radius + 0.02, rimHeight + 0.02))

  return new LatheGeometry(points, 48)
}

/**
 * Creates a single spaghetti noodle as TubeGeometry over CatmullRomCurve3.
 * Points are distributed within a disk of given radius.
 */
export function createNoodleGeometry(
  seed: number,
  diskRadius: number = 1.2,
  tubularSegments: number = 32
): TubeGeometry {
  // Seeded random
  function rand() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const points: Vector3[] = []
  const numPoints = 6

  for (let i = 0; i < numPoints; i++) {
    const angle = rand() * Math.PI * 2
    const r = rand() * diskRadius
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const y = (rand() - 0.5) * 0.3 + 0.1
    points.push(new Vector3(x, y, z))
  }

  const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0.5)
  return new TubeGeometry(curve, tubularSegments, 0.025, 8, false)
}

/**
 * Creates the sauce disk geometry.
 */
export function createSauceGeometry(): CylinderGeometry {
  return new CylinderGeometry(1.0, 1.1, 0.06, 32)
}

/**
 * Creates a basil leaf as a PlaneGeometry shaped like a leaf.
 */
export function createBasilGeometry(): PlaneGeometry {
  const geo = new PlaneGeometry(0.25, 0.4, 4, 6)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    // Pinch at top and bottom to make leaf shape
    const scale = 1 - Math.pow(Math.abs(y) / 0.2, 2) * 0.5
    pos.setX(i, x * Math.max(scale, 0.15))
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/**
 * Creates the fork handle geometry.
 */
export function createForkHandleGeometry(): CylinderGeometry {
  return new CylinderGeometry(0.025, 0.03, 1.8, 8)
}

/**
 * Creates a fork tine geometry.
 */
export function createForkTineGeometry(): BoxGeometry {
  return new BoxGeometry(0.015, 0.4, 0.015)
}
