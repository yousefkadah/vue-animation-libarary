<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface AnimatedListItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<AnimatedListItemProps>()
</script>

<template>
  <motion.div
    layout
    :class="cn('mx-auto w-full', props.class)"
    :initial="{ scale: 0, opacity: 0 }"
    :animate="{ scale: 1, opacity: 1, originY: 0 }"
    :exit="{ scale: 0, opacity: 0 }"
    :transition="{ type: 'spring', stiffness: 350, damping: 40 }"
  >
    <slot />
  </motion.div>
</template>
