<script setup lang="ts">
import type { Component, HTMLAttributes, VNode } from 'vue'
import { h, isVNode, onBeforeUnmount, onMounted, ref, render, watch } from 'vue'
import { Pause, Play } from '@lucide/vue'
import { useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

/** An icon: SVG markup, a component (e.g. a Lucide icon) or a vnode built with `h()`. */
export type IconCloudIcon = string | Component | VNode

export interface IconCloudProps {
  class?: HTMLAttributes['class']
  /** Icons to place on the sphere. */
  icons?: IconCloudIcon[]
  /** Image URLs to place on the sphere (cropped to circles). Used when `icons` is not set. */
  images?: string[]
  /** Show the play / pause button. */
  showControl?: boolean
}

const props = withDefaults(defineProps<IconCloudProps>(), {
  showControl: true,
})

interface SpherePoint {
  x: number
  y: number
  z: number
  id: number
}

interface RotationTarget {
  x: number
  y: number
  startX: number
  startY: number
  startTime: number
  duration: number
}

/** Logical canvas size in CSS pixels (the backing store is scaled by devicePixelRatio). */
const SIZE = 400
const ICON_SIZE = 40
const SVG_NS = 'http://www.w3.org/2000/svg'

const canvasRef = ref<HTMLCanvasElement>()
const isPaused = ref(false)
const reducedMotion = useReducedMotion()

let points: SpherePoint[] = []
let iconCanvases: HTMLCanvasElement[] = []
let loaded: boolean[] = []
let rotation = { x: 0, y: 0 }
let target: RotationTarget | null = null
let isDragging = false
let lastPointer = { x: 0, y: 0 }
let mouse = { x: 0, y: 0 }
let dpr = 1
let frame = 0
let disposed = false

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function items(): (IconCloudIcon | string)[] {
  return props.icons ?? props.images ?? []
}

/** Places `count` points evenly on a sphere of radius 100 (Fibonacci lattice). */
function buildSphere() {
  const count = items().length || 20
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))
  points = Array.from({ length: count }, (_, index) => {
    const y = index * offset - 1 + offset / 2
    const radius = Math.sqrt(1 - y * y)
    const phi = index * increment
    return { x: Math.cos(phi) * radius * 100, y: y * 100, z: Math.sin(phi) * radius * 100, id: index }
  })
}

function toSvgMarkup(icon: IconCloudIcon): string {
  if (typeof icon === 'string') return icon
  const container = document.createElement('div')
  render(isVNode(icon) ? icon : h(icon as Component), container)
  const markup = container.innerHTML
  render(null, container)
  return markup
}

function withNamespace(markup: string) {
  return /<svg[^>]*\sxmlns=/.test(markup) ? markup : markup.replace('<svg', `<svg xmlns="${SVG_NS}"`)
}

