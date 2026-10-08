<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface AuroraTextProps {
  class?: HTMLAttributes['class']
  /** Colours of the aurora gradient. The first colour is repeated at the end for a seamless loop. */
  colors?: string[]
  /** Animation speed multiplier: 2 is twice as fast. */
  speed?: number
}

const props = withDefaults(defineProps<AuroraTextProps>(), {
  colors: () => ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
  speed: 1,
})

const gradientStyle = computed(() => ({
  backgroundImage: `linear-gradient(135deg, ${props.colors.join(', ')}, ${props.colors[0]})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animationDuration: `${10 / props.speed}s`,
}))
</script>

<template>
  <span :class="cn('relative inline-block', props.class)">
    <span class="sr-only"><slot /></span>
    <span
      class="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent motion-reduce:animate-none"
      :style="gradientStyle"
      aria-hidden="true"
    >
      <slot />
    </span>
  </span>
</template>
