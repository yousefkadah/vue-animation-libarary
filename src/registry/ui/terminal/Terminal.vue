<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide, ref, toRef } from 'vue'
import { useInView } from 'motion-v'
import { cn } from '@/lib/utils'
import { terminalSequenceKey } from './context'

export interface TerminalProps {
  class?: HTMLAttributes['class']
  /** Play the lines one after another: each line starts when the previous one finishes. */
  sequence?: boolean
  /** Wait until the terminal scrolls into view before starting the sequence. */
  startOnView?: boolean
}

const props = withDefaults(defineProps<TerminalProps>(), {
  sequence: true,
  startOnView: true,
})

const containerRef = ref<HTMLElement | null>(null)
const isInView = useInView(containerRef, { amount: 0.3, once: true })

const activeIndex = ref(0)
let registered = 0

provide(terminalSequenceKey, {
  enabled: toRef(() => props.sequence),
  started: computed(() => props.sequence && (!props.startOnView || isInView.value)),
  activeIndex,
  register: () => registered++,
  completeItem: (index) => {
    if (index === activeIndex.value) activeIndex.value++
  },
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('z-0 h-full max-h-100 w-full max-w-lg rounded-xl border border-border bg-background', props.class)"
  >
    <div class="flex flex-col gap-y-2 border-b border-border p-4">
      <div class="flex flex-row gap-x-2" aria-hidden="true">
        <div class="size-2 rounded-full bg-red-500" />
        <div class="size-2 rounded-full bg-yellow-500" />
        <div class="size-2 rounded-full bg-green-500" />
      </div>
    </div>
    <pre class="p-4"><code class="grid gap-y-1 overflow-auto"><slot /></code></pre>
  </div>
</template>
