<script setup lang="ts" generic="M extends DottedMapMarker = DottedMapMarker">
import { computed } from 'vue'
import { useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'
import { createMap } from './create-map'
import type { DottedMapMarker, DottedMapMarkerOverlayScope, DottedMapPlacedMarker, DottedMapProps } from './types'

const props = withDefaults(defineProps<DottedMapProps<M>>(), {
  width: 150,
  height: 75,
  mapSamples: 5000,
  markers: () => [],
  dotColor: 'currentColor',
  markerColor: '#FF6900',
  dotRadius: 0.2,
  stagger: true,
  pulse: false,
})

defineSlots<{
  /** Extra SVG drawn on top of each marker (replaces Magic UI's `renderMarkerOverlay`). */
  'marker-overlay'?: (scope: DottedMapMarkerOverlayScope<M>) => unknown
}>()

const reducedMotion = useReducedMotion()

const map = computed(() => createMap({ width: props.width, height: props.height, mapSamples: props.mapSamples }))

/** Smallest horizontal gap between dots, and the row index of every y, for the stagger offset. */
const grid = computed(() => {
  const sorted = [...map.value.points].sort((a, b) => a.y - b.y || a.x - b.x)
  const rowIndex = new Map<number, number>()
  let step = 0
  let previousY = Number.NaN
  let previousX = Number.NaN
  for (const point of sorted) {
    if (point.y !== previousY) {
      previousY = point.y
      previousX = Number.NaN
      if (!rowIndex.has(point.y)) rowIndex.set(point.y, rowIndex.size)
    }
    if (!Number.isNaN(previousX)) {
      const delta = point.x - previousX
      if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
    }
    previousX = point.x
  }
  return { xStep: step || 1, rowIndex }
})

function offsetX(y: number) {
  const row = grid.value.rowIndex.get(y) ?? 0
  return props.stagger && row % 2 === 1 ? grid.value.xStep / 2 : 0
}

const dots = computed(() => map.value.points.map((point) => ({ x: point.x + offsetX(point.y), y: point.y })))

const placedMarkers = computed(() =>
  map.value.addMarkers(props.markers).map((placed, index) => {
    const x = placed.x + offsetX(placed.y)
    const y = placed.y
    const r = placed.size ?? props.dotRadius
    const shouldPulse = props.pulse ? placed.pulse !== false : placed.pulse === true
    return {
      key: `${placed.x}-${placed.y}-${index}`,
      marker: { ...placed, x, y } as DottedMapPlacedMarker<M>,
      x,
      y,
      r,
      pulseTo: r * 2.8,
      pulse: shouldPulse && !reducedMotion.value,
    }
  }),
)
</script>

<template>
  <svg
    :viewBox="`0 0 ${props.width} ${props.height}`"
    :class="cn('text-gray-500 dark:text-gray-500', props.class)"
    :style="{ width: '100%', height: '100%' }"
  >
    <circle v-for="(dot, index) in dots" :key="index" :cx="dot.x" :cy="dot.y" :r="props.dotRadius" :fill="props.dotColor" />

    <g v-for="(item, index) in placedMarkers" :key="item.key">
      <circle :cx="item.x" :cy="item.y" :r="item.r" :fill="props.markerColor" />

      <g v-if="item.pulse" pointer-events="none">
        <circle :cx="item.x" :cy="item.y" :r="item.r" fill="none" :stroke="props.markerColor" stroke-opacity="1" stroke-width="0.35">
          <animate attributeName="r" :values="`${item.r};${item.pulseTo}`" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle :cx="item.x" :cy="item.y" :r="item.r" fill="none" :stroke="props.markerColor" stroke-opacity="0.9" stroke-width="0.3">
          <animate attributeName="r" :values="`${item.r};${item.pulseTo}`" dur="1.4s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="1.4s" begin="0.7s" repeatCount="indefinite" />
        </circle>
      </g>

      <slot name="marker-overlay" :marker="item.marker" :index="index" :x="item.x" :y="item.y" :r="item.r" />
    </g>
  </svg>
</template>
