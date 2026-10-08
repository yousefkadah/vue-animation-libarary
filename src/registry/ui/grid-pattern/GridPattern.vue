<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useId } from 'vue'
import { cn } from '@/lib/utils'

export interface GridPatternProps {
  class?: HTMLAttributes['class']
  /** Width of one grid cell in pixels. */
  width?: number
  /** Height of one grid cell in pixels. */
  height?: number
  /** Horizontal offset of the pattern in pixels. */
  x?: number
  /** Vertical offset of the pattern in pixels. */
  y?: number
  /** `[column, row]` cells to fill in. */
  squares?: Array<[x: number, y: number]>
  /** SVG `stroke-dasharray` of the grid lines, e.g. `4 2` for dashes. */
  strokeDasharray?: string
}

const props = withDefaults(defineProps<GridPatternProps>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: '0',
})

const id = useId()
</script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30', props.class)"
  >
    <defs>
      <pattern :id="id" :width="props.width" :height="props.height" patternUnits="userSpaceOnUse" :x="props.x" :y="props.y">
        <path :d="`M.5 ${props.height}V.5H${props.width}`" fill="none" :stroke-dasharray="props.strokeDasharray" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" :fill="`url(#${id})`" />
    <svg v-if="props.squares?.length" :x="props.x" :y="props.y" class="overflow-visible">
      <rect
        v-for="([squareX, squareY], index) in props.squares"
        :key="`${index}-${squareX}-${squareY}`"
        stroke-width="0"
        :width="props.width - 1"
        :height="props.height - 1"
        :x="squareX * props.width + 1"
        :y="squareY * props.height + 1"
      />
    </svg>
  </svg>
</template>
