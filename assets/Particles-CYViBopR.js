var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface ParticlesProps {
  class?: HTMLAttributes['class']
  /** Number of particles. */
  quantity?: number
  /** How strongly particles resist the pointer; lower values follow it more. */
  staticity?: number
  /** Smoothing of the pointer attraction; higher values react more slowly. */
  ease?: number
  /** Base particle radius in pixels (each particle adds a random 0–1px). */
  size?: number
  /** Toggle to regenerate every particle. */
  refresh?: boolean
  /** Particle colour as a hex string (\`#fff\` or \`#ffffff\`). */
  color?: string
  /** Constant horizontal drift in pixels per frame. */
  vx?: number
  /** Constant vertical drift in pixels per frame. */
  vy?: number
}

const props = withDefaults(defineProps<ParticlesProps>(), {
  quantity: 100,
  staticity: 50,
  ease: 50,
  size: 0.4,
  refresh: false,
  color: '#ffffff',
  vx: 0,
  vy: 0,
})

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

function hexToRgb(hex: string): [number, number, number] {
  let value = hex.replace('#', '')
  if (value.length === 3) value = value.split('').map((char) => char + char).join('')
  const int = Number.parseInt(value, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const reducedMotion = useReducedMotion()
const rgb = computed(() => hexToRgb(props.color).join(', '))

let context: CanvasRenderingContext2D | null = null
let circles: Circle[] = []
let canvasSize = { w: 0, h: 0 }
let mouse = { x: 0, y: 0 }
let dpr = 1
let frame = 0
let resizeTimer: ReturnType<typeof setTimeout> | undefined
let resizeObserver: ResizeObserver | null = null

function createCircle(): Circle {
  return {
    x: Math.floor(Math.random() * canvasSize.w),
    y: Math.floor(Math.random() * canvasSize.h),
    translateX: 0,
    translateY: 0,
    size: Math.floor(Math.random() * 2) + props.size,
    alpha: 0,
    targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: 0.1 + Math.random() * 4,
  }
}

function drawCircle(circle: Circle) {
  if (!context) return
  context.translate(circle.translateX, circle.translateY)
  context.beginPath()
  context.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI)
  context.fillStyle = \`rgba(\${rgb.value}, \${circle.alpha})\`
  context.fill()
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function clear() {
  context?.clearRect(0, 0, canvasSize.w, canvasSize.h)
}

/** Sizes the canvas to its container (at device resolution) and scatters fresh particles. */
function initCanvas() {
  const container = containerRef.value
  const canvas = canvasRef.value
  if (!container || !canvas || !context) return
  dpr = window.devicePixelRatio || 1
  canvasSize = { w: container.offsetWidth, h: container.offsetHeight }
  canvas.width = canvasSize.w * dpr
  canvas.height = canvasSize.h * dpr
  canvas.style.width = \`\${canvasSize.w}px\`
  canvas.style.height = \`\${canvasSize.h}px\`
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  circles = Array.from({ length: props.quantity }, createCircle)
  if (reducedMotion.value) drawStatic()
}

/** Reduced motion: one still frame with every particle at its resting opacity. */
function drawStatic() {
  clear()
  for (const circle of circles) {
    circle.alpha = circle.targetAlpha
    drawCircle(circle)
  }
}

function remap(value: number, start1: number, end1: number, start2: number, end2: number) {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

function animate() {
  clear()
  circles.forEach((circle, index) => {
    // Fade particles out as they approach an edge.
    const closestEdge = Math.min(
      circle.x + circle.translateX - circle.size,
      canvasSize.w - circle.x - circle.translateX - circle.size,
      circle.y + circle.translateY - circle.size,
      canvasSize.h - circle.y - circle.translateY - circle.size,
    )
    const edgeFactor = Number.parseFloat(remap(closestEdge, 0, 20, 0, 1).toFixed(2))
    if (edgeFactor > 1) circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
    else circle.alpha = circle.targetAlpha * edgeFactor

    circle.x += circle.dx + props.vx
    circle.y += circle.dy + props.vy
    circle.translateX += (mouse.x / (props.staticity / circle.magnetism) - circle.translateX) / props.ease
    circle.translateY += (mouse.y / (props.staticity / circle.magnetism) - circle.translateY) / props.ease
    drawCircle(circle)

    // Replace particles that drift out of the canvas.
    if (
      circle.x < -circle.size ||
      circle.x > canvasSize.w + circle.size ||
      circle.y < -circle.size ||
      circle.y > canvasSize.h + circle.size
    ) {
      circles[index] = createCircle()
    }
  })
  frame = requestAnimationFrame(animate)
}

function start() {
  cancelAnimationFrame(frame)
  frame = 0
  if (reducedMotion.value) drawStatic()
  else frame = requestAnimationFrame(animate)
}

function onMouseMove(event: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const { w, h } = canvasSize
  const x = event.clientX - rect.left - w / 2
  const y = event.clientY - rect.top - h / 2
  if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) mouse = { x, y }
}

onMounted(() => {
  context = canvasRef.value?.getContext('2d') ?? null
  initCanvas()
  start()
  window.addEventListener('mousemove', onMouseMove)
  if (containerRef.value) {
    const container = containerRef.value
    resizeObserver = new ResizeObserver(() => {
      if (container.offsetWidth === canvasSize.w && container.offsetHeight === canvasSize.h) return
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(initCanvas, 200)
    })
    resizeObserver.observe(container)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(resizeTimer)
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onMouseMove)
})

watch(
  () => [props.refresh, props.quantity, props.size],
  () => initCanvas(),
)
watch(reducedMotion, start)
watch(rgb, () => {
  if (reducedMotion.value) drawStatic()
})
<\/script>

<template>
  <div ref="containerRef" aria-hidden="true" :class="cn('pointer-events-none', props.class)">
    <canvas ref="canvasRef" class="size-full" />
  </div>
</template>
`;export{e as default};