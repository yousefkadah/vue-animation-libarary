<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { motion, useScroll } from 'motion-v'
import { cn } from '@/lib/utils'

export interface ScrollProgressProps {
  class?: HTMLAttributes['class']
  /** Scrollable element to track instead of the page. */
  container?: HTMLElement | null
}

const props = defineProps<ScrollProgressProps>()

const { scrollYProgress } = useScroll(() => ({ container: props.container ?? undefined }))
</script>

<template>
  <motion.div
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] rtl:origin-right',
        props.class,
      )
    "
    :style="{ scaleX: scrollYProgress }"
  />
</template>
