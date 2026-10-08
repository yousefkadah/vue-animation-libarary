<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface LensPosition {
  /** Distance from the left edge of the lens container, in pixels. */
  x: number
  /** Distance from the top edge of the lens container, in pixels. */
  y: number
}

export interface LensProps {
  class?: HTMLAttributes['class']
  /** Magnification inside the lens. Must be at least 1. */
  zoomFactor?: number
  /** Diameter of the lens in pixels. */
  lensSize?: number
  /** Where the lens sits when `isStatic` is set. */
  position?: LensPosition
  /** Where the lens rests while the pointer is outside. Keeps the lens always visible. */
  defaultPosition?: LensPosition
  /** Keep the lens at `position` instead of following the pointer. */
  isStatic?: boolean
  /** Seconds the lens takes to appear and disappear. */
  duration?: number
  /** Colour of the mask that shapes the lens. Any opaque colour behaves the same. */
  lensColor?: string
  /** Accessible name of the zoomable region. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<LensProps>(), {
  zoomFactor: 1.3,
  lensSize: 170,
  position: () => ({ x: 0, y: 0 }),
  isStatic: false,
  duration: 0.1,
  lensColor: 'black',
  ariaLabel: 'Zoom Area',
})

watchEffect(() => {
  if (props.zoomFactor < 1) throw new Error('Lens: zoomFactor must be greater than 1')
  if (props.lensSize < 0) throw new Error('Lens: lensSize must be greater than 0')
})

const isHovering = ref(false)
const mousePosition = ref<LensPosition>({ ...props.position })

const currentPosition = computed(() => {
  if (props.isStatic) return props.position
  if (props.defaultPosition && !isHovering.value) return props.defaultPosition
  return mousePosition.value
})

const alwaysVisible = computed(() => props.isStatic || Boolean(props.defaultPosition))

const maskImage = computed(() => {
  const { x, y } = currentPosition.value
  return `radial-gradient(circle ${props.lensSize / 2}px at ${x}px ${y}px, ${props.lensColor} 100%, transparent 100%)`
})

const origin = computed(() => `${currentPosition.value.x}px ${currentPosition.value.y}px`)

function onMouseMove(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  mousePosition.value = { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') isHovering.value = false
}
</script>

<template>
  <div
    :class="cn('relative z-20 overflow-hidden rounded-xl', props.class)"
    role="region"
    :aria-label="props.ariaLabel"
    tabindex="0"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @mousemove="onMouseMove"
    @keydown="onKeyDown"
  >
    <slot />
    <!-- A static / resting lens is visible from the start; only hover-triggered lenses animate in. -->
    <AnimatePresence :initial="false">
      <motion.div
        v-if="alwaysVisible || isHovering"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-50 overflow-hidden"
        :style="{ transformOrigin: origin }"
        :initial="{ opacity: 0, scale: 0.58 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: props.duration }"
      >
        <div class="absolute inset-0" :style="{ maskImage, WebkitMaskImage: maskImage }">
          <div class="absolute inset-0" :style="{ transform: `scale(${props.zoomFactor})`, transformOrigin: origin }">
            <slot />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
