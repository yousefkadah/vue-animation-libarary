var e=`<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, computed, onBeforeUnmount, ref, watch } from 'vue'
import { motion, useInView } from 'motion-v'
import { cn } from '@/lib/utils'

export interface TypingAnimationProps {
  /** A single string to type. Falls back to the text content of the default slot. */
  text?: string
  /** Strings to type and delete in sequence. Takes precedence over \`text\`. */
  words?: string[]
  class?: HTMLAttributes['class']
  /** Milliseconds per character. Used as the typing speed when \`typeSpeed\` is not set. */
  duration?: number
  /** Milliseconds per typed character. Defaults to \`duration\`. */
  typeSpeed?: number
  /** Milliseconds per deleted character. Defaults to half the typing speed. */
  deleteSpeed?: number
  /** Milliseconds to wait before typing starts. */
  delay?: number
  /** Milliseconds to pause on a finished word before deleting it. */
  pauseDelay?: number
  /** Keep cycling through the words forever. */
  loop?: boolean
  /** Element to render. */
  as?: 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'
  /** Wait until the element scrolls into view before typing. */
  startOnView?: boolean
  /** Show the typing cursor. */
  showCursor?: boolean
  /** Blink the cursor. */
  blinkCursor?: boolean
  /** Cursor glyph. */
  cursorStyle?: 'line' | 'block' | 'underscore'
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 100,
  delay: 0,
  pauseDelay: 1000,
  loop: false,
  as: 'span',
  startOnView: true,
  showCursor: true,
  blinkCursor: true,
  cursorStyle: 'line',
})

const slots = defineSlots<{ default?: () => unknown }>()

/** Plain text of the slot's vnodes, so \`<TypingAnimation>Hello</TypingAnimation>\` works like the \`text\` prop. */
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

const elementRef = ref()
const isInView = useInView(elementRef, { amount: 0.3, once: true })

const displayedText = ref('')
const currentWordIndex = ref(0)
const currentCharIndex = ref(0)
const phase = ref<'typing' | 'pause' | 'deleting'>('typing')

const singleText = computed(() => props.text ?? textFromVNodes(slots.default?.()).trim())
const wordsToAnimate = computed(() => props.words ?? (singleText.value ? [singleText.value] : []))
const hasMultipleWords = computed(() => wordsToAnimate.value.length > 1)
const typingSpeed = computed(() => props.typeSpeed ?? props.duration)
const deletingSpeed = computed(() => props.deleteSpeed ?? typingSpeed.value / 2)
const shouldStart = computed(() => (props.startOnView ? isInView.value : true))
const animationSourceKey = computed(() => (props.words ? props.words.join('\\u0000') : singleText.value))

watch(animationSourceKey, () => {
  displayedText.value = ''
  currentWordIndex.value = 0
  currentCharIndex.value = 0
  phase.value = 'typing'
})

let timeout: ReturnType<typeof setTimeout> | undefined

function step() {
  const graphemes = Array.from(wordsToAnimate.value[currentWordIndex.value] ?? '')
  switch (phase.value) {
    case 'typing':
      if (currentCharIndex.value < graphemes.length) {
        displayedText.value = graphemes.slice(0, currentCharIndex.value + 1).join('')
        currentCharIndex.value++
      } else if (hasMultipleWords.value || props.loop) {
        const isLastWord = currentWordIndex.value === wordsToAnimate.value.length - 1
        if (!isLastWord || props.loop) phase.value = 'pause'
      }
      break
    case 'pause':
      phase.value = 'deleting'
      break
    case 'deleting':
      if (currentCharIndex.value > 0) {
        displayedText.value = graphemes.slice(0, currentCharIndex.value - 1).join('')
        currentCharIndex.value--
      } else {
        currentWordIndex.value = (currentWordIndex.value + 1) % wordsToAnimate.value.length
        phase.value = 'typing'
      }
      break
  }
}

/** Re-schedules the next keystroke whenever the typing state changes (the React effect's dependency list). */
watch(
  [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    () => props.loop,
    typingSpeed,
    deletingSpeed,
    () => props.pauseDelay,
    () => props.delay,
  ],
  (_value, _oldValue, onCleanup) => {
    if (!shouldStart.value || wordsToAnimate.value.length === 0) return
    const timeoutDelay =
      props.delay > 0 && displayedText.value === ''
        ? props.delay
        : phase.value === 'typing'
          ? typingSpeed.value
          : phase.value === 'deleting'
            ? deletingSpeed.value
            : props.pauseDelay
    timeout = setTimeout(step, timeoutDelay)
    const scheduled = timeout
    onCleanup(() => clearTimeout(scheduled))
  },
  { immediate: true },
)

onBeforeUnmount(() => clearTimeout(timeout))

const currentWordLength = computed(() => Array.from(wordsToAnimate.value[currentWordIndex.value] ?? '').length)

const isComplete = computed(
  () =>
    !props.loop &&
    currentWordIndex.value === wordsToAnimate.value.length - 1 &&
    currentCharIndex.value >= currentWordLength.value &&
    phase.value !== 'deleting',
)

const shouldShowCursor = computed(
  () =>
    props.showCursor &&
    !isComplete.value &&
    (hasMultipleWords.value || props.loop || currentCharIndex.value < currentWordLength.value),
)

/** The whole text for assistive tech, which would otherwise hear every keystroke. */
const accessibleText = computed(() => wordsToAnimate.value.join(', '))

const cursorChar = computed(() => ({ line: '|', block: '▌', underscore: '_' })[props.cursorStyle] ?? '|')
<\/script>

<template>
  <motion.span
    ref="elementRef"
    :as="props.as"
    :class="cn('leading-20 tracking-[-0.02em]', props.as === 'span' && 'inline-block', props.class)"
  >
    <span class="sr-only">{{ accessibleText }}</span>
    <span aria-hidden="true">{{ displayedText }}<span
        v-if="shouldShowCursor"
        :class="cn('inline-block', props.blinkCursor && 'animate-blink-cursor motion-reduce:animate-none')"
      >{{ cursorChar }}</span></span>
  </motion.span>
</template>
`;export{e as default};