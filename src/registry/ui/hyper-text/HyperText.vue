<script setup lang="ts">
import type { HTMLAttributes, VNodeArrayChildren } from 'vue'
import { Comment, isVNode, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { motion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface HyperTextProps {
  class?: HTMLAttributes['class']
  /** The text to scramble. Falls back to the text of the default slot. */
  text?: string
  /** Duration of the scramble in milliseconds. */
  duration?: number
  /** Delay before the first scramble in milliseconds. */
  delay?: number
  /** Element to render. */
  as?: 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'
  /** Wait until the element scrolls into view before the first scramble. */
  startOnView?: boolean
  /** Scramble again whenever the pointer enters the element. */
  animateOnHover?: boolean
  /** Characters used while scrambling. */
  characterSet?: string[] | readonly string[]
}

const props = withDefaults(defineProps<HyperTextProps>(), {
  duration: 800,
  delay: 0,
  as: 'div',
  startOnView: false,
  animateOnHover: true,
  characterSet: () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
})

const slots = useSlots()
const root = ref<{ $el: Element } | null>(null)

/** 0 → 1 while scrambling; letters left of `progress * length` are already resolved. */
const progress = ref(1)
const isAnimating = ref(false)

let frame: number | null = null
let startTimer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | null = null

function textFromNodes(nodes: VNodeArrayChildren | undefined): string {
  let text = ''
  for (const node of nodes ?? []) {
    if (typeof node === 'string' || typeof node === 'number') text += node
    else if (Array.isArray(node)) text += textFromNodes(node)
    else if (isVNode(node) && node.type !== Comment) {
      if (typeof node.children === 'string') text += node.children
      else if (Array.isArray(node.children)) text += textFromNodes(node.children)
    }
  }
  return text
}

/** Called during render, so slot content stays reactive. */
function resolveText(): string {
  return props.text ?? textFromNodes(slots.default?.()).trim()
}

function displayLetters(text: string): string[] {
  const letters = text.split('')
  const revealed = progress.value * letters.length
  return letters.map((letter, index) =>
    letter === ' ' || !isAnimating.value || index <= revealed
      ? letter
      : props.characterSet[Math.floor(Math.random() * props.characterSet.length)],
  )
}

function stopFrame() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
}

function scramble() {
  stopFrame()
  isAnimating.value = true
  progress.value = 0
  const startTime = performance.now()
  const tick = (now: number) => {
    progress.value = Math.min((now - startTime) / props.duration, 1)
    if (progress.value < 1) {
      frame = requestAnimationFrame(tick)
    } else {
      frame = null
      isAnimating.value = false
    }
  }
  frame = requestAnimationFrame(tick)
}

function scheduleScramble() {
  clearTimeout(startTimer)
  startTimer = setTimeout(scramble, props.delay)
}

function onPointerEnter() {
  if (props.animateOnHover && !isAnimating.value) scramble()
}

function setup() {
  observer?.disconnect()
  observer = null
  clearTimeout(startTimer)
  if (!props.startOnView) {
    scheduleScramble()
    return
  }
  const element = root.value?.$el
  if (!(element instanceof Element)) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        scheduleScramble()
        observer?.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' },
  )
  observer.observe(element)
}

onMounted(() => {
  setup()
  watch(() => [props.delay, props.startOnView], setup)
})

onBeforeUnmount(() => {
  stopFrame()
  clearTimeout(startTimer)
  observer?.disconnect()
})
</script>

<template>
  <motion.div
    ref="root"
    :as="props.as"
    :class="cn('overflow-hidden py-2 text-4xl font-bold', props.class)"
    @mouseenter="onPointerEnter"
  >
    <span class="sr-only">{{ resolveText() }}</span>
    <span aria-hidden="true">
      <span
        v-for="(letter, index) in displayLetters(resolveText())"
        :key="index"
        :class="cn('font-mono', letter === ' ' && 'w-3')"
      >{{ letter.toUpperCase() }}</span>
    </span>
  </motion.div>
</template>
