var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion, type MotionProps } from 'motion-v'
import { cn } from '@/lib/utils'

export interface WordRotateProps {
  class?: HTMLAttributes['class']
  /** The words to rotate through. */
  words: string[]
  /** Milliseconds each word stays on screen. */
  duration?: number
  /** Motion props for each word (\`initial\`, \`animate\`, \`exit\`, \`transition\`, …). Defaults to a slide-down fade. */
  motionProps?: MotionProps
}

const props = withDefaults(defineProps<WordRotateProps>(), {
  duration: 2500,
})

const DEFAULT_MOTION_PROPS: MotionProps = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.25, ease: 'easeOut' },
}

/** Reduced motion keeps the rotation but drops the vertical travel. */
const REDUCED_MOTION_PROPS: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
}

const prefersReducedMotion = useReducedMotion()
const resolvedMotionProps = computed(
  () => props.motionProps ?? (prefersReducedMotion.value ? REDUCED_MOTION_PROPS : DEFAULT_MOTION_PROPS),
)

const index = ref(0)
const currentWord = computed(() => props.words[index.value % Math.max(props.words.length, 1)] ?? '')

let interval: ReturnType<typeof setInterval> | undefined

function start() {
  clearInterval(interval)
  interval = setInterval(() => {
    index.value = (index.value + 1) % Math.max(props.words.length, 1)
  }, props.duration)
}

onMounted(() => {
  start()
  watch(() => [props.words, props.duration], start)
})

onBeforeUnmount(() => clearInterval(interval))
<\/script>

<template>
  <div class="overflow-hidden py-2">
    <AnimatePresence mode="wait">
      <motion.h1 :key="currentWord" :class="cn(props.class)" v-bind="resolvedMotionProps">
        {{ currentWord }}
      </motion.h1>
    </AnimatePresence>
  </div>
</template>
`;export{e as default};