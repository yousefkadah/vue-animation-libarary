var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, ref, watchEffect } from 'vue'
import { motion, useInView } from 'motion-v'
import { cn } from '@/lib/utils'
import { terminalSequenceKey } from './context'

export interface AnimatedSpanProps {
  class?: HTMLAttributes['class']
  /** Milliseconds to wait before fading in. Only used when the terminal's \`sequence\` is off. */
  delay?: number
  /** Wait until the line scrolls into view. Only used when the terminal's \`sequence\` is off. */
  startOnView?: boolean
}

const props = withDefaults(defineProps<AnimatedSpanProps>(), {
  delay: 0,
  startOnView: false,
})

const sequence = inject(terminalSequenceKey, null)
const itemIndex = sequence?.register() ?? null
const inSequence = computed(() => Boolean(sequence?.enabled.value) && itemIndex !== null)

const elementRef = ref()
const isInView = useInView(elementRef, { amount: 0.3, once: true })

const hasStarted = ref(false)
watchEffect(() => {
  if (inSequence.value && sequence?.started.value && sequence.activeIndex.value === itemIndex) hasStarted.value = true
})

const shouldAnimate = computed(() => (inSequence.value ? hasStarted.value : props.startOnView ? isInView.value : true))

function onAnimationComplete() {
  if (inSequence.value && hasStarted.value && itemIndex !== null) sequence?.completeItem(itemIndex)
}
<\/script>

<template>
  <motion.div
    ref="elementRef"
    :class="cn('grid text-sm font-normal tracking-tight', props.class)"
    :initial="{ opacity: 0, y: -5 }"
    :animate="shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }"
    :transition="{ duration: 0.3, delay: inSequence ? 0 : props.delay / 1000 }"
    @animation-complete="onAnimationComplete"
  >
    <slot />
  </motion.div>
</template>
`;export{e as default};