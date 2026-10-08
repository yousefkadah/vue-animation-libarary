var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface DotPatternProps {
  class?: HTMLAttributes['class']
  /** Horizontal spacing between dots in pixels. */
  width?: number
  /** Vertical spacing between dots in pixels. */
  height?: number
  /** Horizontal offset of the whole pattern in pixels. */
  x?: number
  /** Vertical offset of the whole pattern in pixels. */
  y?: number
  /** Horizontal offset of each dot inside its cell. */
  cx?: number
  /** Vertical offset of each dot inside its cell. */
  cy?: number
  /** Radius of each dot. */
  cr?: number
  /** Make every dot pulse with a soft glow, each on its own random rhythm. */
  glow?: boolean
}

const props = withDefaults(defineProps<DotPatternProps>(), {
  width: 16,
  height: 16,
  x: 0,
  y: 0,
  cx: 1,
  cy: 1,
  cr: 1,
  glow: false,
})

const id = useId()
const svgRef = ref<SVGSVGElement | null>(null)
const dimensions = ref({ width: 0, height: 0 })
let resizeObserver: ResizeObserver | null = null

function measure() {
  if (!svgRef.value) return
  const { width, height } = svgRef.value.getBoundingClientRect()
  if (width !== dimensions.value.width || height !== dimensions.value.height) dimensions.value = { width, height }
}

/** Glowing dots are individual circles (each needs its own timing), so they need the container size. */
function observe(enabled: boolean) {
  resizeObserver?.disconnect()
  resizeObserver = null
  if (!enabled || !svgRef.value) return
  measure()
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(svgRef.value)
}

onMounted(() => observe(props.glow))
watch(() => props.glow, observe)
onBeforeUnmount(() => resizeObserver?.disconnect())

const dots = computed(() => {
  if (!props.glow) return []
  const columns = Math.ceil(dimensions.value.width / props.width)
  const rows = Math.ceil(dimensions.value.height / props.height)
  return Array.from({ length: columns * rows }, (_, index) => ({
    x: (index % columns) * props.width + props.cx + props.x,
    y: Math.floor(index / columns) * props.height + props.cy + props.y,
    style: {
      animationDelay: \`\${(Math.random() * 5).toFixed(2)}s\`,
      animationDuration: \`\${(Math.random() * 3 + 2).toFixed(2)}s\`,
    },
  }))
})
<\/script>

<template>
  <svg
    ref="svgRef"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80', props.class)"
  >
    <defs>
      <radialGradient v-if="props.glow" :id="\`\${id}-gradient\`">
        <stop offset="0%" stop-color="currentColor" stop-opacity="1" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
      <pattern v-else :id="id" :width="props.width" :height="props.height" patternUnits="userSpaceOnUse" :x="props.x" :y="props.y">
        <circle :cx="props.cx" :cy="props.cy" :r="props.cr" fill="currentColor" />
      </pattern>
    </defs>
    <g v-if="props.glow">
      <circle
        v-for="dot in dots"
        :key="\`\${dot.x}-\${dot.y}\`"
        :cx="dot.x"
        :cy="dot.y"
        :r="props.cr"
        :fill="\`url(#\${id}-gradient)\`"
        class="animate-dot-pattern-glow origin-center [transform-box:fill-box] motion-reduce:animate-none"
        :style="dot.style"
      />
    </g>
    <rect v-else width="100%" height="100%" :fill="\`url(#\${id})\`" />
  </svg>
</template>
`;export{e as default};