<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface AnimatedGradientTextProps {
  class?: HTMLAttributes['class']
  /** Animation speed multiplier; widens the gradient so it travels further per loop. */
  speed?: number
  /** Gradient start (and end) colour. */
  colorFrom?: string
  /** Gradient middle colour. */
  colorTo?: string
}

const props = withDefaults(defineProps<AnimatedGradientTextProps>(), {
  speed: 1,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
})
</script>

<template>
  <span
    :style="{ '--bg-size': `${props.speed * 300}%`, '--color-from': props.colorFrom, '--color-to': props.colorTo }"
    :class="
      cn(
        'animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent motion-reduce:animate-none',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
