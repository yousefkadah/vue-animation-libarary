<script setup lang="ts">
import type { HTMLAttributes, VNodeArrayChildren } from 'vue'
import { Comment, isVNode, onBeforeUnmount, onMounted, useSlots } from 'vue'
import { useAnimate, type AnimationOptions, type ValueAnimationTransition } from 'motion-v'
import { cn } from '@/lib/utils'

export interface Text3DFlipProps {
  class?: HTMLAttributes['class']
  /** The text to flip. Falls back to the text of the default slot. */
  text?: string
  /** Element to render. */
  as?: string
  /** Classes for each letter's front face (visible before the flip). */
  textClass?: HTMLAttributes['class']
  /** Classes for each letter's back face (revealed by the flip). */
  flipTextClass?: HTMLAttributes['class']
  /** Seconds between each letter starting its flip. */
  staggerDuration?: number
  /** Where the stagger starts: a position, a letter index, or random. */
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  /** Motion transition for the flip. */
  transition?: ValueAnimationTransition | AnimationOptions
  /** Direction the letters rotate towards on hover. */
  rotateDirection?: 'top' | 'right' | 'bottom' | 'left'
}

type RotateDirection = NonNullable<Text3DFlipProps['rotateDirection']>

const props = withDefaults(defineProps<Text3DFlipProps>(), {
  as: 'p',
  staggerDuration: 0.05,
  staggerFrom: 'first',
  transition: () => ({ type: 'spring', damping: 30, stiffness: 300 }),
  rotateDirection: 'right',
})

const ROTATION_MAP: Record<RotateDirection, string> = {
  top: 'rotateX(90deg)',
  right: 'rotateY(90deg)',
  bottom: 'rotateX(-90deg)',
  left: 'rotateY(-90deg)',
}

const SECOND_FACE_TRANSFORMS: Record<RotateDirection, string> = {
  top: 'rotateX(-90deg) translateZ(0.5lh)',
  right: 'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)',
  bottom: 'rotateX(90deg) translateZ(0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)',
}

const FRONT_FACE_TRANSFORMS: Record<RotateDirection, string> = {
  top: 'translateZ(0.5lh)',
  bottom: 'translateZ(0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
  right: 'rotateY(-90deg) translateX(50%) rotateY(90deg)',
}

const CONTAINER_TRANSFORMS: Record<RotateDirection, string> = {
  top: 'translateZ(-0.5lh)',
  bottom: 'translateZ(-0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
  right: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
}

const slots = useSlots()
const [scope, animate] = useAnimate()

let isAnimating = false
let isMounted = false

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

/** Splits into graphemes, so emoji and combined characters stay whole. */
function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

function splitWords(text: string) {
  const words = text.split(' ')
  return words.map((word, index) => ({
    characters: splitIntoCharacters(word),
    needsSpace: index !== words.length - 1,
  }))
}

function getStaggerDelay(index: number, totalChars: number) {
  const { staggerFrom, staggerDuration } = props
  if (staggerFrom === 'first') return index * staggerDuration
  if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration
  if (staggerFrom === 'center') return Math.abs(Math.floor(totalChars / 2) - index) * staggerDuration
  if (staggerFrom === 'random') return Math.abs(Math.floor(Math.random() * totalChars) - index) * staggerDuration
  return Math.abs(staggerFrom - index) * staggerDuration
}

async function handleHoverStart() {
  if (isAnimating) return
  isAnimating = true
  try {
    const totalChars = scope.value?.querySelectorAll('.text-3d-flip-char').length ?? 0
    const delays = Array.from({ length: totalChars }, (_, index) => getStaggerDelay(index, totalChars))

    await animate(
      '.text-3d-flip-char',
      { transform: ROTATION_MAP[props.rotateDirection] },
      { ...props.transition, delay: (index: number) => delays[index] ?? 0 },
    )
    if (!isMounted) return

    await animate('.text-3d-flip-char', { transform: 'rotateX(0deg) rotateY(0deg)' }, { duration: 0 })
  } finally {
    if (isMounted) isAnimating = false
  }
}

onMounted(() => {
  isMounted = true
})

onBeforeUnmount(() => {
  isMounted = false
  isAnimating = false
})
</script>

<template>
  <component
    :is="props.as"
    ref="scope"
    :class="cn('relative flex flex-wrap', props.class)"
    @mouseenter="handleHoverStart"
  >
    <span class="sr-only">{{ resolveText() }}</span>
    <span
      v-for="(word, wordIndex) in splitWords(resolveText())"
      :key="wordIndex"
      aria-hidden="true"
      class="inline-flex"
    >
      <span
        v-for="(char, charIndex) in word.characters"
        :key="charIndex"
        class="text-3d-flip-char inline transform-3d"
        :style="{ transform: CONTAINER_TRANSFORMS[props.rotateDirection] }"
      >
        <span
          :class="cn('relative h-[1lh] backface-hidden', props.textClass)"
          :style="{ transform: FRONT_FACE_TRANSFORMS[props.rotateDirection] }"
        >{{ char }}</span>
        <span
          :class="cn('absolute top-0 left-0 h-[1lh] backface-hidden', props.flipTextClass)"
          :style="{ transform: SECOND_FACE_TRANSFORMS[props.rotateDirection] }"
        >{{ char }}</span>
      </span>
      <span v-if="word.needsSpace" class="whitespace-pre">{{ ' ' }}</span>
    </span>
  </component>
</template>
