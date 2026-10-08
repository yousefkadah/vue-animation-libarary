<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface FlickeringGridProps {
  class?: HTMLAttributes['class']
  /** Size of each square in pixels. */
  squareSize?: number
  /** Gap between squares in pixels. */
  gridGap?: number
  /** Chance per second that a square changes its opacity. */
  flickerChance?: number
  /** Colour of the squares (any CSS colour). */
  color?: string
  /** Fixed canvas width in pixels. Defaults to the container's width. */
  width?: number
  /** Fixed canvas height in pixels. Defaults to the container's height. */
  height?: number
  /** Highest opacity a square can reach. */
  maxOpacity?: number
}

const props = withDefaults(defineProps<FlickeringGridProps>(), {
  squareSize: 4,
  gridGap: 6,
  flickerChance: 0.3,
  color: 'rgb(0, 0, 0)',
  maxOpacity: 0.3,
})

interface Grid {
  columns: number
  rows: number
  squares: Float32Array
  dpr: number
}

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasSize = ref({ width: 0, height: 0 })

let context: CanvasRenderingContext2D | null = null
let grid: Grid | null = null
let rgbaPrefix = 'rgba(0, 0, 0,'
let animationFrame: number | null = null
let lastTime = 0
let isInView = false
let reducedMotion: MediaQueryList | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null

/** Resolves any CSS colour to an `rgba(r, g, b,` prefix so each square only appends its opacity. */
function toRgbaPrefix(color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return 'rgba(0, 0, 0,'
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
  return `rgba(${r}, ${g}, ${b},`
}

function setupCanvas() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return
  const width = props.width || container.clientWidth
  const height = props.height || container.clientHeight
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvasSize.value = { width, height }

  const cell = props.squareSize + props.gridGap
  const columns = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)
  const squares = new Float32Array(columns * rows)
  for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * props.maxOpacity
  grid = { columns, rows, squares, dpr }
}

function updateSquares(deltaTime: number) {
  if (!grid) return
  for (let i = 0; i < grid.squares.length; i++) {
    if (Math.random() < props.flickerChance * deltaTime) grid.squares[i] = Math.random() * props.maxOpacity
  }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !context || !grid) return
  const { columns, rows, squares, dpr } = grid
  const cell = props.squareSize + props.gridGap
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      context.fillStyle = `${rgbaPrefix}${squares[i * rows + j]})`
      context.fillRect(i * cell * dpr, j * cell * dpr, props.squareSize * dpr, props.squareSize * dpr)
    }
  }
}

function frame(time: number) {
  const deltaTime = lastTime ? (time - lastTime) / 1000 : 0
  lastTime = time
  updateSquares(deltaTime)
  draw()
  animationFrame = requestAnimationFrame(frame)
}

function stop() {
  if (animationFrame !== null) cancelAnimationFrame(animationFrame)
  animationFrame = null
  lastTime = 0
}

/** Animate only while on screen, and never when the user prefers reduced motion. */
function syncAnimation() {
  const shouldAnimate = isInView && !reducedMotion?.matches
  if (shouldAnimate && animationFrame === null) animationFrame = requestAnimationFrame(frame)
  else if (!shouldAnimate) stop()
}

function rebuild() {
  setupCanvas()
  draw()
}

onMounted(() => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return
  context = canvas.getContext('2d')
  rgbaPrefix = toRgbaPrefix(props.color)
  rebuild()

  resizeObserver = new ResizeObserver(rebuild)
  resizeObserver.observe(container)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isInView = entry?.isIntersecting ?? false
      syncAnimation()
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null
  reducedMotion?.addEventListener?.('change', syncAnimation)
})

watch(() => [props.squareSize, props.gridGap, props.maxOpacity, props.width, props.height], rebuild)

watch(
  () => props.color,
  (color) => {
    rgbaPrefix = toRgbaPrefix(color)
    draw()
  },
)

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  reducedMotion?.removeEventListener?.('change', syncAnimation)
})
</script>

<template>
  <div ref="containerRef" :class="cn('h-full w-full', props.class)">
    <canvas
      ref="canvasRef"
      aria-hidden="true"
      class="pointer-events-none"
      :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }"
    />
  </div>
</template>
