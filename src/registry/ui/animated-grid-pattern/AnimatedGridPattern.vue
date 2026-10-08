<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface AnimatedGridPatternProps {
  class?: HTMLAttributes['class']
  /** Width of one grid cell in pixels. */
  width?: number
  /** Height of one grid cell in pixels. */
  height?: number
  /** Horizontal offset of the pattern in pixels. */
  x?: number
  /** Vertical offset of the pattern in pixels. */
  y?: number
  /** SVG `stroke-dasharray` of the grid lines. */
  strokeDasharray?: number | string
  /** Number of squares lit up at any time. */
  numSquares?: number
  /** Opacity a square fades up to. */
  maxOpacity?: number
  /** Seconds a square takes to fade in (and again to fade out). */
  duration?: number
  /** Seconds a square stays lit before fading out. */
  repeatDelay?: number
}

interface Square {
  id: number
  pos: [number, number]
  iteration: number
}

const props = withDefaults(defineProps<AnimatedGridPatternProps>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: 0,
  numSquares: 50,
  maxOpacity: 0.5,
  duration: 4,
  repeatDelay: 0.5,
})

const id = useId()
const svgRef = ref<SVGSVGElement | null>(null)
const dimensions = ref({ width: 0, height: 0 })
const squares = shallowRef<Square[]>([])
const reducedMotion = useReducedMotion()
let resizeObserver: ResizeObserver | null = null

/** Stable objects, so moving one square never restarts the others' animations. */
const fadeIn = computed(() => ({ opacity: props.maxOpacity }))
const transitions = computed(() =>
  Array.from({ length: props.numSquares }, (_, index) => ({
    duration: props.duration,
    repeat: 1,
    delay: index * 0.1,
    repeatType: 'reverse' as const,
    repeatDelay: props.repeatDelay,
  })),
)

function randomPosition(): [number, number] {
  return [
    Math.floor((Math.random() * dimensions.value.width) / props.width),
    Math.floor((Math.random() * dimensions.value.height) / props.height),
  ]
}

/** Once a square has faded in and out, it reappears somewhere else. */
function moveSquare(squareId: number) {
  const current = squares.value[squareId]
  if (!current) return
  const next = squares.value.slice()
  next[squareId] = { ...current, pos: randomPosition(), iteration: current.iteration + 1 }
  squares.value = next
}

watch(
  () => [dimensions.value.width, dimensions.value.height, props.numSquares, props.width, props.height],
  () => {
    if (!dimensions.value.width || !dimensions.value.height) return
    squares.value = Array.from({ length: props.numSquares }, (_, index) => ({
      id: index,
      pos: randomPosition(),
      iteration: 0,
    }))
  },
)

onMounted(() => {
  if (!svgRef.value) return
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect
      if (width !== dimensions.value.width || height !== dimensions.value.height) dimensions.value = { width, height }
    }
  })
  resizeObserver.observe(svgRef.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <svg
    ref="svgRef"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30', props.class)"
  >
    <defs>
      <pattern :id="id" :width="props.width" :height="props.height" patternUnits="userSpaceOnUse" :x="props.x" :y="props.y">
        <path :d="`M.5 ${props.height}V.5H${props.width}`" fill="none" :stroke-dasharray="props.strokeDasharray" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
    <svg :x="props.x" :y="props.y" class="overflow-visible">
      <template v-if="reducedMotion">
        <rect
          v-for="square in squares"
          :key="square.id"
          :width="props.width - 1"
          :height="props.height - 1"
          :x="square.pos[0] * props.width + 1"
          :y="square.pos[1] * props.height + 1"
          :opacity="props.maxOpacity"
          fill="currentColor"
          stroke-width="0"
        />
      </template>
      <template v-else>
        <motion.rect
          v-for="(square, index) in squares"
          :key="`${square.id}-${square.iteration}`"
          :initial="{ opacity: 0 }"
          :animate="fadeIn"
          :transition="transitions[index]"
          :width="props.width - 1"
          :height="props.height - 1"
          :x="square.pos[0] * props.width + 1"
          :y="square.pos[1] * props.height + 1"
          fill="currentColor"
          stroke-width="0"
          @animation-complete="moveSquare(square.id)"
        />
      </template>
    </svg>
  </svg>
</template>
