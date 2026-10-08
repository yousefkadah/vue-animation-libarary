var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { motion, useInView } from 'motion-v'
import { cn } from '@/lib/utils'
import { slotText, terminalSequenceKey } from './context'

export interface TerminalTypingAnimationProps {
  class?: HTMLAttributes['class']
  /** Milliseconds per character. */
  duration?: number
  /** Milliseconds to wait before typing. Only used when the terminal's \`sequence\` is off. */
  delay?: number
  /** Element to render. */
  as?: 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'
  /** Wait until the line scrolls into view. Only used when the terminal's \`sequence\` is off. */
  startOnView?: boolean
}

const props = withDefaults(defineProps<TerminalTypingAnimationProps>(), {
  duration: 60,
  delay: 0,
  as: 'span',
  startOnView: true,
})

const slots = useSlots()
const sequence = inject(terminalSequenceKey, null)
const itemIndex = sequence?.register() ?? null
const inSequence = computed(() => Boolean(sequence?.enabled.value) && itemIndex !== null)

const elementRef = ref()
const isInView = useInView(elementRef, { amount: 0.3, once: true })

const mounted = ref(false)
const started = ref(false)
const displayedText = ref('')

/** The full text, read from the default slot on every render. */
let fullText = ''
function readText() {
  fullText = slotText(slots.default?.()).trim()
  return fullText
}

watch(
  () => [mounted.value, inSequence.value, sequence?.started.value, sequence?.activeIndex.value, isInView.value],
  (_value, _previous, onCleanup) => {
    if (!mounted.value || started.value) return
    if (inSequence.value) {
      if (sequence?.started.value && sequence.activeIndex.value === itemIndex) started.value = true
    } else if (!props.startOnView || isInView.value) {
      const timeout = setTimeout(() => {
        started.value = true
      }, props.delay)
      onCleanup(() => clearTimeout(timeout))
    }
  },
  { immediate: true },
)

let typingInterval: ReturnType<typeof setInterval> | undefined
watch(started, (value) => {
  if (!value) return
  let index = 0
  typingInterval = setInterval(() => {
    const characters = Array.from(fullText)
    if (index < characters.length) {
      index++
      displayedText.value = characters.slice(0, index).join('')
      return
    }
    clearInterval(typingInterval)
    typingInterval = undefined
    if (inSequence.value && itemIndex !== null) sequence?.completeItem(itemIndex)
  }, props.duration)
})

onMounted(() => {
  mounted.value = true
})

onBeforeUnmount(() => {
  clearInterval(typingInterval)
})
<\/script>

<template>
  <motion.span ref="elementRef" :as="props.as" :class="cn('text-sm font-normal tracking-tight', props.class)">
    <span class="sr-only">{{ readText() }}</span>
    <span aria-hidden="true">{{ displayedText }}</span>
  </motion.span>
</template>
`;export{e as default};