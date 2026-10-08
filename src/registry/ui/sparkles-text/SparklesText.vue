<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface SparklesTextProps {
  class?: HTMLAttributes['class']
  /** Element to render. */
  as?: string
  /** How many sparkles are on the text at once. */
  sparklesCount?: number
  /** The two colours sparkles are picked from. */
  colors?: { first: string; second: string }
}

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
}

const props = withDefaults(defineProps<SparklesTextProps>(), {
  as: 'div',
  sparklesCount: 10,
  colors: () => ({ first: '#9E7AFF', second: '#FE8BBB' }),
})

const SPARKLE_PATH =
  'M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z'

/** Sparkles are generated after mount (random positions would break SSR hydration). */
const sparkles = shallowRef<Sparkle[]>([])
/** Seconds each sparkle has left before it moves; kept outside reactivity so ticks don't re-render. */
let lifespans: number[] = []
let interval: ReturnType<typeof setInterval> | undefined
let counter = 0

function generateSparkle(): Sparkle {
  const x = `${Math.random() * 100}%`
  const y = `${Math.random() * 100}%`
  return {
    id: `${x}-${y}-${counter++}`,
    x,
    y,
    color: Math.random() > 0.5 ? props.colors.first : props.colors.second,
    delay: Math.random() * 2,
    scale: Math.random() * 1 + 0.3,
  }
}

const generateLifespan = () => Math.random() * 10 + 5

function tick() {
  let next: Sparkle[] | null = null
  lifespans = lifespans.map((lifespan, index) => {
    if (lifespan > 0) return lifespan - 0.1
    next ??= [...sparkles.value]
    next[index] = generateSparkle()
    return generateLifespan()
  })
  if (next) sparkles.value = next
}

function start() {
  clearInterval(interval)
  sparkles.value = Array.from({ length: props.sparklesCount }, generateSparkle)
  lifespans = Array.from({ length: props.sparklesCount }, generateLifespan)
  interval = setInterval(tick, 100)
}

onMounted(() => {
  start()
  watch(() => [props.colors.first, props.colors.second, props.sparklesCount], start)
})

onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <component
    :is="props.as"
    :class="cn('text-6xl font-bold', props.class)"
    :style="{ '--sparkles-first-color': props.colors.first, '--sparkles-second-color': props.colors.second }"
  >
    <span class="relative inline-block">
      <svg
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        aria-hidden="true"
        class="animate-sparkles-text-star pointer-events-none absolute z-20 opacity-0 motion-reduce:hidden"
        :style="{
          left: sparkle.x,
          top: sparkle.y,
          '--sparkle-scale': sparkle.scale,
          animationDelay: `${sparkle.delay}s`,
        }"
        width="21"
        height="21"
        viewBox="0 0 21 21"
      >
        <path :d="SPARKLE_PATH" :fill="sparkle.color" />
      </svg>
      <strong><slot /></strong>
    </span>
  </component>
</template>
