var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

export interface InteractiveGridPatternProps {
  class?: HTMLAttributes['class']
  /** Width of one square in pixels. */
  width?: number
  /** Height of one square in pixels. */
  height?: number
  /** Number of squares as \`[horizontal, vertical]\`. */
  squares?: [horizontal: number, vertical: number]
  /** Classes for every square, e.g. \`hover:fill-blue-500\`. */
  squaresClassName?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  width: 40,
  height: 40,
  squares: () => [24, 24],
})

const hoveredSquare = ref<number | null>(null)

const cells = computed(() => {
  const [horizontal, vertical] = props.squares
  return Array.from({ length: horizontal * vertical }, (_, index) => ({
    x: (index % horizontal) * props.width,
    y: Math.floor(index / horizontal) * props.height,
  }))
})

/** Resolved once, not per square, so hovering stays cheap on large grids. */
const squareBaseClass = 'stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000'
const idleSquareClass = computed(() => cn(squareBaseClass, 'fill-transparent', props.squaresClassName))
const hoveredSquareClass = computed(() => cn(squareBaseClass, 'fill-gray-300/30', props.squaresClassName))
<\/script>

<template>
  <svg
    aria-hidden="true"
    :width="props.width * props.squares[0]"
    :height="props.height * props.squares[1]"
    :class="cn('absolute inset-0 h-full w-full border border-gray-400/30', props.class)"
  >
    <rect
      v-for="(cell, index) in cells"
      :key="index"
      :x="cell.x"
      :y="cell.y"
      :width="props.width"
      :height="props.height"
      :class="hoveredSquare === index ? hoveredSquareClass : idleSquareClass"
      @mouseenter="hoveredSquare = index"
      @mouseleave="hoveredSquare = null"
    />
  </svg>
</template>
`;export{e as default};