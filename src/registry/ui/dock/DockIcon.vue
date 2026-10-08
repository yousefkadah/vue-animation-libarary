<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, ref } from 'vue'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion-v'
import { unrefElement } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { DEFAULT_DISTANCE, DEFAULT_MAGNIFICATION, DEFAULT_SIZE, dockKey } from './context'

export interface DockIconProps {
  class?: HTMLAttributes['class']
  /** Resting size in pixels. Defaults to the dock's `iconSize`. */
  size?: number
  /** Size when the pointer is right over the icon. Defaults to the dock's `iconMagnification`. */
  magnification?: number
  /** Turn magnification off for this icon. Defaults to the dock's `disableMagnification`. */
  disableMagnification?: boolean
  /** Distance in pixels within which the icon grows. Defaults to the dock's `iconDistance`. */
  distance?: number
  /** Pointer X position to react to. Provided automatically inside a `Dock`. */
  mouseX?: MotionValue<number>
}

const props = withDefaults(defineProps<DockIconProps>(), {
  disableMagnification: undefined,
})

const dock = inject(dockKey, null)

const size = computed(() => props.size ?? dock?.iconSize.value ?? DEFAULT_SIZE)
const magnification = computed(() => props.magnification ?? dock?.iconMagnification.value ?? DEFAULT_MAGNIFICATION)
const distance = computed(() => props.distance ?? dock?.iconDistance.value ?? DEFAULT_DISTANCE)
const isMagnificationDisabled = computed(() => props.disableMagnification ?? dock?.disableMagnification.value ?? false)
const padding = computed(() => Math.max(6, size.value * 0.2))

const elementRef = ref()
const fallbackMouseX = useMotionValue(Infinity)

/** Pointer distance from the icon's centre. */
const distanceCalc = useTransform(props.mouseX ?? dock?.mouseX ?? fallbackMouseX, (value: number) => {
  const bounds = (unrefElement(elementRef) as HTMLElement | undefined)?.getBoundingClientRect() ?? { x: 0, width: 0 }
  return value - bounds.x - bounds.width / 2
})

const sizeTransform = useTransform(distanceCalc, (offset: number) => {
  const target = isMagnificationDisabled.value ? size.value : magnification.value
  const progress = Math.min(Math.abs(offset) / distance.value, 1)
  return target + (size.value - target) * progress
})

const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 })
</script>

<template>
  <motion.div
    ref="elementRef"
    :style="{ width: scaleSize, height: scaleSize, padding: `${padding}px` }"
    :class="
      cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        isMagnificationDisabled && 'transition-colors hover:bg-muted-foreground',
        props.class,
      )
    "
  >
    <div class="flex size-full items-center justify-center">
      <slot />
    </div>
  </motion.div>
</template>
