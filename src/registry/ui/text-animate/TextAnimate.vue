<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, computed } from 'vue'
import { motion, type MotionProps } from 'motion-v'
import { cn } from '@/lib/utils'

type Variants = NonNullable<MotionProps['variants']>

export type TextAnimateBy = 'text' | 'word' | 'character' | 'line'

export type TextAnimateAnimation =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown'

export interface TextAnimateProps {
  /** The text to animate. Falls back to the text content of the default slot. */
  text?: string
  class?: HTMLAttributes['class']
  /** Classes applied to every animated segment. */
  segmentClass?: HTMLAttributes['class']
  /** Seconds to wait before the first segment animates. */
  delay?: number
  /** Seconds over which all segments are staggered in. */
  duration?: number
  /** Custom `hidden` / `show` / `exit` variants for each segment. Replaces the preset. */
  variants?: Variants
  /** Element to render. */
  as?: 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'
  /** How the text is split into animated segments. */
  by?: TextAnimateBy
  /** Wait until the element scrolls into view before animating. */
  startOnView?: boolean
  /** Only animate the first time the element enters the viewport. */
  once?: boolean
  /** The animation preset to use. */
  animation?: TextAnimateAnimation
  /** Render the full string for screen readers and hide the split segments from them. */
  accessible?: boolean
}

const props = withDefaults(defineProps<TextAnimateProps>(), {
  delay: 0,
  duration: 0.3,
  as: 'p',
  by: 'word',
  startOnView: true,
  once: false,
  animation: 'fadeIn',
  accessible: true,
})

const slots = defineSlots<{ default?: () => unknown }>()

const staggerTimings: Record<TextAnimateBy, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const springScale = { duration: 0.3, scale: { type: 'spring', damping: 15, stiffness: 300 } } as const

const presetItemVariants: Record<TextAnimateAnimation, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.3 } },
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3 } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 20,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideRight: {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: 20, opacity: 0, transition: { duration: 0.3 } },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: springScale },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } },
  },
  scaleDown: {
    hidden: { scale: 1.5, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: springScale },
    exit: { scale: 1.5, opacity: 0, transition: { duration: 0.3 } },
  },
}

/** Plain text of the slot's vnodes, so `<TextAnimate>Hello</TextAnimate>` works like the `text` prop. */
function textFromVNodes(nodes: unknown): string {
  if (!Array.isArray(nodes)) return ''
  return nodes
    .map((node: VNode) => {
      if (node.type === Comment) return ''
      if (typeof node.children === 'string') return node.children
      return textFromVNodes(node.children)
    })
    .join('')
}

const content = computed(() => props.text ?? textFromVNodes(slots.default?.()).trim())

const segments = computed(() => {
  switch (props.by) {
    case 'word':
      return content.value.split(/(\s+)/)
    case 'character':
      return Array.from(content.value)
    case 'line':
      return content.value.split('\n')
    default:
      return [content.value]
  }
})

const finalVariants = computed<{ container: Variants; item: Variants }>(() => {
  const stagger = props.duration / Math.max(segments.value.length, 1)
  if (props.variants) {
    return {
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { opacity: { duration: 0.01, delay: props.delay }, delayChildren: props.delay, staggerChildren: stagger },
        },
        exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
      },
      item: props.variants,
    }
  }
  return {
    container: {
      hidden: { opacity: 1 },
      show: { opacity: 1, transition: { delayChildren: props.delay, staggerChildren: stagger } },
      exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
    },
    item: presetItemVariants[props.animation],
  }
})
</script>

<template>
  <motion.p
    :as="props.as"
    :variants="finalVariants.container"
    initial="hidden"
    :while-in-view="props.startOnView ? 'show' : undefined"
    :animate="props.startOnView ? undefined : 'show'"
    exit="exit"
    :in-view-options="{ once: props.once }"
    :class="cn('whitespace-pre-wrap', props.class)"
    :aria-label="props.accessible ? content : undefined"
  >
    <span v-if="props.accessible" class="sr-only">{{ content }}</span>
    <motion.span
      v-for="(segment, index) in segments"
      :key="`${props.by}-${segment}-${index}`"
      :variants="finalVariants.item"
      :custom="index * staggerTimings[props.by]"
      :class="cn(props.by === 'line' ? 'block' : 'inline-block whitespace-pre', props.segmentClass)"
      :aria-hidden="props.accessible ? 'true' : undefined"
    >{{ segment }}</motion.span>
  </motion.p>
</template>
