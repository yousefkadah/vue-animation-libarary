var e=`import { LAND_POLYGONS } from './land'

/**
 * A dependency-free port of \`svg-dotted-map\`'s \`createMap\` (MIT): lays a grid of \`mapSamples\` cells
 * over a Mercator world map (latitudes −56…71, longitudes −179…179) and keeps the cells that fall on
 * land. Produces the same points as the original for the same \`width\` / \`height\` / \`mapSamples\`.
 */

export interface MapPoint {
  x: number
  y: number
}

interface Ring {
  coords: Float64Array
  length: number
  minX: number
  minY: number
  maxX: number
  maxY: number
}

interface Polygon {
  outer: Ring
  holes: Ring[]
}

interface Land {
  polygons: Polygon[]
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const EARTH_HALF_CIRCUMFERENCE = 20037508.34
const REGION = { lat: { min: -56, max: 71 }, lng: { min: -179, max: 179 } }
const VLQ_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
/** Dots are inset from the edges by \`radius * 1.25\`; the original's default radius is 0.3. */
const EDGE_INSET = 0.3 * 1.25

function project(lng: number, lat: number): [number, number] {
  const x = (lng * EARTH_HALF_CIRCUMFERENCE) / 180
  const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)
  return [x, (y * EARTH_HALF_CIRCUMFERENCE) / 180]
}

function decodeRing(encoded: string): Ring {
  const values: number[] = []
  let value = 0
  let shift = 0
  for (const char of encoded) {
    const digit = VLQ_ALPHABET.indexOf(char)
    value += (digit & 31) << shift
    if (digit & 32) {
      shift += 5
      continue
    }
    values.push(value & 1 ? -(value >>> 1) : value >>> 1)
    value = 0
    shift = 0
  }

  const length = values.length / 2
  const coords = new Float64Array(values.length)
  let lng = 0
  let lat = 0
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (let index = 0; index < length; index++) {
    lng += values[index * 2]
    lat += values[index * 2 + 1]
    const [x, y] = project(lng / 100, lat / 100)
    coords[index * 2] = x
    coords[index * 2 + 1] = y
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return { coords, length, minX, minY, maxX, maxY }
}

let land: Land | null = null

function getLand(): Land {
  if (land) return land
  const polygons = LAND_POLYGONS.split('|').map((polygon) => {
    const [outer, ...holes] = polygon.split('!').map(decodeRing)
    return { outer, holes }
  })
  land = {
    polygons,
    minX: Math.min(...polygons.map((polygon) => polygon.outer.minX)),
    minY: Math.min(...polygons.map((polygon) => polygon.outer.minY)),
    maxX: Math.max(...polygons.map((polygon) => polygon.outer.maxX)),
    maxY: Math.max(...polygons.map((polygon) => polygon.outer.maxY)),
  }
  return land
}

function isInsideRing(x: number, y: number, ring: Ring): boolean {
  if (x < ring.minX || x > ring.maxX || y < ring.minY || y > ring.maxY) return false
  const { coords, length } = ring
  let inside = false
  for (let index = 0, previous = length - 1; index < length; previous = index++) {
    const xi = coords[index * 2]
    const yi = coords[index * 2 + 1]
    const xj = coords[previous * 2]
    const yj = coords[previous * 2 + 1]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function isOnLand(x: number, y: number, world: Land): boolean {
  if (x < world.minX || x > world.maxX || y < world.minY || y > world.maxY) return false
  for (const polygon of world.polygons) {
    if (!isInsideRing(x, y, polygon.outer)) continue
    if (!polygon.holes.some((hole) => isInsideRing(x, y, hole))) return true
  }
  return false
}

export interface CreateMapOptions {
  width: number
  height: number
  mapSamples: number
}

export function createMap({ width, height, mapSamples }: CreateMapOptions) {
  const aspect = width / height
  const rows = Math.round(Math.sqrt(mapSamples / aspect))
  const columns = Math.round(rows * aspect)

  const [xMin, yMin] = project(REGION.lng.min, REGION.lat.min)
  const [xMax, yMax] = project(REGION.lng.max, REGION.lat.max)
  const xRange = xMax - xMin
  const yRange = yMax - yMin
  const innerWidth = width - 2 * EDGE_INSET
  const innerHeight = height - 2 * EDGE_INSET

  const world = getLand()
  const points: MapPoint[] = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = EDGE_INSET + (column / (columns - 1)) * innerWidth
      const y = EDGE_INSET + (row / (rows - 1)) * innerHeight
      if (isOnLand((x / width) * xRange + xMin, yMax - (y / height) * yRange, world)) points.push({ x, y })
    }
  }

  /** Snaps each marker to the nearest grid cell, replacing \`lat\` / \`lng\` with \`x\` / \`y\`. */
  function addMarkers<M extends { lat: number; lng: number }>(markers: M[]) {
    return markers.map(({ lat, lng, ...rest }) => {
      const [projectedX, projectedY] = project(lng, lat)
      const column = Math.round(((projectedX - xMin) / xRange) * (columns - 1))
      const row = Math.round(((yMax - projectedY) / yRange) * (rows - 1))
      return {
        ...rest,
        x: EDGE_INSET + (column / (columns - 1)) * innerWidth,
        y: EDGE_INSET + (row / (rows - 1)) * innerHeight,
      }
    })
  }

  return { points, addMarkers }
}
`;export{e as default};