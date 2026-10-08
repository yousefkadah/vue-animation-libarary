<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface MeteorsProps {
  class?: HTMLAttributes['class']
  /** Number of meteors. */
  number?: number
  /** Minimum delay in seconds before a meteor starts. */
  minDelay?: number
  /** Maximum delay in seconds before a meteor starts. */
  maxDelay?: number
  /** Minimum seconds a meteor takes to fall. */
  minDuration?: number
  /** Maximum seconds a meteor takes to fall. */
  maxDuration?: number
  /** Angle of the trajectory in degrees. */
  angle?: number
}

const props = withDefaults(defineProps<MeteorsProps>(), {
  number: 20,
  minDelay: 0.2,
  maxDelay: 1.2,
  minDuration: 2,
  maxDuration: 10,
  angle: 215,
})

// Positions are random, so they are generated on the client only (nothing renders during SSR).
const meteorStyles = ref<CSSProperties[]>([])

function generate() {
  meteorStyles.value = Array.from({ length: props.number }, () => ({
    '--angle': `${-props.angle}deg`,
    top: '-5%',
    left: `${Math.floor(Math.random() * 100)}%`,
    animationDelay: `${Math.random() * (props.maxDelay - props.minDelay) + props.minDelay}s`,
    animationDuration: `${Math.floor(Math.random() * (props.maxDuration - props.minDuration) + props.minDuration)}s`,
  }))
}

onMounted(generate)
watch(
  () => [props.number, props.minDelay, props.maxDelay, props.minDuration, props.maxDuration, props.angle],
  generate,
)
</script>

<template>
  <span
    v-for="(style, index) in meteorStyles"
    :key="index"
    aria-hidden="true"
    :style="style"
    :class="
      cn(
        'pointer-events-none absolute size-0.5 rotate-(--angle) animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10] motion-reduce:hidden',
        props.class,
      )
    "
  >
    <!-- tail -->
    <span
      class="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent"
    />
  </span>
</template>
