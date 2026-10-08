var e=`<script setup lang="ts">
import { toRef } from 'vue'
import { motion, useTransform, type MotionValue } from 'motion-v'

const props = defineProps<{
  /** Scroll progress of the whole TextReveal section, 0–1. */
  progress: MotionValue<number>
  /** The slice of \`progress\` over which this word fades in. */
  range: [number, number]
  word: string
}>()

const opacity = useTransform(props.progress, toRef(props, 'range'), [0, 1])
<\/script>

<template>
  <span class="relative mx-1 lg:mx-1.5">
    <span class="absolute opacity-30">{{ props.word }}</span>
    <motion.span :style="{ opacity }" class="text-foreground">{{ props.word }}</motion.span>
  </span>
</template>
`;export{e as default};