/** Pre-renders every icon / image into a small offscreen canvas once. */
function buildIconCanvases() {
  const list = items()
  loaded = list.map(() => false)
  iconCanvases = list.map((item, index) => {
    const offscreen = document.createElement('canvas')
    offscreen.width = ICON_SIZE * dpr
    offscreen.height = ICON_SIZE * dpr
    const context = offscreen.getContext('2d')
    if (!context) return offscreen
    context.scale(dpr, dpr)

    const image = new Image()
    if (props.icons) {
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(withNamespace(toSvgMarkup(item as IconCloudIcon)))}`
      image.onload = () => {
        context.clearRect(0, 0, ICON_SIZE, ICON_SIZE)
        context.drawImage(image, 0, 0, ICON_SIZE, ICON_SIZE)
        loaded[index] = true
        start()
      }
    } else {
      image.crossOrigin = 'anonymous'
      image.src = item as string
      image.onload = () => {
        context.clearRect(0, 0, ICON_SIZE, ICON_SIZE)
        context.beginPath()
        context.arc(ICON_SIZE / 2, ICON_SIZE / 2, ICON_SIZE / 2, 0, Math.PI * 2)
        context.closePath()
        context.clip()
        context.drawImage(image, 0, 0, ICON_SIZE, ICON_SIZE)
        loaded[index] = true
        start()
      }
    }
    return offscreen
  })
}

function project(point: SpherePoint) {
  const cosX = Math.cos(rotation.x)
  const sinX = Math.sin(rotation.x)
  const cosY = Math.cos(rotation.y)
  const sinY = Math.sin(rotation.y)
  const rotatedX = point.x * cosY - point.z * sinY
  const rotatedZ = point.x * sinY + point.z * cosY
  const rotatedY = point.y * cosX + rotatedZ * sinX
  return { x: rotatedX, y: rotatedY, z: rotatedZ }
}

function draw() {
  const canvas = canvasRef.value
  const context = canvas?.getContext('2d')
  if (!canvas || !context) return
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, SIZE, SIZE)

  const center = SIZE / 2
  const maxDistance = Math.sqrt(center * center * 2)
  const dx = mouse.x - center
  const dy = mouse.y - center
  const speed = 0.003 + (Math.sqrt(dx * dx + dy * dy) / maxDistance) * 0.01

  if (target) {
    const progress = Math.min(1, (performance.now() - target.startTime) / target.duration)
    const eased = easeOutCubic(progress)
    rotation = {
      x: target.startX + (target.x - target.startX) * eased,
      y: target.startY + (target.y - target.startY) * eased,
    }
    if (progress >= 1) target = null
  } else if (!isDragging && !isPaused.value) {
    rotation = { x: rotation.x + (dy / SIZE) * speed, y: rotation.y + (dx / SIZE) * speed }
  }

  const hasMedia = Boolean(props.icons || props.images)
  points.forEach((point, index) => {
    const projected = project(point)
    const scale = (projected.z + 200) / 300
    context.save()
    context.translate(center + projected.x, center + projected.y)
    context.scale(scale, scale)
    context.globalAlpha = Math.max(0.2, Math.min(1, (projected.z + 150) / 200))
    if (hasMedia) {
      if (iconCanvases[index] && loaded[index]) {
        context.drawImage(iconCanvases[index], -ICON_SIZE / 2, -ICON_SIZE / 2, ICON_SIZE, ICON_SIZE)
      }
    } else {
      context.beginPath()
      context.arc(0, 0, 20, 0, Math.PI * 2)
      context.fillStyle = '#4444ff'
      context.fill()
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '16px Arial'
      context.fillText(`${point.id + 1}`, 0, 0)
    }
    context.restore()
  })
}

function tick() {
  frame = 0
  if (disposed) return
  draw()
  const hasPendingAssets = Boolean(props.icons || props.images) && !loaded.every(Boolean)
  if (!isPaused.value || isDragging || target !== null || hasPendingAssets) frame = requestAnimationFrame(tick)
}

/** (Re)starts the render loop if it has stopped (it idles while paused). */
function start() {
  if (!frame && !disposed) frame = requestAnimationFrame(tick)
}

function setup() {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = window.devicePixelRatio || 1
  canvas.width = SIZE * dpr
  canvas.height = SIZE * dpr
  buildSphere()
  buildIconCanvases()
  start()
}

function localPosition(event: PointerEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  return { x: ((event.clientX - rect.left) / rect.width) * SIZE, y: ((event.clientY - rect.top) / rect.height) * SIZE }
}

function onPointerDown(event: PointerEvent) {
  if (!canvasRef.value) return
  const { x, y } = localPosition(event)
  const hit = points.find((point) => {
    const projected = project(point)
    const radius = 20 * ((projected.z + 200) / 300)
    const dx = x - (SIZE / 2 + projected.x)
    const dy = y - (SIZE / 2 + projected.y)
    return dx * dx + dy * dy < radius * radius
  })
  if (hit) {
    // Rotate the clicked icon to the front.
    const targetX = -Math.atan2(hit.y, Math.sqrt(hit.x * hit.x + hit.z * hit.z))
    const targetY = Math.atan2(hit.x, hit.z)
    const distance = Math.hypot(targetX - rotation.x, targetY - rotation.y)
    target = {
      x: targetX,
      y: targetY,
      startX: rotation.x,
      startY: rotation.y,
      startTime: performance.now(),
      duration: Math.min(2000, Math.max(800, distance * 1000)),
    }
  }
  isDragging = true
  lastPointer = { x: event.clientX, y: event.clientY }
  start()
}

function onPointerMove(event: PointerEvent) {
  if (!canvasRef.value) return
  mouse = localPosition(event)
  if (isDragging) {
    rotation = {
      x: rotation.x + (event.clientY - lastPointer.y) * 0.002,
      y: rotation.y + (event.clientX - lastPointer.x) * 0.002,
    }
    lastPointer = { x: event.clientX, y: event.clientY }
    start()
  }
}

function onPointerUp() {
  isDragging = false
}

onMounted(() => {
  if (reducedMotion.value) isPaused.value = true
  setup()
})

watch(reducedMotion, (value) => {
  isPaused.value = value
})

watch(isPaused, (paused) => {
  if (!paused) start()
})

watch(
  () => [props.icons, props.images],
  () => {
    if (canvasRef.value) setup()
  },
)

onBeforeUnmount(() => {
  disposed = true
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div :class="cn('relative inline-block', props.class)">
    <canvas
      ref="canvasRef"
      width="400"
      height="400"
      class="aspect-square w-[400px] max-w-full rounded-lg"
      role="img"
      aria-label="Interactive 3D Icon Cloud"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    />
    <button
      v-if="props.showControl"
      type="button"
      class="absolute end-2 top-2 inline-flex size-9 items-center justify-center rounded-md border bg-background shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
      :aria-label="isPaused ? 'Play Animation' : 'Pause Animation'"
      @click="isPaused = !isPaused"
    >
      <Play v-if="isPaused" :size="16" />
      <Pause v-else :size="16" />
    </button>
  </div>
</template>
