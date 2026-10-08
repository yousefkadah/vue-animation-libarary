<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'

export interface StripedPatternProps {
  class?: HTMLAttributes['class']
  /** Which way the stripes lean. */
  direction?: 'left' | 'right'
  /** Width of one pattern tile in pixels (the horizontal spacing of the stripes). */
  width?: number | string
  /** Height of one pattern tile in pixels. */
  height?: number | string
}

const props = withDefaults(defineProps<StripedPatternProps>(), {
  direction: 'left',
  width: 10,
  height: 10,
})

const id = useId()
const tileWidth = computed(() => Number(props.width))
const tileHeight = computed(() => Number(props.height))
</script>

<template>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]', props.class)"
  >
    <defs>
      <pattern :id="id" :width="tileWidth" :height="tileHeight" patternUnits="userSpaceOnUse">
        <template v-if="props.direction === 'left'">
          <line x1="0" :y1="tileHeight" :x2="tileWidth" y2="0" stroke="currentColor" />
          <line :x1="-tileWidth" :y1="tileHeight" x2="0" y2="0" stroke="currentColor" />
          <line :x1="tileWidth" :y1="tileHeight" :x2="tileWidth * 2" y2="0" stroke="currentColor" />
        </template>
        <template v-else>
          <line x1="0" y1="0" :x2="tileWidth" :y2="tileHeight" stroke="currentColor" />
          <line :x1="-tileWidth" y1="0" x2="0" :y2="tileHeight" stroke="currentColor" />
          <line :x1="tileWidth" y1="0" :x2="tileWidth * 2" :y2="tileHeight" stroke="currentColor" />
        </template>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>
