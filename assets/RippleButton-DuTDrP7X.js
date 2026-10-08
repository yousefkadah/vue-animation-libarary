var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, ref } from 'vue'
import { cn } from '@/lib/utils'

export interface RippleButtonProps {
  class?: HTMLAttributes['class']
  /** Colour of the ripple. */
  rippleColor?: string
  /** Duration of one ripple, e.g. \`600ms\` or \`1s\`. */
  duration?: string
}

interface Ripple {
  x: number
  y: number
  size: number
  key: number
}

const props = withDefaults(defineProps<RippleButtonProps>(), {
  rippleColor: '#ffffff',
  duration: '600ms',
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const ripples = ref<Ripple[]>([])
const timers = new Set<ReturnType<typeof setTimeout>>()
let nextKey = 0

function toMilliseconds(duration: string): number {
  const value = Number.parseFloat(duration)
  if (Number.isNaN(value)) return 600
  const unit = duration.trim()
  return unit.endsWith('s') && !unit.endsWith('ms') ? value * 1000 : value
}

function createRipple(event: MouseEvent) {
  const button = event.currentTarget as HTMLButtonElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const ripple = {
    x: event.clientX - rect.left - size / 2,
    y: event.clientY - rect.top - size / 2,
    size,
    key: nextKey++,
  }
  ripples.value = [...ripples.value, ripple]

  const timer = setTimeout(() => {
    timers.delete(timer)
    ripples.value = ripples.value.filter((item) => item.key !== ripple.key)
  }, toMilliseconds(props.duration))
  timers.add(timer)
}

function handleClick(event: MouseEvent) {
  createRipple(event)
  emit('click', event)
}

onBeforeUnmount(() => {
  for (const timer of timers) clearTimeout(timer)
  timers.clear()
})
<\/script>

<template>
  <button
    :class="
      cn(
        'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary',
        props.class,
      )
    "
    @click="handleClick"
  >
    <span class="relative z-10">
      <slot />
    </span>
    <span aria-hidden="true" class="pointer-events-none absolute inset-0">
      <span
        v-for="ripple in ripples"
        :key="ripple.key"
        class="absolute animate-rippling rounded-full bg-background opacity-30"
        :style="{
          width: \`\${ripple.size}px\`,
          height: \`\${ripple.size}px\`,
          top: \`\${ripple.y}px\`,
          left: \`\${ripple.x}px\`,
          backgroundColor: props.rippleColor,
          transform: 'scale(0)',
          '--duration': props.duration,
        }"
      />
    </span>
  </button>
</template>
`;export{e as default};