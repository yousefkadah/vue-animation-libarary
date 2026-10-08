<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, computed } from 'vue'
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface LineShadowTextProps {
  /** The text to render. Falls back to the text content of the default slot. */
  text?: string
  class?: HTMLAttributes['class']
  /** Colour of the moving line shadow. */
  shadowColor?: string
  /** Element to render. Motion props (`initial`, `animate`, …) fall through to it. */
  as?: 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'
}

const props = withDefaults(defineProps<LineShadowTextProps>(), {
  shadowColor: 'black',
  as: 'span',
})

const slots = defineSlots<{ default?: () => unknown }>()

/** Plain text of the slot's vnodes; the shadow copy is drawn from it via `attr(data-text)`. */
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
</script>

<template>
  <motion.span
    :as="props.as"
    :style="{ '--shadow-color': props.shadowColor }"
    :class="
      cn(
        'relative z-0 inline-flex',
        'after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]',
        'after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
        'after:-z-10 after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent',
        'after:animate-line-shadow motion-reduce:after:animate-none',
        props.class,
      )
    "
    :data-text="content"
  >{{ content }}</motion.span>
</template>
