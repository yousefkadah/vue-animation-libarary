<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, computed, ref } from 'vue'
import { useScroll } from 'motion-v'
import { cn } from '@/lib/utils'
import TextRevealWord from './TextRevealWord.vue'

export interface TextRevealProps {
  /** The text to reveal word by word. Falls back to the text content of the default slot. */
  text?: string
  class?: HTMLAttributes['class']
  /**
   * The scrolling element to track. Defaults to the page. Set it when TextReveal sits
   * inside its own `overflow-y-auto` box.
   */
  container?: HTMLElement | null
}

const props = defineProps<TextRevealProps>()

const slots = defineSlots<{ default?: () => unknown }>()

/** Plain text of the slot's vnodes, so `<TextReveal>Hello</TextReveal>` works like the `text` prop. */
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

const content = computed(() => props.text ?? textFromVNodes(slots.default?.()).trim())
const words = computed(() => content.value.split(' '))

const sectionRef = ref<HTMLDivElement>()
const containerRef = computed(() => props.container ?? undefined)
const { scrollYProgress } = useScroll({ target: sectionRef, container: containerRef })

const ranges = computed(() =>
  words.value.map((_, index): [number, number] => {
    const start = index / words.value.length
    return [start, start + 1 / words.value.length]
  }),
)
</script>

<template>
  <div ref="sectionRef" :class="cn('relative z-0 h-[200vh]', props.class)">
    <div class="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20">
      <span class="sr-only">{{ content }}</span>
      <span
        aria-hidden="true"
        class="flex flex-wrap p-5 text-2xl font-bold text-foreground/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
      >
        <TextRevealWord
          v-for="(word, index) in words"
          :key="index"
          :word="word"
          :progress="scrollYProgress"
          :range="ranges[index]!"
        />
      </span>
    </div>
  </div>
</template>
