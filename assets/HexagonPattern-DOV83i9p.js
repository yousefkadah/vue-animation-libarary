var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'

export interface HexagonPatternProps {
  class?: HTMLAttributes['class']
  /** Radius of each hexagon (centre to vertex) in pixels. */
  radius?: number
  /** Spacing in pixels between neighbouring hexagons. */
  gap?: number
  /** Horizontal offset of the pattern in pixels. */
  x?: number
  /** Vertical offset of the pattern in pixels. */
  y?: number
  /** \`horizontal\`: flat-top hexagons. \`vertical\`: pointy-top hexagons. */
  direction?: 'horizontal' | 'vertical'
  /** SVG \`stroke-dasharray\` of the outlines, e.g. \`4 2\` for dashes. */
  strokeDasharray?: string
  /** \`[column, row]\` hexagons to fill in. */
  hexagons?: Array<[col: number, row: number]>
}

type Direction = NonNullable<HexagonPatternProps['direction']>
type HexPoint = readonly [number, number]

const props = withDefaults(defineProps<HexagonPatternProps>(), {
  radius: 40,
  gap: 0,
  x: -1,
  y: -1,
  direction: 'horizontal',
  strokeDasharray: '0',
})

const id = useId()

function hexVertexList(cx: number, cy: number, r: number, direction: Direction): HexPoint[] {
  const startAngle = direction === 'horizontal' ? 0 : 30
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((startAngle + i * 60) * Math.PI) / 180
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
}

function hexPoints(cx: number, cy: number, r: number, direction: Direction): string {
  return hexVertexList(cx, cy, r, direction)
    .map(([px, py]) => \`\${px},\${py}\`)
    .join(' ')
}

function edgeKey(a: HexPoint, b: HexPoint): string {
  const [p, q] = a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1]) ? [a, b] : [b, a]
  return \`\${p[0].toFixed(6)},\${p[1].toFixed(6)}|\${q[0].toFixed(6)},\${q[1].toFixed(6)}\`
}

/** Every hexagon edge once, so dashed outlines don't double up where neighbours share an edge. */
function uniqueEdges(centers: [number, number][], r: number, direction: Direction): [HexPoint, HexPoint][] {
  const seen = new Set<string>()
  const edges: [HexPoint, HexPoint][] = []
  for (const [cx, cy] of centers) {
    const vertices = hexVertexList(cx, cy, r, direction)
    for (let i = 0; i < 6; i++) {
      const a = vertices[i]
      const b = vertices[(i + 1) % 6]
      const key = edgeKey(a, b)
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([a, b])
      }
    }
  }
  return edges
}

/** \`gap\` is the visible edge-to-edge spacing, so it is added along the shared-edge normal. */
function hexSpacing(r: number, direction: Direction, gap: number) {
  const sqrt3 = Math.sqrt(3)
  if (direction === 'horizontal') {
    const colStep = (3 * r) / 2 + (sqrt3 * gap) / 2
    const rowStep = sqrt3 * r + gap
    return { colStep, rowStep, tileW: colStep * 2, tileH: rowStep }
  }
  const colStep = sqrt3 * r + gap
  const rowStep = (3 * r) / 2 + (sqrt3 * gap) / 2
  return { colStep, rowStep, tileW: colStep, tileH: rowStep * 2 }
}

/** One repeating tile: two hexagons plus the copies that wrap around its edges. */
function tileGeometry(r: number, direction: Direction, gap: number) {
  const { colStep, rowStep, tileW, tileH } = hexSpacing(r, direction, gap)
  const canonical: [number, number][] =
    direction === 'horizontal'
      ? [
          [colStep / 2, rowStep / 2],
          [(colStep * 3) / 2, rowStep],
        ]
      : [
          [colStep / 2, rowStep / 2],
          [colStep, (rowStep * 3) / 2],
        ]

  const centers: [number, number][] = []
  for (const [cx, cy] of canonical) {
    const top = cy - r < 0
    const bottom = cy + r > tileH
    const left = cx - r < 0
    const right = cx + r > tileW
    centers.push([cx, cy])
    if (top) centers.push([cx, cy + tileH])
    if (bottom) centers.push([cx, cy - tileH])
    if (left) centers.push([cx + tileW, cy])
    if (right) centers.push([cx - tileW, cy])
    if (top && left) centers.push([cx + tileW, cy + tileH])
    if (top && right) centers.push([cx - tileW, cy + tileH])
    if (bottom && left) centers.push([cx + tileW, cy - tileH])
    if (bottom && right) centers.push([cx - tileW, cy - tileH])
  }
  return { tileW, tileH, centers }
}

function hexCenter(col: number, row: number, r: number, direction: Direction, gap: number): [number, number] {
  const { colStep, rowStep } = hexSpacing(r, direction, gap)
  if (direction === 'horizontal') {
    return [col * colStep + colStep / 2, row * rowStep + rowStep / 2 + (col % 2 !== 0 ? rowStep / 2 : 0)]
  }
  return [col * colStep + colStep / 2 + (row % 2 !== 0 ? colStep / 2 : 0), row * rowStep + rowStep / 2]
}

const geometry = computed(() => tileGeometry(props.radius, props.direction, props.gap))

const solidStroke = computed(() => {
  const dash = props.strokeDasharray.trim()
  return dash === '' || dash === 'none' || dash === '0'
})

const tileShapes = computed(() =>
  geometry.value.centers.map(([cx, cy]) => hexPoints(cx, cy, props.radius, props.direction)),
)

const dashedEdges = computed(() =>
  solidStroke.value ? [] : uniqueEdges(geometry.value.centers, props.radius, props.direction),
)

const filledHexagons = computed(() =>
  (props.hexagons ?? []).map(([col, row]) => {
    const [cx, cy] = hexCenter(col, row, props.radius, props.direction, props.gap)
    return hexPoints(cx, cy, props.radius - 1, props.direction)
  }),
)
<\/script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30', props.class)"
  >
    <defs>
      <pattern :id="id" :width="geometry.tileW" :height="geometry.tileH" patternUnits="userSpaceOnUse" :x="props.x" :y="props.y">
        <template v-if="solidStroke">
          <polygon
            v-for="(points, index) in tileShapes"
            :key="index"
            class="fill-none"
            :points="points"
            :stroke-dasharray="props.strokeDasharray"
          />
        </template>
        <template v-else>
          <line
            v-for="[a, b] in dashedEdges"
            :key="edgeKey(a, b)"
            class="fill-none"
            :x1="a[0]"
            :y1="a[1]"
            :x2="b[0]"
            :y2="b[1]"
            :stroke-dasharray="props.strokeDasharray"
          />
        </template>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="\`url(#\${id})\`" stroke="none" />
    <svg v-if="filledHexagons.length" class="overflow-visible" :x="props.x" :y="props.y">
      <polygon v-for="(points, index) in filledHexagons" :key="index" :points="points" stroke-width="0" />
    </svg>
  </svg>
</template>
`;export{e as default};