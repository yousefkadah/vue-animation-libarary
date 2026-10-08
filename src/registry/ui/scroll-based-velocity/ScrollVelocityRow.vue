<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion-v'
import { cn } from '@/lib/utils'
import { scrollVelocityKey, useScrollVelocityFactor, wrap } from './context'

export interface ScrollVelocityRowProps {
  class?: HTMLAttributes['class']
  /** Base speed, as a percentage of the content width per second. */
  baseVelocity?: number
  /** `1` scrolls the content to the left, `-1` to the right. Scrolling the page up flips it. */
  direction?: 1 | -1
  /** Speed up (and flip direction) with the page's scroll velocity. */
  scrollReactivity?: boolean
}

const props = withDefaults(defineProps<ScrollVelocityRowProps>(), {
  baseVelocity: 5,
  direction: 1,
  scrollReactivity: true,
})

/** Rows inside a `ScrollVelocityContainer` share its velocity; standalone rows track their own. */
const velocityFactor = inject(scrollVelocityKey, null) ?? useScrollVelocityFactor()

const container = ref<HTMLElement | null>(null)
const block = ref<HTMLElement | null>(null)
const numCopies = ref(1)

const baseX = useMotionValue(0)
const unitWidth = useMotionValue(0)
let baseDirection = props.direction >= 0 ? 1 : -1
let currentDirection = baseDirection

watch(
  () => props.direction,
  (direction) => {
    baseDirection = direction >= 0 ? 1 : -1
    currentDirection = baseDirection
  },
)

let isInView = true
let isPageVisible = true
let prefersReducedMotion = false

const x = useTransform([baseX, unitWidth], ([offset, width]: number[]) => `${-wrap(0, Number(width) || 1, Number(offset) || 0)}px`)

useAnimationFrame((_time, delta) => {
  if (!isInView || !isPageVisible || prefersReducedMotion) return
  const width = unitWidth.get() || 0
  if (width <= 0) return
  const factor = props.scrollReactivity ? velocityFactor.get() : 0
  const boost = Math.min(5, Math.abs(factor))
  if (boost > 0.1) currentDirection = baseDirection * (factor >= 0 ? 1 : -1)
  const pixelsPerSecond = (width * props.baseVelocity) / 100
  baseX.set(baseX.get() + currentDirection * pixelsPerSecond * (1 + boost) * (delta / 1000))
})

let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let reducedMotionQuery: MediaQueryList | null = null

const onVisibilityChange = () => {
  isPageVisible = document.visibilityState === 'visible'
}
const onReducedMotionChange = () => {
  prefersReducedMotion = reducedMotionQuery?.matches ?? false
}

function updateSizes() {
  if (!container.value || !block.value) return
  const containerWidth = container.value.offsetWidth || 0
  const blockWidth = block.value.scrollWidth || 0
  unitWidth.set(blockWidth)
  numCopies.value = blockWidth > 0 ? Math.max(3, Math.ceil(containerWidth / blockWidth) + 2) : 1
}

onMounted(() => {
  if (!container.value || !block.value) return
  updateSizes()
  resizeObserver = new ResizeObserver(updateSizes)
  resizeObserver.observe(container.value)
  resizeObserver.observe(block.value)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    isInView = entry?.isIntersecting ?? true
  })
  intersectionObserver.observe(container.value)

  document.addEventListener('visibilitychange', onVisibilityChange, { passive: true })
  onVisibilityChange()

  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', onReducedMotionChange)
  onReducedMotionChange()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', onReducedMotionChange)
})
</script>

<template>
  <div ref="container" :class="cn('w-full overflow-hidden whitespace-nowrap', props.class)">
    <motion.div class="inline-flex transform-gpu items-center will-change-transform select-none" :style="{ x }">
      <div ref="block" class="inline-flex shrink-0 items-center">
        <slot />
      </div>
      <div v-for="copy in numCopies - 1" :key="copy" aria-hidden="true" class="inline-flex shrink-0 items-center">
        <slot />
      </div>
    </motion.div>
  </div>
</template>
