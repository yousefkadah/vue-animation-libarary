<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useMotionValue, useSpring } from 'motion-v'
import { cn } from '@/lib/utils'

export interface MagicCardProps {
  class?: HTMLAttributes['class']
  /** `gradient`: a spotlight and a glowing border follow the pointer. `orb`: a blurred orb follows it instead. */
  mode?: 'gradient' | 'orb'
  /** Radius of the spotlight and border glow in pixels. */
  gradientSize?: number
  /** Spotlight colour (gradient mode). Any CSS colour, including `var(--…)`. */
  gradientColor?: string
  /** Spotlight opacity (gradient mode). */
  gradientOpacity?: number
  /** Start colour of the border glow. */
  gradientFrom?: string
  /** End colour of the border glow. */
  gradientTo?: string
  /** Start colour of the orb (orb mode). */
  glowFrom?: string
  /** End colour of the orb (orb mode). */
  glowTo?: string
  /** Angle of the orb gradient in degrees (orb mode). */
  glowAngle?: number
  /** Diameter of the orb in pixels (orb mode). */
  glowSize?: number
  /** Blur of the orb in pixels (orb mode). */
  glowBlur?: number
  /** Opacity of the orb while hovered (orb mode). */
  glowOpacity?: number
}

type ResetReason = 'enter' | 'leave' | 'global' | 'init'

const props = withDefaults(defineProps<MagicCardProps>(), {
  mode: 'gradient',
  gradientSize: 200,
  gradientColor: '#262626',
  gradientOpacity: 0.8,
  gradientFrom: '#9E7AFF',
  gradientTo: '#FE8BBB',
  glowFrom: '#ee4f27',
  glowTo: '#6b21ef',
  glowAngle: 90,
  glowSize: 420,
  glowBlur: 60,
  glowOpacity: 0.9,
})

const card = ref<HTMLElement | null>(null)

// Orb mode follows the pointer with springs; the gradients read plain CSS variables,
// so moving the pointer never re-renders the component.
const mouseX = useMotionValue(-props.gradientSize)
const mouseY = useMotionValue(-props.gradientSize)
const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 })
const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 })
const orbVisible = useSpring(0, { stiffness: 300, damping: 35 })

/** Pointer position with an off-card fallback, so the glow is hidden until the pointer arrives. */
const pointer = computed(() => {
  const off = `${-props.gradientSize}px`
  return `var(--magic-card-x, ${off}) var(--magic-card-y, ${off})`
})

const borderBackground = computed(
  () =>
    `linear-gradient(var(--background) 0 0) padding-box, radial-gradient(${props.gradientSize}px circle at ${pointer.value}, ${props.gradientFrom}, ${props.gradientTo}, var(--border) 100%) border-box`,
)

const spotlightBackground = computed(
  () => `radial-gradient(${props.gradientSize}px circle at ${pointer.value}, ${props.gradientColor}, transparent 100%)`,
)

function reset(reason: ResetReason = 'leave') {
  if (props.mode === 'orb') {
    orbVisible.set(reason === 'enter' ? props.glowOpacity : 0)
    return
  }
  card.value?.style.removeProperty('--magic-card-x')
  card.value?.style.removeProperty('--magic-card-y')
  mouseX.set(-props.gradientSize)
  mouseY.set(-props.gradientSize)
}

function handlePointerMove(event: PointerEvent) {
  const element = event.currentTarget as HTMLElement
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  element.style.setProperty('--magic-card-x', `${x}px`)
  element.style.setProperty('--magic-card-y', `${y}px`)
  mouseX.set(x)
  mouseY.set(y)
}

function handleGlobalPointerOut(event: PointerEvent) {
  if (!event.relatedTarget) reset('global')
}
function handleBlur() {
  reset('global')
}
function handleVisibility() {
  if (document.visibilityState !== 'visible') reset('global')
}

onMounted(() => {
  reset('init')
  window.addEventListener('pointerout', handleGlobalPointerOut)
  window.addEventListener('blur', handleBlur)
  document.addEventListener('visibilitychange', handleVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerout', handleGlobalPointerOut)
  window.removeEventListener('blur', handleBlur)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <div
    ref="card"
    :class="cn('group relative isolate overflow-hidden rounded-[inherit] border border-transparent', props.class)"
    :style="{ background: borderBackground }"
    @pointermove="handlePointerMove"
    @pointerleave="reset('leave')"
    @pointerenter="reset('enter')"
  >
    <div class="absolute inset-px z-20 rounded-[inherit] bg-background" />

    <div
      v-if="props.mode === 'gradient'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-px z-30 rounded-[inherit]"
      :style="{ background: spotlightBackground, opacity: props.gradientOpacity }"
    />

    <motion.div
      v-if="props.mode === 'orb'"
      aria-hidden="true"
      class="pointer-events-none absolute top-0 left-0 z-30 rounded-full mix-blend-multiply dark:mix-blend-screen"
      :style="{
        width: `${props.glowSize}px`,
        height: `${props.glowSize}px`,
        x: orbX,
        y: orbY,
        translateX: '-50%',
        translateY: '-50%',
        filter: `blur(${props.glowBlur}px)`,
        opacity: orbVisible,
        background: `linear-gradient(${props.glowAngle}deg, ${props.glowFrom}, ${props.glowTo})`,
        willChange: 'transform, opacity',
      }"
    />

    <div class="relative z-40">
      <slot />
    </div>
  </div>
</template>
