<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { motion, type MotionProps } from 'motion-v'
import { cn } from '@/lib/utils'

export interface BlurFadeProps {
  class?: HTMLAttributes['class']
  /** Custom `hidden` / `visible` variants. Replaces the default blur-and-slide. */
  variants?: MotionProps['variants']
  /** Seconds the animation lasts. */
  duration?: number
  /** Seconds to wait before animating. */
  delay?: number
  /** Distance in pixels the element travels while fading in. */
  offset?: number
  /** Direction the element travels from. */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Wait until the element scrolls into view before animating. */
  inView?: boolean
  /** Root margin used for the in-view check. */
  inViewMargin?: NonNullable<MotionProps['inViewOptions']>['margin']
  /** Initial blur amount. */
  blur?: string
  /** Element to render. */
  as?: string
}

const props = withDefaults(defineProps<BlurFadeProps>(), {
  duration: 0.4,
  delay: 0,
  offset: 6,
  direction: 'down',
  inView: false,
  inViewMargin: '-50px',
  blur: '6px',
  as: 'div',
})

const defaultVariants = computed<MotionProps['variants']>(() => {
  const axis = props.direction === 'left' || props.direction === 'right' ? 'x' : 'y'
  const sign = props.direction === 'right' || props.direction === 'down' ? -1 : 1
  return {
    hidden: { [axis]: sign * props.offset, opacity: 0, filter: `blur(${props.blur})` },
    visible: { [axis]: 0, opacity: 1, filter: 'blur(0px)' },
  }
})

const transition = computed(() => ({ delay: 0.04 + props.delay, duration: props.duration, ease: 'easeOut' as const }))
</script>

<template>
  <motion.div
    :as="props.as"
    :class="cn(props.class)"
    :variants="props.variants ?? defaultVariants"
    initial="hidden"
    :animate="props.inView ? undefined : 'visible'"
    :while-in-view="props.inView ? 'visible' : undefined"
    :in-view-options="{ once: true, margin: props.inViewMargin }"
    :transition="transition"
  >
    <slot />
  </motion.div>
</template>
