<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { motion, type Transition } from 'motion-v'
import { cn } from '@/lib/utils'

export interface BorderBeamProps {
  class?: HTMLAttributes['class']
  /** Size of the beam in pixels. */
  size?: number
  /** Seconds for one full lap. */
  duration?: number
  /** Seconds to offset the start of the animation. */
  delay?: number
  colorFrom?: string
  colorTo?: string
  /** Override the Motion transition. */
  transition?: Transition
  /** Travel counter-clockwise. */
  reverse?: boolean
  /** Starting position along the border, 0–100. */
  initialOffset?: number
  /** Border thickness in pixels. */
  borderWidth?: number
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 50,
  duration: 6,
  delay: 0,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
  reverse: false,
  initialOffset: 0,
  borderWidth: 1,
})

const offsets = computed(() =>
  props.reverse
    ? [`${100 - props.initialOffset}%`, `${-props.initialOffset}%`]
    : [`${props.initialOffset}%`, `${100 + props.initialOffset}%`],
)
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    :style="{ '--border-beam-width': `${props.borderWidth}px` }"
  >
    <motion.div
      :class="
        cn(
          'absolute aspect-square bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent',
          props.class,
        )
      "
      :style="{
        width: `${props.size}px`,
        offsetPath: `rect(0 auto auto 0 round ${props.size}px)`,
        '--color-from': props.colorFrom,
        '--color-to': props.colorTo,
      }"
      :initial="{ offsetDistance: `${props.initialOffset}%` }"
      :animate="{ offsetDistance: offsets }"
      :transition="{
        repeat: Infinity,
        ease: 'linear',
        duration: props.duration,
        delay: -props.delay,
        ...props.transition,
      }"
    />
  </div>
</template>
