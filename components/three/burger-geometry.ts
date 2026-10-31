import { Vector2, LatheGeometry, CylinderGeometry, PlaneGeometry, SphereGeometry } from 'three'

/**
 * Creates a bun-bottom LatheGeometry: a flat disk with curved edges.
 */
export function createBunBottomGeometry(): LatheGeometry {
  const points: Vector2[] = []
  const radius = 1.2
  const height = 0.25
  const edgeRadius = 0.15

  // Flat bottom
  points.push(new Vector2(0, 0))
  points.push(new Vector2(radius - edgeRadius, 0))

  // Curved edge
  const steps = 8
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * (Math.PI / 2)
    const x = radius - edgeRadius + Math.sin(angle) * edgeRadius
    const y = (1 - Math.cos(angle)) * edgeRadius + (height - edgeRadius)
    points.push(new Vector2(x, y))
  }

  // Top flat
  points.push(new Vector2(0, height))

  return new LatheGeometry(points, 32)
}

/**
 * Creates a bun-top LatheGeometry: a dome shape.
 */
export function createBunTopGeometry(): LatheGeometry {
  const points: Vector2[] = []
  const radius = 1.2
  const domeHeight = 0.7

  // Bottom flat
  points.push(new Vector2(0, 0))
  points.push(new Vector2(radius, 0))

  // Dome curve
  const steps = 16
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const angle = t * (Math.PI / 2)
    const x = radius * Math.cos(angle)
    const y = domeHeight * Math.sin(angle)
    points.push(new Vector2(x, y))
  }

  return new LatheGeometry(points, 32)
}

/**
 * Creates a patty geometry with slight vertex noise for organic look.
 */
export function createPattyGeometry(): CylinderGeometry {
  const geo = new CylinderGeometry(1.1, 1.1, 0.2, 32, 1)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const dist = Math.sqrt(x * x + z * z)
    if (dist > 0.8) {
      // Add subtle noise to outer vertices
      const noise = (Math.random() - 0.5) * 0.04
      pos.setX(i, x + noise)
      pos.setZ(i, z + noise)
    }
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/**
 * Creates cheese geometry: a subdivided plane with drooping edges.
 */
export function createCheeseGeometry(): PlaneGeometry {
  const geo = new PlaneGeometry(2.4, 2.4, 12, 12)
  geo.rotateX(-Math.PI / 2)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const dist = Math.max(Math.abs(x), Math.abs(z))
    if (dist > 0.9) {
      // Droop edges
      const droop = (dist - 0.9) * -0.4
      pos.setY(i, pos.getY(i) + droop)
    }
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/**
 * Creates a tomato slice geometry.
 */
export function createTomatoGeometry(): CylinderGeometry {
  return new CylinderGeometry(0.45, 0.45, 0.08, 24)
}

/**
 * Creates lettuce geometry: a wavy ring.
 */
export function createLettuceGeometry(): PlaneGeometry {
  const geo = new PlaneGeometry(2.8, 2.8, 24, 24)
  geo.rotateX(-Math.PI / 2)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const dist = Math.sqrt(x * x + z * z)
    const angle = Math.atan2(z, x)
    // Wavy edge
    const wave = Math.sin(angle * 6) * 0.1 + Math.sin(angle * 3) * 0.05
    pos.setY(i, wave * (dist > 0.6 ? 1 : 0))
    // Trim center hole to make ring-like
    if (dist < 0.3) {
      pos.setY(i, -0.1)
    }
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

/**
 * Creates a sesame seed geometry (flattened sphere).
 */
export function createSesameGeometry(): SphereGeometry {
  return new SphereGeometry(0.04, 8, 6)
}
