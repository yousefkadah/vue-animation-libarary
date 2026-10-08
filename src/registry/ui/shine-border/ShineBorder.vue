<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface ShineBorderProps {
  class?: HTMLAttributes['class']
  /** Width of the border in pixels. */
  borderWidth?: number
  /** Seconds for one full shine cycle. */
  duration?: number
  /** Colour of the shine — one colour or a list that is blended into a gradient. */
  shineColor?: string | string[]
}

const props = withDefaults(defineProps<ShineBorderProps>(), {
  borderWidth: 1,
  duration: 14,
  shineColor: '#000000',
})

const colors = computed(() => (Array.isArray(props.shineColor) ? props.shineColor.join(',') : props.shineColor))
</script>

<template>
  <div
    aria-hidden="true"
    :style="{
      '--border-width': `${props.borderWidth}px`,
      '--duration': `${props.duration}s`,
      backgroundImage: `radial-gradient(transparent,transparent, ${colors},transparent,transparent)`,
      backgroundSize: '300% 300%',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      padding: 'var(--border-width)',
    }"
    :class="
      cn(
        'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine',
        props.class,
      )
    "
  />
</template>
