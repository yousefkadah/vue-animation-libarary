<script setup lang="ts">
import type { HTMLAttributes, VNodeArrayChildren } from 'vue'
import { Comment, computed, isVNode, useSlots } from 'vue'
import { motion, useReducedMotion, type MotionProps, type Transition } from 'motion-v'
import { cn } from '@/lib/utils'

export interface SpinningTextProps {
  class?: HTMLAttributes['class']
  /** The text to place around the circle. Falls back to the text of the default slot. */
  text?: string | string[]
  /** Seconds for one full rotation. */
  duration?: number
  /** Rotate counter-clockwise. */
  reverse?: boolean
  /** Radius of the circle, in `ch`. */
  radius?: number
  /** Overrides for the rotation transition. */
  transition?: Transition
  /** Custom variants for the rotating container and for each letter. */
  variants?: { container?: MotionProps['variants']; item?: MotionProps['variants'] }
}

type Variants = NonNullable<MotionProps['variants']>

const props = withDefaults(defineProps<SpinningTextProps>(), {
  duration: 10,
  reverse: false,
  radius: 5,
})

const slots = useSlots()
const prefersReducedMotion = useReducedMotion()

const BASE_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

const finalTransition = computed<Transition>(() => ({
  repeat: Infinity,
  ease: 'linear',
  ...props.transition,
  duration: props.transition?.duration ?? props.duration,
}))

const containerVariants = computed<Variants>(() => ({
  visible: { rotate: props.reverse ? -360 : 360 },
  ...props.variants?.container,
}))

const itemVariants = computed<Variants>(() => ({
  ...BASE_ITEM_VARIANTS,
  ...props.variants?.item,
}))

function textFromNodes(nodes: VNodeArrayChildren | undefined): string {
  let text = ''
  for (const node of nodes ?? []) {
    if (typeof node === 'string' || typeof node === 'number') text += node
    else if (Array.isArray(node)) text += textFromNodes(node)
    else if (isVNode(node) && node.type !== Comment) {
      if (typeof node.children === 'string') text += node.children
      else if (Array.isArray(node.children)) text += textFromNodes(node.children)
    }
  }
  return text
}

/** Called during render, so slot content stays reactive. */
function resolveText(): string {
  if (props.text !== undefined) return Array.isArray(props.text) ? props.text.join('') : props.text
  return textFromNodes(slots.default?.()).trim()
}

function letters(text: string) {
  return [...text.split(''), ' ']
}
</script>

<template>
  <motion.div
    :class="cn('relative', props.class)"
    :style="{ '--total': letters(resolveText()).length, '--radius': props.radius }"
    initial="hidden"
    :animate="prefersReducedMotion ? 'hidden' : 'visible'"
    :variants="containerVariants"
    :transition="finalTransition"
  >
    <motion.span
      v-for="(letter, index) in letters(resolveText())"
      :key="`${index}-${letter}`"
      aria-hidden="true"
      :variants="itemVariants"
      class="absolute top-1/2 left-1/2 inline-block"
      :style="{
        '--index': index,
        transform:
          'translate(-50%, -50%) rotate(calc(360deg / var(--total) * var(--index))) translateY(calc(var(--radius, 5) * -1ch))',
        transformOrigin: 'center',
      }"
    >{{ letter }}</motion.span>
    <span class="sr-only">{{ resolveText() }}</span>
  </motion.div>
</template>
