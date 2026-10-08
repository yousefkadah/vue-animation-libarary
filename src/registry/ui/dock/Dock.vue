<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide, toRef } from 'vue'
import { motion, useMotionValue } from 'motion-v'
import { cn } from '@/lib/utils'
import { DEFAULT_DISTANCE, DEFAULT_MAGNIFICATION, DEFAULT_SIZE, dockKey } from './context'

export interface DockProps {
  class?: HTMLAttributes['class']
  /** Resting size of every `DockIcon` in pixels. */
  iconSize?: number
  /** Size an icon grows to when the pointer is right over it. */
  iconMagnification?: number
  /** Turn the magnification effect off. */
  disableMagnification?: boolean
  /** Distance in pixels from the pointer within which icons grow. */
  iconDistance?: number
  /** Vertical alignment of the icons inside the dock. */
  direction?: 'top' | 'middle' | 'bottom'
}

const props = withDefaults(defineProps<DockProps>(), {
  iconSize: DEFAULT_SIZE,
  iconMagnification: DEFAULT_MAGNIFICATION,
  disableMagnification: false,
  iconDistance: DEFAULT_DISTANCE,
  direction: 'middle',
})

const mouseX = useMotionValue(Infinity)

provide(dockKey, {
  mouseX,
  iconSize: toRef(() => props.iconSize),
  iconMagnification: toRef(() => props.iconMagnification),
  iconDistance: toRef(() => props.iconDistance),
  disableMagnification: toRef(() => props.disableMagnification),
})
</script>

<template>
  <motion.div
    :class="
      cn(
        'mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-backdrop-filter:bg-white/10 supports-backdrop-filter:dark:bg-black/10',
        props.class,
        {
          'items-start': props.direction === 'top',
          'items-center': props.direction === 'middle',
          'items-end': props.direction === 'bottom',
        },
      )
    "
    @mousemove="(event: MouseEvent) => mouseX.set(event.clientX)"
    @mouseleave="mouseX.set(Infinity)"
  >
    <slot />
  </motion.div>
</template>
