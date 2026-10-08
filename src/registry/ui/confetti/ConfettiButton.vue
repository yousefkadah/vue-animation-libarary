<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import confetti from 'canvas-confetti'
import type { GlobalOptions as ConfettiGlobalOptions, Options as ConfettiOptions } from 'canvas-confetti'
import { cn } from '@/lib/utils'

export interface ConfettiButtonProps {
  class?: HTMLAttributes['class']
  /** Burst options. The origin is always the centre of the button. */
  options?: ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }
}

const props = defineProps<ConfettiButtonProps>()

const emit = defineEmits<{
  /** Native click. Call `event.preventDefault()` to skip the confetti. */
  click: [event: MouseEvent]
}>()

async function onClick(event: MouseEvent) {
  try {
    emit('click', event)
    if (event.defaultPrevented) return
    const target = event.currentTarget as HTMLElement | null
    if (!target) return
    const rect = target.getBoundingClientRect()
    await confetti({
      zIndex: 9999,
      ...props.options,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    })
  } catch (error) {
    console.error('Confetti button error:', error)
  }
}
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-xs transition-colors outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot />
  </button>
</template>
