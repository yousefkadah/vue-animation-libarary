<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface PulsatingButtonProps {
  class?: HTMLAttributes['class']
  /** Colour of the pulse. Defaults to the button's own background colour. */
  pulseColor?: string
  /** Duration of one pulse, e.g. `1.5s`. */
  duration?: string
  /** How far the pulse spreads, e.g. `8px`. */
  distance?: string
  /** `pulse` breathes in and out; `ripple` radiates outward and fades. */
  variant?: 'pulse' | 'ripple'
}

const props = withDefaults(defineProps<PulsatingButtonProps>(), {
  duration: '1.5s',
  distance: '8px',
  variant: 'pulse',
})

const button = ref<HTMLButtonElement | null>(null)
let stopSyncing: (() => void) | undefined

/**
 * Without a `pulseColor`, the pulse uses the button's computed background (exposed as `--bg`),
 * kept in sync when the theme class, the button's attributes or its hover/focus state change.
 */
function syncBackground() {
  stopSyncing?.()
  stopSyncing = undefined

  const element = button.value
  if (!element) return

  if (props.pulseColor) {
    element.style.removeProperty('--bg')
    return
  }

  let animationFrameId = 0
  let currentBackground = ''

  const updateBackground = () => {
    animationFrameId = 0
    const nextBackground = getComputedStyle(element).backgroundColor
    if (nextBackground === currentBackground) return
    currentBackground = nextBackground
    element.style.setProperty('--bg', nextBackground)
  }

  const scheduleUpdate = () => {
    if (animationFrameId) return
    animationFrameId = window.requestAnimationFrame(updateBackground)
  }

  updateBackground()

  const themeObserver = new MutationObserver(scheduleUpdate)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  const buttonObserver = new MutationObserver(scheduleUpdate)
  buttonObserver.observe(element, { attributes: true })

  const syncEvents = ['blur', 'focus', 'pointerenter', 'pointerleave'] as const
  for (const eventName of syncEvents) element.addEventListener(eventName, scheduleUpdate)

  stopSyncing = () => {
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
    themeObserver.disconnect()
    buttonObserver.disconnect()
    for (const eventName of syncEvents) element.removeEventListener(eventName, scheduleUpdate)
  }
}

onMounted(syncBackground)
watch(() => props.pulseColor, syncBackground)
onBeforeUnmount(() => stopSyncing?.())
</script>

<template>
  <button
    ref="button"
    :class="
      cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground',
        props.class,
      )
    "
    :style="{ '--pulse-color': props.pulseColor, '--duration': props.duration, '--distance': props.distance }"
  >
    <span class="relative z-10">
      <slot />
    </span>
    <span
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit motion-reduce:animate-none',
          props.variant === 'pulse' ? 'animate-pulsating' : 'animate-pulsating-ripple',
        )
      "
    />
  </button>
</template>
