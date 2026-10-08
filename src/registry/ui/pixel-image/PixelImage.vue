<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface PixelImageGrid {
  rows: number
  cols: number
}

/** Predefined grids, named columns × rows. */
export type PixelImageGridName = '6x4' | '8x8' | '8x3' | '4x6' | '3x8'

const DEFAULT_GRIDS: Record<PixelImageGridName, PixelImageGrid> = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
}

export interface PixelImageProps {
  /** The image source URL. */
  src: string
  /** Alternative text for the whole image. Leave empty for a decorative image. */
  alt?: string
  class?: HTMLAttributes['class']
  /** Predefined grid, columns × rows. */
  grid?: PixelImageGridName
  /** Custom grid (1–16 rows and columns). Takes precedence over `grid`. */
  customGrid?: PixelImageGrid
  /** Fade from grayscale to full colour after the pixels have appeared. */
  grayscaleAnimation?: boolean
  /** Milliseconds each pixel takes to fade in. */
  pixelFadeInDuration?: number
  /** Maximum random delay, in milliseconds, before a pixel fades in. */
  maxAnimationDelay?: number
  /** Milliseconds before the colour is revealed. */
  colorRevealDelay?: number
}

const props = withDefaults(defineProps<PixelImageProps>(), {
  alt: '',
  grid: '6x4',
  grayscaleAnimation: true,
  pixelFadeInDuration: 1000,
  maxAnimationDelay: 1200,
  colorRevealDelay: 1300,
})

const MIN_GRID = 1
const MAX_GRID = 16

const isValidGrid = (grid?: PixelImageGrid): grid is PixelImageGrid =>
  !!grid &&
  Number.isInteger(grid.rows) &&
  Number.isInteger(grid.cols) &&
  grid.rows >= MIN_GRID &&
  grid.cols >= MIN_GRID &&
  grid.rows <= MAX_GRID &&
  grid.cols <= MAX_GRID

const dimensions = computed(() => (isValidGrid(props.customGrid) ? props.customGrid : DEFAULT_GRIDS[props.grid]))

const pieces = computed(() => {
  const { rows, cols } = dimensions.value
  return Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols)
    const col = index % cols
    const left = col * (100 / cols)
    const right = (col + 1) * (100 / cols)
    const top = row * (100 / rows)
    const bottom = (row + 1) * (100 / rows)
    return {
      clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
      delay: Math.random() * props.maxAnimationDelay,
    }
  })
})

const isVisible = ref(false)
const showColor = ref(false)
let frame = 0
let colorTimeout: ReturnType<typeof setTimeout> | undefined

function scheduleColorReveal() {
  clearTimeout(colorTimeout)
  colorTimeout = setTimeout(() => {
    showColor.value = true
  }, props.colorRevealDelay)
}

onMounted(() => {
  // Wait for the hidden state to be painted so the pixels transition in.
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
      isVisible.value = true
    })
  })
  scheduleColorReveal()
})

watch(() => props.colorRevealDelay, scheduleColorReveal)

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(colorTimeout)
})
</script>

<template>
  <div
    :class="cn('relative h-72 w-72 select-none md:h-96 md:w-96', props.class)"
    :role="props.alt ? 'img' : undefined"
    :aria-label="props.alt || undefined"
  >
    <div
      v-for="(piece, index) in pieces"
      :key="index"
      :class="cn('absolute inset-0 transition-all ease-out', isVisible ? 'opacity-100' : 'opacity-0')"
      :style="{
        clipPath: piece.clipPath,
        transitionDelay: `${piece.delay}ms`,
        transitionDuration: `${props.pixelFadeInDuration}ms`,
      }"
      aria-hidden="true"
    >
      <img
        :src="props.src"
        alt=""
        :class="
          cn(
            'z-1 size-full rounded-[2.5rem] object-cover',
            props.grayscaleAnimation && (showColor ? 'grayscale-0' : 'grayscale'),
          )
        "
        :style="{
          transition: props.grayscaleAnimation
            ? `filter ${props.pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }"
        draggable="false"
      />
    </div>
  </div>
</template>
