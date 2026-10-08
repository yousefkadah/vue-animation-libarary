<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface ComicTextProps {
  class?: HTMLAttributes['class']
  /** Font size in `rem`. The outline and shadows scale with it. */
  fontSize?: number
}

const props = withDefaults(defineProps<ComicTextProps>(), {
  fontSize: 5,
})

const DOT_COLOR = '#EF4444'
const BACKGROUND_COLOR = '#FACC15'

const style = computed(() => ({
  fontSize: `${props.fontSize}rem`,
  fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
  fontWeight: '900',
  WebkitTextStroke: `${props.fontSize * 0.35}px #000000`,
  textTransform: 'uppercase' as const,
  filter: `drop-shadow(5px 5px 0px #000000) drop-shadow(3px 3px 0px ${DOT_COLOR})`,
  backgroundColor: BACKGROUND_COLOR,
  backgroundImage: `radial-gradient(circle at 1px 1px, ${DOT_COLOR} 1px, transparent 0)`,
  backgroundSize: '8px 8px',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}))
</script>

<template>
  <motion.div
    :class="cn('text-center select-none', props.class)"
    :style="style"
    :initial="{ opacity: 0, scale: 0.8, rotate: -2, skewX: -10 }"
    :animate="{ opacity: 1, scale: 1, rotate: 0, skewX: -10 }"
    :transition="{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275], type: 'spring' }"
  >
    <slot />
  </motion.div>
</template>
