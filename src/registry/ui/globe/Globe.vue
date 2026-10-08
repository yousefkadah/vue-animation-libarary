<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import createGlobe, { type COBEOptions, type Globe as CobeGlobe } from 'cobe'
import { useMotionValue, useReducedMotion, useSpring } from 'motion-v'
import { cn } from '@/lib/utils'

export interface GlobeProps {
  class?: HTMLAttributes['class']
  /** cobe options, merged over the defaults. `width`, `height` and `phi` are managed for you. */
  config?: Partial<COBEOptions>
}

const props = defineProps<GlobeProps>()

/** Pixels of horizontal drag per radian of rotation. */
const MOVEMENT_DAMPING = 200

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

const rootRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const isReady = ref(false)
const isDragging = ref(false)
const reducedMotion = useReducedMotion()

const rotation = useMotionValue(0)
const smoothRotation = useSpring(rotation, { mass: 1, damping: 30, stiffness: 100 })

let globe: CobeGlobe | null = null
let resizeObserver: ResizeObserver | null = null
let frame = 0
let readyTimer: ReturnType<typeof setTimeout> | undefined
let phi = 0
let width = 0
let pointerStart: number | null = null
let pointerMovement = 0

function mount() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.offsetWidth
  const options = { ...GLOBE_CONFIG, ...props.config }
  phi = options.phi
  globe = createGlobe(canvas, { ...options, width, height: width })

  resizeObserver = new ResizeObserver(() => {
    const next = canvas.offsetWidth
    if (next === width) return
    width = next
    globe?.update({ width, height: width })
  })
  resizeObserver.observe(canvas)

  const render = () => {
    if (pointerStart === null && !reducedMotion.value) phi += 0.005
    globe?.update({ phi: phi + smoothRotation.get() })
    frame = requestAnimationFrame(render)
  }
  frame = requestAnimationFrame(render)
  readyTimer = setTimeout(() => (isReady.value = true), 0)
}

function unmount() {
  cancelAnimationFrame(frame)
  clearTimeout(readyTimer)
  resizeObserver?.disconnect()
  resizeObserver = null
  globe?.destroy()
  globe = null
  // cobe wraps the canvas in a positioning <div>; unwrap it so a re-created globe doesn't nest.
  const canvas = canvasRef.value
  const wrapper = canvas?.parentElement
  if (canvas && wrapper && wrapper !== rootRef.value) wrapper.replaceWith(canvas)
}

onMounted(mount)
onBeforeUnmount(unmount)
watch(
  () => props.config,
  () => {
    unmount()
    mount()
  },
  { deep: true },
)

function onPointerDown(event: PointerEvent) {
  pointerStart = event.clientX - pointerMovement
  isDragging.value = true
}

function onPointerUp() {
  pointerStart = null
  isDragging.value = false
}

function onPointerMove(event: PointerEvent) {
  if (pointerStart === null) return
  pointerMovement = event.clientX - pointerStart
  rotation.set(pointerMovement / MOVEMENT_DAMPING)
}
</script>

<template>
  <div ref="rootRef" :class="cn('absolute inset-0 mx-auto aspect-square w-full max-w-150', props.class)">
    <canvas
      ref="canvasRef"
      aria-hidden="true"
      :class="
        cn(
          'size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-500 contain-[layout_paint_size]',
          isReady && 'opacity-100',
          isDragging && 'cursor-grabbing',
        )
      "
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointerout="onPointerUp"
      @pointercancel="onPointerUp"
      @pointermove="onPointerMove"
    />
  </div>
</template>
