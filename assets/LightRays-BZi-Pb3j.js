var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, shallowRef, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface LightRaysProps {
  class?: HTMLAttributes['class']
  /** Number of rays. */
  count?: number
  /** Colour of the rays and the ambient glow (any CSS colour; include some transparency). */
  color?: string
  /** Blur of each ray in pixels. */
  blur?: number
  /** Seconds for one swing of a ray. Lower is faster. */
  speed?: number
  /** Length of each ray, e.g. \`70vh\` or \`500px\`. */
  length?: string
}

interface LightRay {
  id: string
  style: Record<string, string>
  rotate: number
  intensity: number
  animate: { opacity: number[]; rotate: number[] }
  transition: { duration: number; repeat: number; ease: 'easeInOut'; delay: number; repeatDelay: number }
}

const props = withDefaults(defineProps<LightRaysProps>(), {
  count: 7,
  color: 'rgba(160, 210, 255, 0.2)',
  blur: 36,
  speed: 14,
  length: '70vh',
})

const reducedMotion = useReducedMotion()
const rays = shallowRef<LightRay[]>([])
const cycle = computed(() => Math.max(props.speed, 0.1))

function createRays(count: number, cycle: number): LightRay[] {
  return Array.from({ length: Math.max(count, 0) }, (_, index) => {
    const left = 8 + Math.random() * 84
    const rotate = -28 + Math.random() * 56
    const width = 160 + Math.random() * 160
    const swing = 0.8 + Math.random() * 1.8
    const duration = cycle * (0.75 + Math.random() * 0.5)
    const intensity = 0.6 + Math.random() * 0.5
    return {
      id: \`\${index}-\${Math.round(left * 10)}\`,
      style: { '--ray-left': \`\${left}%\`, '--ray-width': \`\${width}px\` },
      rotate,
      intensity,
      animate: {
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      },
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * cycle,
        repeatDelay: duration * 0.1,
      },
    }
  })
}

// Random layout is generated after mount so server and client renders match.
onMounted(() => {
  rays.value = createRays(props.count, cycle.value)
})
watch([() => props.count, cycle], ([count, seconds]) => {
  rays.value = createRays(count, seconds)
})
<\/script>

<template>
  <div
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]', props.class)"
    :style="{
      '--light-rays-color': props.color,
      '--light-rays-blur': \`\${props.blur}px\`,
      '--light-rays-length': props.length,
    }"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--light-rays-color)_45%,transparent),transparent_70%)] opacity-60"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,color-mix(in_srgb,var(--light-rays-color)_35%,transparent),transparent_75%)] opacity-60"
      />
      <motion.div
        v-for="ray in rays"
        :key="ray.id"
        class="pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 blur-[var(--light-rays-blur)] dark:mix-blend-screen"
        :style="ray.style"
        :initial="reducedMotion ? { rotate: ray.rotate, opacity: ray.intensity * 0.6 } : { rotate: ray.rotate }"
        :animate="reducedMotion ? undefined : ray.animate"
        :transition="ray.transition"
      />
    </div>
  </div>
</template>
`;export{e as default};