<script setup lang="ts">
import { WordRotate } from '@/components/ui/word-rotate'
import type { MotionProps } from 'motion-v'

const blurIn: MotionProps = {
  initial: { opacity: 0, filter: 'blur(10px)', scale: 0.92 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(10px)', scale: 1.08 },
  transition: { duration: 0.4, ease: 'easeInOut' },
}
</script>

<template>
  <WordRotate
    class="text-5xl font-semibold tracking-tighter text-foreground"
    :words="['Design', 'Prototype', 'Ship', 'Repeat']"
    :motion-props="blurIn"
  />
</template>
