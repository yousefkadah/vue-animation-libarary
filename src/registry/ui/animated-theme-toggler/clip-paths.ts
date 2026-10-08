export type ThemeTransitionVariant = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'rectangle' | 'star'

function collapsedPolygon(point: string, vertexCount: number): string {
  return `polygon(${Array.from({ length: vertexCount }, () => point).join(', ')})`
}

/**
 * Start and end clip-paths for the reveal, centred on (cx, cy).
 *
 * Every coordinate is a percentage of the snapshot box rather than pixels: Chrome renders px
 * clip-paths on `::view-transition-new(root)` unscaled on fractional display scales (e.g. Windows at
 * 150%) for the first transition after load, which puts the shape in the wrong place.
 */
export function getThemeTransitionClipPaths(
  variant: ThemeTransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) => `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`
  const center = point(cx, cy)

  switch (variant) {
    case 'square': {
      const halfSide = Math.max(Math.max(cx, viewportWidth - cx), Math.max(cy, viewportHeight - cy)) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ]
      return [collapsedPolygon(center, 4), `polygon(${end.join(', ')})`]
    }
    case 'triangle': {
      const size = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * size
      const end = [point(cx, cy - size), point(cx + dx, cy + 0.5 * size), point(cx - dx, cy + 0.5 * size)]
      return [collapsedPolygon(center, 3), `polygon(${end.join(', ')})`]
    }
    case 'diamond': {
      // Slightly larger than the circle radius so the corners still cover the viewport.
      const radius = maxRadius * Math.SQRT2
      const end = [point(cx, cy - radius), point(cx + radius, cy), point(cx, cy + radius), point(cx - radius, cy)]
      return [collapsedPolygon(center, 4), `polygon(${end.join(', ')})`]
    }
    case 'hexagon': {
      const radius = maxRadius * Math.SQRT2
      const end = Array.from({ length: 6 }, (_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI) / 3
        return point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
      })
      return [collapsedPolygon(center, 6), `polygon(${end.join(', ')})`]
    }
    case 'rectangle': {
      const halfWidth = Math.max(cx, viewportWidth - cx)
      const halfHeight = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy + halfHeight),
        point(cx - halfWidth, cy + halfHeight),
      ]
      return [collapsedPolygon(center, 4), `polygon(${end.join(', ')})`]
    }
    case 'star': {
      // A small overscan so the last frames never leave a 1px seam.
      const radius = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const star = (outer: number) => {
        const vertices: string[] = []
        for (let index = 0; index < 5; index++) {
          const outerAngle = -Math.PI / 2 + (index * 2 * Math.PI) / 5
          vertices.push(point(cx + outer * Math.cos(outerAngle), cy + outer * Math.sin(outerAngle)))
          const innerAngle = outerAngle + Math.PI / 5
          vertices.push(point(cx + outer * innerRatio * Math.cos(innerAngle), cy + outer * innerRatio * Math.sin(innerAngle)))
        }
        return `polygon(${vertices.join(', ')})`
      }
      return [star(Math.max(2, radius * 0.025)), star(radius)]
    }
    default:
      return [`circle(0% at ${center})`, `circle(${toRadius(maxRadius)} at ${center})`]
  }
}
