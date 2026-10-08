var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  MAX_ANGLE,
  MIN_ANGLE,
  PERSPECTIVE_PX,
  clamp,
  colorToRgba,
  createRetroGridScene,
  type RetroGridScene,
} from './shader'

export interface RetroGridProps {
  class?: HTMLAttributes['class']
  /** Tilt of the grid in degrees (1–89). */
  angle?: number
  /** Size of one grid cell in pixels. */
  cellSize?: number
  /** Opacity of the whole grid. */
  opacity?: number
  /** Line colour in light mode (any CSS colour). */
  lightLineColor?: string
  /** Line colour in dark mode (any CSS colour). */
  darkLineColor?: string
}

const props = withDefaults(defineProps<RetroGridProps>(), {
  angle: 65,
  cellSize: 60,
  opacity: 0.5,
  lightLineColor: 'gray',
  darkLineColor: 'gray',
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
/** Its computed colour is the active line colour, whichever way the app implements dark mode. */
const colorProbeRef = ref<HTMLSpanElement | null>(null)
const isWebGlReady = ref(false)

const normalizedAngle = computed(() => clamp(props.angle, MIN_ANGLE, MAX_ANGLE))
const normalizedCellSize = computed(() => Math.max(props.cellSize, 1))

let scene: RetroGridScene | null = null
let width = 0
let height = 0
let lineColor: Float32Array = new Float32Array([0.5, 0.5, 0.5, 1])
let isVisible = true
let isContextLost = false
let animationFrame: number | null = null
let reducedMotion: MediaQueryList | null = null
let colorScheme: MediaQueryList | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let themeObserver: MutationObserver | null = null

function draw(timestamp: number) {
  if (!scene || !width || !height || isContextLost) return
  scene.draw({
    width,
    height,
    time: reducedMotion?.matches ? 0 : timestamp / 1000,
    angle: normalizedAngle.value,
    cellSize: normalizedCellSize.value,
    color: lineColor,
  })
}

function stop() {
  if (animationFrame !== null) cancelAnimationFrame(animationFrame)
  animationFrame = null
}

function frame(timestamp: number) {
  draw(timestamp)
  animationFrame = !reducedMotion?.matches && isVisible ? requestAnimationFrame(frame) : null
}

/** (Re)builds the WebGL scene when needed, resizes it, redraws, and starts or stops the loop. */
function syncScene() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return
  if (!isContextLost && !scene) scene = createRetroGridScene(canvas)
  if (isContextLost || !scene) {
    stop()
    isWebGlReady.value = false
    return
  }

  width = Math.floor(container.clientWidth)
  height = Math.floor(container.clientHeight)
  if (!width || !height) {
    stop()
    return
  }

  scene.resize(width, height)
  if (colorProbeRef.value) lineColor = colorToRgba(getComputedStyle(colorProbeRef.value).color)
  draw(performance.now())
  isWebGlReady.value = true

  if (reducedMotion?.matches || !isVisible) stop()
  else if (animationFrame === null) animationFrame = requestAnimationFrame(frame)
}

function onContextLost(event: Event) {
  event.preventDefault()
  isContextLost = true
  scene = null
  stop()
  isWebGlReady.value = false
}

function onContextRestored() {
  isContextLost = false
  syncScene()
}

onMounted(() => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null
  colorScheme = window.matchMedia?.('(prefers-color-scheme: dark)') ?? null
  reducedMotion?.addEventListener?.('change', syncScene)
  colorScheme?.addEventListener?.('change', syncScene)
  window.addEventListener('resize', syncScene)
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  resizeObserver = new ResizeObserver(syncScene)
  resizeObserver.observe(container)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry?.isIntersecting ?? false
    if (isVisible) syncScene()
    else stop()
  })
  intersectionObserver.observe(container)

  // Theme toggles usually flip a class or attribute on <html>.
  themeObserver = new MutationObserver(syncScene)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] })

  syncScene()
})

watch(() => [props.angle, props.cellSize, props.lightLineColor, props.darkLineColor], syncScene, { flush: 'post' })

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  themeObserver?.disconnect()
  reducedMotion?.removeEventListener?.('change', syncScene)
  colorScheme?.removeEventListener?.('change', syncScene)
  window.removeEventListener('resize', syncScene)
  canvasRef.value?.removeEventListener('webglcontextlost', onContextLost)
  canvasRef.value?.removeEventListener('webglcontextrestored', onContextRestored)
  scene?.dispose()
  scene = null
})
<\/script>

<template>
  <div
    ref="containerRef"
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute size-full overflow-hidden [--retro-grid-line:var(--retro-grid-light-line)] dark:[--retro-grid-line:var(--retro-grid-dark-line)]',
        props.class,
      )
    "
    :style="{
      opacity: props.opacity,
      '--retro-grid-light-line': props.lightLineColor,
      '--retro-grid-dark-line': props.darkLineColor,
    }"
  >
    <span ref="colorProbeRef" class="hidden text-(--retro-grid-line)" />

    <!-- CSS fallback while WebGL starts up, or when it isn't available -->
    <div v-if="!isWebGlReady" class="absolute inset-0" :style="{ perspective: \`\${PERSPECTIVE_PX}px\` }">
      <div class="absolute inset-0" :style="{ transform: \`rotateX(\${normalizedAngle}deg)\` }">
        <div
          class="animate-retro-grid absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] [background-image:linear-gradient(to_right,var(--retro-grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--retro-grid-line)_1px,transparent_0)] bg-repeat motion-reduce:animate-none"
          :style="{ backgroundSize: \`\${normalizedCellSize}px \${normalizedCellSize}px\`, transform: 'translateY(-50%)' }"
        />
      </div>
    </div>

    <canvas ref="canvasRef" :class="cn('absolute inset-0 size-full', isWebGlReady ? 'opacity-100' : 'opacity-0')" />

    <div class="absolute inset-0 bg-linear-to-t from-background to-transparent to-90%" />
  </div>
</template>
`;export{e as default};