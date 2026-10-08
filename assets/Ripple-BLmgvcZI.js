var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface RippleProps {
  class?: HTMLAttributes['class']
  /** Diameter of the innermost circle in pixels. Each further circle is 70px wider. */
  mainCircleSize?: number
  /** Opacity of the innermost circle. Each further circle is 0.03 more transparent. */
  mainCircleOpacity?: number
  /** Number of circles. */
  numCircles?: number
}

const props = withDefaults(defineProps<RippleProps>(), {
  mainCircleSize: 210,
  mainCircleOpacity: 0.24,
  numCircles: 8,
})

const circles = computed(() =>
  Array.from({ length: props.numCircles }, (_, index) => ({
    '--i': index,
    width: \`\${props.mainCircleSize + index * 70}px\`,
    height: \`\${props.mainCircleSize + index * 70}px\`,
    opacity: props.mainCircleOpacity - index * 0.03,
    animationDelay: \`\${index * 0.06}s\`,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--foreground)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1)',
  })),
)
<\/script>

<template>
  <div
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] select-none', props.class)"
  >
    <div
      v-for="(style, index) in circles"
      :key="index"
      class="animate-ripple absolute rounded-full border bg-foreground/25 shadow-xl motion-reduce:animate-none"
      :style="style"
    />
  </div>
</template>
`;export{e as default};